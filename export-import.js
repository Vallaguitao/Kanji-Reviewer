/**
 * export-import.js — Data Export/Import Functionality
 * Supports JSON, CSV, and Anki (.apkg) format conversion
 */

const ExportImport = (() => {
  // ─── Export Functions ──────────────────────────────────────
  
  function exportToJSON() {
    const data = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      wordProgress: Storage.getWordProgress(),
      srsData: Storage.getSRSData(),
      streak: Storage.getStreakData(),
      settings: Storage.getSettings(),
      kanjiProgress: Storage._get('kanjiProgress', {}),
    };
    
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, 'kanji-master-backup.json', 'application/json');
    return data;
  }
  
  function exportToCSV() {
    if (typeof N5_VOCABULARY === 'undefined') return '';
    
    const progress = Storage.getWordProgress();
    const srsData = Storage.getSRSData();
    
    const headers = [
      'ID', 'Kanji', 'Reading', 'Hiragana', 'Meaning', 'Category',
      'Correct', 'Incorrect', 'Last Reviewed',
      'SRS Box', 'SRS Interval', 'SRS Ease', 'SRS Next Review'
    ];
    
    const rows = N5_VOCABULARY.map(word => {
      const prog = progress[word.id] || { correct: 0, incorrect: 0, lastReviewed: null };
      const srs = srsData[word.id] || { box: 0, interval: 0, ease: 2.5, nextReview: 0 };
      
      return [
        word.id,
        `"${word.kanji}"`,
        `"${word.reading}"`,
        `"${word.hiragana}"`,
        `"${word.meaning.replace(/"/g, '""')}"`,
        word.category,
        prog.correct,
        prog.incorrect,
        prog.lastReviewed ? new Date(prog.lastReviewed).toISOString() : '',
        srs.box,
        srs.interval,
        srs.ease,
        srs.nextReview ? new Date(srs.nextReview).toISOString() : ''
      ].join(',');
    });
    
    const csv = [headers.join(','), ...rows].join('\n');
    downloadFile(csv, 'kanji-master-vocabulary.csv', 'text/csv');
    return csv;
  }
  
  function exportWordsOnlyJSON(category = null) {
    let words = typeof N5_VOCABULARY !== 'undefined' ? [...N5_VOCABULARY] : [];
    
    if (category && category !== 'all') {
      words = words.filter(w => w.category === category);
    }
    
    const data = {
      version: '2.0',
      exportDate: new Date().toISOString(),
      category: category,
      count: words.length,
      words: words
    };
    
    const json = JSON.stringify(data, null, 2);
    downloadFile(json, `kanji-master-words${category ? '-' + category : ''}.json`, 'application/json');
    return data;
  }
  
  // ─── Import Functions ──────────────────────────────────────
  
  function importFromJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      
      if (!data.version) {
        throw new Error('Invalid file format: missing version');
      }
      
      let imported = 0;
      
      // Import word progress
      if (data.wordProgress) {
        const current = Storage.getWordProgress();
        Object.assign(current, data.wordProgress);
        Storage._set('wordProgress', current);
        imported++;
      }
      
      // Import SRS data
      if (data.srsData) {
        const current = Storage.getSRSData();
        Object.assign(current, data.srsData);
        Storage._set('srsData', current);
        imported++;
      }
      
      // Import streak
      if (data.streak) {
        Storage._set('streak', data.streak);
        imported++;
      }
      
      // Import settings
      if (data.settings) {
        Storage.updateSettings(data.settings);
        imported++;
      }
      
      // Import kanji progress
      if (data.kanjiProgress) {
        Storage._set('kanjiProgress', data.kanjiProgress);
        imported++;
      }
      
      return { success: true, imported, message: `Successfully imported ${imported} data types` };
      
    } catch (e) {
      console.error('Import error:', e);
      return { success: false, error: e.message };
    }
  }
  
  function importFromCSV(csvString) {
    try {
      const lines = csvString.trim().split('\n');
      if (lines.length < 2) {
        throw new Error('CSV file is empty or has no data rows');
      }
      
      const headers = parseCSVLine(lines[0]);
      const dataRows = lines.slice(1);
      
      let imported = 0;
      let updated = 0;
      
      for (const line of dataRows) {
        const values = parseCSVLine(line);
        if (values.length < 6) continue;
        
        const wordId = parseInt(values[0]);
        if (isNaN(wordId)) continue;
        
        // Find the word in vocabulary
        const word = typeof N5_VOCABULARY !== 'undefined' 
          ? N5_VOCABULARY.find(w => w.id === wordId)
          : null;
        
        if (!word) continue;
        
        // Update progress
        const correct = parseInt(values[6]) || 0;
        const incorrect = parseInt(values[7]) || 0;
        const lastReviewed = values[8] ? new Date(values[8]).getTime() : null;
        
        if (correct > 0 || incorrect > 0) {
          const progress = Storage.getWordProgress();
          progress[wordId] = { correct, incorrect, lastReviewed };
          Storage._set('wordProgress', progress);
          updated++;
        }
        
        // Update SRS data
        const box = parseInt(values[9]) || 0;
        const interval = parseFloat(values[10]) || 0;
        const ease = parseFloat(values[11]) || 2.5;
        const nextReview = values[12] ? new Date(values[12]).getTime() : 0;
        
        if (box > 0 || interval > 0) {
          const srsData = Storage.getSRSData();
          srsData[wordId] = { box, interval, ease, nextReview };
          Storage._set('srsData', srsData);
          imported++;
        }
      }
      
      return { success: true, imported, updated, message: `Imported ${imported} SRS entries, updated ${updated} progress records` };
      
    } catch (e) {
      console.error('CSV import error:', e);
      return { success: false, error: e.message };
    }
  }
  
  // ─── Anki Format (Basic) ───────────────────────────────────
  
  function exportToAnkiTXT() {
    if (typeof N5_VOCABULARY === 'undefined') return '';
    
    // Format: Kanji [tab] Reading [tab] Meaning [tab] Category
    const lines = N5_VOCABULARY.map(word => 
      `${word.kanji}\t${word.reading}\t${word.meaning}\t${word.category}`
    );
    
    const content = lines.join('\n');
    downloadFile(content, 'kanji-master-anki.txt', 'text/plain');
    return content;
  }
  
  // ─── Helper Functions ──────────────────────────────────────
  
  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];
      
      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current);
    return result;
  }
  
  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }
  
  // ─── UI Helpers ────────────────────────────────────────────
  
  function createImportDialog() {
    const dialog = document.createElement('div');
    dialog.className = 'import-dialog';
    dialog.innerHTML = `
      <div class="import-dialog-content">
        <h2>Import Data</h2>
        <p>Select a backup file to import:</p>
        <input type="file" id="import-file" accept=".json,.csv,.txt" />
        <div class="import-actions">
          <button class="btn btn-primary" id="import-confirm">Import</button>
          <button class="btn btn-secondary" id="import-cancel">Cancel</button>
        </div>
      </div>
    `;
    return dialog;
  }
  
  // ─── Public API ────────────────────────────────────────────
  
  return {
    exportToJSON,
    exportToCSV,
    exportWordsOnlyJSON,
    exportToAnkiTXT,
    importFromJSON,
    importFromCSV,
    readFileAsText,
    createImportDialog,
  };
})();
