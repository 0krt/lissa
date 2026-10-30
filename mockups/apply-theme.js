/* Applies a mockup theme to a running lissa document without touching its code:
   it adds the token layer and the theme stylesheet, then sets the figure's own
   colour controls the way a user would (value + input event), so the canvas
   matches the chrome. Everything else — state, presets, MIDI, audio — is the
   app as it ships. */
(function (root) {
  const THEMES = [
    { id: 'current',    name: 'Current',          note: 'The shipping design, for reference.',
      fig: null },
    { id: 'swiss',      name: 'Swiss Grid',       note: 'White paper, black type, one red. Hairline grid, no radii, numbered sections.',
      fig: { stroke: '#e3120b', grad: '#111111', bg: '#f4f3ef', x: '#e3120b', y: '#111111', z: '#7a7a7a', grid: '#c9c7c0' } },
    { id: 'brutalist',  name: 'Brutalist',        note: 'Thick black borders, hard offset shadows, acid yellow and hot pink, oversized type.',
      fig: { stroke: '#ff2e88', grad: '#111111', bg: '#fffef5', x: '#ff2e88', y: '#2b2bff', z: '#111111', grid: '#111111' } },
    { id: 'hardware',   name: 'Modular Panel',    note: 'Anodised aluminium rack panel: silkscreen labels, screws, fader caps, LED-orange.',
      fig: { stroke: '#ff8a1f', grad: '#ffd36b', bg: '#0e1013', x: '#ff5a3c', y: '#7ee081', z: '#5fb4ff', grid: '#444a52' } },
    { id: 'phosphor',   name: 'Phosphor CRT',     note: 'Green-phosphor oscilloscope: scanlines, glow, pixel type, graticule frame.',
      fig: { stroke: '#4dff7a', grad: '#c8ffb0', bg: '#020a04', x: '#4dff7a', y: '#4dff7a', z: '#2a9c4a', grid: '#0f3a1a' } },
    { id: 'blueprint',  name: 'Blueprint',        note: 'Cobalt drafting sheet, white linework, dashed construction borders, title-block footer.',
      fig: { stroke: '#ffffff', grad: '#9fd3ff', bg: '#123e8c', x: '#ffd166', y: '#9fd3ff', z: '#ffffff', grid: '#3d6bb8' } },
    { id: 'bauhaus',    name: 'Bauhaus',          note: 'Cream ground, primary red/blue/yellow, circles and bars, geometric sans.',
      fig: { stroke: '#1d3fbb', grad: '#d6281e', bg: '#f1e9d8', x: '#d6281e', y: '#1d3fbb', z: '#f2b705', grid: '#b9ae98' } },
    { id: 'glass',      name: 'Aurora Glass',     note: 'Frosted translucent panels floating over a violet–teal field, soft radii.',
      fig: { stroke: '#a8f0ff', grad: '#ff9be6', bg: '#1a1033', x: '#ff9be6', y: '#a8f0ff', z: '#c7b8ff', grid: '#4a3d7a' } },
    { id: 'editorial',  name: 'Editorial',        note: 'Warm newsprint, serif display, italic captions, oxblood ink, column rules.',
      fig: { stroke: '#7a1f2b', grad: '#1f1a17', bg: '#f6f1e7', x: '#7a1f2b', y: '#2f4a3a', z: '#1f1a17', grid: '#d6ccb8' } },
    { id: 'desktop',    name: 'Retro Desktop',    note: 'Bevelled grey windows, navy title bars, teal desktop, pixel-era system type.',
      fig: { stroke: '#ffff00', grad: '#00ffff', bg: '#008080', x: '#ff0000', y: '#00ff00', z: '#ffffff', grid: '#006060' } },
    { id: 'clay',       name: 'Soft Clay',        note: 'Neumorphic: one soft grey material, extruded and pressed-in controls, no lines.',
      fig: { stroke: '#6c63ff', grad: '#ff7aa8', bg: '#e4e8ef', x: '#ff7aa8', y: '#6c63ff', z: '#3fb8af', grid: '#c4cad6' } },
  ];

  function setColor(doc, id, value) {
    const el = doc.getElementById(id);
    if (!el || !value) return;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function applyTheme(win, id, base) {
    const doc = win.document;
    base = base || 'themes/';
    doc.querySelectorAll('link[data-mockup]').forEach(l => l.remove());
    const theme = THEMES.find(t => t.id === id) || THEMES[0];
    if (theme.id !== 'current') {
      for (const href of [base + '_base.css', base + theme.id + '.css']) {
        const l = doc.createElement('link');
        l.rel = 'stylesheet'; l.href = href; l.dataset.mockup = '1';
        doc.head.appendChild(l);
      }
    }
    doc.documentElement.dataset.mockup = theme.id;
    const f = theme.fig || { stroke: '#c8f060', grad: '#5b8def', bg: '#0c0c0e', x: '#e5484d', y: '#4cc38a', z: '#5b8def', grid: '#8b909a' };
    setColor(doc, 'stroke-color', f.stroke);
    setColor(doc, 'grad-color', f.grad);
    setColor(doc, 'bg-color', f.bg);
    setColor(doc, 'frame-col-x', f.x);
    setColor(doc, 'frame-col-y', f.y);
    setColor(doc, 'frame-col-z', f.z);
    setColor(doc, 'frame-col-grid', f.grid);
    // Panel widths differ per theme; let the app re-measure its figure box.
    setTimeout(() => win.dispatchEvent(new Event('resize')), 60);
    setTimeout(() => win.dispatchEvent(new Event('resize')), 400);
    return theme;
  }

  root.LissaMockups = { THEMES, applyTheme };
})(typeof window !== 'undefined' ? window : globalThis);
