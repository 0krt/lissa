# Design mockups

Alternative visual directions for lissa, in rounds. Each one is a stylesheet
laid over the unmodified `index.html`, so every control, preset, shortcut and
MIDI mapping works exactly as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`) and pick a theme from the bar; ← / → step through. Round 3 opens first.

### Round 3 — typefaces

One palette and one layout throughout, so the font is the variable.

| # | Theme | Typeface |
|---|-------|----------|
| 01 | Geist | Geist + Geist Mono figures; black as the only accent |
| 02 | Plex Sans | IBM Plex Sans + Plex Mono figures; closest to the current UI |
| 03 | Atkinson | Atkinson Hyperlegible; no look-alike letters, the most legible |
| 04 | Instrument | Instrument Sans, Instrument Serif for titles |
| 05 | Garamond | Public Sans, EB Garamond for titles |
| 06 | Figtree | Figtree; friendly geometric, rounder controls |
| 07 | Space Grotesk | Space Grotesk + Space Mono figures |
| 08 | Lexend | Lexend; wide, loosely spaced, easy to scan |
| 09 | DM Mono | DM Mono throughout, dark |
| 10 | Franklin | Libre Franklin; sturdy classic grotesk |

UI/UX choices shared by the round (`themes/type.css`):

- `font-size-adjust` gives every face the same x-height, so sizes compare fairly
  and nothing drops below a legible size.
- A three-step type scale (11.5 / 13 / 16): weight separates titles from labels,
  colour separates labels from values.
- Tabular figures for values and ratio buttons, so numbers don't jitter while a
  slider moves.
- Pin and lock icons stay faint until their row is hovered or focused; set ones
  and touch screens always show them.
- Display faces are used for the brand and section titles only.

### Round 2 — quiet

| # | Theme | Direction |
|---|-------|-----------|
| 01 | Editorial | Warm newsprint, serif display, italic captions, oxblood ink |
| 02 | Soft Clay | Neumorphic: one material, raised and pressed-in controls |
| 03 | Paper | White page, near-black sans, one quiet blue; hairlines, no cards |
| 04 | Notebook | Cream page, readable serif, ink-blue accent, faint rules |
| 05 | Stone | Warm grey, soft raised cards, terracotta accent |
| 06 | Sage | Pale green-grey, rounded pills, one muted green |
| 07 | Kraft | Brown-paper ground, flat surfaces, dark brown ink |
| 08 | Fog | Cool off-white, borderless floating cards, slate accent |
| 09 | Reader | Book page: white, black serif, small-caps headings, brick red |
| 10 | Evening | The dark one: warm charcoal, cream text, soft amber |

## How it is put together

The site is built by Jekyll (GitHub Pages), which drops files and folders whose
names start with `_`, so nothing in here may use that prefix.

- `themes/base.css` re-points the colours, fonts and radii that `index.html`
  hard-codes to variables whose defaults match the shipping design. On its own
  it changes nothing.
- `themes/quiet.css` is the shared structure for round 2's themes 03–10 and all of round 3: sentence case,
  larger labels, soft surfaces, one accent. Those themes mostly just set a
  palette and a typeface.
- `themes/type.css` adds round 3's shared palette and type rules.
- `themes/<id>.css` sets those variables and adds the theme's own rules.
- `apply-theme.js` injects both into the running app and sets the figure's own
  colour controls (stroke, gradient, background, frame axes) through their
  input events, as a user would.

The app paints the small waveform previews lime on black; the themes recolour
them with a CSS filter rather than touching the app.
