/**
 * srs.js — Spaced Repetition System (SM-2 Inspired)
 * 
 * Implements a simplified spaced repetition algorithm with 4 difficulty ratings.
 * Words progress through boxes: New → Learning → Reviewing → Mastered
 * 
 * Intervals (in days):
 *   Box 0 (New):       0 days (immediate review)
 *   Box 1 (Learning):  1 day
 *   Box 2 (Reviewing): 3 days → 7 days → 14 days (ease-modified)
 *   Box 3 (Mastered):  30+ days
 */

const SRS = (() => {
  // Minimum intervals per box (in days)
  const BOX_INTERVALS = [0, 1, 3, 7];
  const BOX_NAMES = ['New', 'Learning', 'Reviewing', 'Mastered'];

  // Rating multipliers
  const RATING = {
    AGAIN: 0,  // Reset to box 0
    HARD: 1,   // Stay in current box, small interval increase
    GOOD: 2,   // Normal progression
    EASY: 3,   // Accelerated progression
  };

  /**
   * Calculate the next review state for a word based on the user's rating.
   * 
   * @param {number} wordId - The word's ID
   * @param {number} rating - 0 (Again), 1 (Hard), 2 (Good), 3 (Easy)
   * @returns {Object} Updated SRS entry
   */
  function review(wordId, rating) {
    const current = Storage.getWordSRS(wordId);
    let { interval, ease, box } = current;

    // Default ease factor
    if (!ease || ease < 1.3) ease = 2.5;

    switch (rating) {
      case RATING.AGAIN:
        // Reset: go back to box 0, minimum interval
        box = 0;
        interval = 0;
        ease = Math.max(1.3, ease - 0.2);
        break;

      case RATING.HARD:
        // Stay in current box, slight interval increase
        interval = Math.max(1, interval * 1.2);
        ease = Math.max(1.3, ease - 0.15);
        break;

      case RATING.GOOD:
        // Normal progression
        if (box < 3) box++;
        if (interval === 0) {
          interval = 1;
        } else {
          interval = interval * ease;
        }
        break;

      case RATING.EASY:
        // Accelerated progression
        if (box < 3) box = Math.min(3, box + 1);
        if (interval === 0) {
          interval = 3;
        } else {
          interval = interval * ease * 1.3;
        }
        ease = Math.min(3.0, ease + 0.1);
        break;
    }

    // Cap maximum interval at 365 days
    interval = Math.min(365, Math.round(interval * 10) / 10);

    // Calculate next review timestamp
    const nextReview = Date.now() + (interval * 24 * 60 * 60 * 1000);

    const entry = { interval, ease, nextReview, box };
    Storage.updateSRS(wordId, entry);

    // Also record in general word progress
    const isCorrect = rating >= RATING.GOOD;
    Storage.recordAnswer(wordId, isCorrect);

    return entry;
  }

  /**
   * Get all words that are due for review (nextReview <= now).
   * Returns word objects from N5_VOCABULARY.
   */
  function getDueCards() {
    if (typeof N5_VOCABULARY === 'undefined') return [];

    const srsData = Storage.getSRSData();
    const now = Date.now();
    const due = [];

    for (const word of N5_VOCABULARY) {
      const srs = srsData[word.id];
      if (!srs) {
        // Never reviewed — it's a new card, but don't auto-add
        continue;
      }
      if (srs.nextReview <= now) {
        due.push({ ...word, srs });
      }
    }

    // Sort: most overdue first (smallest nextReview)
    due.sort((a, b) => a.srs.nextReview - b.srs.nextReview);

    return due;
  }

  /**
   * Get new words that have never been introduced to SRS.
   * @param {number} count - Number of new words to fetch
   * @param {string} [category] - Optional category filter
   */
  function getNewCards(count = 10, category = null) {
    if (typeof N5_VOCABULARY === 'undefined') return [];

    const srsData = Storage.getSRSData();
    const newCards = [];

    for (const word of N5_VOCABULARY) {
      if (category && word.category !== category) continue;
      if (!srsData[word.id]) {
        newCards.push(word);
        if (newCards.length >= count) break;
      }
    }

    return newCards;
  }

  /**
   * Introduce a word into the SRS system (first time).
   * Sets it up with box 0 and immediate review.
   */
  function introduceWord(wordId) {
    const existing = Storage.getWordSRS(wordId);
    if (existing.box > 0 || existing.nextReview > 0) return existing; // Already introduced

    const entry = {
      interval: 0,
      ease: 2.5,
      nextReview: Date.now(), // Immediate review
      box: 0,
    };
    Storage.updateSRS(wordId, entry);
    return entry;
  }

  /**
   * Get SRS statistics.
   * Returns { newCount, learningCount, reviewingCount, masteredCount, dueCount }
   */
  function getStats() {
    if (typeof N5_VOCABULARY === 'undefined') return { newCount: 0, learningCount: 0, reviewingCount: 0, masteredCount: 0, dueCount: 0 };

    const srsData = Storage.getSRSData();
    const now = Date.now();
    let newCount = 0, learningCount = 0, reviewingCount = 0, masteredCount = 0, dueCount = 0;

    for (const word of N5_VOCABULARY) {
      const srs = srsData[word.id];
      if (!srs) {
        newCount++;
        continue;
      }
      switch (srs.box) {
        case 0: learningCount++; break;
        case 1: learningCount++; break;
        case 2: reviewingCount++; break;
        case 3: masteredCount++; break;
      }
      if (srs.nextReview <= now) dueCount++;
    }

    return { newCount, learningCount, reviewingCount, masteredCount, dueCount };
  }

  /**
   * Format interval for display.
   * @param {number} days - Interval in days
   * @returns {string} Human-readable interval
   */
  function formatInterval(days) {
    if (days < 1) return 'Now';
    if (days === 1) return '1 day';
    if (days < 7) return `${Math.round(days)} days`;
    if (days < 30) return `${Math.round(days / 7)} week${Math.round(days / 7) > 1 ? 's' : ''}`;
    if (days < 365) return `${Math.round(days / 30)} month${Math.round(days / 30) > 1 ? 's' : ''}`;
    return `${Math.round(days / 365)} year${Math.round(days / 365) > 1 ? 's' : ''}`;
  }

  /**
   * Get the box name for display.
   */
  function getBoxName(box) {
    return BOX_NAMES[box] || 'Unknown';
  }

  /**
   * Get the predicted next review intervals for each rating.
   * Useful for showing "Next review: X" on each button.
   */
  function getNextIntervals(wordId) {
    const current = Storage.getWordSRS(wordId);
    let { interval, ease } = current;
    if (!ease || ease < 1.3) ease = 2.5;

    return {
      again: formatInterval(0),
      hard: formatInterval(Math.max(1, interval * 1.2)),
      good: formatInterval(interval === 0 ? 1 : interval * ease),
      easy: formatInterval(interval === 0 ? 3 : interval * ease * 1.3),
    };
  }

  // ─── Public API ────────────────────────────────────────────

  return {
    RATING,
    review,
    getDueCards,
    getNewCards,
    introduceWord,
    getStats,
    formatInterval,
    getBoxName,
    getNextIntervals,
  };
})();
