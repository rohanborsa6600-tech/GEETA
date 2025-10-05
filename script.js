// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Scroll to TOC
function scrollToTOC() {
    document.getElementById('toc').scrollIntoView({ behavior: 'smooth' });
}

// Table of Contents populate (dynamic)
const chapters = [
    { title: 'अध्याय १: सुरुवात', link: 'chapters/chapter1.html' },
    { title: 'अध्याय २: विकास', link: 'chapters/chapter2.html' },
    // Add your chapters here
];

const tocMenu = document.getElementById('tocMenu');
chapters.forEach(chapter => {
    const item = document.createElement('div');
    item.classList.add('toc-item');
    item.innerHTML = `<h3>${chapter.title}</h3><a href="${chapter.link}" class="toc-link">वाचा →</a>`;
    tocMenu.appendChild(item);
});

// Smooth transitions & animations
document.addEventListener('DOMContentLoaded', () => {
    // Add particles (optional)
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        document.body.appendChild(particle);
    }

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
});

// For chapter pages - back to home button
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
}
