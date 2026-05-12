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
