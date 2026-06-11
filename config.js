/**
 * config.js — Application Configuration
 * Centralized configuration for the JLPT N5 Vocabulary Trainer
 */

const CONFIG = {
  // App Info
  APP_NAME: '漢字マスター',
  APP_VERSION: '2.0.0',
  
  // SRS Settings
  SRS: {
    BOX_INTERVALS: [0, 1, 3, 7],
    BOX_NAMES: ['New', 'Learning', 'Reviewing', 'Mastered'],
    MIN_EASE: 1.3,
    MAX_EASE: 3.0,
    DEFAULT_EASE: 2.5,
    HARD_MULTIPLIER: 1.2,
    GOOD_MULTIPLIER: 1.0,
    EASY_MULTIPLIER: 1.3,
    EASE_DECREASE_AGAIN: 0.2,
    EASE_DECREASE_HARD: 0.15,
    EASE_INCREASE_EASY: 0.1,
    MAX_INTERVAL_DAYS: 365,
  },
  
  // Learning Settings
  LEARNING: {
    DEFAULT_SESSION_SIZE: 20,
    SESSION_SIZES: [10, 20, 50, -1], // -1 means all
    TIMER_OPTIONS: [0, 10, 15, 30], // 0 means off
    QUIZ_OPTIONS_COUNT: 4,
    MATCHING_PAIRS: 6,
  },
  
  // Mastery Thresholds
  MASTERY: {
    MASTERED_CORRECT: 5,
    MASTERED_ACCURACY: 0.9,
    REVIEWING_CORRECT: 3,
    REVIEWING_ACCURACY: 0.7,
  },
  
  // UI Settings
  UI: {
    ANIMATION_DURATION_FAST: 150,
    ANIMATION_DURATION_NORMAL: 300,
    ANIMATION_DURATION_SLOW: 500,
    DEBOUNCE_DELAY: 300,
    TOAST_DURATION: 3000,
  },
  
  // Storage Keys
  STORAGE: {
    PREFIX: 'n5vocab_',
    KEYS: {
      WORD_PROGRESS: 'wordProgress',
      SRS_DATA: 'srsData',
      STREAK: 'streak',
      TODAY_STATS: 'todayStats',
      SETTINGS: 'settings',
      LAST_MODE: 'lastMode',
      MODE_USAGE: 'modeUsage',
      BEST_SCORES: 'bestScores',
      KANJI_PROGRESS: 'kanjiProgress',
      THEME: 'theme',
      PREFERENCES: 'preferences',
    }
  },
  
  // Keyboard Shortcuts
  SHORTCUTS: {
    FLASHCARDS: {
      FLIP: 'Space',
      NEXT: 'Enter',
      AGAIN: '1',
      HARD: '2',
      GOOD: '3',
      EASY: '4',
    },
    QUIZ: {
      OPTION_1: '1',
      OPTION_2: '2',
      OPTION_3: '3',
      OPTION_4: '4',
    },
    TYPING: {
      SUBMIT: 'Enter',
      SKIP: 'Escape',
    },
    GLOBAL: {
      DASHBOARD: 'g d',
      FLASHCARDS: 'g f',
      QUIZ: 'g q',
      TYPING: 'g t',
      MATCHING: 'g m',
      SRS: 'g s',
      KANJI: 'g k',
      HELP: '?',
      THEME_TOGGLE: 't',
    }
  },
  
  // Tips for Dashboard
  TIPS: [
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
  ],
  
  // Hero Phrases (Japanese proverbs)
  HERO_PHRASES: [
    '一日一歩 — One step each day',
    '継続は力なり — Persistence is power',
    '七転び八起き — Fall seven times, rise eight',
    '石の上にも三年 — Perseverance prevails',
    '千里の道も一歩から — A journey of 1000 miles begins with a single step',
    '学問に王道なし — There is no royal road to learning',
    '塵も積もれば山となる — Even dust piled up becomes a mountain',
  ],
};

// Freeze config to prevent modifications
Object.freeze(CONFIG);
Object.freeze(CONFIG.SRS);
Object.freeze(CONFIG.LEARNING);
Object.freeze(CONFIG.MASTERY);
Object.freeze(CONFIG.UI);
Object.freeze(CONFIG.STORAGE);
Object.freeze(CONFIG.STORAGE.KEYS);
Object.freeze(CONFIG.SHORTCUTS);
Object.freeze(CONFIG.SHORTCUTS.FLASHCARDS);
Object.freeze(CONFIG.SHORTCUTS.QUIZ);
Object.freeze(CONFIG.SHORTCUTS.TYPING);
Object.freeze(CONFIG.SHORTCUTS.GLOBAL);
