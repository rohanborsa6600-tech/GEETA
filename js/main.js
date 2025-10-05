// TOC Toggle
function toggleTOC() {
    const tocList = document.getElementById('toc-list');
    if (tocList) tocList.classList.toggle('hidden');
}

// Auto Style Simple Chapters
document.addEventListener('DOMContentLoaded', () => {
    if (!document.querySelector('.hero') && document.querySelector('main')) {
        autoStyleSimpleChapter();
    }
    const teaser = document.querySelector('.teaser');
    if (teaser) {
        typeWriter(teaser, teaser.textContent);
    }
});

function autoStyleSimpleChapter() {
    const main = document.querySelector('main');
    if (!main) return;

    const body = document.body;
    const particles = document.createElement('div');
    particles.id = 'particles-js';
    body.insertBefore(particles, body.firstChild);

    const nav = document.createElement('nav');
    nav.className = 'toc-menu';
    nav.innerHTML = `
        <button onclick="toggleTOC()">📖 मजकूर निर्देशिका</button>
        <ul id="toc-list" class="hidden">
            <li><a href="../index.html">मुखपृष्ठ</a></li>
            <li><a href="simple-chapter.html">साधा अध्याय</a></li>
        </ul>
    `;
    body.insertBefore(nav, main);

    const hero = document.createElement('header');
    hero.className = 'hero';
    hero.innerHTML = `
        <div class="hero-content">
            <h1 class="title">साधा अध्याय</h1>
            <p class="author">लेखक: तुझं नाव</p>
        </div>
    `;
    body.insertBefore(hero, main);

    const progress = document.createElement('div');
    progress.className = 'progress-bar';
    body.insertBefore(progress, main);

    const footerNav = document.createElement('footer');
    footerNav.className = 'navigation';
    footerNav.innerHTML = `
        <a href="../index.html" class="btn-prev">🏠 Home</a>
        <a href="chapter2.html" class="btn-next">पुढचा ➡️</a>
    `;
    body.appendChild(footerNav);

    const siteFooter = document.createElement('footer');
    siteFooter.innerHTML = '<p>&copy; २०२५ तुझं नाव. सर्व हक्क राखीव.</p>';
    body.appendChild(siteFooter);

    if (!main.classList.contains('content')) {
        main.classList.add('content');
    }

    loadParticles();
}

function loadParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 30 },
                color: { value: '#8b4513' },
                shape: { type: 'circle' },
                opacity: { value: 0.4 },
                size: { value: 2, random: true },
                move: { enable: true, speed: 1 }
            },
            interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } }
        });
    }
}

// Progress Bar
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

// Typewriter
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
