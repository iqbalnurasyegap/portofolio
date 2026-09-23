const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", open);
  menuToggle.innerHTML = open
    ? '<i class="bi bi-x-lg"></i>'
    : '<i class="bi bi-list"></i>';
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
  });
});

document.querySelectorAll(".project-link[data-project]").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    modalTitle.textContent = link.dataset.project;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }
});

// Active navigation based on current section.
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${entry.target.id}`
    ));
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => observer.observe(section));
