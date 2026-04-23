const body = document.body;
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

const watchVideoBtn = document.getElementById("watchVideoBtn");
const videoPreviewBtn = document.getElementById("videoPreviewBtn");
const videoModal = document.getElementById("videoModal");
const closeModalNodes = document.querySelectorAll("[data-close-modal]");
const demoVideo = document.getElementById("demoVideo");

function closeMobileMenu() {
  body.classList.remove("menu-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "false");
  }
  if (mobileMenu) {
    mobileMenu.setAttribute("aria-hidden", "true");
  }
}

function openMobileMenu() {
  body.classList.add("menu-open");
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", "true");
  }
  if (mobileMenu) {
    mobileMenu.setAttribute("aria-hidden", "false");
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    if (body.classList.contains("menu-open")) {
      closeMobileMenu();
      return;
    }
    openMobileMenu();
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

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

function openVideoModal() {
  if (!videoModal) return;
  videoModal.classList.add("is-open");
  videoModal.setAttribute("aria-hidden", "false");
  body.style.overflow = "hidden";

  if (demoVideo && !demoVideo.getAttribute("src")) {
    const src = demoVideo.getAttribute("data-src");
    if (src) {
      demoVideo.setAttribute("src", src);
    }
  }
}

function closeVideoModal() {
  if (!videoModal) return;
  videoModal.classList.remove("is-open");
  videoModal.setAttribute("aria-hidden", "true");
  body.style.overflow = "";

  if (demoVideo) {
    demoVideo.setAttribute("src", "");
  }
}

if (watchVideoBtn) {
  watchVideoBtn.addEventListener("click", openVideoModal);
}

if (videoPreviewBtn) {
  videoPreviewBtn.addEventListener("click", openVideoModal);
}

closeModalNodes.forEach((node) => {
  node.addEventListener("click", closeVideoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal && videoModal.classList.contains("is-open")) {
    closeVideoModal();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1080) {
    closeMobileMenu();
  }
});
