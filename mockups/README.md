# Design mockups

Ten alternative visual directions for lissa. Each one is a stylesheet laid over
the unmodified `index.html`, so every control, preset, shortcut and MIDI
mapping works exactly as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`) and pick a theme from the bar; ← / → step through.

| # | Theme | Direction |
|---|-------|-----------|
| 01 | Swiss Grid | White paper, black type, one red; hairlines, no radii, numbered sections |
| 02 | Brutalist | Thick black borders, hard offset shadows, acid yellow and hot pink |
| 03 | Modular Panel | Eurorack-style aluminium plate: screws, silkscreen, fader caps, amber LEDs |
| 04 | Phosphor CRT | Green-phosphor oscilloscope: scanlines, glow, pixel type, graticule |
| 05 | Blueprint | Cobalt drafting sheet, dimension-line sliders, title-block footer |
| 06 | Bauhaus | Cream ground, primary colours, circles and bars, geometric sans |
| 07 | Aurora Glass | Frosted floating panels over a violet–teal glow |
| 08 | Editorial | Newsprint, serif display, italic captions, oxblood ink |
| 09 | Retro Desktop | Bevelled grey windows, title bars, teal desktop |
| 10 | Soft Clay | Neumorphic: one material, raised and pressed-in controls |

## How it is put together

- `themes/_base.css` re-points the colours, fonts and radii that `index.html`
  hard-codes to variables whose defaults match the shipping design. On its own
  it changes nothing.
- `themes/<id>.css` sets those variables and adds the theme's signature rules.
- `apply-theme.js` injects both into the running app and sets the figure's own
  colour controls (stroke, gradient, background, frame axes) through their
  input events, as a user would.

Known gap: the small waveform previews under the wave switches are drawn by
the app in fixed colours, so they keep the current palette in every theme.
