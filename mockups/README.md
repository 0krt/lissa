# Style editor

A live editor for lissa's look, working on the shipping design rather than on
separate themes. It loads the unmodified `index.html`, so every control,
preset, shortcut and MIDI mapping works as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`).

The defaults are the app as it ships, except that the parameter boxes (the
X axis / Y axis groups and similar) have no left line.

## Controls

| Group | What it sets |
|-------|--------------|
| Highlights | Highlight 1 (active switches, values, sliders, titles) and Highlight 2 (group labels, modulation, help); whether the figure stroke follows Highlight 1 |
| Backgrounds | Figure, panels, sections, fields and slider tracks |
| Text & lines | Text, labels, muted text, dividers, control outlines |
| Fonts | Separate faces for text, titles and numbers (22 Google Fonts) |
| Sections | Corner radius, outline, tinted title bar, title case and size |
| Parameter boxes | Left line on/off, fill strength, corner radius, label colour |
| Labels & values | Label size, value colour, pin/lock icons faint until hover |
| Sliders | Handle shape (round, square, bar), handle size, track height and colour |
| Buttons & switches | Corner radius; active state filled, outlined or tinted |
| Tabs & layout | Tab icons, tab case, spacing density, sidebar width |

Changed controls are marked, with a count per group. Settings are remembered in
this browser. **Copy CSS** puts the generated rules on the clipboard and shows
them; **Reset all** returns to the defaults.

To adopt a look in the app, paste `themes/base.css` and then the copied CSS at
the end of the `<style>` block in `index.html`.

## How it is put together

- `themes/base.css` re-points the colours, fonts and radii that `index.html`
  hard-codes to variables whose defaults match the shipping design. On its own
  it changes nothing.
- `editor.js` holds the control schema, builds the override CSS from it, and
  applies it to the running app: base.css, one generated `<style>`, a Google
  Fonts link for the chosen faces, and the figure's own colour inputs set
  through their input events, as a user would.
- Text on a filled highlight switches between dark and white by luminance, and
  on light section colours the app's waveform previews are inverted to match.

The site is built by Jekyll (GitHub Pages), which drops files and folders whose
names start with `_`, so nothing in here may use that prefix.
