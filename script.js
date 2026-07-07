// ===========================================================
// Menu mobile
// ===========================================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===========================================================
// Effet terminal (page d'accueil)
// ===========================================================
const terminalBody = document.getElementById('terminal-body');

if (terminalBody) {
  const lines = [
    { text: '> analyse du système en cours...', cls: 'line-muted' },
    { text: '  wifi ................ instable', cls: 'line-warn' },
    { text: '  démarrage ........... trop lent', cls: 'line-warn' },
    { text: '  antivirus ........... absent', cls: 'line-warn' },
    { text: '  sauvegardes .......... aucune', cls: 'line-warn' },
    { text: '> diagnostic terminé.', cls: 'line-muted' },
    { text: '> solution trouvée : K-Tech.', cls: 'line-ok' },
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    terminalBody.innerHTML = lines.map(l => `<div class="${l.cls}">${l.text}</div>`).join('');
  } else {
    let lineIndex = 0;

    function typeLine() {
      if (lineIndex >= lines.length) return;
      const { text, cls } = lines[lineIndex];
      const div = document.createElement('div');
      div.className = cls;
      terminalBody.appendChild(div);

      let charIndex = 0;
      const interval = setInterval(() => {
        div.textContent = text.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= text.length) {
          clearInterval(interval);
          lineIndex++;
          setTimeout(typeLine, 220);
        }
      }, 18);
    }

    typeLine();
  }
}

// ===========================================================
// Rendu de la page Actus (data/actus.js doit être chargé avant)
// ===========================================================
const actusList = document.getElementById('actus-list');

if (actusList) {
  if (typeof actus !== 'undefined' && actus.length > 0) {
    actusList.innerHTML = actus.map(item => `
      <article class="actu-card">
        <div class="actu-date">${item.date}</div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          ${item.url ? `<a class="src-link" href="${item.url}" target="_blank" rel="noopener">Lire la source →</a>` : ''}
        </div>
      </article>
    `).join('');
  } else {
    actusList.innerHTML = '<p class="actus-empty">Aucune actu pour le moment. Reviens bientôt !</p>';
  }
}
