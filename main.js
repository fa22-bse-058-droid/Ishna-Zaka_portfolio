// ====== THREE.JS SETUP ======

function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0C1519, 0);
  camera.position.z = 3;

  const geometry = new THREE.IcosahedronGeometry(1.5, 4);
  const material = new THREE.MeshPhongMaterial({
    color: 0xCF9D7B,
    emissive: 0x724B39,
    shininess: 100,
    wireframe: false
  });
  const icosahedron = new THREE.Mesh(geometry, material);
  scene.add(icosahedron);

  const light1 = new THREE.PointLight(0xCF9D7B, 1.5);
  light1.position.set(5, 5, 5);
  scene.add(light1);

  const light2 = new THREE.PointLight(0x724B39, 1);
  light2.position.set(-5, -5, 5);
  scene.add(light2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    icosahedron.rotation.x += 0.005;
    icosahedron.rotation.y += 0.008;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function initFooterCanvas() {
  const canvas = document.getElementById('footer-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight * 0.15), 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight * 0.15);
  renderer.setClearColor(0x0C1519, 0);
  camera.position.z = 5;

  const geometries = [
    new THREE.OctahedronGeometry(0.8, 2),
    new THREE.TetrahedronGeometry(0.8, 1)
  ];

  const shapes = [];
  geometries.forEach((geo, idx) => {
    const material = new THREE.MeshPhongMaterial({
      color: idx === 0 ? 0xCF9D7B : 0x724B39,
      emissive: idx === 0 ? 0x724B39 : 0xCF9D7B,
      shininess: 100
    });
    const mesh = new THREE.Mesh(geo, material);
    mesh.position.x = idx === 0 ? -2 : 2;
    shapes.push(mesh);
    scene.add(mesh);
  });

  const light = new THREE.PointLight(0xCF9D7B, 1);
  light.position.set(5, 5, 5);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
    shapes.forEach((shape, idx) => {
      shape.rotation.x += 0.003;
      shape.rotation.y += 0.005;
    });
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / (window.innerHeight * 0.15);
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight * 0.15);
  });
}

// ====== PARTICLE SYSTEM ======

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    this.init();
    this.setupEventListeners();
  }

  init() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('resize', () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }

  update() {
    this.particles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = this.canvas.width;
      if (p.x > this.canvas.width) p.x = 0;
      if (p.y < 0) p.y = this.canvas.height;
      if (p.y > this.canvas.height) p.y = 0;

      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 150) {
        p.vx += (dx / distance) * 0.3;
        p.vy += (dy / distance) * 0.3;
      }

      p.vx *= 0.99;
      p.vy *= 0.99;
    });
  }

  draw() {
    this.ctx.fillStyle = 'rgba(12, 21, 25, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'rgba(207, 157, 123, 0.6)';
    this.particles.forEach(p => {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.ctx.strokeStyle = 'rgba(207, 157, 123, 0.2)';
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
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

// ====== SCROLL DETECTION ======

class ScrollManager {
  constructor() {
    this.lastScrollY = 0;
    this.isScrollingDown = false;
    this.navbar = document.querySelector('nav');
    this.setupScrollListener();
  }

  setupScrollListener() {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > this.lastScrollY) {
        this.isScrollingDown = true;
        this.navbar.classList.add('hidden');
      } else {
        this.isScrollingDown = false;
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
      '$ npm run build',
      '> Building portfolio...',
      '✓ Compiled successfully',
      '✓ Assets optimized',
      '',
      '$ npm start',
      '> Starting development server...',
      '✓ Server running at localhost:3000',
      '',
      '$ cat about.txt',
      'Full-stack developer | Problem solver | Tech enthusiast'
    ];

    this.typeMessages();
  }

  typeMessages() {
    this.terminalContent.innerHTML = '';
    let lineIndex = 0;

    const typeNextLine = () => {
      if (lineIndex < this.messages.length) {
        const line = this.messages[lineIndex];
        const lineEl = document.createElement('div');
        lineEl.className = 'terminal-line';

        if (line.startsWith('$') || line.startsWith('>')) {
          lineEl.innerHTML = `<span class="terminal-prompt">${line.charAt(0)}</span><span class="terminal-text">${line.slice(2)}</span>`;
        } else if (line.startsWith('✓')) {
          lineEl.innerHTML = `<span class="terminal-text" style="color: #27C93F;">${line}</span>`;
        } else {
          lineEl.innerHTML = `<span class="terminal-text">${line}</span>`;
        }

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
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp 0.6s ease-out forwards';
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    this.observeElements();
  }

  observeElements() {
    document.querySelectorAll('.timeline-item, .skill-card, .project-card, .highlight-item').forEach(el => {
      this.observer.observe(el);
    });
  }
}

// ====== MOBILE MENU ======

class MobileMenu {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navLinks = document.querySelector('.nav-links');

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
    this.navLinks.classList.toggle('active');
  }

  close() {
    this.hamburger.classList.remove('active');
    this.navLinks.classList.remove('active');
  }
}

// ====== SMOOTH SCROLL ======

class SmoothScroll {
  constructor() {
    this.setupSmoothScroll();
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (document.querySelector('.hamburger').classList.contains('active')) {
              document.querySelector('.hamburger').classList.remove('active');
              document.querySelector('.nav-links').classList.remove('active');
            }
          }
        }
      });
    });
  }
}

// ====== SKILL CARD HOVER ======

class SkillCardEffects {
  constructor() {
    this.setupEffects();
  }

  setupEffects() {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.animation = 'pulse 0.6s ease-out';
      });
    });
  }
}

// ====== INITIALIZATION ======

document.addEventListener('DOMContentLoaded', () => {
  initHeroCanvas();
  initFooterCanvas();

  new ScrollManager();
  new MobileMenu();
  new SmoothScroll();
  new SkillCardEffects();
  new AnimationObserver();
  new Terminal();

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('h1, h2, .hero-subtitle, .hero-description').forEach((el, idx) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: idx * 0.15,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.skill-card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.project-card').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 80%'
      },
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  document.querySelectorAll('.timeline-item').forEach((item) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%'
      },
      opacity: 0,
      x: -50,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Parallax effect
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.to(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top center',
        end: 'bottom center',
        scrub: 1
      },
      letterSpacing: 3,
      duration: 1
    });
  });

  // Button hover animation
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, {
        scale: 1.05,
        duration: 0.3,
        ease: 'back.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out'
      });
    });
  });

  // Contact link hover
  document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.1,
        duration: 0.3,
        ease: 'back.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out'
      });
    });
  });
});

// Cleanup
window.addEventListener('beforeunload', () => {
  gsap.killTweensOf('*');
});
