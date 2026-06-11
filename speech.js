/**
 * speech.js — Text-to-Speech for Japanese Pronunciation
 * Uses Web Speech API for audio pronunciation
 */

const Speech = (() => {
  let synth = null;
  let voices = [];
  let japaneseVoice = null;
  
  // ─── Initialization ────────────────────────────────────────
  
  function init() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech: Web Speech API not supported');
      return false;
    }
    
    synth = window.speechSynthesis;
    
    // Load voices
    loadVoices();
    
    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    
    return true;
  }
  
  function loadVoices() {
    voices = synth.getVoices();
    
    // Find Japanese voice
    japaneseVoice = voices.find(voice => 
      voice.lang.includes('ja-JP') || 
      voice.lang.includes('ja') ||
      voice.name.includes('Japanese')
    );
    
    // Fallback to first available voice
    if (!japaneseVoice && voices.length > 0) {
      japaneseVoice = voices[0];
    }
    
    console.log('Speech: Loaded', voices.length, 'voices', japaneseVoice ? '(Japanese: ' + japaneseVoice.name + ')' : '');
  }
  
  // ─── Speech Functions ──────────────────────────────────────
  
  function speak(text, options = {}) {
    if (!synth || !text) return false;
    
    const {
      rate = 0.9,
      pitch = 1.0,
      volume = 1.0,
      onEnd = null,
      onError = null,
    } = options;
    
    // Cancel any ongoing speech
    synth.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }
    
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    
    utterance.onerror = (e) => {
      console.warn('Speech: Error:', e);
      if (onError) onError(e);
    };
    
    synth.speak(utterance);
    return true;
  }
  
  function stop() {
    if (synth) {
      synth.cancel();
    }
  }
  
  function isSpeaking() {
    return synth ? synth.speaking : false;
  }
  
  function isPaused() {
    return synth ? synth.paused : false;
  }
  
  // ─── Convenience Methods ───────────────────────────────────
  
  function speakWord(word, reading, options = {}) {
    // Prefer kanji reading if available, otherwise use hiragana
    const text = word && word !== reading ? word : reading;
    return speak(text, options);
  }
  
  function speakHiragana(hiragana, options = {}) {
    return speak(hiragana, options);
  }
  
  // ─── Voice Info ────────────────────────────────────────────
  
  function getVoices() {
    return [...voices];
  }
  
  function getJapaneseVoice() {
    return japaneseVoice;
  }
  
  function hasJapaneseVoice() {
    return japaneseVoice !== null;
  }
  
  // ─── Public API ────────────────────────────────────────────
  
  return {
    init,
    speak,
    stop,
    isSpeaking,
    isPaused,
    speakWord,
    speakHiragana,
    getVoices,
    getJapaneseVoice,
    hasJapaneseVoice,
  };
})();
