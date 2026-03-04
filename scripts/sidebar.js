const focus = "im focusing on finishing my final year project at uni";

const tils = [
  { date: '2026-03-04', text: "i dunno? try to be independent even if i suck? probably i didnt understood what they meant" },
];

export function insertSidebar() {
  const aside = document.createElement('aside');

  const focusSection = document.createElement('section');
  focusSection.className = 'sidebar-focus';
  focusSection.innerHTML = `<p class="til-heading">// focusing on</p><p class="sidebar-focus-text">${focus}</p>`;
  aside.appendChild(focusSection);

  const section = document.createElement('section');
  section.className = 'til';

  const heading = document.createElement('p');
  heading.className = 'til-heading';
  heading.textContent = '// today i learned';
  section.appendChild(heading);

  const log = document.createElement('div');
  log.className = 'til-log';

  tils.forEach(({ date, text }) => {
    const line = document.createElement('p');
    line.innerHTML = `<span class="til-date">[${date}]</span> ${text}`;
    log.appendChild(line);
  });

  section.appendChild(log);
  aside.appendChild(section);

  document.querySelector('main').prepend(aside);
}
