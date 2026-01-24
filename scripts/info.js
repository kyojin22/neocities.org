async function fetchInfo() {
  const response = await fetch("/output.json");
  const data = await response.json();
  return data;
}

async function loadViews() {
  const info = await fetchInfo();
  if (!info) return;

  // views
  const viewsSpan = document.getElementById("views");
  viewsSpan.textContent = info.views || "-";

  // updated at
  const last_updated_yyyy_mm_dd = info.last_updated
    ? new Date(info.last_updated).toISOString().split("T")[0]
    : "-";
  const lastUpdatedSpan = document.getElementById("last-updated-at");
  lastUpdatedSpan.textContent = last_updated_yyyy_mm_dd;
  lastUpdatedSpan.title = info.last_updated
    ? new Date(info.last_updated).toISOString().split("T").join(" ")
    : "-";

  // created at
  const created_at_yyyy_mm_dd = info.created_at
    ? new Date(info.created_at).toISOString().split("T")[0]
    : "-";
  const createdAtSpan = document.getElementById("created-at");
  createdAtSpan.textContent = created_at_yyyy_mm_dd;
  createdAtSpan.title = info.created_at
    ? new Date(info.created_at).toISOString().split("T").join(" ")
    : "-";
}

loadViews();
