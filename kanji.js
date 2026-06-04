/**
 * kanji.js — Kanji Extraction & Quiz Helper
 *
 * Auto-extracts unique kanji characters from the N5_VOCABULARY global array,
 * collects associated readings, meanings, and source words, and provides
 * quiz-pool generators for hiragana↔kanji drills.
 *
 * Follows the IIFE / revealing-module pattern used by Storage and SRS.
 */

const KanjiHelper = (() => {
  // ─── Private State ──────────────────────────────────────────

  /** @type {Array<Object>} Extracted kanji data, sorted by word count (desc). */
  let kanjiList = [];

  /** @type {Map<string, Object>} Fast lookup by character. */
  const kanjiMap = new Map();

  /** Whether init() has already run. */
  let initialized = false;

  // ─── Constants ──────────────────────────────────────────────

  /** CJK Unified Ideographs range — matches a single kanji character. */
  const CJK_REGEX = /[\u4E00-\u9FFF]/g;

  /** Test whether a string contains at least one kanji character. */
  const HAS_KANJI = /[\u4E00-\u9FFF]/;

  // ─── Private Helpers ────────────────────────────────────────

  /**
   * Extract all unique kanji characters from a string.
   * @param {string} str
   * @returns {string[]} Array of individual kanji characters.
   */
  function _extractKanji(str) {
    if (!str) return [];
    const matches = str.match(CJK_REGEX);
    return matches ? [...new Set(matches)] : [];
  }

  /**
   * Check if a vocabulary entry is kana-only (kanji field equals reading).
   * @param {Object} entry - A vocabulary entry.
   * @returns {boolean}
   */
  function _isKanaOnly(entry) {
    return entry.kanji === entry.reading;
  }

  /**
   * Shuffle an array in-place (Fisher-Yates) and return it.
   * @param {Array} arr
   * @returns {Array}
   */
  function _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * Pick `count` random items from `source`, excluding `excludeItem`.
   * Returns a new array (does not mutate source).
   * @param {Array} source
   * @param {*} excludeItem - Item to exclude from picks.
   * @param {number} count
   * @returns {Array}
   */
  function _pickDistractors(source, excludeItem, count) {
    const pool = source.filter(item => item !== excludeItem);
    _shuffle(pool);
    return pool.slice(0, count);
  }

  // ─── Core Extraction ────────────────────────────────────────

  /**
   * Scan N5_VOCABULARY and build the kanjiList + kanjiMap.
   * Should be called once at app boot.
   */
  function _buildKanjiData() {
    if (typeof N5_VOCABULARY === 'undefined' || !Array.isArray(N5_VOCABULARY)) {
      console.warn('KanjiHelper: N5_VOCABULARY is not available.');
      return;
    }

    /** @type {Map<string, { readings: Set, meanings: Set, words: Array }>} */
    const workMap = new Map();

    for (const entry of N5_VOCABULARY) {
      // Skip kana-only words (no kanji to extract)
      if (_isKanaOnly(entry)) continue;

      // Skip entries that don't actually contain kanji characters
      if (!HAS_KANJI.test(entry.kanji)) continue;

      const chars = _extractKanji(entry.kanji);

      for (const char of chars) {
        if (!workMap.has(char)) {
          workMap.set(char, {
            readings: new Set(),
            meanings: new Set(),
            words: [],
          });
        }

        const data = workMap.get(char);

        // Store the full word reading as an associated reading
        if (entry.reading) {
          data.readings.add(entry.reading);
        }

        // Store each semicolon-separated meaning fragment (trimmed)
        if (entry.meaning) {
          entry.meaning
            .split(';')
            .map(m => m.trim())
            .filter(Boolean)
            .forEach(m => data.meanings.add(m));
        }

        // Store a reference to the source word
        data.words.push(entry);
      }
    }

    // Convert working map → sorted array
    kanjiList = [];
    kanjiMap.clear();

    for (const [character, data] of workMap) {
      const obj = {
        character,
        readings:  [...data.readings],
        meanings:  [...data.meanings],
        words:     data.words,
        wordCount: data.words.length,
      };
      kanjiList.push(obj);
      kanjiMap.set(character, obj);
    }

    // Sort by frequency: most associated words first
    kanjiList.sort((a, b) => b.wordCount - a.wordCount);
  }

  // ─── Public Methods ─────────────────────────────────────────

  /**
   * Initialise the kanji data. Safe to call multiple times (no-op after first).
   */
  function init() {
    if (initialized) return;
    _buildKanjiData();
    initialized = true;
    console.log(`KanjiHelper: Extracted ${kanjiList.length} unique kanji from N5 vocabulary.`);
  }

  /**
   * Returns the full array of extracted kanji data, sorted by frequency.
   * @returns {Array<Object>}
   */
  function getKanjiList() {
    return kanjiList;
  }

  /**
   * Returns the detail object for a specific kanji character.
   * @param {string} char - A single kanji character.
   * @returns {Object|null}
   */
  function getKanjiDetail(char) {
    return kanjiMap.get(char) || null;
  }

  /**
   * Returns the total number of unique kanji extracted.
   * @returns {number}
   */
  function getKanjiCount() {
    return kanjiList.length;
  }

  /**
   * Build a quiz pool from kanji-containing vocabulary words.
   *
   * @param {'hira2kanji'|'kanji2hira'} type - Quiz direction.
   * @param {number} [optionCount=4] - Number of total options per question (including the answer).
   * @returns {Array<Object>} Array of quiz items:
   *   { question, answer, options, wordId, entry }
   *
   * For 'hira2kanji':
   *   question = hiragana reading,  answer = kanji word
   *   options  = [kanji words including the correct one]
   *
   * For 'kanji2hira':
   *   question = kanji word,  answer = hiragana reading
   *   options  = [hiragana readings including the correct one]
   */
  function getKanjiQuizPool(type, optionCount = 4) {
    if (typeof N5_VOCABULARY === 'undefined') return [];

    // Collect all vocabulary entries that contain kanji (not kana-only)
    const kanjiWords = N5_VOCABULARY.filter(
      entry => !_isKanaOnly(entry) && HAS_KANJI.test(entry.kanji)
    );

    if (kanjiWords.length === 0) return [];

    const pool = [];

    if (type === 'hira2kanji') {
      // Question: hiragana reading → Answer: kanji word
      const allKanjiStrings = kanjiWords.map(w => w.kanji);

      for (const entry of kanjiWords) {
        const distractors = _pickDistractors(allKanjiStrings, entry.kanji, optionCount - 1);
        const options = _shuffle([entry.kanji, ...distractors]);

        pool.push({
          question: entry.reading,
          answer:   entry.kanji,
          meaning:  entry.meaning,
          options,
          wordId:   entry.id,
          entry,
        });
      }
    } else if (type === 'kanji2hira') {
      // Question: kanji word → Answer: hiragana reading
      const allReadings = kanjiWords.map(w => w.reading);

      for (const entry of kanjiWords) {
        const distractors = _pickDistractors(allReadings, entry.reading, optionCount - 1);
        const options = _shuffle([entry.reading, ...distractors]);

        pool.push({
          question: entry.kanji,
          answer:   entry.reading,
          meaning:  entry.meaning,
          options,
          wordId:   entry.id,
          entry,
        });
      }
    } else {
      console.warn(`KanjiHelper.getKanjiQuizPool: Unknown type "${type}". Use 'hira2kanji' or 'kanji2hira'.`);
    }

    return _shuffle(pool);
  }

  /**
   * Search kanji entries by character, reading, or meaning.
   *
   * @param {string} query - Search string (case-insensitive for English meanings).
   * @returns {Array<Object>} Matching kanji detail objects.
   */
  function searchKanji(query) {
    if (!query || typeof query !== 'string') return [];

    const q = query.trim().toLowerCase();
    if (q.length === 0) return [];

    return kanjiList.filter(entry => {
      // Match by character (exact)
      if (entry.character === q) return true;

      // Match by reading (partial)
      if (entry.readings.some(r => r.includes(q))) return true;

      // Match by meaning (partial, case-insensitive)
      if (entry.meanings.some(m => m.toLowerCase().includes(q))) return true;

      // Match by word kanji (partial)
      if (entry.words.some(w => w.kanji.includes(q))) return true;

      return false;
    });
  }

  // ─── Public API ─────────────────────────────────────────────

  return {
    init,
    getKanjiList,
    getKanjiDetail,
    getKanjiCount,
    getKanjiQuizPool,
    searchKanji,
  };
})();
