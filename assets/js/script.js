import { initI18n, setLocale } from "../i18n/i18n.js";

await initI18n();

document.querySelectorAll("[data-locale-btn]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setLocale(btn.getAttribute("data-locale-btn"));
  });
});
