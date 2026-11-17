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

## Frost designs

`designs/` holds the Frost family: ten looks that share one shape language
(rounded borderless cards on soft shadows, sentence-case titles, pill switches
and tabs, ringed round handles) and differ only in colour. Five are light and
each has a dark counterpart. The layout is the app's own. Open
`mockups/designs/` (served, as above) to switch between them on the real app.
Arrow keys step through them, and **Copy CSS** copies the current one.

| # | Name | Mode | Colours |
|---|------|------|---------|
| 01 | Frost | light | blue-grey, deep teal, plum |
| 02 | Sage | light | green-grey, forest green, rust |
| 03 | Blush | light | rose-grey, raspberry, slate blue |
| 04 | Sand | light | warm stone, burnt orange, teal |
| 05 | Iris | light | lavender-grey, indigo, plum |
| 06 | Frost Night | dark | slate, ice blue, lilac |
| 07 | Sage Night | dark | pine, mint, apricot |
| 08 | Blush Night | dark | plum-brown, pink, periwinkle |
| 09 | Sand Night | dark | espresso, amber, aqua |
| 10 | Iris Night | dark | ink-violet, periwinkle, orchid |

Each design is one CSS file that sets the token layer's variables and restyles
existing elements, so adopting one means appending it to the end of the
`<style>` block in `index.html`. The figure's own background and stroke colours
for each are listed in `designs/designs.js`; set them in the Look tab. Text
colours meet WCAG AA (4.5:1) and control outlines 3:1 on every surface.

## Minimal designs

`designs2/` holds ten minimal looks, with the shipping design as entry 00 for
comparison. They share one flat shape language: no card fills or shadows,
sections divided by a hairline, text-only switches whose active state is a
solid block of the highlight. One saturated highlight carries the titles,
values, handles and every active state. Corner radius, handle shape and title
case vary between them. Open `mockups/designs2/` (served) to switch between
them; it works like `designs/`.

| # | Name | Mode | Colours | Corners · handles |
|---|------|------|---------|-------------------|
| 00 | Current | dark | the app as it ships | — |
| 01 | Signal | light | white, signal red, blue | 0px · square |
| 02 | Cobalt | light | white, cobalt, orange | 4px · round |
| 03 | Flare | dark | black, yellow, sky blue | 0px · bar |
| 04 | Field | light | warm white, green, magenta | 6px · round |
| 05 | Pulse | dark | black, hot pink, cyan | 6px · round |
| 06 | Ember | light | paper white, orange, navy | 2px · bar |
| 07 | Volt | dark | graphite, cyan, coral | 2px · square |
| 08 | Ultra | light | white, ultraviolet, green | 8px · round |
| 09 | Acid | dark | black, lime, pink | 0px · square |
| 10 | Primary | light | white, red, blue, yellow rule | 0px · bar |

Text and highlights meet WCAG AA (4.5:1) and control outlines 3:1 on every
surface.
