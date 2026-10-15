// ================== EDIT YOUR PROJECTS HERE ==================
const projects = [
  {
    title: "Annsetu",
    image: "Annsetu.jpg",
    imageAlt: "Annsetu dashboard showing booked quantity, live queue, payments cleared and active farmers",
    short: "A farmer procurement platform where farmers pre-book a collection slot, follow the live queue and track payment, built for Smart India Hackathon 2026.",
    description: "Annsetu makes the journey from harvest to payment predictable for farmers. Instead of turning up at the mandi and waiting without knowing what will happen, a farmer pre-books a delivery slot, sees how many people are ahead in the queue, and follows the payment until it is settled. Built by a team of 6 for Smart India Hackathon 2026 (final round results awaited).",
    features: [
      "Slot Booking: Farmers pre-book a collection slot so delivery is planned in advance.",
      "Live Queue: Shows how many farmers are waiting at the collection hub in real time.",
      "Payment Tracking: Follows each payment from delivery to settlement.",
      "Dashboard & Farmer Registry: Today's price, quantity booked, active farmers and registrations in one overview."
    ],
    tech: ["Web App", "Hackathon", "Team of 6"]
  },
  {
    title: "Memory Game",
    image: "memory-game.jpg",
    imageAlt: "Memory Game board with 16 cards: all face down, and a second view with two emoji cards flipped",
    short: "A frontend web application featuring state-based logic and user interaction to test memory retention.",
    description: "An interactive mini-project focusing on core programming logic and user interaction, complete with comprehensive academic project documentation and reporting.",
    features: [
      "Interactive Gameplay: Flip cards on a 4×4 board to uncover emoji and test your memory.",
      "Extensive Documentation: Accompanied by a comprehensive academic project report outlining the development lifecycle.",
      "Structured Architecture: Includes a detailed introduction and report outline mapping out the game's mechanics and code structure."
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Tarunverma7215/Memory-Game"
  },
  {
    title: "Mess Food Waste Prediction",
    image: "food-waste.png",
    imageAlt: "Chart of the factors that drive food waste in the mess, with a predicted waste of 1.98 kg for tomorrow",
    short: "A software where we can predict how much food is going to waste in further days and prevent the food wastage.",
    description: "A machine learning project that analyses hostel mess consumption records to forecast how much food will go to waste in the coming days, so that meal planning can be adjusted in advance.",
    features: [
      "Data-Driven Insights: Ingests and cleans historical CSV dataset records of hostel mess consumption.",
      "Feature Engineering: Turns day of the week, main dish, 'exam tomorrow' and a past-waste proxy into model inputs.",
      "Predictive Modeling: Uses machine learning regression to forecast food waste, for example 1.98 kg for tomorrow.",
      "Explainable Results: A feature-importance chart shows which factors drive waste, with weekends and certain main dishes ranking highest."
    ],
    tech: ["Python", "Pandas", "Scikit-learn (ML)", "Regression Algorithms", "Matplotlib"],
    github: "https://github.com/Tarunverma7215/Mess-Food-Waste-Predictor"
  },
  {
    title: "AI Warehouse Route Optimizer",
    image: "route-optimizer.png",
    imageAlt: "Factory floor map where the optimizer finds a 7 step route from the robot to the package",
    short: "An interactive logistics simulation that visualizes the A* heuristic pathfinding algorithm to calculate optimal warehouse navigation routes.",
    description: "Designed to solve complex logistical bottlenecks, this interactive grid-based simulation was built using Python, Jupyter Notebooks, and ipywidgets. The project implements the A* pathfinding algorithm to calculate the absolute shortest and most efficient routes for warehouse navigation. The dynamic visual interface allows users to observe the algorithm's step-by-step decision-making process in real-time, demonstrating practical applications of heuristic search in supply chain optimization.",
    features: [
      "A* Pathfinding: Calculates the shortest and most efficient route across the warehouse grid.",
      "Interactive Grid Simulation: Built with ipywidgets so users can explore the warehouse layout directly in a notebook.",
      "Clear Output: Prints the factory floor map with the planned route highlighted, e.g. a 7-step route to the package."
    ],
    tech: ["Python", "Jupyter Notebook", "ipywidgets", "A* Algorithm"],
    github: "https://github.com/Tarunverma7215/AI-warehouse-route-optimizer"
  }
];
// =============================================================

const grid = document.getElementById('projectGrid');
const modal = document.getElementById('modal');
let lastFocused = null;

/* ---------------- Dark / light mode ---------------- */
const root = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(root.getAttribute('data-theme') || 'light');

themeBtn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// Follow the system setting only if the visitor hasn't chosen manually
if (window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    let saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  });
}

/* ---------------- Profile photo fallback ---------------- */
const pic = document.getElementById('profilePic');
const photoWrap = pic.parentElement;
function showFallback() { photoWrap.classList.add('no-photo'); }
// If profile.jpeg can't be found next to index.html, use the copy embedded in the page
const backupPhoto = pic.dataset.backup;
let triedBackup = false;
function tryBackup() {
  if (backupPhoto && !triedBackup) { triedBackup = true; pic.src = backupPhoto; }
  else showFallback();
}
pic.addEventListener('error', tryBackup);
if (pic.complete && pic.naturalWidth === 0) tryBackup();

/* ---------------- Build the project cards ---------------- */
projects.forEach((p, index) => {
  const card = document.createElement('div');
  card.className = 'card project-card reveal';
  card.style.transitionDelay = (index * 0.12) + 's';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.innerHTML =
    (p.image ? '<div class="thumb"><img src="' + p.image + '" alt="' + p.imageAlt + '" loading="lazy" decoding="async"></div>' : '') +
    '<h3>' + p.title + '</h3>' +
    '<p>' + p.short + '</p>' +
    '<div class="tags">' + p.tech.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>' +
    '<p class="more">View details →</p>';
  card.addEventListener('click', () => openModal(index));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(index); }
  });
  grid.appendChild(card);
});

/* ---------------- Project popup ---------------- */
function openModal(index) {
  const p = projects[index];
  lastFocused = document.activeElement;
  const mImg = document.getElementById('mImg');
  if (p.image) { mImg.src = p.image; mImg.alt = p.imageAlt || p.title; mImg.hidden = false; }
  else { mImg.hidden = true; mImg.removeAttribute('src'); }
  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mDesc').textContent = p.description;
  document.getElementById('mFeatures').innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');
  document.getElementById('mTech').innerHTML = p.tech.map(t => '<span class="tag">' + t + '</span>').join('');

  let links = '';
  if (p.github) links += '<a class="btn" href="' + p.github + '" target="_blank" rel="noopener">View on GitHub</a>';
  document.getElementById('mLinks').innerHTML = links;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('closeBtn').focus();
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

document.getElementById('closeBtn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

/* ---------------- Footer year ---------------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Highlight the nav link of the section in view ---------------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => navObserver.observe(s));

/* ---------------- Scroll reveal animation ---------------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  // small stagger for cards that sit side by side in a grid
  if (el.classList.contains('card') && !el.style.transitionDelay) {
    el.style.transitionDelay = ((i % 3) * 0.12) + 's';
  }
  revealObserver.observe(el);
});

/* ---------------- Typing effect in the hero ---------------- */
const typedEl = document.getElementById('typed');
const phrases = ['web apps.', 'games.', 'machine learning models.', 'clean, useful software.'];
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion) {
  typedEl.textContent = phrases[0];
} else {
  let pi = 0, ci = 0, deleting = false;
  (function tick() {
    const word = phrases[pi];
    ci += deleting ? -1 : 1;
    typedEl.textContent = word.slice(0, ci);
    let delay = deleting ? 45 : 90;
    if (!deleting && ci === word.length) { deleting = true; delay = 1500; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 350; }
    setTimeout(tick, delay);
  })();
}

/* ---------------- Scroll progress bar + back-to-top button ---------------- */
const progress = document.getElementById('progress');
const toTop = document.getElementById('toTop');

function onScroll() {
  const h = document.documentElement;
  const scrollable = h.scrollHeight - h.clientHeight;
  const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
  progress.style.width = pct + '%';
  toTop.classList.toggle('show', h.scrollTop > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ---------------- Section headings underline animation ---------------- */
document.querySelectorAll('h2.reveal').forEach((h) => {
  const o = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { h.classList.add('visible'); o.disconnect(); } });
  }, { threshold: 0.5 });
  o.observe(h);
});

/* ---------------- Skill bars: fill + count-up when scrolled into view ---------------- */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const level = Number(el.dataset.level) || 0;
    const pct = el.querySelector('.pct');
    el.classList.add('filled');
    if (reduceMotion) {
      pct.textContent = level + '%';
    } else {
      let n = 0;
      const step = () => {
        n = Math.min(level, n + Math.max(1, Math.ceil(level / 45)));
        pct.textContent = n + '%';
        if (n < level) requestAnimationFrame(step);
      };
      step();
    }
    skillObserver.unobserve(el);
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill').forEach((el) => skillObserver.observe(el));

/* ---------------- Copy-email button ---------------- */
const copyBtn = document.getElementById('copyEmail');
const copyStatus = document.getElementById('copyStatus');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const email = copyBtn.dataset.email;
    let ok = false;
    try { await navigator.clipboard.writeText(email); ok = true; }
    catch (e) {
      // fallback for older browsers / non-secure pages
      const t = document.createElement('textarea');
      t.value = email; t.style.position = 'fixed'; t.style.opacity = '0';
      document.body.appendChild(t); t.select();
      try { ok = document.execCommand('copy'); } catch (err) {}
      t.remove();
    }
    copyBtn.textContent = ok ? 'Copied ✓' : 'Copy failed';
    copyStatus.textContent = ok ? 'Email address copied' : 'Could not copy the email address';
    setTimeout(() => { copyBtn.textContent = 'Copy email'; }, 2000);
  });
}

/* ---------------- Certificate viewer ---------------- */
const lightbox = document.getElementById('lightbox');
let lightboxFocus = null;
function openLightbox() {
  lightboxFocus = document.activeElement;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  document.getElementById('lightboxClose').focus();
}
function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lightboxFocus) lightboxFocus.focus();
}
['certOpen', 'certOpen2'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', openLightbox);
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });