const navLinks = document.querySelectorAll(".nav-list a");
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.getElementById("year");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const typewriterText = document.getElementById("typewriter-text");
const inPageLinks = document.querySelectorAll('a[href^="#"]');
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

if (!prefersReducedMotion) {
  const sectionObserver = new IntersectionObserver(
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

  sections.forEach((section) => {
    section.classList.add("fade-in-section");
    sectionObserver.observe(section);
  });
} else {
  sections.forEach((section) => {
    section.classList.add("fade-in-section", "is-visible");
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
