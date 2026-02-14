export function insertWebButton() {
  const div = document.createElement('div');
  const img = document.createElement('img');

  img.src = '/public/webbutton-1.png';
  img.alt = 'my webbutton must have appeared here';
  img.title = 'my webbutton';

  div.style.position = 'fixed';
  div.style.top = '10px';
  div.style.left = '10px';
  div.style.boxShadow = '0 0 15px 5px red';

  div.appendChild(img);

  document.body.appendChild(div);
}
