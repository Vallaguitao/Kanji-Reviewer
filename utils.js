/**
 * utils.js — Utility Functions
 * Common utilities used throughout the application
 */

const Utils = (() => {
  // ─── Debounce/Throttle ─────────────────────────────────────
  
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // ─── Date/Time Utilities ───────────────────────────────────
  
  function today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  
  function yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  }
  
  function getDaysUntil(timestamp) {
    const now = Date.now();
    const diff = timestamp - now;
    return Math.ceil(diff / 86400000);
  }
  
  // ─── Array Utilities ───────────────────────────────────────
  
  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  function sampleArray(arr, count) {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count);
  }
  
  function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }
  
  // ─── String Utilities ──────────────────────────────────────
  
  function normalizeHiragana(str) {
    return str.replace(/[\u30A0-\u30FF]/g, match => {
      return String.fromCharCode(match.charCodeAt(0) - 0x60);
    });
  }
  
  function normalizeRomaji(str) {
    return str.toLowerCase().trim().replace(/\s+/g, '');
  }
  
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  
  // ─── Number Utilities ──────────────────────────────────────
  
  function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
  }
  
  function roundTo(num, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(num * factor) / factor;
  }
  
  function percentage(part, total) {
    if (total === 0) return 0;
    return roundTo((part / total) * 100, 1);
  }
  
  // ─── Levenshtein Distance ──────────────────────────────────
  
  function levenshtein(a, b) {
    const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
      Array.from({ length: a.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
    );
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        matrix[i][j] = b[i - 1] === a[j - 1]
          ? matrix[i - 1][j - 1]
          : Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1);
      }
    }
    return matrix[b.length][a.length];
  }
  
  function fuzzyMatch(input, target) {
    const a = normalizeRomaji(input);
    const b = normalizeRomaji(target);
    if (a === b) return true;
    const parts = b.split(/[,;/]/);
    for (const part of parts) {
      const trimmed = part.trim();
      if (a === trimmed) return true;
      if (trimmed.startsWith('to ') && a === trimmed.substring(3)) return true;
      if (a.startsWith('to ') && a.substring(3) === trimmed) return true;
      if (trimmed.length > 3 && levenshtein(a, trimmed) <= 1) return true;
    }
    return false;
  }
  
  // ─── Storage Helpers ───────────────────────────────────────
  
  function safeJSONParse(str, fallback = null) {
    try {
      return str !== null ? JSON.parse(str) : fallback;
    } catch (e) {
      console.warn('Utils: Error parsing JSON:', e);
      return fallback;
    }
  }
  
  function safeJSONStringify(value, fallback = '{}') {
    try {
      return JSON.stringify(value);
    } catch (e) {
      console.warn('Utils: Error stringifying JSON:', e);
      return fallback;
    }
  }
  
  // ─── DOM Utilities ─────────────────────────────────────────
  
  function createElement(tag, className, content = '') {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
  }
  
  function findElement(selector) {
    return document.querySelector(selector);
  }
  
  function findAll(selector) {
    return document.querySelectorAll(selector);
  }
  
  function addClass(el, className) {
    if (el) el.classList.add(className);
  }
  
  function removeClass(el, className) {
    if (el) el.classList.remove(className);
  }
  
  function toggleClass(el, className, force) {
    if (el) el.classList.toggle(className, force);
  }
  
  // ─── Event Utilities ───────────────────────────────────────
  
  function bindClick(selector, handler) {
    document.addEventListener('click', (e) => {
      if (e.target.matches(selector)) handler(e);
    });
  }
  
  function bindKeydown(handler) {
    document.addEventListener('keydown', handler);
  }
  
  // ─── Animation Utilities ───────────────────────────────────
  
  function triggerReflow(el) {
    void el.offsetWidth;
  }
  
  function waitForTransition(el, duration = 300) {
    return new Promise(resolve => {
      setTimeout(resolve, duration);
    });
  }
  
  // ─── Accessibility ─────────────────────────────────────────
  
  function announce(message, priority = 'polite') {
    let announcer = document.getElementById('aria-live-announcer');
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'aria-live-announcer';
      announcer.setAttribute('role', 'status');
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      announcer.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
      document.body.appendChild(announcer);
    }
    announcer.textContent = message;
    setTimeout(() => { announcer.textContent = ''; }, 1000);
  }
  
  function setFocusTrap(container) {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    function handleTab(e) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
    
    container.addEventListener('keydown', handleTab);
    firstFocusable?.focus();
    
    return () => container.removeEventListener('keydown', handleTab);
  }
  
  // ─── Public API ────────────────────────────────────────────
  
  return {
    debounce,
    throttle,
    today,
    yesterday,
    formatTimestamp,
    getDaysUntil,
    shuffleArray,
    sampleArray,
    chunkArray,
    normalizeHiragana,
    normalizeRomaji,
    escapeHtml,
    clamp,
    roundTo,
    percentage,
    levenshtein,
    fuzzyMatch,
    safeJSONParse,
    safeJSONStringify,
    createElement,
    findElement,
    findAll,
    addClass,
    removeClass,
    toggleClass,
    bindClick,
    bindKeydown,
    triggerReflow,
    waitForTransition,
    announce,
    setFocusTrap,
  };
})();
