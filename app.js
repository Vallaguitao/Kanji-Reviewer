/**
 * app.js — Main Application Logic
 * SPA router, view rendering, and all study mode logic.
 */

const App = (() => {
  let currentView = null;
  let currentCleanup = null;

  // ─── Router ────────────────────────────────────────────────

  function init() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute();

    // Update streak on first load
    Storage.updateStreak();
  }

  function handleRoute() {
    const hash = window.location.hash || '#/dashboard';
    const path = hash.replace('#/', '') || 'dashboard';

    // Cleanup previous view
    if (currentCleanup) {
      currentCleanup();
      currentCleanup = null;
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#/' + path);
    });

    const app = document.getElementById('app-content');
    app.classList.remove('view-enter');

    // Force reflow for animation restart
    void app.offsetWidth;
    app.classList.add('view-enter');

    switch (path) {
      case 'dashboard': renderDashboard(app); break;
      case 'categories': renderCategories(app); break;
      case 'flashcards': renderFlashcards(app); break;
      case 'quiz': renderQuiz(app); break;
      case 'typing': renderTyping(app); break;
      case 'matching': renderMatching(app); break;
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

  function getRandomItems(arr, count, exclude = []) {
    const filtered = arr.filter(item => !exclude.includes(item.id));
    return shuffleArray(filtered).slice(0, count);
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
    // Check if input matches any part of a multi-meaning target
    const parts = b.split(/[,;\/]/);
    for (const part of parts) {
      const trimmed = part.trim();
      if (a === trimmed) return true;
      // Strip "to " prefix for verbs
      if (trimmed.startsWith('to ') && a === trimmed.substring(3)) return true;
      if (a.startsWith('to ') && a.substring(3) === trimmed) return true;
      // Allow levenshtein distance of 1 for words > 3 chars
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

  // ─── Category Filter Component ─────────────────────────────

  function renderCategoryFilter(selectedCategory, onChange) {
    const categories = ['all', ...Object.keys(N5_CATEGORIES)];
    return `
      <div class="category-filter">
        ${categories.map(cat => `
          <button class="filter-chip ${cat === selectedCategory ? 'active' : ''}" 
                  data-category="${cat}">
            ${cat === 'all' ? '📚 All' : getCategoryIcon(cat) + ' ' + getCategoryDisplayName(cat)}
          </button>
        `).join('')}
      </div>
    `;
  }

  function getFilteredWords(category) {
    if (!category || category === 'all') return N5_VOCABULARY;
    return N5_VOCABULARY.filter(w => w.category === category);
  }

  // ─── Session Selector Component ────────────────────────────

  function renderSessionSelector(current) {
    return `
      <div class="session-selector">
        <span class="session-label">Cards:</span>
        ${[10, 20, 50].map(n => `
          <button class="session-btn ${n === current ? 'active' : ''}" data-count="${n}">${n}</button>
        `).join('')}
        <button class="session-btn ${current === -1 ? 'active' : ''}" data-count="-1">All</button>
      </div>
    `;
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

    const masteredPct = progress.total > 0 ? Math.round((progress.mastered / progress.total) * 100) : 0;
    const learnedPct = progress.total > 0 ? Math.round(((progress.mastered + progress.reviewing + progress.learning) / progress.total) * 100) : 0;

    // SVG progress ring
    const radius = 58;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (learnedPct / 100) * circumference;

    container.innerHTML = `
      <div class="dashboard">
        <div class="sakura-container" aria-hidden="true">
          ${Array.from({length: 12}, (_, i) => `<div class="sakura-petal" style="--delay: ${i * 0.8}s; --x: ${Math.random() * 100}%; --duration: ${6 + Math.random() * 6}s; --drift: ${-30 + Math.random() * 60}px;"></div>`).join('')}
        </div>

        <div class="dashboard-header">
          <h1 class="dashboard-title">
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
        </div>

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
              <div class="progress-stat">
                <span class="stat-num">${progress.mastered}</span>
                <span class="stat-lbl">Mastered</span>
              </div>
              <div class="progress-stat">
                <span class="stat-num">${progress.reviewing}</span>
                <span class="stat-lbl">Reviewing</span>
              </div>
              <div class="progress-stat">
                <span class="stat-num">${progress.learning}</span>
                <span class="stat-lbl">Learning</span>
              </div>
              <div class="progress-stat">
                <span class="stat-num">${progress.new}</span>
                <span class="stat-lbl">New</span>
              </div>
            </div>
          </div>

          <!-- Today's Stats -->
          <div class="stat-card stat-card-today">
            <h3 class="stat-card-title">Today's Study</h3>
            <div class="today-stats">
              <div class="today-stat">
                <span class="today-num">${todayStats.reviewed}</span>
                <span class="today-lbl">Reviewed</span>
              </div>
              <div class="today-stat">
                <span class="today-num">${todayStats.correct}</span>
                <span class="today-lbl">Correct</span>
              </div>
              <div class="today-stat">
                <span class="today-num">${Storage.getTodayAccuracy()}%</span>
                <span class="today-lbl">Accuracy</span>
              </div>
            </div>
            ${accuracy > 0 ? `
              <div class="overall-accuracy">
                <span class="accuracy-label">Overall Accuracy</span>
                <div class="progress-bar">
                  <div class="progress-bar-fill" style="width: ${accuracy}%"></div>
                </div>
                <span class="accuracy-value">${accuracy}%</span>
              </div>
            ` : ''}
          </div>

          <!-- SRS Status -->
          <div class="stat-card stat-card-srs">
            <h3 class="stat-card-title">Spaced Repetition</h3>
            <div class="srs-status">
              ${srsStats.dueCount > 0 ? `
                <div class="srs-due-badge">
                  <span class="srs-due-num">${srsStats.dueCount}</span>
                  <span class="srs-due-label">cards due for review</span>
                </div>
                <a href="#/srs" class="btn btn-primary btn-sm">Review Now</a>
              ` : `
                <div class="srs-caught-up">
                  <span class="srs-emoji">🎉</span>
                  <span>You're all caught up!</span>
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Study Modes -->
        <h2 class="section-title">Study Modes</h2>
        <div class="mode-grid">
          <a href="#/flashcards" class="mode-card" id="mode-flashcards">
            <div class="mode-icon">🃏</div>
            <div class="mode-info">
              <h3>Flashcards</h3>
              <p>Flip cards to reveal meanings</p>
            </div>
          </a>
          <a href="#/quiz" class="mode-card" id="mode-quiz">
            <div class="mode-icon">📝</div>
            <div class="mode-info">
              <h3>Multiple Choice</h3>
              <p>Pick the correct meaning</p>
            </div>
          </a>
          <a href="#/typing" class="mode-card" id="mode-typing">
            <div class="mode-icon">⌨️</div>
            <div class="mode-info">
              <h3>Typing Practice</h3>
              <p>Type the English meaning</p>
            </div>
          </a>
          <a href="#/matching" class="mode-card" id="mode-matching">
            <div class="mode-icon">🧩</div>
            <div class="mode-info">
              <h3>Matching Game</h3>
              <p>Match Japanese to English</p>
            </div>
          </a>
          <a href="#/srs" class="mode-card mode-card-srs" id="mode-srs">
            <div class="mode-icon">🧠</div>
            <div class="mode-info">
              <h3>Spaced Repetition</h3>
              <p>Smart review scheduling</p>
            </div>
            ${srsStats.dueCount > 0 ? `<span class="mode-badge">${srsStats.dueCount}</span>` : ''}
          </a>
          <a href="#/categories" class="mode-card" id="mode-categories">
            <div class="mode-icon">📂</div>
            <div class="mode-info">
              <h3>Browse Words</h3>
              <p>Explore by category</p>
            </div>
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
                  <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${pct}%; --bar-color: ${N5_CATEGORIES[cat]?.color || 'var(--accent-sakura)'}"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════
  // CATEGORY BROWSER VIEW
  // ═══════════════════════════════════════════════════════════

  function renderCategories(container) {
    const catProgress = Storage.getCategoryProgress();

    // Group words by category
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
                  <div>
                    <h3>${getCategoryDisplayName(cat)}</h3>
                    <span class="category-count">${words.length} words</span>
                  </div>
                </div>
                <div class="progress-bar progress-bar-sm">
                  <div class="progress-bar-fill" style="width: ${pct}%; --bar-color: ${N5_CATEGORIES[cat]?.color || 'var(--accent-sakura)'}"></div>
                </div>
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

    // Event handlers
    const grid = document.getElementById('category-grid');
    const panel = document.getElementById('word-list-panel');

    grid.addEventListener('click', e => {
      const card = e.target.closest('.category-card');
      if (!card) return;
      const cat = card.dataset.category;
      showWordList(cat, categories[cat]);
    });

    document.getElementById('back-to-categories').addEventListener('click', () => {
      panel.style.display = 'none';
      grid.style.display = '';
      document.querySelector('.search-bar-container').style.display = '';
    });

    // Search
    const searchInput = document.getElementById('word-search');
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase().trim();
      if (query.length === 0) {
        grid.style.display = '';
        panel.style.display = 'none';
        return;
      }

      const results = N5_VOCABULARY.filter(w =>
        w.kanji.includes(query) ||
        w.reading.includes(query) ||
        w.meaning.toLowerCase().includes(query)
      );

      showWordList(`Search: "${searchInput.value}"`, results);
    });

    function showWordList(title, words) {
      grid.style.display = 'none';
      document.querySelector('.search-bar-container').style.display = '';
      panel.style.display = '';
      document.getElementById('word-list-title').textContent = typeof title === 'string' && !title.startsWith('Search') ? getCategoryDisplayName(title) : title;
      const list = document.getElementById('word-list');
      list.innerHTML = words.map(w => {
        const mastery = Storage.getWordMasteryLevel(w.id);
        const masteryClass = `mastery-${mastery}`;
        return `
          <div class="word-item ${masteryClass}">
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
    let selectedCategory = 'all';
    let sessionSize = 20;
    let cards = [];
    let currentIndex = 0;
    let isFlipped = false;
    let sessionCorrect = 0;
    let sessionTotal = 0;
    let keyHandler = null;

    function startSession() {
      const pool = getFilteredWords(selectedCategory);
      const count = sessionSize === -1 ? pool.length : Math.min(sessionSize, pool.length);
      cards = shuffleArray(pool).slice(0, count);
      currentIndex = 0;
      isFlipped = false;
      sessionCorrect = 0;
      sessionTotal = 0;
      renderCard();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header">
            <h1>🃏 Flashcards</h1>
            <p class="view-subtitle">Flip cards to test your knowledge</p>
          </div>
          ${renderCategoryFilter(selectedCategory)}
          ${renderSessionSelector(sessionSize)}
          <button class="btn btn-primary btn-lg" id="start-flashcards">Start Studying</button>
        </div>
      `;

      container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          selectedCategory = chip.dataset.category;
          renderSetup();
        });
      });

      container.querySelectorAll('.session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sessionSize = parseInt(btn.dataset.count);
          renderSetup();
        });
      });

      document.getElementById('start-flashcards').addEventListener('click', startSession);
    }

    function renderCard() {
      if (currentIndex >= cards.length) {
        renderResults();
        return;
      }

      const word = cards[currentIndex];
      isFlipped = false;

      container.innerHTML = `
        <div class="flashcard-view">
          <div class="card-counter">${currentIndex + 1} / ${cards.length}</div>
          <div class="flashcard-container">
            <div class="flashcard" id="flashcard">
              <div class="flashcard-front">
                <span class="flashcard-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
                <span class="flashcard-kanji">${word.kanji}</span>
                <span class="flashcard-hint">Tap to flip</span>
              </div>
              <div class="flashcard-back">
                <span class="flashcard-meaning">${word.meaning}</span>
                <span class="tag tag-${word.category}">${getCategoryDisplayName(word.category)}</span>
              </div>
            </div>
          </div>
          <div class="flashcard-actions" id="flashcard-actions" style="visibility: hidden;">
            <button class="btn btn-danger" id="fc-dont-know">✕ Don't Know</button>
            <button class="btn btn-success" id="fc-know">✓ Know</button>
          </div>
          <div class="keyboard-hints">
            <span>Space: Flip</span> <span>←: Don't Know</span> <span>→: Know</span>
          </div>
        </div>
      `;

      const flashcard = document.getElementById('flashcard');
      const actions = document.getElementById('flashcard-actions');

      flashcard.addEventListener('click', () => {
        if (!isFlipped) {
          isFlipped = true;
          flashcard.classList.add('flipped');
          actions.style.visibility = 'visible';
        }
      });

      document.getElementById('fc-know').addEventListener('click', () => answer(true));
      document.getElementById('fc-dont-know').addEventListener('click', () => answer(false));

      // Touch swipe support
      let touchStartX = 0;
      flashcard.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
      flashcard.addEventListener('touchend', e => {
        const diff = e.changedTouches[0].screenX - touchStartX;
        if (isFlipped && Math.abs(diff) > 50) {
          answer(diff > 0); // Swipe right = know, swipe left = don't know
        }
      }, { passive: true });
    }

    function answer(correct) {
      const word = cards[currentIndex];
      Storage.recordAnswer(word.id, correct);
      Storage.updateStreak();
      if (correct) sessionCorrect++;
      sessionTotal++;
      currentIndex++;
      renderCard();
    }

    function renderResults() {
      const pct = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
      container.innerHTML = `
        <div class="results-view">
          <div class="results-card">
            <h2>Session Complete!</h2>
            <div class="results-score">
              <span class="results-pct">${pct}%</span>
              <span class="results-label">${sessionCorrect} / ${sessionTotal} correct</span>
            </div>
            <div class="results-message">${getResultMessage(pct)}</div>
            <div class="results-actions">
              <button class="btn btn-primary" id="fc-restart">Study Again</button>
              <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('fc-restart').addEventListener('click', () => renderSetup());
    }

    // Keyboard handler
    keyHandler = (e) => {
      if (currentView !== 'flashcards') return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const fc = document.getElementById('flashcard');
        if (fc && !isFlipped) {
          isFlipped = true;
          fc.classList.add('flipped');
          const actions = document.getElementById('flashcard-actions');
          if (actions) actions.style.visibility = 'visible';
        }
      } else if (e.key === 'ArrowRight' && isFlipped) {
        answer(true);
      } else if (e.key === 'ArrowLeft' && isFlipped) {
        answer(false);
      }
    };
    document.addEventListener('keydown', keyHandler);
    currentCleanup = () => {
      document.removeEventListener('keydown', keyHandler);
    };

    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // MULTIPLE CHOICE QUIZ
  // ═══════════════════════════════════════════════════════════

  function renderQuiz(container) {
    let selectedCategory = 'all';
    let sessionSize = 20;
    let questions = [];
    let currentIndex = 0;
    let score = 0;
    let answered = false;

    function startSession() {
      const pool = getFilteredWords(selectedCategory);
      const count = sessionSize === -1 ? pool.length : Math.min(sessionSize, pool.length);
      questions = shuffleArray(pool).slice(0, count);
      currentIndex = 0;
      score = 0;
      answered = false;
      renderQuestion();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header">
            <h1>📝 Multiple Choice Quiz</h1>
            <p class="view-subtitle">Pick the correct English meaning</p>
          </div>
          ${renderCategoryFilter(selectedCategory)}
          ${renderSessionSelector(sessionSize)}
          <button class="btn btn-primary btn-lg" id="start-quiz">Start Quiz</button>
        </div>
      `;

      container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          selectedCategory = chip.dataset.category;
          renderSetup();
        });
      });

      container.querySelectorAll('.session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sessionSize = parseInt(btn.dataset.count);
          renderSetup();
        });
      });

      document.getElementById('start-quiz').addEventListener('click', startSession);
    }

    function renderQuestion() {
      if (currentIndex >= questions.length) {
        renderQuizResults();
        return;
      }

      const word = questions[currentIndex];
      answered = false;

      // Generate distractors from the same category if possible
      let pool = N5_VOCABULARY.filter(w => w.category === word.category && w.id !== word.id);
      if (pool.length < 3) pool = N5_VOCABULARY.filter(w => w.id !== word.id);
      const distractors = shuffleArray(pool).slice(0, 3);
      const options = shuffleArray([word, ...distractors]);

      container.innerHTML = `
        <div class="quiz-view">
          <div class="quiz-header">
            <div class="card-counter">${currentIndex + 1} / ${questions.length}</div>
            <div class="quiz-score">Score: ${score}</div>
          </div>
          <div class="quiz-word-container">
            <span class="quiz-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
            <span class="quiz-word">${word.kanji}</span>
          </div>
          <div class="quiz-options" id="quiz-options">
            ${options.map((opt, i) => `
              <button class="quiz-option" data-id="${opt.id}" data-correct="${opt.id === word.id}">
                ${opt.meaning}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;

          const isCorrect = btn.dataset.correct === 'true';
          Storage.recordAnswer(word.id, isCorrect);
          Storage.updateStreak();

          if (isCorrect) {
            score++;
            btn.classList.add('correct');
          } else {
            btn.classList.add('wrong');
            // Highlight the correct answer
            document.querySelector(`.quiz-option[data-correct="true"]`).classList.add('correct');
          }

          setTimeout(() => {
            currentIndex++;
            renderQuestion();
          }, 1200);
        });
      });
    }

    function renderQuizResults() {
      const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
      container.innerHTML = `
        <div class="results-view">
          <div class="results-card">
            <h2>Quiz Complete!</h2>
            <div class="results-score">
              <span class="results-pct">${pct}%</span>
              <span class="results-label">${score} / ${questions.length} correct</span>
            </div>
            <div class="results-message">${getResultMessage(pct)}</div>
            <div class="results-actions">
              <button class="btn btn-primary" id="quiz-restart">Try Again</button>
              <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('quiz-restart').addEventListener('click', () => renderSetup());
    }

    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // TYPING PRACTICE
  // ═══════════════════════════════════════════════════════════

  function renderTyping(container) {
    let selectedCategory = 'all';
    let sessionSize = 20;
    let words = [];
    let currentIndex = 0;
    let score = 0;
    let streak = 0;
    let bestStreak = 0;

    function startSession() {
      const pool = getFilteredWords(selectedCategory);
      const count = sessionSize === -1 ? pool.length : Math.min(sessionSize, pool.length);
      words = shuffleArray(pool).slice(0, count);
      currentIndex = 0;
      score = 0;
      streak = 0;
      bestStreak = 0;
      renderPrompt();
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header">
            <h1>⌨️ Typing Practice</h1>
            <p class="view-subtitle">Type the English meaning</p>
          </div>
          ${renderCategoryFilter(selectedCategory)}
          ${renderSessionSelector(sessionSize)}
          <button class="btn btn-primary btn-lg" id="start-typing">Start Practicing</button>
        </div>
      `;

      container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          selectedCategory = chip.dataset.category;
          renderSetup();
        });
      });

      container.querySelectorAll('.session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sessionSize = parseInt(btn.dataset.count);
          renderSetup();
        });
      });

      document.getElementById('start-typing').addEventListener('click', startSession);
    }

    function renderPrompt() {
      if (currentIndex >= words.length) {
        renderTypingResults();
        return;
      }

      const word = words[currentIndex];

      container.innerHTML = `
        <div class="typing-view">
          <div class="typing-header">
            <div class="card-counter">${currentIndex + 1} / ${words.length}</div>
            <div class="typing-streak ${streak > 0 ? 'active' : ''}">
              ${streak > 0 ? `🔥 ${streak} streak` : ''}
            </div>
            <div class="quiz-score">Score: ${score}</div>
          </div>
          <div class="typing-prompt">
            <span class="typing-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
            <span class="typing-kanji">${word.kanji}</span>
          </div>
          <div class="typing-input-container">
            <input type="text" id="typing-input" class="typing-input" placeholder="Type the English meaning..." autocomplete="off" autofocus />
            <button class="btn btn-primary" id="typing-submit">Check</button>
          </div>
          <div class="typing-feedback" id="typing-feedback"></div>
          <button class="btn btn-secondary btn-sm" id="typing-skip" style="margin-top: 1rem;">Skip →</button>
        </div>
      `;

      const input = document.getElementById('typing-input');
      const submitBtn = document.getElementById('typing-submit');
      const feedback = document.getElementById('typing-feedback');

      function checkAnswer() {
        const userAnswer = input.value.trim();
        if (!userAnswer) return;

        const isCorrect = fuzzyMatch(userAnswer, word.meaning);
        Storage.recordAnswer(word.id, isCorrect);
        Storage.updateStreak();

        if (isCorrect) {
          score++;
          streak++;
          bestStreak = Math.max(bestStreak, streak);
          feedback.innerHTML = `<span class="feedback-correct">✓ Correct!</span>`;
          feedback.className = 'typing-feedback show correct';
        } else {
          streak = 0;
          feedback.innerHTML = `<span class="feedback-wrong">✕ ${word.meaning}</span>`;
          feedback.className = 'typing-feedback show wrong';
        }

        input.disabled = true;
        submitBtn.disabled = true;

        setTimeout(() => {
          currentIndex++;
          renderPrompt();
        }, 1500);
      }

      submitBtn.addEventListener('click', checkAnswer);
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkAnswer();
      });

      document.getElementById('typing-skip').addEventListener('click', () => {
        streak = 0;
        Storage.recordAnswer(word.id, false);
        feedback.innerHTML = `<span class="feedback-skip">Skipped — ${word.meaning}</span>`;
        feedback.className = 'typing-feedback show wrong';
        setTimeout(() => {
          currentIndex++;
          renderPrompt();
        }, 1200);
      });

      // Auto-focus input
      setTimeout(() => input.focus(), 100);
    }

    function renderTypingResults() {
      const pct = words.length > 0 ? Math.round((score / words.length) * 100) : 0;
      container.innerHTML = `
        <div class="results-view">
          <div class="results-card">
            <h2>Practice Complete!</h2>
            <div class="results-score">
              <span class="results-pct">${pct}%</span>
              <span class="results-label">${score} / ${words.length} correct</span>
            </div>
            <div class="results-extra">Best streak: 🔥 ${bestStreak}</div>
            <div class="results-message">${getResultMessage(pct)}</div>
            <div class="results-actions">
              <button class="btn btn-primary" id="typing-restart">Practice Again</button>
              <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('typing-restart').addEventListener('click', () => renderSetup());
    }

    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // MATCHING GAME
  // ═══════════════════════════════════════════════════════════

  function renderMatching(container) {
    let selectedCategory = 'all';
    let pairCount = 6;
    let matchCards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let timerInterval = null;
    let seconds = 0;
    let locked = false;

    function startSession() {
      const pool = getFilteredWords(selectedCategory);
      const pairs = shuffleArray(pool).slice(0, pairCount);

      // Create card array: each pair makes 2 cards (one JP, one EN)
      matchCards = [];
      pairs.forEach((word, i) => {
        matchCards.push({ pairId: i, type: 'jp', display: word.kanji, word, flipped: false, matched: false });
        matchCards.push({ pairId: i, type: 'en', display: word.meaning, word, flipped: false, matched: false });
      });
      matchCards = shuffleArray(matchCards);
      flippedCards = [];
      matchedPairs = 0;
      moves = 0;
      seconds = 0;
      locked = false;
      renderBoard();
      startTimer();
    }

    function startTimer() {
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(() => {
        seconds++;
        const timerEl = document.getElementById('match-timer');
        if (timerEl) timerEl.textContent = formatTime(seconds);
      }, 1000);
    }

    function formatTime(s) {
      const mins = Math.floor(s / 60);
      const secs = s % 60;
      return `${mins}:${String(secs).padStart(2, '0')}`;
    }

    function renderSetup() {
      container.innerHTML = `
        <div class="study-setup">
          <div class="view-header">
            <h1>🧩 Matching Game</h1>
            <p class="view-subtitle">Match Japanese words to their English meanings</p>
          </div>
          ${renderCategoryFilter(selectedCategory)}
          <div class="session-selector">
            <span class="session-label">Pairs:</span>
            ${[4, 6, 8].map(n => `
              <button class="session-btn ${n === pairCount ? 'active' : ''}" data-count="${n}">${n}</button>
            `).join('')}
          </div>
          <button class="btn btn-primary btn-lg" id="start-matching">Start Game</button>
        </div>
      `;

      container.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          selectedCategory = chip.dataset.category;
          renderSetup();
        });
      });

      container.querySelectorAll('.session-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          pairCount = parseInt(btn.dataset.count);
          renderSetup();
        });
      });

      document.getElementById('start-matching').addEventListener('click', startSession);
    }

    function renderBoard() {
      const cols = matchCards.length <= 8 ? 4 : matchCards.length <= 12 ? 4 : 4;

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
                  <div class="match-card-front">
                    <span class="match-card-symbol">?</span>
                  </div>
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
        const idx = parseInt(cardEl.dataset.index);
        flipCard(idx, cardEl);
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
          // Match!
          setTimeout(() => {
            a.card.matched = true;
            b.card.matched = true;
            a.element.classList.add('matched');
            b.element.classList.add('matched');
            matchedPairs++;
            document.getElementById('match-pairs').textContent = `${matchedPairs}/${pairCount}`;

            // Record progress
            Storage.recordAnswer(a.card.word.id, true);
            Storage.updateStreak();

            flippedCards = [];
            locked = false;

            if (matchedPairs === pairCount) {
              clearInterval(timerInterval);
              setTimeout(() => renderMatchResults(), 600);
            }
          }, 400);
        } else {
          // No match
          setTimeout(() => {
            a.card.flipped = false;
            b.card.flipped = false;
            a.element.classList.remove('flipped');
            b.element.classList.remove('flipped');
            flippedCards = [];
            locked = false;
          }, 800);
        }
      }
    }

    function renderMatchResults() {
      container.innerHTML = `
        <div class="results-view">
          <div class="results-card">
            <h2>🎉 All Matched!</h2>
            <div class="results-score">
              <span class="results-pct">${formatTime(seconds)}</span>
              <span class="results-label">${moves} moves</span>
            </div>
            <div class="results-message">${moves <= pairCount * 1.5 ? 'Outstanding memory! 🧠' : moves <= pairCount * 2 ? 'Great job! 👏' : 'Keep practicing! 💪'}</div>
            <div class="results-actions">
              <button class="btn btn-primary" id="match-restart">Play Again</button>
              <a href="#/dashboard" class="btn btn-secondary">Dashboard</a>
            </div>
          </div>
        </div>
      `;
      document.getElementById('match-restart').addEventListener('click', () => renderSetup());
    }

    currentCleanup = () => {
      if (timerInterval) clearInterval(timerInterval);
    };

    renderSetup();
  }

  // ═══════════════════════════════════════════════════════════
  // SPACED REPETITION REVIEW
  // ═══════════════════════════════════════════════════════════

  function renderSRS(container) {
    let dueCards = [];
    let newCards = [];
    let allCards = [];
    let currentIndex = 0;
    let isFlipped = false;
    let sessionStats = { again: 0, hard: 0, good: 0, easy: 0 };
    let keyHandler = null;

    function loadCards() {
      dueCards = SRS.getDueCards();
      newCards = SRS.getNewCards(5); // Introduce 5 new words per session
      newCards.forEach(w => SRS.introduceWord(w.id));
      allCards = [...dueCards, ...newCards.map(w => ({ ...w, srs: Storage.getWordSRS(w.id) }))];
      allCards = shuffleArray(allCards);
      currentIndex = 0;
      isFlipped = false;
      sessionStats = { again: 0, hard: 0, good: 0, easy: 0 };
    }

    function renderReview() {
      if (allCards.length === 0) {
        renderEmpty();
        return;
      }

      if (currentIndex >= allCards.length) {
        renderSRSResults();
        return;
      }

      const word = allCards[currentIndex];
      const nextIntervals = SRS.getNextIntervals(word.id);
      isFlipped = false;

      container.innerHTML = `
        <div class="srs-view">
          <div class="srs-header">
            <div class="card-counter">${currentIndex + 1} / ${allCards.length}</div>
            <div class="srs-box-info">
              <span class="tag tag-srs">${SRS.getBoxName(word.srs?.box || 0)}</span>
            </div>
          </div>
          <div class="flashcard-container">
            <div class="flashcard srs-card" id="srs-card">
              <div class="flashcard-front">
                <span class="flashcard-reading">${word.kanji !== word.reading ? word.reading : ''}</span>
                <span class="flashcard-kanji">${word.kanji}</span>
                <span class="flashcard-hint">Tap to reveal</span>
              </div>
              <div class="flashcard-back">
                <span class="flashcard-meaning">${word.meaning}</span>
                <span class="tag tag-${word.category}">${getCategoryDisplayName(word.category)}</span>
              </div>
            </div>
          </div>
          <div class="srs-buttons" id="srs-buttons" style="visibility: hidden;">
            <button class="srs-btn srs-again" data-rating="0">
              <span class="srs-btn-label">Again</span>
              <span class="srs-btn-interval">${nextIntervals.again}</span>
            </button>
            <button class="srs-btn srs-hard" data-rating="1">
              <span class="srs-btn-label">Hard</span>
              <span class="srs-btn-interval">${nextIntervals.hard}</span>
            </button>
            <button class="srs-btn srs-good" data-rating="2">
              <span class="srs-btn-label">Good</span>
              <span class="srs-btn-interval">${nextIntervals.good}</span>
            </button>
            <button class="srs-btn srs-easy" data-rating="3">
              <span class="srs-btn-label">Easy</span>
              <span class="srs-btn-interval">${nextIntervals.easy}</span>
            </button>
          </div>
          <div class="keyboard-hints">
            <span>Space: Flip</span> <span>1-4: Rate</span>
          </div>
        </div>
      `;

      const card = document.getElementById('srs-card');
      const buttons = document.getElementById('srs-buttons');

      card.addEventListener('click', () => {
        if (!isFlipped) {
          isFlipped = true;
          card.classList.add('flipped');
          buttons.style.visibility = 'visible';
        }
      });

      document.querySelectorAll('.srs-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const rating = parseInt(btn.dataset.rating);
          rateSRS(rating);
        });
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
        <div class="results-view">
          <div class="results-card">
            <h2>Review Complete!</h2>
            <div class="results-score">
              <span class="results-pct">${correctPct}%</span>
              <span class="results-label">${total} cards reviewed</span>
            </div>
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
          </div>
        </div>
      `;
      document.getElementById('srs-restart').addEventListener('click', () => {
        loadCards();
        renderReview();
      });
    }

    // Keyboard handler
    keyHandler = (e) => {
      if (currentView !== 'srs') return;
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const card = document.getElementById('srs-card');
        if (card && !isFlipped) {
          isFlipped = true;
          card.classList.add('flipped');
          const btns = document.getElementById('srs-buttons');
          if (btns) btns.style.visibility = 'visible';
        }
      } else if (isFlipped && e.key >= '1' && e.key <= '4') {
        rateSRS(parseInt(e.key) - 1);
      }
    };
    document.addEventListener('keydown', keyHandler);
    currentCleanup = () => {
      document.removeEventListener('keydown', keyHandler);
    };

    loadCards();
    renderReview();
  }

  // ─── Result Messages ──────────────────────────────────────

  function getResultMessage(pct) {
    if (pct >= 95) return '🌸 Perfect! You\'re a master! 🌸';
    if (pct >= 80) return '🎯 Excellent work! Keep it up!';
    if (pct >= 60) return '👍 Good progress! Keep studying!';
    if (pct >= 40) return '💪 Getting there! Practice makes perfect!';
    return '📚 Keep studying! You\'ll improve!';
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
      // Close nav on link click (mobile)
      navLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
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
