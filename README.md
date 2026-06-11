# 漢字マスター — JLPT N5 Vocabulary Trainer

A comprehensive Japanese vocabulary learning application with spaced repetition, multiple study modes, and progress tracking.

## Features

### Study Modes
- **Flashcards**: Traditional flip cards for quick review
- **Quiz**: Multiple choice questions with 5 direction types
- **Typing**: Practice writing answers in romaji
- **Matching**: Memory-style matching game
- **Kanji**: Individual character study
- **SRS**: Spaced repetition review system

### Key Improvements (v2.0)

#### Architecture
- **Modular Design**: Separated configuration, utilities, theme, speech, and export/import into dedicated modules
- **Configuration System**: Centralized `CONFIG` object for all app settings
- **Utility Library**: Reusable functions for debouncing, date handling, array operations, and accessibility

#### User Experience
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Keyboard Shortcuts**: Full keyboard navigation (press `?` for help)
  - `G + D/F/Q/T/M/S/K`: Navigate to Dashboard/Flashcards/Quiz/Typing/Matching/SRS/Kanji
  - `T`: Toggle theme
  - `?`: Show keyboard help
- **SRS Badge**: Due count displayed in navigation
- **Accessibility**: ARIA labels, focus traps, screen reader announcements

#### New Features
- **Text-to-Speech**: Japanese pronunciation using Web Speech API
- **Export/Import**: Backup data as JSON or CSV, export to Anki format
- **Help Modal**: Interactive keyboard shortcuts reference

#### Code Quality
- **ES6 Modules**: IIFE pattern with clear public APIs
- **Error Handling**: Graceful localStorage quota handling
- **Documentation**: Inline JSDoc comments

## File Structure

```
/workspace
├── index.html          # Main HTML file
├── index.css           # Styles with dark/light theme support
├── config.js           # Application configuration
├── utils.js            # Utility functions
├── theme.js            # Theme management
├── speech.js           # Text-to-speech functionality
├── vocabulary.js       # N5 vocabulary data
├── storage.js          # localStorage persistence layer
├── srs.js              # Spaced repetition algorithm
├── kanji.js            # Kanji helper functions
├── export-import.js    # Data export/import
└── app.js              # Main application logic
```

## Usage

Open `index.html` in a modern web browser. No build step required.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `G + D` | Go to Dashboard |
| `G + F` | Go to Flashcards |
| `G + Q` | Go to Quiz |
| `G + T` | Go to Typing |
| `G + M` | Go to Matching |
| `G + S` | Go to SRS Review |
| `G + K` | Go to Kanji |
| `T` | Toggle dark/light theme |
| `?` | Show keyboard shortcuts help |

### Study Tips

1. **Daily Practice**: Aim for 20 words daily for best retention
2. **Use SRS**: Review due cards regularly to strengthen memory
3. **Mix Modes**: Different study modes reinforce learning differently
4. **Focus on Weak Words**: Pay attention to words you get wrong

## Technical Details

### SRS Algorithm
Based on SM-2 with 4 difficulty ratings:
- **Again**: Reset to box 0, immediate review
- **Hard**: Stay in current box, small interval increase
- **Good**: Normal progression
- **Easy**: Accelerated progression

### Data Storage
All data stored in localStorage under `n5vocab_` prefix:
- Word progress and statistics
- SRS scheduling data
- Study streaks
- Settings and preferences

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License
