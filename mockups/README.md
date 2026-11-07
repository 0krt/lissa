# Design mockups

Five visual directions for lissa, each in a Bright and a Dark version. Every one
is a stylesheet laid over the unmodified `index.html`, so every control, preset,
shortcut and MIDI mapping works exactly as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`).

| Theme | Direction |
|-------|-----------|
| Instrument | Instrument Sans for controls, Instrument Serif for titles; violet |
| Figtree | Friendly geometric sans, rounder controls; orange |
| Lexend | Wide, loosely spaced letterforms built for easy scanning; teal |
| Sage | Karla on a green-grey ground, rounded pills; green |
| Fog | Inter on cool off-white, borderless floating cards; slate |

## Gallery controls

- **Theme** buttons, and ← / → to step through them.
- **Bright / Dark** switches the palette of the current theme.
- **Highlight** replaces the theme's accent colour. The figure's stroke follows
  it, and text on filled highlights flips between dark and white to stay
  readable. "theme" returns to the theme's own colour.
- **Text** and **Titles** replace the typefaces; "theme font" returns to the
  theme's own.
- **Reset all** clears the highlight and font overrides.

Theme and mode are kept in the URL (e.g. `#sage/dark`) so a view can be linked;
the overrides are remembered in this browser only.

## How it is put together

The site is built by Jekyll (GitHub Pages), which drops files and folders whose
names start with `_`, so nothing in here may use that prefix.

Stylesheets load in this order:

- `themes/base.css` re-points the colours, fonts and radii that `index.html`
  hard-codes to variables whose defaults match the shipping design. On its own
  it changes nothing.
- `themes/quiet.css` is the shared structure: sentence case, larger labels,
  soft surfaces, one accent.
- `themes/type.css` (Instrument, Figtree, Lexend) adds a shared palette and type
  rules: an even x-height across faces via `font-size-adjust`, a three-step
  type scale, tabular figures, pin/lock icons faint until their row is hovered.
- `themes/<id>.css` sets the theme's palette and typeface.
- In Dark, `themes/dark.css` and then `themes/<id>-dark.css` swap the palette.

`apply-theme.js` injects these into the running app, applies the overrides as
inline variables on the root element, and sets the figure's own colour controls
through their input events, as a user would. Accent tints elsewhere are mixed
from `--accent`, so one picked colour carries through the whole UI.

The app paints the small waveform previews lime on black; the themes recolour
them with a CSS filter rather than touching the app.
