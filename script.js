const navLinks = document.querySelectorAll(".nav-list a");
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const typewriterText = document.getElementById("typewriter-text");
const inPageLinks = document.querySelectorAll('a[href^="#"]');
const customCursor = document.querySelector(".custom-cursor");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (year) {
  year.textContent = new Date().getFullYear();
}

const setActiveLink = () => {
  const offset = window.scrollY + 140;
  let currentId = sections[0]?.id;

  sections.forEach((section) => {
    if (offset >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("active", active);
  });
};

setActiveLink();
window.addEventListener("scroll", setActiveLink);

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

inPageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") {
      return;
    }

    const target = document.querySelector(href);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const revealElements = [
  ...document.querySelectorAll(
    ".glass-card:not(.project-card):not(.fyp-feature-card), .section h2, .section-heading-accent, .skill-icon-card, .project-card, .fyp-feature-card"
  ),
];

const cardElements = [
  ...document.querySelectorAll(
    ".glass-card:not(.project-card):not(.fyp-feature-card):not(.hero-status-card)"
  ),
];
const headingElements = [...document.querySelectorAll(".section h2, .section-heading-accent")];
const skillCards = [...document.querySelectorAll(".skill-icon-card")];
const projectCards = [...document.querySelectorAll(".project-card")];
const fypFeatureCard = document.querySelector(".fyp-feature-card");

cardElements.forEach((card, index) => {
  card.classList.add("reveal-item", "reveal-card");
  card.style.transitionDelay = `${index * 0.1}s`;
});

headingElements.forEach((heading) => {
  heading.classList.add("reveal-item", "reveal-heading");
});

skillCards.forEach((card, index) => {
  card.classList.add("reveal-item");
  card.style.transitionDelay = `${index * 0.1}s`;
});

projectCards.forEach((card, index) => {
  card.classList.add("reveal-item", index % 2 === 0 ? "reveal-left" : "reveal-right");
  card.style.transitionDelay = `${index * 0.1}s`;
});

if (fypFeatureCard) {
  fypFeatureCard.classList.add("reveal-item", "reveal-fyp");
}

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
}

const subtitles = [
  "AI-Powered Web App Engineer",
  "FastAPI + React Full-Stack Developer",
  "Building Intelligent, Interactive Products",
];
const TYPING_DELAY = 80;
const DELETING_DELAY = 45;
const PAUSE_DELAY = 1600;
const PHRASE_CHANGE_DELAY = 380;

if (typewriterText) {
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = subtitles[phraseIndex];
    const nextChars = deleting
      ? current.slice(0, charIndex - 1)
      : current.slice(0, charIndex + 1);

    typewriterText.textContent = nextChars;
    charIndex = nextChars.length;

    let delay = deleting ? DELETING_DELAY : TYPING_DELAY;

    if (!deleting && charIndex === current.length) {
      deleting = true;
      delay = PAUSE_DELAY;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % subtitles.length;
      delay = PHRASE_CHANGE_DELAY;
    }

    window.setTimeout(tick, delay);
  };

  tick();
}

if (customCursor && !prefersReducedMotion) {
  window.addEventListener("mousemove", (event) => {
    customCursor.style.left = `${event.clientX}px`;
    customCursor.style.top = `${event.clientY}px`;
  });

  document.addEventListener("mouseleave", () => {
    customCursor.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    customCursor.style.opacity = "1";
  });
}
