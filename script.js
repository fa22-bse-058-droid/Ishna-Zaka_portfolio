const navLinks = document.querySelectorAll(".nav-list a");
const sections = [...document.querySelectorAll("main section[id]")];
const year = document.getElementById("year");

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
