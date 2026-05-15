// ====== HERO PARTICLES ======

function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const particleSystem = new ParticleSystem(canvas);
  particleSystem.animate();
}

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };

    this.resizeCanvas();
    this.init();
    this.setupEventListeners();
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.gradient = this.createGradient();
  }

  createGradient() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    gradient.addColorStop(0, 'rgba(124, 92, 250, 0.6)');
    gradient.addColorStop(1, 'rgba(45, 212, 191, 0.6)');
    return gradient;
  }

  init() {
    this.particles = [];
    for (let i = 0; i < 60; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.init();
    });
  }

  update() {
    this.particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 140) {
        p.vx += (dx / distance) * 0.2;
        p.vy += (dy / distance) * 0.2;
      }

      p.vx *= 0.98;
      p.vy *= 0.98;
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = this.gradient;
    this.particles.forEach((p) => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.strokeStyle = 'rgba(124, 92, 250, 0.2)';
    this.ctx.lineWidth = 0.6;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.animate());
  }
}

// ====== NAVBAR SCROLL ======

class ScrollManager {
  constructor() {
    this.lastScrollY = 0;
    this.navbar = document.querySelector('.navbar');
    this.setupScrollListener();
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (!this.navbar) return;

      if (currentScrollY > this.lastScrollY) {
        this.navbar.classList.add('hidden');
      } else {
        this.navbar.classList.remove('hidden');
      }

      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      this.lastScrollY = currentScrollY;
    });
  }
}

// ====== TERMINAL TYPEWRITER ======

class Terminal {
  constructor() {
    this.terminalContent = document.querySelector('.terminal-content');
    if (!this.terminalContent) return;

    this.messages = [
      { prompt: '>', text: 'Open for Job', status: '✓' },
      { prompt: '>', text: 'Building: AI Career Platform', status: '✓' },
      { prompt: '>', text: 'Location: Pakistan', status: '✓' }
    ];

    this.typeMessages();
  }

  typeMessages() {
    this.terminalContent.innerHTML = '';
    let lineIndex = 0;

    const typeNextLine = () => {
      if (lineIndex < this.messages.length) {
        const message = this.messages[lineIndex];
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal-line';
        lineEl.innerHTML = `
          <span class="terminal-prompt">${message.prompt}</span>
          <span class="terminal-text">${message.text}</span>
          <span class="check">${message.status}</span>
        `;

        this.terminalContent.appendChild(lineEl);
        lineIndex++;

        setTimeout(typeNextLine, 400);
      } else {
        const cursor = document.createElement('span');
        cursor.className = 'terminal-cursor';
        this.terminalContent.lastChild.appendChild(cursor);
      }
    };

    typeNextLine();
  }
}

// ====== INTERSECTION OBSERVER ======

class AnimationObserver {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observeElements();
  }

  observeElements() {
    const targets = document.querySelectorAll(
      '.skill-card, .timeline-card, .project-card, .about-card, .terminal-card, .code-card, .fyp-feature-card, .fyp-left, .fyp-right, .contact, .footer-grid'
    );

    targets.forEach((el) => {
      el.classList.add('reveal');
      this.observer.observe(el);
    });
  }
}

// ====== MOBILE MENU ======

class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggle());
      document.addEventListener('click', (e) => {
        if (!e.target.closest('nav')) {
          this.close();
        }
      });
    }
  }

  toggle() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
  }

  close() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
  }
}

// ====== SMOOTH SCROLL ======

class SmoothScroll {
  constructor() {
    this.setupSmoothScroll();
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger && hamburger.classList.contains('active')) {
              hamburger.classList.remove('active');
              navMenu.classList.remove('active');
            }
          }
        }
      });
    });
  }
}

// ====== SKILL MAP ======

function initSkillMap() {
  const map = document.getElementById('skillMap');
  if (!map) return;

  const positionOrbs = () => {
    const orbs = Array.from(map.querySelectorAll('.skill-orb'));
    const radius = map.offsetWidth / 2 - 48;
    const count = orbs.length;

    orbs.forEach((orb, index) => {
      const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      orb.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      orb.style.animationDelay = `${index * 0.2}s`;
    });
  };

  positionOrbs();
  window.addEventListener('resize', positionOrbs);
}

// ====== CUSTOM CURSOR ======

function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;

  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    cursor.style.display = 'none';
    return;
  }

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

  document.querySelectorAll('a, button, .btn').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });
}

// ====== INITIALIZATION ======

document.addEventListener('DOMContentLoaded', () => {
  initHeroParticles();
  new ScrollManager();
  new MobileMenu();
  new SmoothScroll();
  new AnimationObserver();
  new Terminal();
  initSkillMap();
  initCustomCursor();
});
