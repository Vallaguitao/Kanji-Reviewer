/**
 * storage.js — localStorage Persistence Layer
 * Manages all app state: word progress, streaks, stats, settings, and SRS data.
 * All keys are namespaced under 'n5vocab_' to avoid collisions.
 */

const Storage = (() => {
  const PREFIX = 'n5vocab_';

  // ─── Helpers ───────────────────────────────────────────────

  function _key(name) {
    return PREFIX + name;
  }

  function _get(name, fallback = null) {
    try {
      const raw = localStorage.getItem(_key(name));
      return raw !== null ? JSON.parse(raw) : fallback;
    } catch (e) {
      console.warn(`Storage: Error reading '${name}':`, e);
      return fallback;
    }
  }

  function _set(name, value) {
    try {
      localStorage.setItem(_key(name), JSON.stringify(value));
    } catch (e) {
      console.warn(`Storage: Error writing '${name}':`, e);
    }
  }

  function _remove(name) {
    localStorage.removeItem(_key(name));
  }

  /**
   * Returns today's date as 'YYYY-MM-DD' in local time.
   */
  function _today() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  /**
   * Returns yesterday's date as 'YYYY-MM-DD'.
   */
  function _yesterday() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  // ─── Word Progress ────────────────────────────────────────
  // Shape: { [wordId]: { correct: number, incorrect: number, lastReviewed: timestamp } }

  function getWordProgress() {
    return _get('wordProgress', {});
  }

  function getWordStat(wordId) {
    const progress = getWordProgress();
    return progress[wordId] || { correct: 0, incorrect: 0, lastReviewed: null };
  }

  function recordAnswer(wordId, isCorrect) {
    const progress = getWordProgress();
    if (!progress[wordId]) {
      progress[wordId] = { correct: 0, incorrect: 0, lastReviewed: null };
    }
    if (isCorrect) {
      progress[wordId].correct++;
    } else {
      progress[wordId].incorrect++;
    }
    progress[wordId].lastReviewed = Date.now();
    _set('wordProgress', progress);

    // Also update today's session stats
    _updateTodayStats(isCorrect);

    return progress[wordId];
  }

  function getWordMasteryLevel(wordId) {
    const stat = getWordStat(wordId);
    const total = stat.correct + stat.incorrect;
    if (total === 0) return 'new';
    const accuracy = stat.correct / total;
    if (stat.correct >= 5 && accuracy >= 0.9) return 'mastered';
    if (stat.correct >= 3 && accuracy >= 0.7) return 'reviewing';
    if (stat.correct >= 1) return 'learning';
    return 'new';
  }

  /**
   * Returns counts: { new, learning, reviewing, mastered, total }
   */
  function getOverallProgress() {
    const progress = getWordProgress();
    const totalWords = typeof N5_VOCABULARY !== 'undefined' ? N5_VOCABULARY.length : 0;
    const counts = { new: 0, learning: 0, reviewing: 0, mastered: 0, total: totalWords };

    if (totalWords === 0) return counts;

    const seen = new Set(Object.keys(progress).map(Number));

    for (const word of N5_VOCABULARY) {
      const level = getWordMasteryLevel(word.id);
      counts[level]++;
    }

    return counts;
  }

  /**
   * Returns per-category progress.
   * Shape: { [category]: { total, mastered, learning, reviewing, new, accuracy } }
   */
  function getCategoryProgress() {
    if (typeof N5_VOCABULARY === 'undefined') return {};

    const cats = {};
    for (const word of N5_VOCABULARY) {
      if (!cats[word.category]) {
        cats[word.category] = { total: 0, mastered: 0, learning: 0, reviewing: 0, new: 0, correctTotal: 0, answeredTotal: 0 };
      }
      const cat = cats[word.category];
      cat.total++;

      const level = getWordMasteryLevel(word.id);
      cat[level]++;

      const stat = getWordStat(word.id);
      cat.correctTotal += stat.correct;
      cat.answeredTotal += stat.correct + stat.incorrect;
    }

    // Compute accuracy per category
    for (const key of Object.keys(cats)) {
      cats[key].accuracy = cats[key].answeredTotal > 0
        ? Math.round((cats[key].correctTotal / cats[key].answeredTotal) * 100)
        : 0;
    }

    return cats;
  }

  // ─── Streak Tracking ──────────────────────────────────────
  // Shape: { currentStreak: number, longestStreak: number, lastStudyDate: 'YYYY-MM-DD' }

  function getStreakData() {
    return _get('streak', { currentStreak: 0, longestStreak: 0, lastStudyDate: null });
  }

  function updateStreak() {
    const streak = getStreakData();
    const today = _today();
    const yesterday = _yesterday();

    if (streak.lastStudyDate === today) {
      // Already studied today, no change
      return streak;
    }

    if (streak.lastStudyDate === yesterday) {
      // Consecutive day — extend streak
      streak.currentStreak++;
    } else if (streak.lastStudyDate !== today) {
      // Streak broken or first day
      streak.currentStreak = 1;
    }

    streak.lastStudyDate = today;
    streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
    _set('streak', streak);
    return streak;
  }

  // ─── Session Stats (today) ─────────────────────────────────
  // Shape: { date: 'YYYY-MM-DD', reviewed: number, correct: number }

  function getTodayStats() {
    const stats = _get('todayStats', { date: null, reviewed: 0, correct: 0 });
    if (stats.date !== _today()) {
      // New day — reset
      return { date: _today(), reviewed: 0, correct: 0 };
    }
    return stats;
  }

  function _updateTodayStats(isCorrect) {
    const stats = getTodayStats();
    stats.date = _today();
    stats.reviewed++;
    if (isCorrect) stats.correct++;
    _set('todayStats', stats);
  }

  function getTodayAccuracy() {
    const stats = getTodayStats();
    if (stats.reviewed === 0) return 0;
    return Math.round((stats.correct / stats.reviewed) * 100);
  }

  // ─── Overall Accuracy ──────────────────────────────────────

  function getOverallAccuracy() {
    const progress = getWordProgress();
    let totalCorrect = 0;
    let totalAnswered = 0;
    for (const id of Object.keys(progress)) {
      totalCorrect += progress[id].correct;
      totalAnswered += progress[id].correct + progress[id].incorrect;
    }
    if (totalAnswered === 0) return 0;
    return Math.round((totalCorrect / totalAnswered) * 100);
  }

  // ─── SRS Data ──────────────────────────────────────────────
  // Shape: { [wordId]: { interval: number (days), ease: number, nextReview: timestamp, box: number } }
  // box: 0=New, 1=Learning, 2=Reviewing, 3=Mastered

  function getSRSData() {
    return _get('srsData', {});
  }

  function getWordSRS(wordId) {
    const data = getSRSData();
    return data[wordId] || { interval: 0, ease: 2.5, nextReview: 0, box: 0 };
  }

  function updateSRS(wordId, srsEntry) {
    const data = getSRSData();
    data[wordId] = srsEntry;
    _set('srsData', data);
  }

  // ─── Settings ──────────────────────────────────────────────

  function getSettings() {
    return _get('settings', {
      cardsPerSession: 20,
      quizOptionsCount: 4,
      matchingPairs: 6,
    });
  }

  function updateSettings(newSettings) {
    const current = getSettings();
    _set('settings', { ...current, ...newSettings });
  }

  // ─── Last Mode / Continue ─────────────────────────────────

  function getLastMode() {
    return _get('lastMode', null);
  }

  function setLastMode(mode) {
    _set('lastMode', mode);
  }

  // ─── Mode Usage (for dashboard ordering) ──────────────────

  function getModeUsage() {
    return _get('modeUsage', {});
  }

  function incrementModeUsage(mode) {
    const usage = getModeUsage();
    usage[mode] = (usage[mode] || 0) + 1;
    _set('modeUsage', usage);
  }

  // ─── Best Scores (matching game) ──────────────────────────

  function getBestScore(gridSize) {
    const scores = _get('bestScores', {});
    return scores[gridSize] || null;
  }

  function setBestScore(gridSize, score) {
    const scores = _get('bestScores', {});
    const existing = scores[gridSize];
    // Only update if better (fewer moves or same moves but faster time)
    if (!existing || score.moves < existing.moves || (score.moves === existing.moves && score.time < existing.time)) {
      scores[gridSize] = score;
      _set('bestScores', scores);
      return true; // New best!
    }
    return false;
  }

  // ─── Kanji Progress ───────────────────────────────────────

  function getKanjiProgress(char) {
    const data = _get('kanjiProgress', {});
    return data[char] || { correct: 0, incorrect: 0, lastReviewed: null };
  }

  function updateKanjiProgress(char, isCorrect) {
    const data = _get('kanjiProgress', {});
    if (!data[char]) {
      data[char] = { correct: 0, incorrect: 0, lastReviewed: null };
    }
    if (isCorrect) {
      data[char].correct++;
    } else {
      data[char].incorrect++;
    }
    data[char].lastReviewed = Date.now();
    _set('kanjiProgress', data);
    return data[char];
  }

  function getKanjiMasteryLevel(char) {
    const stat = getKanjiProgress(char);
    const total = stat.correct + stat.incorrect;
    if (total === 0) return 'new';
    const accuracy = stat.correct / total;
    if (stat.correct >= 5 && accuracy >= 0.9) return 'mastered';
    if (stat.correct >= 3 && accuracy >= 0.7) return 'reviewing';
    if (stat.correct >= 1) return 'learning';
    return 'new';
  }

  // ─── Reset ─────────────────────────────────────────────────

  function resetAllData() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        keys.push(key);
      }
    }
    keys.forEach(k => localStorage.removeItem(k));
  }

  // ─── Public API ────────────────────────────────────────────

  return {
    // Internal helpers (for export-import)
    _get,
    _set,
    
    // Word Progress
    getWordProgress,
    getWordStat,
    recordAnswer,
    getWordMasteryLevel,
    getOverallProgress,
    getCategoryProgress,

    // Streaks
    getStreakData,
    updateStreak,

    // Session Stats
    getTodayStats,
    getTodayAccuracy,
    getOverallAccuracy,

    // SRS
    getSRSData,
    getWordSRS,
    updateSRS,

    // Settings
    getSettings,
    updateSettings,

    // Last Mode / Continue
    getLastMode,
    setLastMode,

    // Mode Usage
    getModeUsage,
    incrementModeUsage,

    // Best Scores
    getBestScore,
    setBestScore,

    // Kanji Progress
    getKanjiProgress,
    updateKanjiProgress,
    getKanjiMasteryLevel,

    // Reset
    resetAllData,
  };
})();

