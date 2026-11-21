/**
 * Runtime tema tanpa framework — untuk web non-React (HTML statis, dsb.).
 *
 * Cara pakai:
 *   <script src=".../vanilla/themes.js"></script>
 *   TweakThemes.setVariant("sage");
 *   TweakThemes.toggleMode();
 *
 * Kontrak dengan CSS tema:
 *   - varian  -> atribut data-theme di <html>   (hanya untuk tema non-default)
 *   - mode    -> class .dark di <html>
 * Pilihan disimpan di localStorage (kompatibel dengan ThemeProvider React).
 */
(function () {
  "use strict";

  var THEMES = [
    "cloudflare",
    "brutal",
    "sage",
    "soft",
    "t3-chat",
    "tangerine",
    "darkmatter",
    "discord",
    "js-ts-advent-of-code",
    "spacelinear",
    "qrafthive",
  ];
  var DEFAULT_VARIANT = "cloudflare";
  var VARIANT_KEY = "theme-variant";
  var MODE_KEY = "theme";

  function getVariant() {
    try {
      var v = localStorage.getItem(VARIANT_KEY);
      return THEMES.indexOf(v) !== -1 ? v : DEFAULT_VARIANT;
    } catch (e) {
      return DEFAULT_VARIANT;
    }
  }

  function setVariant(variant) {
    if (THEMES.indexOf(variant) === -1) return;
    try {
      localStorage.setItem(VARIANT_KEY, variant);
    } catch (e) {}
    apply();
    dispatch("variantchange", variant);
  }

  function getMode() {
    try {
      var m = localStorage.getItem(MODE_KEY);
      return m === "dark" || m === "light" ? m : "system";
    } catch (e) {
      return "system";
    }
  }

  function setMode(mode) {
    try {
      if (mode === "system") localStorage.removeItem(MODE_KEY);
      else localStorage.setItem(MODE_KEY, mode);
    } catch (e) {}
    apply();
    dispatch("modechange", mode);
  }

  function toggleMode() {
    setMode(resolved() === "dark" ? "light" : "dark");
  }

  function resolved() {
    var mode = getMode();
    if (mode === "dark") return "dark";
    if (mode === "light") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function apply() {
    var variant = getVariant();
    if (variant === DEFAULT_VARIANT) {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = variant;
    }
    document.documentElement.classList.toggle("dark", resolved() === "dark");
  }

  function dispatch(type, value) {
    try {
      window.dispatchEvent(new CustomEvent("tweaktheme:" + type, { detail: value }));
    } catch (e) {}
  }

  // Ikuti perubahan prefers-color-scheme saat mode = system.
  try {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function () {
        if (getMode() === "system") apply();
      });
  } catch (e) {}

  // Terapkan sekali saat load — sebelum paint jika script ini di <head>.
  apply();

  var api = {
    THEMES: THEMES,
    DEFAULT_VARIANT: DEFAULT_VARIANT,
    getVariant: getVariant,
    setVariant: setVariant,
    getMode: getMode,
    setMode: setMode,
    toggleMode: toggleMode,
    resolved: resolved,
    apply: apply,
  };

  window.TweakThemes = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})();
