# Style editor

A live editor for lissa's look, working on the shipping design rather than on
separate themes. It loads the unmodified `index.html`, so every control,
preset, shortcut and MIDI mapping works as it does in the app.

Open `mockups/index.html` (served, e.g. `python3 -m http.server`, or on the
Pages site at `/mockups/`).

The defaults are the app as it ships (the teal and Atkinson Hyperlegible
theme), so changes are measured from what users see today.

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

To adopt a look in the app, replace the theme values at the end of the
`<style>` block in `index.html` with the copied CSS. The token layer from
`themes/base.css` is already there.

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

## Ten designs

`designs/` holds ten complete looks for the app: the layout stays the same, and
only the colours and the shapes of sections, boxes, switches, tabs and slider
handles change. Open `mockups/designs/` (served, as above) to switch between
them on the real app. Arrow keys step through them, and **Copy CSS** copies the
current one.

| # | Name | Colours | Shapes |
|---|------|---------|--------|
| 01 | Paper | ink on cream, vermilion, indigo | open sections ruled by a heavy ink line, square corners, hairline tracks |
| 02 | Brutal | white, black, electric blue, magenta, yellow | 2px outlines, hard offset shadows, yellow title strips, square handles |
| 03 | Frost | white on blue-grey, deep teal, plum | rounded borderless cards on soft shadows, pills |
| 04 | Phosphor | black, phosphor green, amber | dashed square frames, inverted title blocks, bar handles, glow |
| 05 | Neon | deep violet, magenta, cyan | cut-corner cards and buttons, diamond handles, gradient title rules |
| 06 | Clay | roasted brown, terracotta, sage | leaf corners, folder tabs, teardrop handles |
| 07 | Swiss | white, black, signal red, blue | no outlines or radii, sections hang from thick black bars |
| 08 | Abyss | navy gradients, aqua, coral | frosted rounded panes, pills everywhere, haloed handles |
| 09 | Lilac | pale lavender, violet, deep teal | soft UI: raised cards, sunken switches and tracks |
| 10 | Blueprint | cyanotype blue, white, yellow | dashed frames with corner ticks on a grid, hollow handles |

Each design is one CSS file that only sets the token layer's variables and
restyles existing elements, so adopting one means appending it to the end of
the `<style>` block in `index.html`. The figure's own background and stroke
colours for each are listed in `designs/designs.js`; set them in the Look tab.
Text colours meet WCAG AA (4.5:1) and control outlines 3:1 on every surface.
