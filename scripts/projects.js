const projects = [
  {
    title: 'Simple proxy server for Spotify - for myself',
    description: 'i just wanted to share my favorite musics playlist from spotify and music im listenin right now or recently listened. Spotify has web api for that but everyone needs to create their own application and then get secrets and keys to get token for 1 hour. its hard to achieve it just from frontend so i created this repo to help people so that they dont have to create their own backend but use this one which will be identical to spotify version but just proxy. Its built with Go. kinda 1% is finished. the apis i need are done. and its fully working on the vps',
    languages: [
      { name: 'Go', class: 'go' },
      { name: 'Redis', class: 'redis' },
    ],
  },
  {
    title: 'Diabetes - for university cw - 100% vibe coded',
    description: 'nah, it only helped with <b><i>HOW</i></b> part. im the one who chose dataset and guided the ai to do what. i grinded one day before deadline. got 88, answers came out <span title="11.01.2026">today</span>. i hope my professor will not find out this and reduce it. it would be such cringe. but no way, <b>I did it myself!</b> okay? no vibe fckn codin.',
    languages: [
      { name: 'Python', class: 'python' },
      { name: 'Jupyter Notebook', class: 'jupyter-notebook' },
    ],
  },
  {
    title: 'Loopify - listen one music infinitely',
    description: 'at one moment, i just wanted to listen on music infinitely so i just built this with chatgpt',
    languages: [
      { name: 'JavaScript', class: 'javascript' },
      { name: 'CSS', class: 'css' },
      { name: 'HTML', class: 'html' },
    ],
  },
  {
    title: 'Sketchvue - figma clone',
    description: 'YEA! ai helped with this too but overall project is mine even if it sucks or whatever',
    languages: [
      { name: 'JavaScript', class: 'javascript' },
      { name: 'Vue', class: 'vue' },
    ],
  },
  {
    title: 'Formify - google forms clone',
    description: 'Its basically training project from iTransition. i could not pass coz i could not explain useEffect with cleanup function. I did not know it. ai assisted with this too. yea i suck. im fckn vibecoder or whatever those rusters say or maybe im not meant to be coder!! it does not mean anything . <b>HUHHHH!</b> ruh4ur34irro3rhfjfopfk k40f34ffefjwefj epwfkewkfewpof',
    languages: [
      { name: 'TypeScript', class: 'typescript' },
      { name: 'React', class: 'react' },
    ],
  },
  {
    title: 'Some movie app for cw of web dev from uni',
    description: 'People can add their favorite movies and leave reviews. I do not even remember what it does LOL',
    languages: [
      { name: 'C#', class: 'csharp' },
      { name: 'Angular', class: 'angular' },
    ],
  },
  {
    title: 'Pomodoro app',
    description: 'My first project with js. I did build it myself even if it small and fckn buggy. at that fckn time there was not any ai bullshit',
    languages: [
      { name: 'JavaScript', class: 'javascript' },
      { name: 'CSS', class: 'css' },
      { name: 'HTML', class: 'html' },
    ],
  },
];

function renderProjects() {
  const main = document.querySelector('main');

  projects.forEach(project => {
    const div = document.createElement('div');
    div.className = 'project';

    const languages = project.languages.map(lang => `
      <div class="language">
        <div class="language--sign ${lang.class}"></div>
        <span>${lang.name}</span>
      </div>`).join('');

    div.innerHTML = `
      <h4>${project.title}</h4>
      <p>${project.description}</p>
      <div class="languages">${languages}</div>`;

    main.appendChild(div);
  });

  const p = document.createElement('p');
  p.innerHTML = 'You can find them all here in my <a href="https://github.com/kyojin22" class="font-kalam">github</a>';
  main.appendChild(p);
}

renderProjects();
