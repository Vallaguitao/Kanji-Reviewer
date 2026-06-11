# Original User Request

## Initial Request — 2026-06-11T08:54:55+08:00

Enhance an existing JLPT N5 Vocabulary Trainer web app (pure HTML/CSS/JS, no frameworks) with two features: (1) add category-based browsing to the Kanji Study section via a sidebar accordion, and (2) redesign the Dashboard landing page with a sumi-e ink wash hero section, a Kanji of the Day spotlight card, and enhanced sakura petal animations. This is a production-quality enhancement to an app the user actively uses for Japanese study.

Working directory: c:\Users\valla\Downloads\N5 Vocabulary
Integrity mode: development

## Codebase Overview

The project is a single-page app with hash-based routing. Key files:

- **index.html** — Main HTML shell with nav and content container
- **vocabulary.js** — Exports `N5_CATEGORIES` (11 categories: verb, i-adjective, na-adjective, noun, adverb, counter, time, number, pronoun, expression, other) and `N5_VOCABULARY` (~800 word entries with `{id, kanji, reading, meaning, category}`)
- **kanji.js** — `KanjiHelper` IIFE module that extracts unique kanji from vocabulary, provides `getKanjiList()`, `getKanjiDetail()`, `searchKanji()`, `getKanjiQuizPool()`
- **storage.js** — `Storage` module for localStorage-based progress tracking, includes `getKanjiMasteryLevel(char)`
- **srs.js** — Spaced repetition system module
- **app.js** — Main app module with `renderDashboard()` (line ~305), `renderKanji()` (line ~1233), routing, and all view rendering logic. Uses IIFE revealing-module pattern.
- **index.css** — All styles (~85KB), dark theme based on `#1a1a2e`

The app uses Google Fonts (Inter, Noto Sans JP, Outfit) and emoji-based icons. No build tools — plain script tags loaded in order.

## Requirements

### R1. Kanji Category Sidebar

Add category-based filtering to the Kanji Study section (`renderKanji` in app.js). On desktop (>768px), display a sidebar accordion panel on the left showing all vocabulary categories (from `N5_CATEGORIES`) plus an "All" option. Each category item shows its icon character, display name, and the count of kanji that belong to that category. Clicking a category filters the kanji grid to show only kanji whose associated vocabulary words belong to that category. A single kanji can appear in multiple categories. On mobile (≤768px), the sidebar collapses into an expandable dropdown/panel above the kanji grid. The search bar should work within the currently selected category filter. The existing kanji detail view (click a kanji card → see meanings and example words) must continue to work.

### R2. Dashboard Sumi-e Hero Section

Replace the current dashboard header area with a full-width hero section styled with a sumi-e (ink wash painting) aesthetic. Use CSS-only techniques (layered gradients, blur, pseudo-elements) to create an ink wash / watercolor background effect — no external images. Include large kanji characters that appear with a brush-stroke animation effect, the app title with a calligraphic feel, a rotating motivational phrase, and a prominent "Start Studying" CTA button. The hero should feel atmospheric and premium, evoking traditional Japanese calligraphy art.

### R3. Kanji of the Day Spotlight

Add a "Kanji of the Day" spotlight card to the dashboard, placed immediately after the hero section and before the existing stats cards. The featured kanji should change daily using a deterministic selection method (e.g., day-based index into the kanji list). The card should display: the kanji character in a large, ink-brush style, its key meanings, associated readings from vocabulary words, and 2-3 example words. Clicking the card should navigate to the Kanji Study section and show that kanji's detail view. Style the card to complement the sumi-e theme (e.g., rice-paper/parchment feel).

### R4. Enhanced Sakura Petal Animation

Improve the existing sakura petal animation in the dashboard. Increase to approximately 15-20 petals, confine them primarily to the hero/header area, and add more visual variety (different sizes, rotation speeds, drift patterns, opacity transitions). Keep the effect subtle and atmospheric — it should complement the sumi-e aesthetic, not distract from content. Optimize for performance using CSS transforms and `will-change`.

### R5. Visual Consistency and Existing Functionality

All changes must preserve the existing app functionality: navigation, flashcards, quiz, typing, matching, SRS review, category browser, and settings/reset. The new styles must be consistent with the app's existing dark theme color palette and typography. The app must remain fully functional without any build step — plain HTML/CSS/JS loaded via script tags.

## Acceptance Criteria

### Kanji Categorization
- [ ] The Kanji Study page displays a sidebar on viewports wider than 768px containing "All" plus all categories from `N5_CATEGORIES` (11 categories)
- [ ] Each sidebar category item displays a category icon, name, and a numeric count of kanji in that category
- [ ] Clicking a category filters the kanji grid — only kanji whose associated words include that category are shown
- [ ] The "All" option shows all kanji (same as the current behavior)
- [ ] On viewports ≤768px, the sidebar is hidden and replaced by a collapsible panel/dropdown above the grid
- [ ] The search bar filters within the currently selected category
- [ ] Clicking a kanji card still opens its detail view with meanings and example words
- [ ] The back button from detail view returns to the filtered grid with the category selection preserved

### Dashboard Hero
- [ ] The dashboard displays a hero section at the top with a visible ink wash / watercolor aesthetic achieved via CSS
- [ ] At least 3 kanji characters are visible in the hero with animation effects
- [ ] The hero includes the app title and a CTA button that navigates to a study mode
- [ ] The hero section renders without any external image assets (CSS-only)

### Dashboard Hero
- [ ] The dashboard displays a hero section at the top with a visible ink wash / watercolor aesthetic achieved via CSS
- [ ] At least 3 kanji characters are visible in the hero with animation effects
- [ ] The hero includes the app title and a CTA button that navigates to a study mode
- [ ] The hero section renders without any external image assets (CSS-only)

### Kanji of the Day
- [ ] A "Kanji of the Day" card is visible on the dashboard between the hero and the stats grid
- [ ] The card shows a large kanji character, at least 2 meanings, and at least 2 example words
- [ ] The featured kanji changes when the date changes (deterministic, not random)
- [ ] Clicking the Kanji of the Day card navigates to the Kanji Study section

### Sakura Animation
- [ ] The dashboard hero area contains between 12 and 25 animated sakura petal elements
- [ ] The petals have visually varied sizes (at least 2 different size classes)
- [ ] The petal animation uses CSS transforms (not top/left positioning) for performance

### Preserved Functionality
- [ ] All 7 navigation links (Dashboard, Flashcards, Quiz, Typing, Matching, Kanji, SRS) still navigate to their correct views
- [ ] The settings "Reset All Progress" button on the dashboard still functions
- [ ] The app loads without JavaScript errors in the browser console
- [ ] The Browse Words (categories) view still works correctly
