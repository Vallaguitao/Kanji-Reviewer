/**
 * app.js — Main Application Logic (v2)
 * SPA router, view rendering, and all study mode logic.
 * Features: 5 quiz directions, kanji section, instructions, timers, difficulty filters
 */

const App = (() => {
  let currentView = null;
  let currentCleanup = null;

  // ─── Constants ──────────────────────────────────────────────

  const DIRECTIONS = [
    { id: 'jp2en', label: 'JP → EN', icon: '日→英', desc: 'Japanese word, pick English meaning' },
    { id: 'en2jp', label: 'EN → JP', icon: '英→日', desc: 'English meaning, pick Japanese word' },
    { id: 'hira2kanji', label: 'ひら→漢', icon: 'ひ→漢', desc: 'Hiragana reading, pick the Kanji' },
    { id: 'kanji2hira', label: '漢→ひら', icon: '漢→ひ', desc: 'Kanji word, pick the Hiragana' },
    { id: 'mix', label: 'Random Mix', icon: '🔀', desc: 'All types mixed randomly' },
  ];

  const DIFFICULTY_LEVELS = [
    { id: 'all', label: '📚 All' },
    { id: 'new', label: '🆕 New' },
    { id: 'learning', label: '📖 Learning' },
    { id: 'reviewing', label: '🔄 Reviewing' },
    { id: 'mastered', label: '⭐ Mastered' },
  ];

  const TIPS = [
    "💡 Practice 20 words daily for best retention",
    "💡 Use SRS review to strengthen weak words",
    "💡 Try different quiz directions to deepen understanding",
    "💡 The Kanji section helps you recognize individual characters",
    "💡 Flashcards are great for initial exposure to new words",
    "💡 Typing practice reinforces spelling and recall",
    "💡 The matching game is a fun way to review vocabulary",
    "💡 Study consistently — even 5 minutes a day helps!",
    "💡 Focus on words you get wrong more often",
    "💡 Mix up your study modes to stay engaged",
  ];

  const HERO_PHRASES = [
    '一日一歩 — One step each day',
    '継続は力なり — Persistence is power',
    '七転び八起き — Fall seven times, rise eight',
    '石の上にも三年 — Perseverance prevails',
    '千里の道も一歩から — A journey of 1000 miles begins with a single step',
    '学問に王道なし — There is no royal road to learning',
    '塵も積もれば山となる — Even dust piled up becomes a mountain',
  ];

  let pendingKotdChar = null;

  // ─── Router ────────────────────────────────────────────────

  function init() {
    // Initialize modules
    if (typeof Theme !== 'undefined') Theme.init();
    if (typeof Speech !== 'undefined') Speech.init();
    if (typeof KanjiHelper !== 'undefined') KanjiHelper.init();
    
    // Setup global keyboard shortcuts
    setupGlobalShortcuts();
    
    // Setup nav action buttons
    setupNavActions();
    
    // Update SRS badge
    updateSRSBadge();
    
    // Start route handling
    window.addEventListener('hashchange', handleRoute);
    handleRoute();
    Storage.updateStreak();
  }
  
  function setupNavActions() {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        Theme.toggle();
      });
    }
    
    // Help toggle
    const helpToggle = document.getElementById('help-toggle');
    if (helpToggle) {
      helpToggle.addEventListener('click', showKeyboardHelp);
    }
  }
  
  function setupGlobalShortcuts() {
    let keyBuffer = '';
    let keyTimeout = null;
    
    document.addEventListener('keydown', (e) => {
      // Ignore if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // Theme toggle: T
      if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        Theme.toggle();
        return;
      }
      
      // Help: ?
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        showKeyboardHelp();
        return;
      }
      
      // Go to routes: g + key
      if (e.key.toLowerCase() === 'g') {
        keyBuffer = 'g';
        clearTimeout(keyTimeout);
        keyTimeout = setTimeout(() => { keyBuffer = ''; }, 1000);
        return;
      }
      
      if (keyBuffer === 'g') {
        switch (e.key.toLowerCase()) {
          case 'd': navigate('dashboard'); break;
          case 'f': navigate('flashcards'); break;
          case 'q': navigate('quiz'); break;
          case 't': navigate('typing'); break;
          case 'm': navigate('matching'); break;
          case 's': navigate('srs'); break;
          case 'k': navigate('kanji'); break;
        }
        keyBuffer = '';
        clearTimeout(keyTimeout);
      }
    });
  }
  
  function showKeyboardHelp() {
    const helpHtml = `
      <div class="modal-overlay" id="help-modal-overlay">
        <div class="modal" role="dialog" aria-labelledby="help-modal-title" aria-modal="true">
          <div class="modal-header">
            <h2 id="help-modal-title" class="modal-title">⌨️ Keyboard Shortcuts</h2>
            <button class="modal-close" id="help-modal-close-btn" aria-label="Close">&times;</button>
          </div>
          <div class="modal-content">
            <div class="shortcuts-grid">
              <div class="shortcut-group">
                <h3>Navigation</h3>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>D</kbd> Dashboard</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>F</kbd> Flashcards</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>Q</kbd> Quiz</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>T</kbd> Typing</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>M</kbd> Matching</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>S</kbd> SRS Review</div>
                <div class="shortcut-item"><kbd>G</kbd> + <kbd>K</kbd> Kanji</div>
              </div>
              <div class="shortcut-group">
                <h3>General</h3>
                <div class="shortcut-item"><kbd>T</kbd> Toggle Theme</div>
                <div class="shortcut-item"><kbd>?</kbd> Show This Help</div>
              </div>
              <div class="shortcut-group">
                <h3>Flashcards/SRS</h3>
                <div class="shortcut-item"><kbd>Space</kbd> Flip Card</div>
                <div class="shortcut-item"><kbd>Enter</kbd> Next Card</div>
                <div class="shortcut-item"><kbd>1</kbd> Again</div>
                <div class="shortcut-item"><kbd>2</kbd> Hard</div>
                <div class="shortcut-item"><kbd>3</kbd> Good</div>
                <div class="shortcut-item"><kbd>4</kbd> Easy</div>
              </div>
              <div class="shortcut-group">
                <h3>Quiz</h3>
                <div class="shortcut-item"><kbd>1-4</kbd> Select Option</div>
              </div>
              <div class="shortcut-group">
                <h3>Typing</h3>
                <div class="shortcut-item"><kbd>Enter</kbd> Submit Answer</div>
                <div class="shortcut-item"><kbd>Esc</kbd> Skip</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="help-modal-got-it-btn">Got it!</button>
          </div>
        </div>
      </div>
    `;
    
    // Remove existing modal if any
    const existing = document.getElementById('help-modal-overlay');
    if (existing) existing.remove();
    
    document.body.insertAdjacentHTML('beforeend', helpHtml);
    
    // Focus trap and close on overlay click
    setTimeout(() => {
      const overlay = document.getElementById('help-modal-overlay');
      const modal = overlay.querySelector('.modal');
      const closeBtn = document.getElementById('help-modal-close-btn');
      const gotItBtn = document.getElementById('help-modal-got-it-btn');
      
      if (overlay && modal) {
        // Add active class to make modal visible
        modal.classList.add('active');
        
        overlay.addEventListener('click', (e) => {
          if (e.target === overlay) overlay.remove();
        });
        
        // Close button handler
        if (closeBtn) {
          closeBtn.addEventListener('click', () => overlay.remove());
        }
        
        // Got it button handler
        if (gotItBtn) {
          gotItBtn.addEventListener('click', () => overlay.remove());
        }
        
        Utils.setFocusTrap(modal);
      }
    }, 10);
  }
  
  function updateSRSBadge() {
    const badge = document.getElementById('nav-srs-badge');
    if (!badge) return;
    
    if (typeof SRS !== 'undefined') {
      const stats = SRS.getStats();
      if (stats.dueCount > 0) {
        badge.textContent = stats.dueCount > 99 ? '99+' : stats.dueCount;
        badge.style.display = 'inline-flex';
      } else {
        badge.style.display = 'none';
      }
    }
    
    // Update periodically
    setTimeout(updateSRSBadge, 60000);
  }

  function handleRoute() {
    const hash = window.location.hash || '#/dashboard';
    const path = hash.replace('#/', '') || 'dashboard';

    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#/' + path);
    });

    const app = document.getElementById('app-content');
    app.classList.remove('view-enter');
    void app.offsetWidth;
    app.classList.add('view-enter');

    // Track mode usage (not for dashboard/categories/kanji browse)
    if (['flashcards', 'quiz', 'typing', 'matching', 'srs'].includes(path)) {
      Storage.setLastMode(path);
      Storage.incrementModeUsage(path);
    }

    switch (path) {
      case 'dashboard': renderDashboard(app); break;
      case 'categories': renderCategories(app); break;
      case 'flashcards': renderFlashcards(app); break;
      case 'quiz': renderQuiz(app); break;
      case 'typing': renderTyping(app); break;
      case 'matching': renderMatching(app); break;
      case 'kanji': renderKanji(app); break;
      case 'srs': renderSRS(app); break;
      default: renderDashboard(app); break;
    }

    currentView = path;
  }

  function navigate(path) {
    window.location.hash = '#/' + path;
  }

  // ─── Utility ───────────────────────────────────────────────

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

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
    const a = input.toLowerCase().trim();
    const b = target.toLowerCase().trim();
    if (a === b) return true;
    const parts = b.split(/[,;\/]/);
    for (const part of parts) {
      const trimmed = part.trim();
      if (a === trimmed) return true;
      if (trimmed.startsWith('to ') && a === trimmed.substring(3)) return true;
      if (a.startsWith('to ') && a.substring(3) === trimmed) return true;
      if (trimmed.length > 3 && levenshtein(a, trimmed) <= 1) return true;
    }
    return false;
  }

  function getCategoryIcon(category) {
    const icons = {
      verb: '動', 'i-adjective': '形', 'na-adjective': '的',
      noun: '名', adverb: '副', counter: '数',
      time: '時', number: '番', pronoun: '代',
      expression: '話', other: '他'
    };
    return icons[category] || '？';
  }

  function getCategoryDisplayName(category) {
    const names = {
      verb: 'Verbs', 'i-adjective': 'い-Adjectives', 'na-adjective': 'な-Adjectives',
      noun: 'Nouns', adverb: 'Adverbs', counter: 'Counters',
      time: 'Time', number: 'Numbers', pronoun: 'Pronouns',
      expression: 'Expressions', other: 'Other'
    };
    return names[category] || category;
  }

  function getResultMessage(pct) {
    if (pct >= 95) return '🌸 Perfect! You\'re a master! 🌸';
    if (pct >= 80) return '🎯 Excellent work! Keep it up!';
    if (pct >= 60) return '👍 Good progress! Keep studying!';
    if (pct >= 40) return '💪 Getting there! Practice makes perfect!';
    return '📚 Keep studying! You\'ll improve!';
  }

  function getWordsWithKanji() {
    return N5_VOCABULARY.filter(w => w.kanji !== w.reading);
  }

  function getFilteredWords(category, difficulty) {
    let words = (!category || category === 'all') ? N5_VOCABULARY : N5_VOCABULARY.filter(w => w.category === category);
    if (difficulty && difficulty !== 'all') {
      words = words.filter(w => Storage.getWordMasteryLevel(w.id) === difficulty);
    }
    return words;
  }

  function getFilteredWordsForDirection(category, difficulty, direction) {
    let words = getFilteredWords(category, difficulty);
    if (direction === 'hira2kanji' || direction === 'kanji2hira') {
      words = words.filter(w => w.kanji !== w.reading);
    }
    return words;
  }

  function pickDirection(selectedDirection) {
    if (selectedDirection === 'mix') {
      const dirs = ['jp2en', 'en2jp', 'hira2kanji', 'kanji2hira'];
      return dirs[Math.floor(Math.random() * dirs.length)];
    }
    return selectedDirection;
  }

  // ─── Shared UI Components ──────────────────────────────────

  function renderInstructions(title, items, shortcuts) {
    return `
      <div class="instructions-panel">
        <button class="instructions-toggle" onclick="this.classList.toggle('open'); this.nextElementSibling.classList.toggle('open');">
          <span>ℹ️ ${title}</span>
          <span class="instructions-toggle-icon">▼</span>
        </button>
        <div class="instructions-content">
          <ul>
            ${items.map(i => `<li>${i}</li>`).join('')}
          </ul>
          ${shortcuts ? `<p style="margin-top: 0.75rem; font-size: 0.8rem; opacity: 0.7;">⌨️ ${shortcuts}</p>` : ''}
        </div>
      </div>
    `;
  }

  function renderDirectionSelector(selected) {
    return `
      <div class="setup-section">
        <div class="setup-section-title"><span class="setup-section-icon">🎯</span> Quiz Direction</div>
        <div class="direction-selector">
          ${DIRECTIONS.map(d => `
            <button class="direction-option ${d.id === selected ? 'active' : ''}" data-direction="${d.id}" title="${d.desc}">
              <span class="direction-option-icon">${d.icon}</span>
              <span class="direction-option-label">${d.label}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCategoryFilter(selectedCategory) {
    const categories = ['all', ...Object.keys(N5_CATEGORIES)];
    return `
      <div class="setup-section">
        <div class="setup-section-title"><span class="setup-section-icon">📂</span> Category</div>
        <div class="category-filter">
          ${categories.map(cat => `
            <button class="filter-chip ${cat === selectedCategory ? 'active' : ''}" data-category="${cat}">
              ${cat === 'all' ? '📚 All' : getCategoryIcon(cat) + ' ' + getCategoryDisplayName(cat)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderDifficultyFilter(selected) {
    return `
      <div class="setup-section">
        <div class="setup-section-title"><span class="setup-section-icon">📊</span> Difficulty</div>
        <div class="difficulty-filter">
          ${DIFFICULTY_LEVELS.map(d => `
            <button class="difficulty-chip ${d.id === selected ? 'active' : ''}" data-level="${d.id}">${d.label}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderSessionSelector(current) {
    return `
      <div class="setup-section">
        <div class="setup-section-title"><span class="setup-section-icon">🔢</span> Session Size</div>
        <div class="session-selector">
          <span class="session-label">Cards:</span>
          ${[10, 20, 50].map(n => `
            <button class="session-btn ${n === current ? 'active' : ''}" data-count="${n}">${n}</button>
          `).join('')}
          <button class="session-btn ${current === -1 ? 'active' : ''}" data-count="-1">All</button>
        </div>
      </div>
    `;
  }

  function renderTimerSelector(current) {
    return `
      <div class="setup-section">
        <div class="setup-section-title"><span class="setup-section-icon">⏱️</span> Timer</div>
        <div class="session-selector">
          <span class="session-label">Per question:</span>
          ${[0, 10, 15, 30].map(n => `
            <button class="session-btn timer-option ${n === current ? 'active' : ''}" data-timer="${n}">${n === 0 ? 'Off' : n + 's'}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  function bindSetupListeners(container, state, renderSetup) {
    container.querySelectorAll('.direction-option').forEach(btn => {
      btn.addEventListener('click', () => { state.direction = btn.dataset.direction; renderSetup(); });
    });
    container.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => { state.category = chip.dataset.category; renderSetup(); });
    });
    container.querySelectorAll('.difficulty-chip').forEach(chip => {
      chip.addEventListener('click', () => { state.difficulty = chip.dataset.level; renderSetup(); });
    });
    container.querySelectorAll('.session-btn:not(.timer-option)').forEach(btn => {
      if (btn.dataset.count) btn.addEventListener('click', () => { state.sessionSize = parseInt(btn.dataset.count); renderSetup(); });
    });
    container.querySelectorAll('.timer-option').forEach(btn => {
      btn.addEventListener('click', () => { state.timer = parseInt(btn.dataset.timer); renderSetup(); });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // DASHBOARD VIEW
  // ═══════════════════════════════════════════════════════════

  function renderDashboard(container) {
    const streak = Storage.getStreakData();
    const progress = Storage.getOverallProgress();
    const todayStats = Storage.getTodayStats();
    const accuracy = Storage.getOverallAccuracy();
    const srsStats = SRS.getStats();
    const catProgress = Storage.getCategoryProgress();
    const lastMode = Storage.getLastMode();
    const modeUsage = Storage.getModeUsage();

    const learnedPct = progress.total > 0 ? Math.round(((progress.mastered + progress.reviewing + progress.learning) / progress.total) * 100) : 0;
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (learnedPct / 100) * circumference;

    const tip = TIPS[Math.floor((Date.now() / 86400000) % TIPS.length)];
    const heroPhrase = HERO_PHRASES[Math.floor((Date.now() / 86400000) % HERO_PHRASES.length)];

    // Kanji of the Day
    let kotdHtml = '';
    const kotdKanjiList = (typeof KanjiHelper !== 'undefined') ? KanjiHelper.getKanjiList() : [];
    let kotdChar = null;
    if (kotdKanjiList.length > 0) {
      const dayIndex = Math.floor(Date.now() / 86400000) % kotdKanjiList.length;
      const kotd = kotdKanjiList[dayIndex];
      kotdChar = kotd.character;
      const kotdMeanings = kotd.meanings.slice(0, 3).join('; ');
      const kotdReadings = kotd.readings.slice(0, 3).join(', ');
      const kotdExamples = kotd.words.slice(0, 3).map(w =>
        `<span class="kotd-example">${w.kanji} (${w.reading}) — ${w.meaning}</span>`
      ).join('');
      kotdHtml = `
        <div class="kotd-card" id="kotd-card" title="Click to study this kanji">
          <div class="kotd-header">📅 Kanji of the Day</div>
          <div class="kotd-body">
            <div class="kotd-kanji">${kotd.character}</div>
            <div class="kotd-info">
              <div class="kotd-meanings">${kotdMeanings}</div>
              <div class="kotd-readings">${kotdReadings}</div>
              <div class="kotd-examples">
                ${kotdExamples}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Sort modes by usage
    const modes = [
      { id: 'flashcards', icon: '🃏', name: 'Flashcards', desc: 'Flip cards to reveal meanings' },
      { id: 'quiz', icon: '📝', name: 'Multiple Choice', desc: 'Pick the correct answer' },
      { id: 'typing', icon: '⌨️', name: 'Typing Practice', desc: 'Type the answer' },
      { id: 'matching', icon: '🧩', name: 'Matching Game', desc: 'Match Japanese to English' },
      { id: 'kanji', icon: '漢', name: 'Kanji Study', desc: 'Learn individual kanji' },
      { id: 'srs', icon: '🧠', name: 'Spaced Repetition', desc: 'Smart review scheduling', badge: srsStats.dueCount > 0 ? srsStats.dueCount : null },
    ];
    modes.sort((a, b) => (modeUsage[b.id] || 0) - (modeUsage[a.id] || 0));

    const modeNames = { flashcards: 'Flashcards', quiz: 'Quiz', typing: 'Typing', matching: 'Matching', kanji: 'Kanji', srs: 'SRS Review' };

    container.innerHTML = `
      <div class="dashboard">
        <div class="sumi-e-hero">
          <div class="sakura-container" aria-hidden="true">
            ${Array.from({length: 18}, (_, i) => `<div class="sakura-petal"></div>`).join('')}
          </div>
          <div class="hero-kanji-bg" aria-hidden="true">
            <span class="hero-kanji" style="--delay: 0s">学</span>
            <span class="hero-kanji" style="--delay: 2s">語</span>
            <span class="hero-kanji" style="--delay: 4s">読</span>
            <span class="hero-kanji" style="--delay: 1s">書</span>
            <span class="hero-kanji" style="--delay: 3s">話</span>
          </div>
          <div class="hero-content">
            <h1 class="hero-title">
              <span class="title-jp">漢字マスター</span>
              <span class="title-en">N5 Vocabulary</span>
            </h1>
            ${streak.currentStreak > 0 ? `
              <div class="streak-badge" title="Study streak">
                <span class="streak-fire">🔥</span>
                <span class="streak-count">${streak.currentStreak}</span>
                <span class="streak-label">day${streak.currentStreak !== 1 ? 's' : ''}</span>
              </div>
            ` : ''}
            <p class="hero-phrase" id="hero-phrase">${heroPhrase}</p>
            <a href="#/flashcards" class="hero-cta">Start Studying</a>
          </div>
        </div>

        ${kotdHtml}

        <!-- Quick Stats Bar -->
        <div class="quick-stats-bar">
          <div class="quick-stat">
            <span class="quick-stat-value">${progress.total}</span>
            <span class="quick-stat-label">Total Words</span>
          </div>
          <div class="quick-stat">
            <span class="quick-stat-value accent">${progress.mastered + progress.reviewing + progress.learning}</span>
            <span class="quick-stat-label">Learned</span>
          </div>
          <div class="quick-stat">
            <span class="quick-stat-value wisteria">${srsStats.dueCount}</span>
            <span class="quick-stat-label">Due Review</span>
          </div>
          <div class="quick-stat">
            <span class="quick-stat-value gold">${todayStats.reviewed}/20</span>
            <span class="quick-stat-label">Today's Goal</span>
          </div>
        </div>

        <!-- Tip Banner -->
        <div class="tip-banner">
          <span class="tip-banner-icon">📌</span>
          <span class="tip-banner-text">${tip}</span>
        </div>

        ${lastMode ? `
          <div class="continue-section">
            <a href="#/${lastMode}" class="btn btn-primary btn-lg continue-btn">
              ▶ Continue ${modeNames[lastMode] || lastMode}
            </a>
          </div>
        ` : ''}

        <div class="dashboard-grid">
          <!-- Progress Ring -->
          <div class="stat-card stat-card-progress">
            <div class="progress-ring-container">
              <svg class="progress-ring" width="140" height="140" viewBox="0 0 140 140">
                <circle class="progress-ring-bg" cx="70" cy="70" r="${radius}" />
                <circle class="progress-ring-fill" cx="70" cy="70" r="${radius}"
                  style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset};" />
              </svg>
              <div class="progress-ring-text">
                <span class="progress-ring-pct">${learnedPct}%</span>
                <span class="progress-ring-label">Learned</span>
              </div>
            </div>
            <div class="progress-stats">
              <div class="progress-stat"><span class="stat-num">${progress.mastered}</span><span class="stat-lbl">Mastered</span></div>
              <div class="progress-stat"><span class="stat-num">${progress.reviewing}</span><span class="stat-lbl">Reviewing</span></div>
              <div class="progress-stat"><span class="stat-num">${progress.learning}</span><span class="stat-lbl">Learning</span></div>
              <div class="progress-stat"><span class="stat-num">${progress.new}</span><span class="stat-lbl">New</span></div>
            </div>
          </div>

          <!-- Today's Stats -->
          <div class="stat-card stat-card-today">
            <h3 class="stat-card-title">Today's Study</h3>
            <div class="today-stats">
              <div class="today-stat"><span class="today-num">${todayStats.reviewed}</span><span class="today-lbl">Reviewed</span></div>
              <div class="today-stat"><span class="today-num">${todayStats.correct}</span><span class="today-lbl">Correct</span></div>
              <div class="today-stat"><span class="today-num">${Storage.getTodayAccuracy()}%</span><span class="today-lbl">Accuracy</span></div>
            </div>
            ${accuracy > 0 ? `
              <div class="overall-accuracy">
                <span class="accuracy-label">Overall Accuracy</span>
                <div class="progress-bar"><div class="progress-bar-fill" style="width: ${accuracy}%"></div></div>
                <span class="accuracy-value">${accuracy}%</span>
              </div>
            ` : ''}
          </div>

          <!-- SRS Status -->
          <div class="stat-card stat-card-srs">
            <h3 class="stat-card-title">Spaced Repetition</h3>
            <div class="srs-status">
              ${srsStats.dueCount > 0 ? `
                <div class="srs-due-badge"><span class="srs-due-num">${srsStats.dueCount}</span><span class="srs-due-label">cards due for review</span></div>
                <a href="#/srs" class="btn btn-primary btn-sm">Review Now</a>
              ` : `
                <div class="srs-caught-up"><span class="srs-emoji">🎉</span><span>You're all caught up!</span></div>
              `}
            </div>
          </div>
        </div>

        <!-- Study Modes -->
        <h2 class="section-title">Study Modes</h2>
        <div class="mode-grid">
          ${modes.map(m => `
            <a href="#/${m.id}" class="mode-card" id="mode-${m.id}">
              <div class="mode-icon">${m.icon}</div>
              <div class="mode-info"><h3>${m.name}</h3><p>${m.desc}</p></div>
              ${m.badge ? `<span class="mode-badge">${m.badge}</span>` : ''}
            </a>
          `).join('')}
          <a href="#/categories" class="mode-card" id="mode-categories">
            <div class="mode-icon">📂</div>
            <div class="mode-info"><h3>Browse Words</h3><p>Explore by category</p></div>
          </a>
        </div>

        <!-- Category Progress -->
        ${Object.keys(catProgress).length > 0 ? `
          <h2 class="section-title">Category Progress</h2>
          <div class="category-progress-list">
            ${Object.entries(catProgress).map(([cat, data]) => {
              const pct = data.total > 0 ? Math.round(((data.mastered + data.reviewing) / data.total) * 100) : 0;
              return `
                <div class="category-progress-item">
                  <div class="cat-prog-header">
                    <span class="cat-prog-icon">${getCategoryIcon(cat)}</span>
                    <span class="cat-prog-name">${getCategoryDisplayName(cat)}</span>
                    <span class="cat-prog-pct">${pct}%</span>
                  </div>
                  <div class="progress-bar"><div class="progress-bar-fill" style="width: ${pct}%; --bar-color: ${N5_CATEGORIES[cat]?.color || 'var(--accent-sakura)'}"></div></div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}

        <!-- Settings / Reset -->
        <div class="settings-section">
          <h3 class="settings-title">⚙️ Settings</h3>
          <div class="danger-zone">
            <p>Reset all progress, streaks, and study data. This action cannot be undone.</p>
            <button class="btn btn-danger btn-sm" id="reset-btn">🗑️ Reset All Progress</button>
          </div>
        </div>
      </div>
    `;

    // KOTD click handler
    if (kotdChar) {
      document.getElementById('kotd-card')?.addEventListener('click', () => {
        pendingKotdChar = kotdChar;
        window.location.hash = '#/kanji';
      });
    }

    // Reset handler
    document.getElementById('reset-btn')?.addEventListener('click', () => {
      if (confirm('⚠️ Are you sure? This will erase ALL your progress, streaks, and study data. This cannot be undone.')) {
        Storage.resetAllData();
        renderDashboard(container);
      }
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CATEGORY BROWSER VIEW
  // ═══════════════════════════════════════════════════════════

  function renderCategories(container) {
    const catProgress = Storage.getCategoryProgress();
    const categories = {};
    for (const word of N5_VOCABULARY) {
      if (!categories[word.category]) categories[word.category] = [];
      categories[word.category].push(word);
    }

    container.innerHTML = `
      <div class="categories-view">
        <div class="view-header">
          <h1>Browse Vocabulary</h1>
          <p class="view-subtitle">${N5_VOCABULARY.length} words across ${Object.keys(categories).length} categories</p>
        </div>
        <div class="search-bar-container">
          <input type="text" id="word-search" class="search-input" placeholder="Search words..." autocomplete="off" />
        </div>
        <div class="category-grid" id="category-grid">
          ${Object.entries(categories).map(([cat, words]) => {
            const cp = catProgress[cat] || { total: words.length, mastered: 0, reviewing: 0 };
            const pct = cp.total > 0 ? Math.round(((cp.mastered + cp.reviewing) / cp.total) * 100) : 0;
            return `
              <div class="category-card" data-category="${cat}">
                <div class="category-card-header">
                  <span class="category-icon" style="color: ${N5_CATEGORIES[cat]?.color || 'var(--accent-sakura)'}">${getCategoryIcon(cat)}</span>
                  <div><h3>${getCategoryDisplayName(cat)}</h3><span class="category-count">${words.length} words</span></div>
                </div>
                <div class="progress-bar progress-bar-sm"><div class="progress-bar-fill" style="width: ${pct}%; --bar-color: ${N5_CATEGORIES[cat]?.color || 'var(--accent-sakura)'}"></div></div>
                <span class="category-pct">${pct}% mastered</span>
              </div>
            `;
          }).join('')}
        </div>
        <div id="word-list-panel" class="word-list-panel" style="display:none;">
          <button class="btn btn-secondary btn-sm" id="back-to-categories">← Back</button>
          <h2 id="word-list-title"></h2>
          <div class="word-list" id="word-list"></div>
        </div>
      </div>
    `;

    const grid = document.getElementById('category-grid');
    const panel = document.getElementById('word-list-panel');

    grid.addEventListener('click', e => {
      const card = e.target.closest('.category-card');
      if (!card) return;
      showWordList(card.dataset.category, categories[card.dataset.category]);
    });

    document.getElementById('back-to-categories').addEventListener('click', () => {
      panel.style.display = 'none';
      grid.style.display = '';
      document.querySelector('.search-bar-container').style.display = '';
    });

    const searchInput = document.getElementById('word-search');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length === 0) { grid.style.display = ''; panel.style.display = 'none'; return; }
      const results = N5_VOCABULARY.filter(w => w.kanji.includes(query) || w.reading.includes(query) || w.meaning.toLowerCase().includes(query));
      showWordList(`Search: "${searchInput.value}"`, results);
    });

    function showWordList(title, words) {
      grid.style.display = 'none';
      panel.style.display = '';
      document.getElementById('word-list-title').textContent = typeof title === 'string' && !title.startsWith('Search') ? getCategoryDisplayName(title) : title;
      document.getElementById('word-list').innerHTML = words.map(w => {
        const mastery = Storage.getWordMasteryLevel(w.id);
        return `
          <div class="word-item">
            <div class="word-japanese">
              <span class="word-kanji">${w.kanji}</span>
              ${w.kanji !== w.reading ? `<span class="word-reading">${w.reading}</span>` : ''}
            </div>
            <div class="word-meaning">${w.meaning}</div>
            <span class="word-mastery-tag tag tag-${mastery}">${mastery}</span>
          </div>
        `;
      }).join('');
    }
  }

  // ═══════════════════════════════════════════════════════════
  // FLASHCARD MODE
  // ═══════════════════════════════════════════════════════════

  function renderFlashcards(container) {
    let state = { category: 'all', sessionSize: 20, difficulty: 'all' };
    let cards = [], currentIndex = 0, isFlipped = false, actionsShown = false, sessionCorrect = 0, sessionTotal = 0;
    let keyHandler = null;

    function startSession() {
      const pool = getFilteredWords(state.category, state.difficulty);
      if (pool.length === 0) { container.innerHTML = emptyState('No words match your filters', 'Try changing category or difficulty.'); return; }
      const count = state.sessionSize === -1 ? pool.length : Math.min(state.sessionSize, pool.length);
      cards = shuffleArray(pool).slice(0, count);
      currentIndex = 0; isFlipped = false; actionsShown = false; sessionCorrect = 0; sessionTotal = 0;
      renderCard();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header"><h1>🃏 Flashcards</h1><p class="view-subtitle">Flip cards to test your knowledge</p></div>
          ${renderInstructions('How to Play', [
            'A Japanese word is shown on the front of the card',
            'Click or tap the card to flip it and reveal the English meaning',
            'Click again to flip back — you can toggle freely!',
            'Rate yourself: <strong>Know</strong> ✓ or <strong>Don\'t Know</strong> ✕',
            'Swipe right = Know, Swipe left = Don\'t Know (mobile)',
          ], 'Space: Flip | →: Know | ←: Don\'t Know')}
          ${renderCategoryFilter(state.category)}
          ${renderDifficultyFilter(state.difficulty)}
          ${renderSessionSelector(state.sessionSize)}
          <button class="btn btn-primary btn-lg" id="start-btn">Start Studying</button>
        </div>
      `;
      bindSetupListeners(container, state, renderSetup);
      document.getElementById('start-btn').addEventListener('click', startSession);
    }

    function renderCard() {
      if (currentIndex >= cards.length) { renderResults(); return; }
      const word = cards[currentIndex];
      isFlipped = false; actionsShown = false;

      container.innerHTML = `
        <div class="flashcard-view">
          <div class="card-counter">${currentIndex + 1} / ${cards.length}</div>
          <div class="flashcard-container">
            <div class="flashcard" id="flashcard">
              <div class="flashcard-front">
                <span class="flashcard-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
                <span class="flashcard-kanji">${word.kanji}</span>
                <button class="speaker-btn" id="flashcard-speak-btn" aria-label="Play pronunciation" title="Play pronunciation">🔊</button>
                <span class="flashcard-hint">Tap to flip</span>
              </div>
              <div class="flashcard-back">
                <span class="flashcard-meaning">${word.meaning}</span>
                <span class="tag">${getCategoryDisplayName(word.category)}</span>
              </div>
            </div>
          </div>
          <div class="flashcard-actions" id="flashcard-actions" style="visibility: hidden;">
            <button class="btn btn-danger" id="fc-dont-know">✕ Don't Know</button>
            <button class="btn btn-success" id="fc-know">✓ Know</button>
          </div>
          <div class="keyboard-hints"><span>Space: Flip</span> <span>←: Don't Know</span> <span>→: Know</span></div>
        </div>
      `;

      const flashcard = document.getElementById('flashcard');
      const actions = document.getElementById('flashcard-actions');
      const speakBtn = document.getElementById('flashcard-speak-btn');

      // Speaker button - play pronunciation
      if (speakBtn && typeof Speech !== 'undefined') {
        speakBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Speech.speakWord(word.kanji, word.reading);
        });
      }

      flashcard.addEventListener('click', () => {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('flipped');
        if (!actionsShown) { actions.style.visibility = 'visible'; actionsShown = true; }
      });

      document.getElementById('fc-know').addEventListener('click', () => answer(true));
      document.getElementById('fc-dont-know').addEventListener('click', () => answer(false));

      let touchStartX = 0;
      flashcard.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      flashcard.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (actionsShown && Math.abs(diff) > 50) answer(diff > 0);
      }, { passive: true });
    }

    function answer(correct) {
      Storage.recordAnswer(cards[currentIndex].id, correct);
      Storage.updateStreak();
      if (correct) sessionCorrect++;
      sessionTotal++;
      currentIndex++;
      renderCard();
    }

    function renderResults() {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      container.innerHTML = `
        <div class="results-view"><div class="results-card">
          <h2>Session Complete!</h2>
          <div class="results-score"><span class="results-pct">${pct}%</span><span class="results-label">${sessionCorrect} / ${sessionTotal} correct</span></div>
          <div class="results-message">${getResultMessage(pct)}</div>
          <div class="results-actions">
            <button class="btn btn-primary" id="restart-btn">Study Again</button>
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div></div>
      `;
      document.getElementById('restart-btn').addEventListener('click', () => renderSetup());
    }

    keyHandler = (e) => {
      if (currentView !== 'flashcards') return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const fc = document.getElementById('flashcard');
        if (fc) {
          isFlipped = !isFlipped;
          fc.classList.toggle('flipped');
          if (!actionsShown) {
            const actions = document.getElementById('flashcard-actions');
            if (actions) actions.style.visibility = 'visible';
            actionsShown = true;
          }
        }
      } else if (e.key === 'ArrowRight' && actionsShown) { answer(true); }
      else if (e.key === 'ArrowLeft' && actionsShown) { answer(false); }
    };
    document.addEventListener('keydown', keyHandler);
    currentCleanup = () => document.removeEventListener('keydown', keyHandler);
    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // MULTIPLE CHOICE QUIZ
  // ═══════════════════════════════════════════════════════════

  function renderQuiz(container) {
    let state = { category: 'all', sessionSize: 20, difficulty: 'all', direction: 'jp2en', timer: 0 };
    let questions = [], currentIndex = 0, score = 0, answered = false;
    let timerInterval = null, timerRemaining = 0;

    function startSession() {
      const dir = state.direction === 'mix' ? 'jp2en' : state.direction;
      const pool = getFilteredWordsForDirection(state.category, state.difficulty, dir);
      if (pool.length < 4) { container.innerHTML = emptyState('Not enough words', 'Need at least 4 words. Try changing filters.'); return; }
      const count = state.sessionSize === -1 ? pool.length : Math.min(state.sessionSize, pool.length);
      questions = shuffleArray(pool).slice(0, count);
      currentIndex = 0; score = 0; answered = false;
      renderQuestion();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header"><h1>📝 Multiple Choice Quiz</h1><p class="view-subtitle">Pick the correct answer</p></div>
          ${renderInstructions('How to Play', [
            '<strong>JP → EN:</strong> See a Japanese word, pick the English meaning',
            '<strong>EN → JP:</strong> See an English meaning, pick the Japanese word',
            '<strong>ひら → 漢:</strong> See hiragana, pick the matching kanji word',
            '<strong>漢 → ひら:</strong> See a kanji word, pick the correct hiragana reading',
            '<strong>Random Mix:</strong> All types shuffled randomly!',
            'Correct answers glow green, wrong answers shake red',
          ])}
          ${renderDirectionSelector(state.direction)}
          ${renderCategoryFilter(state.category)}
          ${renderDifficultyFilter(state.difficulty)}
          ${renderSessionSelector(state.sessionSize)}
          ${renderTimerSelector(state.timer)}
          <button class="btn btn-primary btn-lg" id="start-btn">Start Quiz</button>
        </div>
      `;
      bindSetupListeners(container, state, renderSetup);
      document.getElementById('start-btn').addEventListener('click', startSession);
    }

    function renderQuestion() {
      if (currentIndex >= questions.length) { renderQuizResults(); return; }
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
      answered = false;
      const word = questions[currentIndex];
      const dir = pickDirection(state.direction);

      // Build question and options based on direction
      let questionDisplay, optionField, correctAnswer;
      let pool = (dir === 'hira2kanji' || dir === 'kanji2hira') ? getWordsWithKanji() : N5_VOCABULARY;
      let sameCategory = pool.filter(w => w.category === word.category && w.id !== word.id);
      if (sameCategory.length < 3) sameCategory = pool.filter(w => w.id !== word.id);
      const distractors = shuffleArray(sameCategory).slice(0, 3);

      switch (dir) {
        case 'jp2en':
          questionDisplay = `<span class="quiz-reading">${word.kanji !== word.reading ? word.reading : ''}</span><span class="quiz-word">${word.kanji}</span>`;
          correctAnswer = word.meaning;
          optionField = 'meaning';
          break;
        case 'en2jp':
          questionDisplay = `<span class="quiz-word" style="font-family: var(--font-body)">${word.meaning}</span>`;
          correctAnswer = word.kanji;
          optionField = 'kanji';
          break;
        case 'hira2kanji':
          questionDisplay = `<span class="quiz-word">${word.reading}</span><span class="quiz-reading" style="margin-top: 0.5rem">Pick the kanji</span>`;
          correctAnswer = word.kanji;
          optionField = 'kanji';
          break;
        case 'kanji2hira':
          questionDisplay = `<span class="quiz-word">${word.kanji}</span><span class="quiz-reading" style="margin-top: 0.5rem">Pick the reading</span>`;
          correctAnswer = word.reading;
          optionField = 'reading';
          break;
      }

      const allOptions = shuffleArray([word, ...distractors]);

      container.innerHTML = `
        <div class="quiz-view">
          ${state.timer > 0 ? `<div class="countdown-bar" id="countdown-bar" style="width: 100%"></div>` : ''}
          <div class="quiz-header">
            <div class="card-counter">${currentIndex + 1} / ${questions.length}</div>
            <div class="quiz-score">Score: ${score}</div>
          </div>
          <div class="quiz-word-container">${questionDisplay}</div>
          <div class="quiz-options" id="quiz-options">
            ${allOptions.map(opt => `
              <button class="quiz-option" data-id="${opt.id}" data-correct="${opt.id === word.id}">
                ${opt[optionField]}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      // Timer
      if (state.timer > 0) {
        timerRemaining = state.timer;
        const bar = document.getElementById('countdown-bar');
        timerInterval = setInterval(() => {
          timerRemaining -= 0.1;
          if (bar) {
            const pct = Math.max(0, (timerRemaining / state.timer) * 100);
            bar.style.width = pct + '%';
            bar.classList.toggle('warning', timerRemaining <= 5 && timerRemaining > 3);
            bar.classList.toggle('danger', timerRemaining <= 3);
          }
          if (timerRemaining <= 0) {
            clearInterval(timerInterval);
            timerInterval = null;
            if (!answered) { handleTimeout(word); }
          }
        }, 100);
      }

      document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
          const isCorrect = btn.dataset.correct === 'true';
          Storage.recordAnswer(word.id, isCorrect);
          Storage.updateStreak();
          if (isCorrect) { score++; btn.classList.add('correct'); }
          else { btn.classList.add('wrong'); document.querySelector('.quiz-option[data-correct="true"]').classList.add('correct'); }
          setTimeout(() => { currentIndex++; renderQuestion(); }, 1200);
        });
      });
    }

    function handleTimeout(word) {
      answered = true;
      Storage.recordAnswer(word.id, false);
      document.querySelector('.quiz-option[data-correct="true"]')?.classList.add('correct');
      document.querySelectorAll('.quiz-option:not([data-correct="true"])').forEach(b => b.classList.add('wrong'));
      setTimeout(() => { currentIndex++; renderQuestion(); }, 1200);
    }

    function renderQuizResults() {
      if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
      const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
      container.innerHTML = `
        <div class="results-view"><div class="results-card">
          <h2>Quiz Complete!</h2>
          <div class="results-score"><span class="results-pct">${pct}%</span><span class="results-label">${score} / ${questions.length} correct</span></div>
          <div class="results-message">${getResultMessage(pct)}</div>
          <div class="results-actions">
            <button class="btn btn-primary" id="restart-btn">Try Again</button>
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div></div>
      `;
      document.getElementById('restart-btn').addEventListener('click', () => renderSetup());
    }

    currentCleanup = () => { if (timerInterval) clearInterval(timerInterval); };
    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // TYPING PRACTICE
  // ═══════════════════════════════════════════════════════════

  function renderTyping(container) {
    let state = { category: 'all', sessionSize: 20, difficulty: 'all', direction: 'jp2en' };
    let words = [], currentIndex = 0, score = 0, streak = 0, bestStreak = 0;

    function startSession() {
      const pool = getFilteredWordsForDirection(state.category, state.difficulty, state.direction === 'mix' ? 'jp2en' : state.direction);
      if (pool.length === 0) { container.innerHTML = emptyState('No words match your filters', 'Try changing category or difficulty.'); return; }
      const count = state.sessionSize === -1 ? pool.length : Math.min(state.sessionSize, pool.length);
      words = shuffleArray(pool).slice(0, count);
      currentIndex = 0; score = 0; streak = 0; bestStreak = 0;
      renderPrompt();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header"><h1>⌨️ Typing Practice</h1><p class="view-subtitle">Type the correct answer</p></div>
          ${renderInstructions('How to Play', [
            '<strong>JP → EN:</strong> See Japanese, type the English meaning',
            '<strong>EN → JP:</strong> See English, type the hiragana reading',
            '<strong>ひら → 漢:</strong> See hiragana, type the kanji word',
            '<strong>漢 → ひら:</strong> See kanji, type the hiragana reading',
            'Fuzzy matching is enabled — small typos are forgiven!',
            'Case-insensitive, and "to eat" matches "eat" for verbs',
            'Press <kbd>Enter</kbd> to submit, or click <strong>Check</strong>',
          ], 'Enter: Submit | Skip button available')}
          ${renderDirectionSelector(state.direction)}
          ${renderCategoryFilter(state.category)}
          ${renderDifficultyFilter(state.difficulty)}
          ${renderSessionSelector(state.sessionSize)}
          <button class="btn btn-primary btn-lg" id="start-btn">Start Practicing</button>
        </div>
      `;
      bindSetupListeners(container, state, renderSetup);
      document.getElementById('start-btn').addEventListener('click', startSession);
    }

    function renderPrompt() {
      if (currentIndex >= words.length) { renderTypingResults(); return; }
      const word = words[currentIndex];
      const dir = pickDirection(state.direction);

      let promptDisplay, expectedAnswer, placeholder;
      switch (dir) {
        case 'jp2en':
          promptDisplay = `<span class="typing-reading">${word.kanji !== word.reading ? word.reading : ''}</span><span class="typing-kanji">${word.kanji}</span>`;
          expectedAnswer = word.meaning;
          placeholder = 'Type the English meaning...';
          break;
        case 'en2jp':
          promptDisplay = `<span class="typing-kanji" style="font-family: var(--font-body); font-size: 2rem">${word.meaning}</span>`;
          expectedAnswer = word.reading;
          placeholder = 'Type the hiragana reading...';
          break;
        case 'hira2kanji':
          promptDisplay = `<span class="typing-kanji">${word.reading}</span><span class="typing-reading">Type the kanji</span>`;
          expectedAnswer = word.kanji;
          placeholder = 'Type the kanji...';
          break;
        case 'kanji2hira':
          promptDisplay = `<span class="typing-kanji">${word.kanji}</span><span class="typing-reading">Type the reading</span>`;
          expectedAnswer = word.reading;
          placeholder = 'Type the hiragana reading...';
          break;
      }

      container.innerHTML = `
        <div class="typing-view">
          <div class="typing-header">
            <div class="card-counter">${currentIndex + 1} / ${words.length}</div>
            <div class="typing-streak ${streak > 0 ? 'active' : ''}">${streak > 0 ? `🔥 ${streak} streak` : ''}</div>
            <div class="quiz-score">Score: ${score}</div>
          </div>
          <div class="typing-prompt">${promptDisplay}</div>
          <div class="typing-input-container">
            <input type="text" id="typing-input" class="typing-input" placeholder="${placeholder}" autocomplete="off" autofocus />
            <button class="btn btn-primary" id="typing-submit">Check</button>
          </div>
          <div class="typing-feedback" id="typing-feedback"></div>
          <button class="btn btn-secondary btn-sm" id="typing-skip" style="margin-top: 1rem;">Skip →</button>
        </div>
      `;

      const input = document.getElementById('typing-input');
      const feedback = document.getElementById('typing-feedback');

      function checkAnswer() {
        const userAnswer = input.value.trim();
        if (!userAnswer) return;
        const isCorrect = fuzzyMatch(userAnswer, expectedAnswer);
        Storage.recordAnswer(word.id, isCorrect);
        Storage.updateStreak();
        if (isCorrect) {
          score++; streak++; bestStreak = Math.max(bestStreak, streak);
          feedback.innerHTML = `<span class="feedback-correct">✓ Correct!</span>`;
          feedback.className = 'typing-feedback show correct';
        } else {
          streak = 0;
          feedback.innerHTML = `<span class="feedback-wrong">✕ ${expectedAnswer}</span>`;
          feedback.className = 'typing-feedback show wrong';
        }
        input.disabled = true;
        document.getElementById('typing-submit').disabled = true;
        setTimeout(() => { currentIndex++; renderPrompt(); }, 1500);
      }

      document.getElementById('typing-submit').addEventListener('click', checkAnswer);
      input.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
      document.getElementById('typing-skip').addEventListener('click', () => {
        streak = 0;
        Storage.recordAnswer(word.id, false);
        feedback.innerHTML = `<span class="feedback-skip">Skipped — ${expectedAnswer}</span>`;
        feedback.className = 'typing-feedback show wrong';
        setTimeout(() => { currentIndex++; renderPrompt(); }, 1200);
      });
      setTimeout(() => input.focus(), 100);
    }

    function renderTypingResults() {
      const pct = words.length > 0 ? Math.round((score / words.length) * 100) : 0;
      container.innerHTML = `
        <div class="results-view"><div class="results-card">
          <h2>Practice Complete!</h2>
          <div class="results-score"><span class="results-pct">${pct}%</span><span class="results-label">${score} / ${words.length} correct</span></div>
          <div class="results-extra">Best streak: 🔥 ${bestStreak}</div>
          <div class="results-message">${getResultMessage(pct)}</div>
          <div class="results-actions">
            <button class="btn btn-primary" id="restart-btn">Practice Again</button>
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div></div>
      `;
      document.getElementById('restart-btn').addEventListener('click', () => renderSetup());
    }

    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // MATCHING GAME
  // ═══════════════════════════════════════════════════════════

  function renderMatching(container) {
    let state = { category: 'all', difficulty: 'all', matchType: 'jp2en', gridSize: 'medium' };
    const GRID_SIZES = { small: { pairs: 3, cols: 3 }, medium: { pairs: 6, cols: 4 }, large: { pairs: 8, cols: 4 } };
    let matchCards = [], flippedCards = [], matchedPairs = 0, moves = 0, timerInterval = null, seconds = 0, locked = false, pairCount = 6;

    function startSession() {
      const gs = GRID_SIZES[state.gridSize];
      pairCount = gs.pairs;
      const pool = state.matchType === 'kanji2hira'
        ? getFilteredWords(state.category, state.difficulty).filter(w => w.kanji !== w.reading)
        : getFilteredWords(state.category, state.difficulty);
      if (pool.length < pairCount) { container.innerHTML = emptyState('Not enough words', `Need at least ${pairCount} words. Try changing filters.`); return; }
      const pairs = shuffleArray(pool).slice(0, pairCount);

      matchCards = [];
      pairs.forEach((word, i) => {
        if (state.matchType === 'kanji2hira') {
          matchCards.push({ pairId: i, type: 'jp', display: word.kanji, word, flipped: false, matched: false });
          matchCards.push({ pairId: i, type: 'en', display: word.reading, word, flipped: false, matched: false });
        } else {
          matchCards.push({ pairId: i, type: 'jp', display: word.kanji, word, flipped: false, matched: false });
          matchCards.push({ pairId: i, type: 'en', display: word.meaning, word, flipped: false, matched: false });
        }
      });
      matchCards = shuffleArray(matchCards);
      flippedCards = []; matchedPairs = 0; moves = 0; seconds = 0; locked = false;
      renderBoard();
      startTimer();
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        seconds++;
        const el = document.getElementById('match-timer');
        if (el) el.textContent = formatTime(seconds);
      }, 1000);
    }

    function formatTime(s) { return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; }

    function renderSetup() {
      const bestSmall = Storage.getBestScore('small');
      const bestMedium = Storage.getBestScore('medium');
      const bestLarge = Storage.getBestScore('large');

      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header"><h1>🧩 Matching Game</h1><p class="view-subtitle">Match pairs by flipping cards</p></div>
          ${renderInstructions('How to Play', [
            'Flip two cards at a time by clicking/tapping them',
            'If the two cards are a matching pair, they stay revealed',
            'If they don\'t match, they flip back — remember their positions!',
            'Match all pairs to complete the game',
            '<strong>JP ↔ EN:</strong> Match Japanese words to English meanings',
            '<strong>Kanji ↔ Hiragana:</strong> Match kanji to their hiragana readings',
          ])}
          <div class="setup-section">
            <div class="setup-section-title"><span class="setup-section-icon">🎯</span> Match Type</div>
            <div class="direction-selector" style="grid-template-columns: repeat(3, 1fr);">
              <button class="direction-option ${state.matchType === 'jp2en' ? 'active' : ''}" data-matchtype="jp2en">
                <span class="direction-option-icon">日↔英</span><span class="direction-option-label">JP ↔ EN</span>
              </button>
              <button class="direction-option ${state.matchType === 'kanji2hira' ? 'active' : ''}" data-matchtype="kanji2hira">
                <span class="direction-option-icon">漢↔ひ</span><span class="direction-option-label">Kanji ↔ Hira</span>
              </button>
              <button class="direction-option ${state.matchType === 'mix' ? 'active' : ''}" data-matchtype="mix">
                <span class="direction-option-icon">🔀</span><span class="direction-option-label">Random Mix</span>
              </button>
            </div>
          </div>
          <div class="setup-section">
            <div class="setup-section-title"><span class="setup-section-icon">📐</span> Grid Size</div>
            <div class="grid-size-selector">
              ${['small', 'medium', 'large'].map(size => {
                const gs = GRID_SIZES[size];
                const best = Storage.getBestScore(size);
                return `
                  <button class="grid-size-option ${state.gridSize === size ? 'active' : ''}" data-gridsize="${size}">
                    <div class="grid-size-preview ${size}">${Array(gs.pairs * 2).fill('<span class="grid-size-dot"></span>').join('')}</div>
                    <span class="grid-size-label">${size.charAt(0).toUpperCase() + size.slice(1)} (${gs.pairs} pairs)</span>
                    ${best ? `<span class="best-score-badge">🏆 ${best.moves} moves</span>` : ''}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
          ${renderCategoryFilter(state.category)}
          ${renderDifficultyFilter(state.difficulty)}
          <button class="btn btn-primary btn-lg" id="start-btn">Start Game</button>
        </div>
      `;

      // Match type listeners
      container.querySelectorAll('[data-matchtype]').forEach(btn => {
        btn.addEventListener('click', () => { state.matchType = btn.dataset.matchtype; renderSetup(); });
      });
      container.querySelectorAll('[data-gridsize]').forEach(btn => {
        btn.addEventListener('click', () => { state.gridSize = btn.dataset.gridsize; renderSetup(); });
      });
      bindSetupListeners(container, state, renderSetup);
      document.getElementById('start-btn').addEventListener('click', () => {
        if (state.matchType === 'mix') state.matchType = Math.random() > 0.5 ? 'jp2en' : 'kanji2hira';
        startSession();
      });
    }

    function renderBoard() {
      const cols = GRID_SIZES[state.gridSize].cols;
      container.innerHTML = `
        <div class="matching-view">
          <div class="matching-header">
            <div class="match-stat"><span id="match-timer">0:00</span> ⏱️</div>
            <div class="match-stat">Moves: <span id="match-moves">${moves}</span></div>
            <div class="match-stat">Pairs: <span id="match-pairs">${matchedPairs}/${pairCount}</span></div>
          </div>
          <div class="matching-grid" id="matching-grid" style="--cols: ${cols}">
            ${matchCards.map((card, i) => `
              <div class="match-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}" data-index="${i}">
                <div class="match-card-inner">
                  <div class="match-card-front"><span class="match-card-symbol">?</span></div>
                  <div class="match-card-back ${card.type === 'jp' ? 'match-jp' : 'match-en'}">
                    <span class="${card.type === 'jp' ? 'match-kanji' : 'match-meaning'}">${card.display}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      document.getElementById('matching-grid').addEventListener('click', e => {
        const cardEl = e.target.closest('.match-card');
        if (!cardEl || locked) return;
        flipCard(parseInt(cardEl.dataset.index), cardEl);
      });
    }

    function flipCard(index, element) {
      const card = matchCards[index];
      if (card.flipped || card.matched) return;
      card.flipped = true;
      element.classList.add('flipped');
      flippedCards.push({ index, element, card });

      if (flippedCards.length === 2) {
        moves++;
        document.getElementById('match-moves').textContent = moves;
        locked = true;
        const [a, b] = flippedCards;
        if (a.card.pairId === b.card.pairId && a.card.type !== b.card.type) {
          setTimeout(() => {
            a.card.matched = true; b.card.matched = true;
            a.element.classList.add('matched'); b.element.classList.add('matched');
            matchedPairs++;
            document.getElementById('match-pairs').textContent = `${matchedPairs}/${pairCount}`;
            Storage.recordAnswer(a.card.word.id, true);
            Storage.updateStreak();
            flippedCards = []; locked = false;
            if (matchedPairs === pairCount) {
              clearInterval(timerInterval);
              const isNewBest = Storage.setBestScore(state.gridSize, { moves, time: seconds });
              setTimeout(() => renderMatchResults(isNewBest), 600);
            }
          }, 400);
        } else {
          setTimeout(() => {
            a.card.flipped = false; b.card.flipped = false;
            a.element.classList.remove('flipped'); b.element.classList.remove('flipped');
            flippedCards = []; locked = false;
          }, 800);
        }
      }
    }

    function renderMatchResults(isNewBest) {
      container.innerHTML = `
        <div class="results-view"><div class="results-card">
          <h2>🎉 All Matched!</h2>
          <div class="results-score">
            <span class="results-pct">${formatTime(seconds)}</span>
            <span class="results-label">${moves} moves</span>
          </div>
          ${isNewBest ? '<div class="results-extra">🏆 New Personal Best!</div>' : ''}
          <div class="results-message">${moves <= pairCount * 1.5 ? 'Outstanding memory! 🧠' : moves <= pairCount * 2 ? 'Great job! 👏' : 'Keep practicing! 💪'}</div>
          <div class="results-actions">
            <button class="btn btn-primary" id="restart-btn">Play Again</button>
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div></div>
      `;
      document.getElementById('restart-btn').addEventListener('click', () => renderSetup());
    }

    currentCleanup = () => { if (timerInterval) clearInterval(timerInterval); };
    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // KANJI SECTION
  // ═══════════════════════════════════════════════════════════

  function renderKanji(container) {
    if (typeof KanjiHelper === 'undefined') {
      container.innerHTML = emptyState('Kanji module not loaded', 'Please refresh the page.');
      return;
    }

    const kanjiList = KanjiHelper.getKanjiList();
    const categoryCounts = KanjiHelper.getKanjiCategories();
    let currentDetailChar = null;
    let currentCategory = 'all';

    function renderBrowse() {
      const cats = ['all', ...Object.keys(N5_CATEGORIES).filter(c => categoryCounts[c])];
      
      const renderSidebarItems = () => cats.map(c => `
        <div class="kanji-sidebar-item ${currentCategory === c ? 'active' : ''}" data-cat="${c}">
          <span class="kanji-sidebar-item-icon">${c === 'all' ? '全' : N5_CATEGORIES[c].icon}</span>
          <span class="kanji-sidebar-item-name">${c === 'all' ? 'All Kanji' : N5_CATEGORIES[c].name}</span>
          <span class="kanji-sidebar-item-count">${c === 'all' ? kanjiList.length : categoryCounts[c]}</span>
        </div>
      `).join('');

      container.innerHTML = `
        <div class="view-header">
          <h1>漢 Kanji Study</h1>
          <p class="view-subtitle">${KanjiHelper.getKanjiCount()} unique kanji characters from N5 vocabulary</p>
        </div>
        ${renderInstructions('About Kanji Study', [
          'Browse all kanji characters found in the N5 vocabulary',
          'Use the sidebar to filter kanji by vocabulary category',
          'Click any kanji card to see its details, readings, and example words',
          'Kanji with more associated words appear first',
        ])}
        <div class="kanji-study-layout">
          <!-- Mobile Toggle -->
          <button class="kanji-sidebar-toggle" id="kanji-sidebar-toggle">
            <span class="kanji-sidebar-toggle-text">${currentCategory === 'all' ? 'All Kanji' : N5_CATEGORIES[currentCategory].name}</span>
            <span class="kanji-sidebar-toggle-icon">▼</span>
          </button>
          
          <!-- Mobile Dropdown -->
          <div class="kanji-sidebar-mobile" id="kanji-sidebar-mobile">
            ${renderSidebarItems()}
          </div>

          <!-- Desktop Sidebar -->
          <div class="kanji-sidebar">
            <div class="kanji-sidebar-title">Categories</div>
            <div id="kanji-sidebar-list">
              ${renderSidebarItems()}
            </div>
          </div>

          <!-- Main Content -->
          <div class="kanji-sidebar-content">
            <div class="search-bar-container">
              <input type="text" id="kanji-search" class="search-input" placeholder="Search kanji by character, reading, or meaning..." autocomplete="off" />
            </div>
            <div class="kanji-grid" id="kanji-grid">
              <!-- Rendered via JS -->
            </div>
            <div id="kanji-detail-panel" style="display:none;"></div>
          </div>
        </div>
      `;

      updateGrid();

      // Sidebar events
      container.querySelectorAll('.kanji-sidebar-item').forEach(el => {
        el.addEventListener('click', () => {
          currentCategory = el.dataset.cat;
          document.getElementById('kanji-search').value = '';
          document.getElementById('kanji-sidebar-mobile').classList.remove('open');
          document.getElementById('kanji-sidebar-toggle').classList.remove('open');
          
          // Update toggle text
          const toggleText = document.querySelector('.kanji-sidebar-toggle-text');
          if (toggleText) toggleText.textContent = currentCategory === 'all' ? 'All Kanji' : N5_CATEGORIES[currentCategory].name;
          
          // Update active classes
          container.querySelectorAll('.kanji-sidebar-item').forEach(i => i.classList.remove('active'));
          container.querySelectorAll(`.kanji-sidebar-item[data-cat="${currentCategory}"]`).forEach(i => i.classList.add('active'));
          
          updateGrid();
        });
      });

      // Mobile toggle event
      document.getElementById('kanji-sidebar-toggle')?.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        const panel = document.getElementById('kanji-sidebar-mobile');
        btn.classList.toggle('open');
        panel.classList.toggle('open');
      });

      document.getElementById('kanji-grid').addEventListener('click', e => {
        const card = e.target.closest('.kanji-card');
        if (card) showKanjiDetail(card.dataset.char);
      });

      document.getElementById('kanji-search').addEventListener('input', updateGrid);
    }

    function updateGrid() {
      const grid = document.getElementById('kanji-grid');
      const panel = document.getElementById('kanji-detail-panel');
      const search = document.getElementById('kanji-search').value.trim().toLowerCase();
      
      grid.style.display = '';
      panel.style.display = 'none';
      currentDetailChar = null;

      let list = KanjiHelper.getKanjiByCategory(currentCategory);
      if (search) {
        list = list.filter(k => 
          k.character === search ||
          k.readings.some(r => r.includes(search)) ||
          k.meanings.some(m => m.toLowerCase().includes(search)) ||
          k.words.some(w => w.kanji.includes(search))
        );
      }

      grid.innerHTML = list.map(k => {
        const mastery = Storage.getKanjiMasteryLevel(k.character);
        return `<div class="kanji-card ${mastery}" data-char="${k.character}" title="${k.meanings.slice(0, 2).join(', ')}">${k.character}</div>`;
      }).join('');
    }

    function showKanjiDetail(char) {
      const detail = KanjiHelper.getKanjiDetail(char);
      if (!detail) return;
      currentDetailChar = char;

      const grid = document.getElementById('kanji-grid');
      const panel = document.getElementById('kanji-detail-panel');
      grid.style.display = 'none';
      panel.style.display = '';

      const mastery = Storage.getKanjiMasteryLevel(char);
      panel.innerHTML = `
        <div class="kanji-detail">
          <button class="btn btn-secondary btn-sm" id="back-to-kanji">← Back to Grid</button>
          <div class="kanji-detail-char">${char}</div>
          <span class="tag tag-${mastery}" style="display: block; text-align: center; margin-bottom: 1rem; width: fit-content; margin-left: auto; margin-right: auto;">${mastery}</span>

          <div class="kanji-detail-section">
            <div class="kanji-detail-section-title">Meanings</div>
            <p style="font-size: 1.1rem; color: var(--text-primary);">${detail.meanings.join(', ')}</p>
          </div>

          <div class="kanji-detail-section">
            <div class="kanji-detail-section-title">Example Words (${detail.words.length})</div>
            ${detail.words.map(w => `
              <div class="kanji-example-word">
                <span class="kanji-example-kanji">${w.kanji}</span>
                <span class="kanji-example-reading">${w.reading}</span>
                <span class="kanji-example-meaning">${w.meaning}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      document.getElementById('back-to-kanji').addEventListener('click', () => {
        panel.style.display = 'none';
        grid.style.display = '';
        currentDetailChar = null;
      });
    }

    renderBrowse();
    
    // Check if we arrived here from KotD
    if (typeof pendingKotdChar !== 'undefined' && pendingKotdChar) {
      showKanjiDetail(pendingKotdChar);
      pendingKotdChar = null;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SPACED REPETITION REVIEW
  // ═══════════════════════════════════════════════════════════

  function renderSRS(container) {
    let dueCards = [], newCards = [], allCards = [], currentIndex = 0, isFlipped = false, actionsShown = false;
    let sessionStats = { again: 0, hard: 0, good: 0, easy: 0 };
    let keyHandler = null;

    function loadCards() {
      dueCards = SRS.getDueCards();
      newCards = SRS.getNewCards(5);
      newCards.forEach(w => SRS.introduceWord(w.id));
      allCards = [...dueCards, ...newCards.map(w => ({ ...w, srs: Storage.getWordSRS(w.id) }))];
      allCards = shuffleArray(allCards);
      currentIndex = 0; isFlipped = false; actionsShown = false;
      sessionStats = { again: 0, hard: 0, good: 0, easy: 0 };
    }

    function renderReview() {
      if (allCards.length === 0) { renderEmpty(); return; }
      if (currentIndex >= allCards.length) { renderSRSResults(); return; }

      const word = allCards[currentIndex];
      const nextIntervals = SRS.getNextIntervals(word.id);
      isFlipped = false; actionsShown = false;

      container.innerHTML = `
        <div class="srs-view">
          <div class="srs-header">
            <div class="card-counter">${currentIndex + 1} / ${allCards.length}</div>
            <div class="srs-box-info"><span class="tag tag-srs">${SRS.getBoxName(word.srs?.box || 0)}</span></div>
          </div>
          <div class="flashcard-container">
            <div class="flashcard srs-card" id="srs-card">
              <div class="flashcard-front">
                <span class="flashcard-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
                <span class="flashcard-kanji">${word.kanji}</span>
                <button class="speaker-btn" id="srs-speak-btn" aria-label="Play pronunciation" title="Play pronunciation">🔊</button>
                <span class="flashcard-hint">Tap to reveal</span>
              </div>
              <div class="flashcard-back">
                <span class="flashcard-meaning">${word.meaning}</span>
                <span class="tag">${getCategoryDisplayName(word.category)}</span>
              </div>
            </div>
          </div>
          <div class="srs-buttons" id="srs-buttons" style="visibility: hidden;">
            <button class="srs-btn srs-again" data-rating="0"><span class="srs-btn-label">Again</span><span class="srs-btn-interval">${nextIntervals.again}</span></button>
            <button class="srs-btn srs-hard" data-rating="1"><span class="srs-btn-label">Hard</span><span class="srs-btn-interval">${nextIntervals.hard}</span></button>
            <button class="srs-btn srs-good" data-rating="2"><span class="srs-btn-label">Good</span><span class="srs-btn-interval">${nextIntervals.good}</span></button>
            <button class="srs-btn srs-easy" data-rating="3"><span class="srs-btn-label">Easy</span><span class="srs-btn-interval">${nextIntervals.easy}</span></button>
          </div>
          <div class="keyboard-hints"><span>Space: Flip</span> <span>1-4: Rate</span></div>
        </div>
      `;

      const card = document.getElementById('srs-card');
      const buttons = document.getElementById('srs-buttons');
      const speakBtn = document.getElementById('srs-speak-btn');

      // Speaker button - play pronunciation
      if (speakBtn && typeof Speech !== 'undefined') {
        speakBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          Speech.speakWord(word.kanji, word.reading);
        });
      }

      card.addEventListener('click', () => {
        isFlipped = !isFlipped;
        card.classList.toggle('flipped');
        if (!actionsShown) { buttons.style.visibility = 'visible'; actionsShown = true; }
      });

      document.querySelectorAll('.srs-btn').forEach(btn => {
        btn.addEventListener('click', () => rateSRS(parseInt(btn.dataset.rating)));
      });
    }

    function rateSRS(rating) {
      const word = allCards[currentIndex];
      SRS.review(word.id, rating);
      const names = ['again', 'hard', 'good', 'easy'];
      sessionStats[names[rating]]++;
      currentIndex++;
      renderReview();
    }

    function renderEmpty() {
      container.innerHTML = `
        <div class="srs-view">
          <div class="empty-state">
            <span class="empty-emoji">🎉</span>
            <h2>You're all caught up!</h2>
            <p>No cards are due for review right now. Come back later or study with other modes.</p>
            <div class="results-actions">
              <a href="#/flashcards" class="btn btn-primary">Study Flashcards</a>
              <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
            </div>
          </div>
        </div>
      `;
    }

    function renderSRSResults() {
      const total = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy;
      const correctPct = total > 0 ? Math.round(((sessionStats.good + sessionStats.easy) / total) * 100) : 0;
      container.innerHTML = `
        <div class="results-view"><div class="results-card">
          <h2>Review Complete!</h2>
          <div class="results-score"><span class="results-pct">${correctPct}%</span><span class="results-label">${total} cards reviewed</span></div>
          <div class="srs-results-breakdown">
            <div class="srs-result-item"><span class="dot dot-again"></span> Again: ${sessionStats.again}</div>
            <div class="srs-result-item"><span class="dot dot-hard"></span> Hard: ${sessionStats.hard}</div>
            <div class="srs-result-item"><span class="dot dot-good"></span> Good: ${sessionStats.good}</div>
            <div class="srs-result-item"><span class="dot dot-easy"></span> Easy: ${sessionStats.easy}</div>
          </div>
          <div class="results-actions">
            <button class="btn btn-primary" id="srs-restart">Review More</button>
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div></div>
      `;
      document.getElementById('srs-restart').addEventListener('click', () => { loadCards(); renderReview(); });
    }

    keyHandler = (e) => {
      if (currentView !== 'srs') return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const card = document.getElementById('srs-card');
        if (card) {
          isFlipped = !isFlipped;
          card.classList.toggle('flipped');
          if (!actionsShown) {
            const btns = document.getElementById('srs-buttons');
            if (btns) btns.style.visibility = 'visible';
            actionsShown = true;
          }
        }
      } else if (actionsShown && e.key >= '1' && e.key <= '4') {
        rateSRS(parseInt(e.key) - 1);
      }
    };
    document.addEventListener('keydown', keyHandler);
    currentCleanup = () => document.removeEventListener('keydown', keyHandler);

    loadCards();
    renderReview();
  }

  // ─── Empty State Helper ────────────────────────────────────

  function emptyState(title, desc) {
    return `
      <div class="srs-view">
        <div class="empty-state">
          <span class="empty-emoji">😅</span>
          <h2>${title}</h2>
          <p>${desc}</p>
          <div class="results-actions">
            <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
          </div>
        </div>
      </div>
    `;
  }

  // ─── Mobile Navigation ────────────────────────────────────

  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.classList.toggle('open');
      });
      navLinks.addEventListener('click', (e) => {
        if (e.target.closest('.nav-link')) {
          navLinks.classList.remove('open');
          toggle.classList.remove('open');
        }
      });
    }
  }

  // ─── Public API ────────────────────────────────────────────

  return { init, navigate, initMobileNav };
})();

// Boot the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
  App.initMobileNav();
});
