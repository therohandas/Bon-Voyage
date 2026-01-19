// src/utils/i18n.js
export function tText(value, lang = "en") {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);

  // If it's an object like {en: "...", hi: "..."}
  if (typeof value === "object") {
    // prefer requested lang
    if (value[lang]) return String(value[lang]);
    // prefer English
    if (value.en) return String(value.en);
    // otherwise return first available value
    const vals = Object.values(value);
    return vals.length ? String(vals[0]) : "";
  }

  return String(value);
}
