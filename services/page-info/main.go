package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

const (
	apiURL     = "https://neocities.org/api/info?sitename="
	sitename   = "duche"
	outputFile = "output.json"

	username = ""
	password = ""
)

type Info struct {
	Sitename    string   `json:"sitename"`
	Hits        int      `json:"hits"`
	Views       int      `json:"views"`
	CreatedAt   string   `json:"created_at"`
	LastUpdated string   `json:"last_updated"`
	Domain      string   `json:"domain"`
	Tags        []string `json:"tags"`
}

type ApiResponse struct {
	Result string `json:"result"`
	Info   Info   `json:"info"`
}

func fetchStats() error {
	res, err := http.Get(apiURL + sitename)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		return fmt.Errorf("bad status: %s", res.Status)
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		return err
	}

	var apiRes ApiResponse
	if err := json.Unmarshal(body, &apiRes); err != nil {
		return err
	}

	data, err := json.MarshalIndent(apiRes.Info, "", "  ")
	if err != nil {
		return err
	}

	tmp := outputFile + ".tmp"
	if err := os.WriteFile(tmp, data, 0644); err != nil {
		return err
	}

	if err := os.Rename(tmp, outputFile); err != nil {
		return err
	}

	return uploadFile(outputFile)
}

func uploadFile(path string) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	var buf bytes.Buffer
	writer := multipart.NewWriter(&buf)

	part, err := writer.CreateFormFile(filepath.Base(path), filepath.Base(path))
	if err != nil {
		return err
	}

	if _, err := io.Copy(part, file); err != nil {
		return err
	}

	writer.Close()

	req, err := http.NewRequest(
		"POST",
		"https://neocities.org/api/upload",
		&buf,
	)
	if err != nil {
		return err
	}

	auth := base64.StdEncoding.EncodeToString([]byte(username + ":" + password))

	req.Header.Set("Authorization", "Basic "+auth)
	req.Header.Set("Content-Type", writer.FormDataContentType())

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		body, _ := io.ReadAll(resp.Body)
		return fmt.Errorf("upload failed: %s — %s", resp.Status, body)
	}

	fmt.Println("Successfully uploaded")

	return nil
}

func main() {
	if err := fetchStats(); err != nil {
		fmt.Println("Error:", err)
	}

	ticker := time.NewTicker(time.Hour)
	defer ticker.Stop()

	for range ticker.C {
		if err := fetchStats(); err != nil {
			fmt.Println("Error:", err)
		} else {
			fmt.Println("Updated & uploaded output.json at", time.Now().Format(time.RFC3339))
		}
	}
}
