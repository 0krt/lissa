# Design mockups

Ten alternative visual directions for lissa, all aiming for simple, quiet and
legible. Each one is a stylesheet laid over
the unmodified `index.html`, so every control, preset, shortcut and MIDI
mapping works exactly as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`) and pick a theme from the bar; ← / → step through.

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

- `themes/_base.css` re-points the colours, fonts and radii that `index.html`
  hard-codes to variables whose defaults match the shipping design. On its own
  it changes nothing.
- `themes/_quiet.css` is the shared structure for themes 03–10: sentence case,
  larger labels, soft surfaces, one accent. Those themes mostly just set a
  palette and a typeface.
- `themes/<id>.css` sets those variables and adds the theme's own rules.
- `apply-theme.js` injects both into the running app and sets the figure's own
  colour controls (stroke, gradient, background, frame axes) through their
  input events, as a user would.

The app paints the small waveform previews lime on black; the themes recolour
them with a CSS filter rather than touching the app.
