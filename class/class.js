// Class-specific JS: renders weeks grid and controls the week modal
(function() {
  // Week data: short description + project + zoom (null or URL)
  const weeksData = [
    { week: 1, title: 'Lanai Cultural and Heritage Center', desc: 'Explore Lanai through the lens of the Hawaiian Culture', project: null, zoom:'https://lanaichc.org/'  },
   { week: 2, title: 'Lanai Community Association', desc: 'Supports local groups, provides academic scholarships, senior activities, and community events.', project: null, zoom: 'https://www.lanaipineapplefestival.com/Contact_Us/Contact_Us.htm' },
   { week: 3, title: 'Lanai Community Health Center', desc: 'Come visit our Local Community Health Center', project: null, zoom: 'https://lanaihealth.org/' },
   { week: 4, title: 'Pulama Lanai Employment', desc: 'Looking for job oppurtunities? Pulama Lanai has many options!!!', project: null, zoom: 'https://fa-ewcy-saasfaprod1.fa.ocs.oraclecloud.com/hcmUI/CandidateExperience/en/sites/CX_1' },
    { week: 5, title: 'Week 5', desc: 'JavaScript fundamentals.', project: null, zoom: null },
    { week: 6, title: 'Week 6', desc: 'DOM manipulation and events.', project: null, zoom: null },
    { week: 7, title: 'Week 7', desc: 'Working with APIs and fetch.', project: null, zoom: null },
    { week: 8, title: 'Week 8', desc: 'State management patterns.', project: null, zoom: null },
    { week: 9, title: 'Week 9', desc: 'Intro to React.', project: null, zoom: null },
    { week: 10, title: 'Week 10', desc: 'Node.js and simple servers.', project: null, zoom: null },
    { week: 11, title: 'Week 11', desc: 'Databases basics.', project: null, zoom: null },
    { week: 12, title: 'Week 12', desc: 'Testing and quality.', project: null, zoom: null },
    { week: 13, title: 'Week 13', desc: 'Deployment and CI/CD.', project: null, zoom: null },
    { week: 14, title: 'Week 14', desc: 'Final projects and showcase.', project: null, zoom: null }
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
      if (w.zoom) el.dataset.zoom = w.zoom;
      el.innerHTML = `<h3>${w.title}</h3><p>${w.desc}</p>`;
      container.appendChild(el);
    });
  }

  function openWeekModal(week, titleEl, descEl, projectEl, zoomEl, modal) {
    const card = document.querySelector(`.weeks-card[data-week="${week}"]`);
    titleEl.textContent = card ? card.querySelector('h3')?.textContent || `Week ${week}` : `Week ${week}`;
    descEl.textContent = card ? card.querySelector('p')?.textContent || '' : '';

    const project = card?.dataset?.project || null;
    const zoom = card?.dataset?.zoom || null;

    if (project) {
      projectEl.innerHTML = `<a href="${project}" target="_blank" rel="noopener">Project Link</a>`;
    } else {
      projectEl.textContent = 'Coming Soon';
    }

    if (zoom) {
      zoomEl.innerHTML = `<a href="${zoom}" target="_blank" rel="noopener">Zoom Recording</a>`;
    } else {
      zoomEl.textContent = 'Coming Soon';
    }

    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal(modal) {
    modal.setAttribute('aria-hidden', 'true');
  }

  function initWeeksModal() {
    const modal = document.getElementById('week-modal');
    if (!modal) return;

    const titleEl = modal.querySelector('#modal-title');
    const descEl = modal.querySelector('#modal-desc');
    const projectEl = modal.querySelector('#modal-project');
    const zoomEl = modal.querySelector('#modal-zoom');

    // open modal when any weeks-card is clicked
    document.querySelectorAll('.weeks-card').forEach(card => {
      card.addEventListener('click', () => {
        const week = card.getAttribute('data-week');
        openWeekModal(week, titleEl, descEl, projectEl, zoomEl, modal);
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
    renderWeeksGrid();
    initWeeksModal();
  });

  // also try to initialize on DOMContentLoaded (in case script runs standalone)
  document.addEventListener('DOMContentLoaded', () => {
    renderWeeksGrid();
    initWeeksModal();
  });
})();