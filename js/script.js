// ============ THEME TOGGLE (DARK / LIGHT) ============
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme) {
  if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
  } else {
    root.removeAttribute('data-theme');
  }
}

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme || 'dark');

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const next = isLight ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem('portfolio-theme', next);
});

// ============ NAVBAR SCROLL STATE ============
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');
const progressBar = document.getElementById('progressBar');

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============ MOBILE MENU ============
const hamburger = document.getElementById('hamburger');
const navLinksWrap = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  document.body.classList.toggle('mobile-open');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('[data-nav]').forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('mobile-open');
    hamburger.classList.remove('active');
  });
});

// ============ SCROLL-DRIVEN UI (single rAF-throttled handler) ============
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('[data-nav]');
let scrollTicking = false;

function updateOnScroll() {
  const scrolled = window.scrollY;

  navbar.classList.toggle('scrolled', scrolled > 40);
  backToTop.classList.toggle('visible', scrolled > 500);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = docHeight > 0 ? `${(scrolled / docHeight) * 100}%` : '0%';

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (scrolled >= top) current = section.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });

  scrollTicking = false;
}

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateOnScroll);
    scrollTicking = true;
  }
}, { passive: true });

updateOnScroll();

// ============ CURSOR GLOW ============
const cursorGlow = document.getElementById('cursorGlow');
let cursorTarget = null;
window.addEventListener('mousemove', e => {
  cursorTarget = e;
}, { passive: true });
(function trackCursor() {
  if (cursorTarget) {
    cursorGlow.style.transform = `translate(${cursorTarget.clientX}px, ${cursorTarget.clientY}px) translate(-50%, -50%)`;
  }
  requestAnimationFrame(trackCursor);
})();

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ============ PROJECTS DATA + RENDER ============
const projects = [
  {
    title: 'CartFlow',
    desc: 'Full-stack AI-powered e-commerce platform with authentication, product management, orders, and payments. AI-based product search and recommendations via the Gemini API, JWT auth, Stripe payments, and Cloudinary image handling.',
    tag: 'React · Node.js · Express · PostgreSQL',
    cat: 'fullstack',
    img: 'assets/projects/cartflow.jpg',
    link: '#',
  },
  {
    title: 'Auto-Evaluazer',
    desc: 'AI-powered grading system using sentiment analysis, word embeddings, and context matching to compare student responses against model answers — achieving up to 85% grading accuracy and cutting manual grading time by 50+ hours per semester.',
    tag: 'Python · Flask · Machine Learning',
    cat: 'ml',
    img: 'assets/projects/auto-evaluazer.jpg',
    link: 'https://github.com/Ritika3004/Auto_Evaluazer',
  },
  {
    title: 'Portfolio Website',
    desc: 'An earlier personal portfolio showcasing my projects, education, and skills — including a restaurant ordering platform and an earthquake damage prediction app.',
    tag: 'HTML · CSS · JavaScript',
    cat: 'web',
    img: 'assets/projects/portfolio-v1.jpg',
    link: 'https://ritika-bera.vercel.app/',
  },
  {
    title: 'Keeper',
    desc: 'A clean, distraction-free notes app for quickly capturing, editing, and organizing notes — backed by the Internet Computer (ICP) blockchain for decentralized data persistence.',
    tag: 'React · JavaScript · Internet Computer (ICP)',
    cat: 'fullstack',
    img: 'assets/projects/notes-app.jpg',
    link: '#',
  },
  {
    title: 'Snaplynk',
    desc: 'Full-stack URL shortening platform built with Next.js 15 App Router, converting long URLs into short shareable links stored in MongoDB. Optimized API routes for fast redirect resolution with minimal latency, and a clean, responsive Tailwind CSS UI for instant link creation and redirect handling.',
    tag: 'Next.js · MongoDB · Tailwind CSS',
    cat: 'fullstack',
    img: 'assets/projects/snaplynk.jpg',
    link: '#',
  },
  {
    title: 'Word-Search Solver',
    desc: 'Automated solver for word search puzzles using a Trie data structure, removing the need for manual solving and improving word detection speed and accuracy by up to 80% across puzzles of varying difficulty. (June 2024)',
    tag: 'Python · Data Structures & Algorithms',
    cat: 'dsa',
    img: 'assets/projects/word-search.jpg',
    link: 'https://github.com/Ritika3004/WORD-SEARCH',
  },
  {
    title: 'EcoSort',
    desc: 'An IoT & AI-powered smart dustbin system that automates waste segregation into Solid, Semi-Solid, Liquid, and Metal categories using an IR/proximity/rain/ultrasonic sensor array, with servo-driven diverters and a live IoT dashboard for monitoring bin levels and capacity alerts.',
    tag: 'Arduino · IoT Sensors · Web Dashboard',
    cat: 'fullstack',
    img: 'assets/projects/ecosort.jpg',
    link: '#',
  },
  {
    title: 'Earthquake Damage in Nepal',
    desc: 'Predicts earthquake damage to buildings using data from a pre-stored SQLite database of buildings in Nepal, with logistic regression and decision tree models trained on that data.',
    tag: 'Python · SQL · SQLite · Machine Learning',
    cat: 'ml',
    img: 'assets/projects/earthquake-nepal.jpg',
    link: 'https://www.credly.com/badges/148f564d-21a0-48b3-8d4b-b8e6e917d0ea',
  },
  {
    title: 'Customer Segmentation',
    desc: "Categorizes a company's customers into distinct groups based on characteristics and behaviors to enable targeted, personalized marketing strategies, using a K-means clustering model — applied to WorldQuant University's Applied Data Science Lab customer data.",
    tag: 'Python · Machine Learning · K-Means',
    cat: 'ml',
    img: 'assets/projects/customer-segmentation.jpg',
    link: 'https://www.credly.com/badges/148f564d-21a0-48b3-8d4b-b8e6e917d0ea',
  },
  {
    title: 'Air Quality Prediction',
    desc: 'Predicts particulate matter levels in air using pre-stored data from a MongoDB database, building an autoregression model and tuning hyperparameters based on that data.',
    tag: 'Python · MongoDB · Machine Learning',
    cat: 'ml',
    img: 'assets/projects/air-quality.jpg',
    link: 'https://www.credly.com/badges/148f564d-21a0-48b3-8d4b-b8e6e917d0ea',
  },
];

const grid = document.getElementById('projectsGrid');

grid.innerHTML = projects.map(p => `
  <a class="project-card" data-cat="${p.cat}" href="${p.link}" target="_blank" rel="noopener">
    <div class="project-thumb">
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <div class="project-overlay"><span class="project-view"><i class="fa-solid fa-arrow-up-right-from-square"></i></span></div>
    </div>
    <div class="project-body">
      <span class="project-tag">${p.tag}</span>
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
    </div>
  </a>
`).join('');

// re-observe newly injected cards for tilt effect
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 10;
    const rotateY = (x / rect.width) * 10;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ============ PROJECT FILTERS ============
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.project-card').forEach(card => {
      const match = filter === 'all' || card.getAttribute('data-cat') === filter;
      card.classList.toggle('hide', !match);
    });
  });
});

// ============ MINI PROJECTS DATA + RENDER ============
const miniProjects = [
  { title: 'Todo App', tag: 'HTML · CSS · JavaScript', icon: 'fa-solid fa-list-check', link: '#' },
  { title: 'Weather App', tag: 'JavaScript · Weather API', icon: 'fa-solid fa-cloud-sun-rain', link: '#' },
  { title: 'Simon Game', tag: 'HTML · CSS · JavaScript', icon: 'fa-solid fa-circle-half-stroke', link: 'https://ritika3004.github.io/Simon_Game/' },
  { title: 'Drum Kit', tag: 'HTML · CSS · JavaScript', icon: 'fa-solid fa-drum', link: '#' },
  { title: 'Dice Game', tag: 'HTML · CSS · JavaScript', icon: 'fa-solid fa-dice', link: '#' },
  { title: 'QR Code Generator', tag: 'Node.js', icon: 'fa-solid fa-qrcode', link: '#' },
  { title: 'Secrets Project', tag: 'Express · Passport · Auth', icon: 'fa-solid fa-user-secret', link: '#' },
  { title: 'Band Generator', tag: 'Node.js · EJS', icon: 'fa-solid fa-guitar', link: '#' },
  { title: 'Blog Web App', tag: 'Node.js · Express · EJS', icon: 'fa-solid fa-blog', link: '#' },
];

const miniGrid = document.getElementById('miniProjectsGrid');
if (miniGrid) {
  miniGrid.innerHTML = miniProjects.map(p => `
    <a class="mini-project-card" href="${p.link}" target="_blank" rel="noopener">
      <div class="mini-project-icon"><i class="${p.icon}"></i></div>
      <h4>${p.title}</h4>
      <span>${p.tag}</span>
    </a>
  `).join('');
}

// ============ CONTACT FORM (DEMO - NO BACKEND) ============
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  formNote.textContent = "This is a demo form — connect it to your backend or a service like Formspree to receive messages.";
  contactForm.reset();
});
