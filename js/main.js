// TOC Toggle
function toggleTOC() {
    const tocList = document.getElementById('toc-list');
    tocList.classList.toggle('hidden');
}

// Load Particles Config
if (document.getElementById('particles-js')) {
    particlesJS.load('particles-js', 'assets/particles-config.json', function() {
        console.log('Particles loaded!');
    });
}

// Reading Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
});

// Chapter Loader
function loadChapter(chap) {
    fetch(`chapters/${chap}.html`)
        .then(response => response.text())
        .then(html => {
            document.querySelector('.content').innerHTML = html;
            window.scrollTo(0, 0);
        })
        .catch(error => console.error('Error loading chapter:', error));
}

// Typewriter Effect
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    const teaser = document.querySelector('.teaser');
    if (teaser) {
        typeWriter(teaser, teaser.textContent);
    }
});
