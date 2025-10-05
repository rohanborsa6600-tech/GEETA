// List all chapters (add new chapter file here)
const chapterFiles = [
  'chapters/chapter1.html',
  'chapters/chapter2.html',
  'chapters/chapter3.html' // add new chapter here
];

const chaptersContainer = document.getElementById('chapters');

chapterFiles.forEach(file => {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      const div = document.createElement('div');
      div.innerHTML = html;
      chaptersContainer.appendChild(div.firstElementChild);
    })
    .then(() => {
      // Fade-in animation
      const chapters = document.querySelectorAll('.chapter-box');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      chapters.forEach(chapter => observer.observe(chapter));
    });
});
