// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeHeroCanvas();
    initializeTerminalTyping();
    initializeMobileMenu();
});

// ============================================
// HERO CANVAS - FLOATING BLOB
// ============================================

function initializeHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle system
    const particles = [];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = `rgba(207, 157, 123, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Initialize particles
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// MAIN ANIMATIONS
// ============================================

function initializeAnimations() {
    // Hero text stagger animation
    gsap.from('.hero-left h1', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.2,
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.4,
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        opacity: 0,
        y: 30,
        delay: 0.6,
    });
    
    gsap.from('.terminal-card', {
        duration: 1,
        opacity: 0,
        scale: 0.9,
        delay: 0.8,
    });
    
    // About section animation
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.8,
        opacity: 0,
        x: -50,
    });
    
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.8,
        opacity: 0,
        x: 50,
    });
    
    // Skills section - stagger animation
    const skillCards = document.querySelectorAll('.skill-card');
    gsap.from(skillCards, {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.5,
        opacity: 0,
        y: 30,
        stagger: 0.1,
    });
    
    // Skill card hover glow
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 0 30px rgba(207, 157, 123, 0.5)',
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 0 0px rgba(207, 157, 123, 0)',
            });
        });
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    gsap.from(timelineItems, {
        scrollTrigger: {
            trigger: '.journey',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.7,
        opacity: 0,
        x: (index) => index % 2 === 0 ? -50 : 50,
        stagger: 0.2,
    });
    
    // Timeline dot pulse on scroll
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach((dot, index) => {
        gsap.from(dot, {
            scrollTrigger: {
                trigger: dot,
                start: 'center center',
                toggleActions: 'play none none none',
            },
            duration: 0.6,
            opacity: 0,
            scale: 0,
        });
    });
    
    // Projects section animations
    const projectCards = document.querySelectorAll('.project-card');
    gsap.from(projectCards, {
        scrollTrigger: {
            trigger: '.projects',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.6,
        opacity: 0,
        y: 30,
        stagger: 0.15,
    });
    
    // Project card hover effects
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -10,
                boxShadow: '0 20px 40px rgba(207, 157, 123, 0.3)',
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 0px 0px rgba(207, 157, 123, 0)',
            });
        });
    });
    
    // FYP section animations
    gsap.from('.fyp-left', {
        scrollTrigger: {
            trigger: '.fyp-spotlight',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.8,
        opacity: 0,
        x: -50,
    });
    
    gsap.from('.fyp-right', {
        scrollTrigger: {
            trigger: '.fyp-spotlight',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.8,
        opacity: 0,
        x: 50,
    });
    
    // Contact section animations
    gsap.from('.contact-content', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        duration: 0.8,
        opacity: 0,
        y: 30,
    });
    
    // Navbar hide on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            if (currentScroll > lastScrollTop) {
                // Scrolling down
                navbar.classList.add('hidden');
                navbar.classList.remove('visible');
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
                navbar.classList.add('visible');
            }
        }
        
        lastScrollTop = currentScroll;
    });
    
    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const mobileMenu = document.querySelector('.navbar-menu');
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        });
    });
}

// ============================================
// TERMINAL TYPING EFFECT
// ============================================

function initializeTerminalTyping() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    const lines = [
        '> whoami',
        'ishna · Software Engineer · COMSATS Sahiwal',
        '',
        '> cat skills.json',
        '{',
        '  "backend": ["Python", "Django", "FastAPI"],',
        '  "frontend": ["React", "JavaScript", "HTML/CSS"],',
        '  "ai_ml": ["spaCy", "Transformers", "NLP"],',
        '  "cloud": ["AWS", "Docker"]',
        '}',
        '',
        '> git log --oneline -4',
        'a1f3c9 feat: CV analyzer with ATS scoring 0-100',
        'b2e7d1 feat: job scraper for 7 platforms',
        'c3a8f2 feat: AI chatbot with career mentorship',
        'd4b9e3 feat: gamified community forum',
    ];
    
    // Wait for section to be in view before starting typing
    ScrollTrigger.create({
        trigger: '.code-showcase',
        start: 'top 80%',
        onEnter: () => {
            typeLines(lines, terminalOutput);
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === '.code-showcase') {
                    trigger.kill();
                }
            });
        },
    });
}

function typeLines(lines, container) {
    let lineIndex = 0;
    let charIndex = 0;
    
    function typeLine() {
        if (lineIndex >= lines.length) return;
        
        const line = lines[lineIndex];
        
        if (charIndex < line.length) {
            const span = document.createElement('span');
            span.textContent = line[charIndex];
            
            // Color keywords
            if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']') || line.includes(',') || line.includes(':')) {
                if (line[charIndex] === '{' || line[charIndex] === '}' || line[charIndex] === '[' || line[charIndex] === ']') {
                    span.style.color = '#CF9D7B';
                }
            }
            
            container.appendChild(span);
            charIndex++;
            
            setTimeout(typeLine, 30);
        } else {
            // Finished typing this line
            const lineDiv = document.createElement('div');
            lineDiv.innerHTML = container.innerHTML;
            container.innerHTML = '';
            container.appendChild(lineDiv);
            container.innerHTML += '\n';
            
            lineIndex++;
            charIndex = 0;
            
            setTimeout(typeLine, 100);
        }
    }
    
    typeLine();
}

// Improved terminal typing (simpler version)
function typeTerminal() {
    const terminalOutput = document.getElementById('terminal-output');
    if (!terminalOutput) return;
    
    const content = `<span class="prompt">&gt;</span> whoami
ishna · Software Engineer · COMSATS Sahiwal

<span class="prompt">&gt;</span> cat skills.json
{
  <span class="json-key">"backend"</span>: [<span class="json-string">"Python"</span>, <span class="json-string">"Django"</span>, <span class="json-string">"FastAPI"</span>],
  <span class="json-key">"frontend"</span>: [<span class="json-string">"React"</span>, <span class="json-string">"JavaScript"</span>, <span class="json-string">"HTML/CSS"</span>],
  <span class="json-key">"ai_ml"</span>: [<span class="json-string">"spaCy"</span>, <span class="json-string">"Transformers"</span>, <span class="json-string">"NLP"</span>],
  <span class="json-key">"cloud"</span>: [<span class="json-string">"AWS"</span>, <span class="json-string">"Docker"</span>]
}

<span class="prompt">&gt;</span> git log --oneline -4
a1f3c9 feat: CV analyzer with ATS scoring 0-100
b2e7d1 feat: job scraper for 7 platforms
c3a8f2 feat: AI chatbot with career mentorship
d4b9e3 feat: gamified community forum`;
    
    terminalOutput.innerHTML = content;
}

// Call typeTerminal on scroll
ScrollTrigger.create({
    trigger: '.code-showcase',
    start: 'top 75%',
    onEnter: () => {
        typeTerminal();
    },
    once: true,
});

// ============================================
// MOBILE MENU
// ============================================

function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (!hamburger) return;
    
    hamburger.addEventListener('click', function() {
        navbarMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        
        const element = document.querySelector(href);
        if (element) {
            // Use simple smooth scroll if ScrollToPlugin is not available
            if (typeof gsap !== 'undefined' && gsap.to && ScrollToPlugin) {
                gsap.to(window, {
                    duration: 0.8,
                    scrollTo: {
                        y: element.offsetTop - 80,
                        autoKill: false,
                    },
                    ease: 'power3.inOut',
                });
            } else {
                // Fallback to native smooth scroll
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============================================
// BUTTON ANIMATIONS
// ============================================

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (this.classList.contains('btn-primary')) {
            gsap.to(this, {
                duration: 0.3,
                boxShadow: '0 0 50px rgba(207, 157, 123, 0.5)',
                scale: 1.05,
            });
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        gsap.to(this, {
            duration: 0.3,
            boxShadow: '0 0 30px rgba(207, 157, 123, 0.3)',
            scale: 1,
        });
    });
});

// ============================================
// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe scroll-triggered elements
document.querySelectorAll('.scroll-trigger, .fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// WINDOW LOAD ANIMATIONS
// ============================================

window.addEventListener('load', () => {
    // Add subtle fade-in to page
    document.body.style.opacity = '1';
    // Refresh ScrollTrigger on load
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// Make sure body starts with proper opacity
document.body.style.opacity = '1';
