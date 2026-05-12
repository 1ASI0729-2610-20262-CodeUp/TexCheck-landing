const SUPPORTED = ["es", "en"];
const STORAGE_KEY = "texcheck_locale";

let _locale = "es";
let _strings = {};

// ── Load translations from JSON file ─
async function loadStrings(locale) {
  const base = new URL(".", import.meta.url).href;
  const res = await fetch(`${base}${locale}.json`);
  if (!res.ok) throw new Error(`Could not load ${locale}.json`);
  return res.json();
}

export function t(key) {
  const parts = key.split(".");
  let value = _strings;
  for (const p of parts) {
    if (value == null) return key;
    value = value[p];
  }
  return value ?? key;
}

function applyDOM() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const attr = el.getAttribute("data-i18n-attr"); // optional: "placeholder", "aria-label" …
    const text = t(key);
    if (attr) {
      el.setAttribute(attr, text);
    } else {
      el.textContent = text;
    }
  });

  // Update <html lang>
  document.documentElement.lang = _locale;

  document.querySelectorAll("[data-locale-btn]").forEach((btn) => {
    const active = btn.getAttribute("data-locale-btn") === _locale;
    btn.classList.toggle("active-locale", active);
    btn.setAttribute("aria-pressed", active);
  });
}

// ── Public: set a new locale and re-render ─
export async function setLocale(locale) {
  if (!SUPPORTED.includes(locale)) return;
  _locale = locale;
  _strings = await loadStrings(locale);
  localStorage.setItem(STORAGE_KEY, locale);
  applyDOM();
}

// ── Public: get current locale ───
export function getLocale() {
  return _locale;
}

// ── Bootstrap ──
export async function initI18n() {
  const stored = localStorage.getItem(STORAGE_KEY);
  const browser = navigator.language?.slice(0, 2);
  const initial = SUPPORTED.includes(stored)
    ? stored
    : SUPPORTED.includes(browser)
    ? browser
    : "es";

  _locale = initial;
  _strings = await loadStrings(initial);
  applyDOM();
}
