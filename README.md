# lissa

A parametric figure generator in a single dependency-free HTML file. Two
oscillators drive the X and Y of a point; their ratio, phase, waveforms and
modulation decide the figure, and the same waves can be heard as audio.

Open `index.html` in a browser, or use the GitHub Pages site deployed from
`main` by `.github/workflows/jekyll-gh-pages.yml`. There is no build step.

## Panel

The controls are split into five tabs.

- **Shape** — geometry (lateral, con-current, counter-current, rose, torus
  knot, raw waves), per-axis amplitude and frequency, damping and ratio
  presets.
- **Sound** — waveforms, synthesis (FM/AM, sub oscillator),
  audio output and input source.
- **Look** — view, colour, stroke, symmetry, trail, 3D lift, construction view
  and column view.
- **Motion** — LFOs and evolve.
- **Setup** — note input (manual or MIDI), MIDI input and CC mapping, wave out,
  video recording, patch files, wavetable export and image export.

`/` opens a search over every control. Parameters can be locked (🔒) so
randomizing leaves them alone, and pinned (☆) for quick access.

Typing `intro` in the search starts a guided introduction that unlocks the app
one synthesis stage at a time; progress is kept per browser.

## Style editor

`mockups/` holds a live style editor that loads the unmodified app and lets
you change its colours and fonts. See [`mockups/README.md`](mockups/README.md).

## Storage

UI state, locks, the readout toggle and intro progress are kept in
`localStorage`. Nothing leaves the browser.
