import { initI18n, setLocale } from "../i18n/i18n.js";

await initI18n();

document.querySelectorAll("[data-locale-btn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLocale(btn.getAttribute("data-locale-btn"));
  });
});

// ── Mobile menu ---
const body        = document.body;
const menuToggle  = document.getElementById("menuToggle");
const mobileMenu  = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function closeMobileMenu() {
  body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  mobileMenu?.setAttribute("aria-hidden", "true");
}

function openMobileMenu() {
  body.classList.add("menu-open");
  menuToggle?.setAttribute("aria-expanded", "true");
  mobileMenu?.setAttribute("aria-hidden", "false");
}

menuToggle?.addEventListener("click", () => {
  body.classList.contains("menu-open") ? closeMobileMenu() : openMobileMenu();
});

mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));
