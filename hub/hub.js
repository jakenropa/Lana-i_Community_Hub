// Class-specific JS: renders weeks grid and controls the week modal
(function() {
  // Week data: short description + project + link (null or URL)
  const weeksData = [
    { week: 1, title: 'Lanai Cultural and Heritage Center', desc: 'Explore Lanai through the lens of the Hawaiian Culture', project: null, link:'https://lanaichc.org/'  },
   { week: 2, title: 'Lanai Community Association', desc: 'Supports local groups, provides academic scholarships, senior activities, and community events.', project: null, link: 'https://www.lanaipineapplefestival.com/Contact_Us/Contact_Us.htm' },
   { week: 3, title: 'Lanai Community Health Center', desc: 'Come visit our Local Community Health Center', project: null, link: 'https://lanaihealth.org/' },
   { week: 4, title: 'Pulama Lanai Employment', desc: 'Looking for job oppurtunities? Pulama Lanai has many options!!!', project: null, link: 'https://fa-ewcy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1' },
    { week: 5, title: 'Center 5', desc: 'JavaScript fundamentals.', project: null, link: null },
    { week: 6, title: 'Center 6', desc: 'DOM manipulation and events.', project: null, link: null },
    { week: 7, title: 'Center 7', desc: 'Working with APIs and fetch.', project: null, link: null }
  ];

  function renderWeeksGrid() {
    const container = document.getElementById('weeks-container');
    if (!container) return;
    container.innerHTML = '';
    weeksData.forEach(w => {
      const el = document.createElement('div');
      el.className = 'card weeks-card';
      el.setAttribute('data-week', String(w.week));
      if (w.project) el.dataset.project = w.project;
      if (w.link) el.dataset.link = w.link;
      el.innerHTML = `<h3>${w.title}</h3><p>${w.desc}</p>`;
      container.appendChild(el);
    });
  }

  function opencenterModal(center, titleEl, descEl, projectEl, websiteEl, modal) {
    const card = document.querySelector(`.centers-card[data-center="${center}"]`);
    titleEl.textContent = card ? card.querySelector('h3')?.textContent || `center ${center}` : `center ${center}`;
    descEl.textContent = card ? card.querySelector('p')?.textContent || '' : '';

    const project = card?.dataset?.project || null;
    const link = card?.dataset?.link || null;

    if (project) {
      projectEl.innerHTML = `<a href="${project}" target="_blank" rel="noopener">Project Link</a>`;
    } else {
      projectEl.textContent = 'Coming Soon';
    }

    if (link) {
      websiteEl.innerHTML = `<a href="${link}" target="_blank" rel="noopener">Website</a>`;
    } else {
      websiteEl.textContent = 'Coming Soon';
    }

    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
  }

  function initcentersModal() {
    const modal = document.getElementById('center-modal');
    if (!modal) return;

    const titleEl = modal.querySelector('#modal-title');
    const descEl = modal.querySelector('#modal-desc');
    const projectEl = modal.querySelector('#modal-project');
    const websiteEl = modal.querySelector('#modal-link');

    // open modal when any centers-card is clicked
    document.querySelectorAll('.centers-card').forEach(card => {
      card.addEventListener('click', () => {
        const center = card.getAttribute('data-center');
        opencenterModal(center, titleEl, descEl, projectEl, websiteEl, modal);
      });
    });

    // close handlers (backdrop, close button)
    modal.querySelectorAll('[data-dismiss], .modal-backdrop, .modal-close').forEach(el => {
      el.addEventListener('click', () => closeModal(modal));
    });

    // keyboard: Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal(modal);
    });
  }

  // listen for the application-ready event dispatched by script.js
  document.addEventListener('app-ready', () => {
    rendercentersGrid();
    initcentersModal();
  });

  // also try to initialize on DOMContentLoaded (in case script runs standalone)
  document.addEventListener('DOMContentLoaded', () => {
    renderWeeksGrid();
    initWeeksModal();
  });
})();