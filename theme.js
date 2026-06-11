/**
 * theme.js — Theme Management
 * Dark/Light theme toggle with localStorage persistence
 */

const Theme = (() => {
  const THEME_KEY = 'n5vocab_theme';
  const DARK_THEME = 'dark';
  const LIGHT_THEME = 'light';
  
  // ─── Helpers ───────────────────────────────────────────────
  
  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return DARK_THEME;
    }
    return LIGHT_THEME;
  }
  
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Theme: Error saving theme:', e);
    }
  }
  
  function loadTheme() {
    try {
      return localStorage.getItem(THEME_KEY) || getSystemTheme();
    } catch (e) {
      console.warn('Theme: Error loading theme:', e);
      return getSystemTheme();
    }
  }
  
  // ─── Theme Application ─────────────────────────────────────
  
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === DARK_THEME ? '#1a1a2e' : '#f5f5f7');
    }
    
    // Update all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.setAttribute('aria-current', link.classList.contains('active') ? 'page' : null);
    });
    
    // Announce theme change for screen readers
    if (typeof Utils !== 'undefined') {
      Utils.announce(`Switched to ${theme} theme`);
    }
  }
  
  // ─── Public API ────────────────────────────────────────────
  
  function init() {
    const savedTheme = loadTheme();
    applyTheme(savedTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
      });
    }
  }
  
  function toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    applyTheme(newTheme);
    saveTheme(newTheme);
    return newTheme;
  }
  
  function setTheme(theme) {
    applyTheme(theme);
    saveTheme(theme);
  }
  
  function getTheme() {
    return document.documentElement.getAttribute('data-theme') || loadTheme();
  }
  
  function isDark() {
    return getTheme() === DARK_THEME;
  }
  
  return {
    init,
    toggle,
    setTheme,
    getTheme,
    isDark,
  };
})();
