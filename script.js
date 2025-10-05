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

// TOC Populate - Full 18 Chapters
const chapters = [
    { title: 'अध्याय १: अर्जुनविषादयोग', link: 'chapters/chapter1.html' },
    { title: 'अध्याय २: साङ्ख्ययोग', link: 'chapters/chapter2.html' },
    { title: 'अध्याय ३: कर्मयोग', link: 'chapters/chapter3.html' },
    { title: 'अध्याय ४: ज्ञानकर्मसन्न्यासयोग', link: 'chapters/chapter4.html' },
    { title: 'अध्याय ५: कर्मसन्न्यासयोग', link: 'chapters/chapter5.html' },
    { title: 'अध्याय ६: ध्यानयोग', link: 'chapters/chapter6.html' },
    { title: 'अध्याय ७: ज्ञानविज्ञानयोग', link: 'chapters/chapter7.html' },
    { title: 'अध्याय ८: अक्षरब्रह्मयोग', link: 'chapters/chapter8.html' },
    { title: 'अध्याय ९: राजविद्या राजगुह्ययोग', link: 'chapters/chapter9.html' },
    { title: 'अध्याय १०: विभूति योग', link: 'chapters/chapter10.html' },
    { title: 'अध्याय ११: विश्वरूपदर्शनयोग', link: 'chapters/chapter11.html' },
    { title: 'अध्याय १२: भक्तियोग', link: 'chapters/chapter12.html' },
    { title: 'अध्याय १३: क्षेत्रक्षेत्रज्ञविभागयोग', link: 'chapters/chapter13.html' },
    { title: 'अध्याय १४: गुणत्रयविभागयोग', link: 'chapters/chapter14.html' },
    { title: 'अध्याय १५: पुरुषोत्तमयोग', link: 'chapters/chapter15.html' },
    { title: 'अध्याय १६: दैवासुरसम्पद्विभागयोग', link: 'chapters/chapter16.html' },
    { title: 'अध्याय १७: श्रद्धात्रयविभागयोग', link: 'chapters/chapter17.html' },
    { title: 'अध्याय १८: मोक्षसन्न्यासयोग', link: 'chapters/chapter18.html' }
];

const tocMenu = document.getElementById('tocMenu');
chapters.forEach((chapter, index) => {
    const item = document.createElement('div');
    item.classList.add('toc-item');
    item.innerHTML = `<h3>${chapter.title}</h3><a href="${chapter.link}" class="toc-link">वाचा →</a>`;
    tocMenu.appendChild(item);
});

// Global Search (Chapters मध्ये highlight)
const searchInput = document.getElementById('globalSearch');
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

function performSearch() {
    const query = searchInput.value.toLowerCase();
    if (!query) return;
    
    // Alert for demo, actual ने chapters load करून search
    alert(`शोध: "${query}" - संबंधित अध्याय: कर्मयोग (Chapter ३). Full search साठी chapter open करा.`);
    
    // Highlight in current page
    const elements = document.querySelectorAll('.shloka, p, h1, h2, h3');
    elements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(new RegExp(`(${query})`, 'gi'), '<span class="highlight">$1</span>');
    });
}

// Particles & Animations
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        document.body.appendChild(particle);
    }

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
    setTimeout(typeWriter, 3000);

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

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.getElementById('hero').style.transform = `translateY(${scrolled * 0.5}px)`;
    });
});

// Chapter Pages: Back + Confetti
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
