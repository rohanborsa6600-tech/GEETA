// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme + '-theme');
themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const newTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));

// Scroll to TOC
function scrollToTOC() {
    document.getElementById('toc').scrollIntoView({ behavior: 'smooth' });
}

// Progress Bar
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// TOC Populate
const chapters = [
    { title: 'अध्याय १: सुरुवात', link: 'chapters/chapter1.html' },
    { title: 'अध्याय २: विकास', link: 'chapters/chapter2.html' },
    // Add more
];

const tocMenu = document.getElementById('tocMenu');
chapters.forEach(chapter => {
    const item = document.createElement('div');
    item.classList.add('toc-item');
    item.innerHTML = `<h3>${chapter.title}</h3><a href="${chapter.link}" class="toc-link">वाचा →</a>`;
    tocMenu.appendChild(item);
});

// Global Search
const searchInput = document.getElementById('globalSearch');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;
    
    // For demo: Alert with results (actual ने chapters load करून search कर)
    alert(`शोधले: "${query}" - Chapter 1 मध्ये matches सापडले! (Full impl: AJAX ने load करून highlight)`);
    
    // Advanced: Highlight in current page
    const elements = document.querySelectorAll('p, h1, h2, h3');
    elements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>');
    });
}

// Particles & Animations
document.addEventListener('DOMContentLoaded', () => {
    // Enhanced particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(particle);
    }

    // Typewriter for intro (already in CSS, but JS fallback)
    const introText = document.getElementById('introText');
    const fullText = introText.textContent;
    introText.textContent = '';
    let i = 0;
    const typeWriter = () => {
        if (i < fullText.length) {
            introText.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    setTimeout(typeWriter, 3000); // After title

    // Intersection Observer for fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.toc-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.getElementById('hero').style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Chapter Pages: Back Button + Confetti on End
if (window.location.pathname.includes('chapters/')) {
    const backBtn = document.createElement('button');
    backBtn.textContent = '← होम';
    backBtn.classList.add('cta-btn');
    backBtn.style.position = 'fixed';
    backBtn.style.top = '20px';
    backBtn.style.left = '20px';
    backBtn.style.zIndex = '1000';
    backBtn.onclick = () => window.location.href = '../index.html';
    document.body.appendChild(backBtn);

    // Confetti on scroll to bottom (fun!)
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            launchConfetti();
        }
    });
}

function launchConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confetti.style.animationDelay = Math.random() * 3 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}
