// Particles
particlesJS("particles-js", {
    "particles": { "number": {"value":60,"density":{"enable":true,"value_area":800}}, "color":{"value":"#FFD700"}, "shape":{"type":"circle"}, "opacity":{"value":0.5}, "size":{"value":3}, "line_linked":{"enable":true,"distance":150,"color":"#FFD700","opacity":0.4,"width":1}, "move":{"enable":true,"speed":2,"direction":"none","out_mode":"bounce"} }, "interactivity":{"events":{"onhover":{"enable":true,"mode":"repulse"},"onclick":{"enable":true,"mode":"push"}}}, "retina_detect":true
});

// Load chapters
fetch('chapters/chapters.json')
.then(res => res.json())
.then(chapters => {
    const container = document.querySelector('.chapter-links');
    const chapterContent = document.querySelector('.chapter-content');
    const header = document.querySelector('.main-header h1');

    if(container) {
        chapters.forEach(chap => {
            const a = document.createElement('a');
            a.href = `chapters/${chap.filename}`;
            a.className = 'chapter-box';
            a.innerText = chap.title;
            container.appendChild(a);
        });
    }

    if(chapterContent && header) {
        const currentId = window.location.pathname.split('/').pop();
        const currentChapter = chapters.find(c => c.filename === currentId);

        if(currentChapter) {
            header.innerText = currentChapter.title;

            // Add shlok-boxes from chapter HTML content
            const shlokDivs = document.querySelectorAll('.shlok-box');
            if(shlokDivs.length === 0 && currentChapter.shloks) {
                currentChapter.shloks.forEach(s => {
                    const div = document.createElement('div');
                    div.className = 'shlok-box';
                    div.innerText = s;
                    chapterContent.appendChild(div);
                });
            }

            // Navigation arrows
            const nav = document.createElement('div');
            nav.className = 'nav-chapters';
            const idx = chapters.indexOf(currentChapter);

            const prevLink = document.createElement('a');
            if(idx > 0){ prevLink.href = chapters[idx-1].filename; prevLink.innerText="⟵ मागील अध्याय"; } 
            else { prevLink.innerText="⟵ मागील अध्याय"; prevLink.style.opacity=0.5; prevLink.style.pointerEvents="none"; }

            const nextLink = document.createElement('a');
            if(idx < chapters.length-1){ nextLink.href = chapters[idx+1].filename; nextLink.innerText="पुढील अध्याय ⟶"; } 
            else { nextLink.innerText="पुढील अध्याय ⟶"; nextLink.style.opacity=0.5; nextLink.style.pointerEvents="none"; }

            nav.appendChild(prevLink);
            nav.appendChild(nextLink);
            chapterContent.parentNode.appendChild(nav);
        }
    }
});
