// ================== EDIT YOUR PROJECTS HERE ==================
const projects = [
  {
    title: "Memory Game",
    short: "A frontend web application featuring state-based logic and user interaction to test memory retention.",
    description: "An interactive mini-project focusing on core programming logic and user interaction, complete with comprehensive academic project documentation and reporting.",
    features: [
      "Interactive Gameplay: Core logic designed to test and challenge user memory retention.",
      "Extensive Documentation: Accompanied by a comprehensive academic project report outlining the development lifecycle.",
      "Structured Architecture: Includes a detailed introduction and report outline mapping out the game's mechanics and code structure."
    ],
    tech: ["Core Software Logic", "Technical Documentation formatting."],
    github: "https://github.com/Tarunverma7215/Memory-Game",
    demo: "https://tarunverma7215.github.io/Memory-Game"
  },
  {
    title: "Mess Food Waste Prediction",
    short: "A software where we can predict how much food is going to waste in further days and prevent the food wastage ",
    description: "A web app where you type a city name and instantly see its current temperature, humidity, and weather conditions.",
    features: [
      "Data-Driven Insights: Ingests and cleans historical CSV dataset records of hostel mess consumption.",
      "Predictive Modeling: Uses machine learning regression techniques to forecast future food waste volumes.",
      "Resource Optimization: Provides actionable trends to help reduce excess food generation and manage daily meal planning efficiently."
    ],
    tech: ["Python", "Pandas", "Scikit-learn (ML)", "Regression Algorithms."],
    github: "https://github.com/Tarunverma7215/Mess-Food-Waste-Predictor",
    demo: "https://tarunverma7215.github.io/Mess-Food-Waste-Predictor"
  },
  {
    title: "AI Warehouse Route Optimizer",
    short: "An interactive logistics simulation that visualizes the A* heuristic pathfinding algorithm to calculate optimal warehouse navigation routes.",
    description: "Designed to solve complex logistical bottlenecks, this interactive grid-based simulation was built using Python, Jupyter Notebooks, and ipywidgets. The project implements the A* pathfinding algorithm to calculate the absolute shortest and most efficient routes for warehouse navigation. The dynamic visual interface allows users to observe the algorithm's step-by-step decision-making process in real-time, demonstrating practical applications of heuristic search in supply chain optimization.",
    features: [
      "Data-Driven Insights: Ingests and cleans historical CSV dataset records of hostel mess consumption.",
      "Predictive Modeling: Uses machine learning regression techniques to forecast future food waste volumes.",
      "Resource Optimization: Provides actionable trends to help reduce excess food generation and manage daily meal planning efficiently."
    ],
    tech: ["Python", "Pandas", "Scikit-learn (ML)", "Regression Algorithms."],
    github: "https://github.com/Tarunverma7215/AI-warehouse-route-optimizer",
    demo: "https://tarunverma7215.github.io/AI-warehouse-route-optimizer"
  }
];
// =============================================================

const grid = document.getElementById('projectGrid');
const modal = document.getElementById('modal');
let lastFocused = null;

// Build the project cards
projects.forEach((p, index) => {
  const card = document.createElement('div');
  card.className = 'card project-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.innerHTML =
    '<h3>' + p.title + '</h3>' +
    '<p>' + p.short + '</p>' +
    '<div class="tags">' + p.tech.map(t => '<span class="tag">' + t + '</span>').join('') + '</div>' +
    '<p class="more">View details</p>';
  card.addEventListener('click', () => openModal(index));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(index); }
  });
  grid.appendChild(card);
});

// Open the popup with the selected project's details
function openModal(index) {
  const p = projects[index];
  lastFocused = document.activeElement;
  document.getElementById('mTitle').textContent = p.title;
  document.getElementById('mDesc').textContent = p.description;
  document.getElementById('mFeatures').innerHTML = p.features.map(f => '<li>' + f + '</li>').join('');
  document.getElementById('mTech').innerHTML = p.tech.map(t => '<span class="tag">' + t + '</span>').join('');

  let links = '';
  if (p.github) links += '<a class="btn" href="' + p.github + '" target="_blank" rel="noopener">View on GitHub</a>';
  if (p.demo) links += '<a class="btn alt" href="' + p.demo + '" target="_blank" rel="noopener">Live demo</a>';
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

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Highlight the nav link of the section in view
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => observer.observe(s));