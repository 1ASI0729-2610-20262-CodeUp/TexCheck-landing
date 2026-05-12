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

// ── Smooth-scroll 
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
const watchVideoBtn   = document.getElementById("watchVideoBtn");
const videoPreviewBtn = document.getElementById("videoPreviewBtn");
const videoModal      = document.getElementById("videoModal");
const closeModalNodes = document.querySelectorAll("[data-close-modal]");
const demoVideo       = document.getElementById("demoVideo");

function openVideoModal() {
  if (!videoModal) return;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";
  if (demoVideo) {
    demoVideo.currentTime = 0;
    demoVideo.play().catch(() => {});
  }
}

function closeVideoModal() {
  if (!videoModal) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";
  if (demoVideo) {
    demoVideo.pause();
    demoVideo.currentTime = 0;
  }
}

watchVideoBtn?.addEventListener("click", openVideoModal);
videoPreviewBtn?.addEventListener("click", openVideoModal);
closeModalNodes.forEach((node) => node.addEventListener("click", closeVideoModal));

// ── Auth modal ────────────────────────────────────────────────────────────────
const authModal      = document.getElementById("authModal");
const authBackdrop   = document.getElementById("authBackdrop");
const closeAuthBtn   = document.getElementById("closeAuthBtn");
const loginPanel     = document.getElementById("loginPanel");
const signupPanel    = document.getElementById("signupPanel");
const goToSignupBtn  = document.getElementById("goToSignupBtn");
const goToLoginBtn   = document.getElementById("goToLoginBtn");

// Buttons that open the auth modal
const openLoginBtns = [
  document.getElementById("openLoginBtn"),
  document.getElementById("openLoginBtnMobile"),
];
