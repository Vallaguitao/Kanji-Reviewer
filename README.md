# 🖌️ Vocabulary & Kanji Trainer

A beautiful, responsive Single Page Application (SPA) designed to help you master Japanese vocabulary, kanji reading, typing, matching, and stroke orders using advanced spaced repetition and interactive drawing engines. 

Featuring a **Minimalist Zen (Sumi-e / Washi card)** aesthetic, the app supports dark/light modes and works entirely in the browser using local storage for progression persistence.

---

## 🌟 Features

*   **🖌️ Kanji Writing Practice**: Learn kanji stroke orders interactively.
    *   *Phase 1 (Guided Trace)*: Follow faint outlines with numbered stroke guides that snap on correct paths.
    *   *Phase 2 (Memory Mode)*: Write from memory on a blank washi paper card canvas.
    *   *Stroke Animation*: Play fluid animations of the kanji drawing itself.
*   **🧠 Spaced Repetition System (SRS)**: Optimize your vocabulary reviews with card flashcard intervals.
*   **⌨️ Typing Practice**: Practice typing hiragana and kanji definitions.
*   **🧩 Matching Game**: Test your recall speed by matching Japanese words with their English definitions in a interactive layout.
*   **📊 5-Direction Quizzes**:
    1.  Japanese word ➔ English meaning
    2.  English meaning ➔ Japanese word
    3.  Hiragana reading ➔ Kanji character
    4.  Kanji word ➔ Hiragana reading
    5.  Random Mix (All types mixed)
*   **🎨 Minimalist Zen Theme**: Textured washi card layouts, drifting sumi-e ink fog animations, and responsive adaptive theme styling.

---

## 🛠️ Technology Stack

1.  **Core**: HTML5, Vanilla JavaScript (ES6 Modules/SPA architecture).
2.  **Styling**: Pure CSS3 variables with glassmorphic elements and sumi-e decorations.
3.  **Drawing Engine**: [Hanzi Writer](https://chanind.github.io/hanzi-writer) loaded via CDN for high-precision SVG stroke order rendering and quiz validation.
4.  **Database**: Local static databases (`vocabulary.js`, `kanji.js`) covering JLPT / JFT characters.
5.  **Storage**: HTML5 `localStorage` for progress and learning mastery stats.

---

## 📚 Credits & Open-Source Licenses

This project relies on the following open-source resources:

*   **[Hanzi Writer](https://chanind.github.io/hanzi-writer)** by Chanin Nantasenamat — Used under the [MIT License](https://github.com/chanind/hanzi-writer/blob/master/LICENSE) for rendering the drawing canvas, stroke animations, and validation logic.
*   **[KanjiVG](http://kanjivg.tagaini.net/)** by Ulrich Apel — The stroke order database and Japanese Kanji vector outlines used by Hanzi Writer are copyright Ulrich Apel and contributors, utilized under the [Creative Commons Attribution-Share Alike 3.0 (CC BY-SA 3.0)](https://creativecommons.org/licenses/by-sa/3.0/) license.
