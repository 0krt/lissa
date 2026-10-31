/* Applies a mockup theme to a running lissa document without touching its code:
   it adds the token layer and the theme stylesheet, then sets the figure's own
   colour controls the way a user would (value + input event), so the canvas
   matches the chrome. Everything else — state, presets, MIDI, audio — is the
   app as it ships. */
(function (root) {
  // quiet: true also loads _quiet.css, the shared structure the eight newer
  // themes are built on; editorial and clay stand on their own.
  const THEMES = [
    { id: 'current',    name: 'Current',          note: 'The shipping design, for reference.',
      fig: null },
    { id: 'editorial',  name: 'Editorial',        note: 'Warm newsprint, serif display, italic captions, oxblood ink, column rules.',
      fig: { stroke: '#7a1f2b', grad: '#1f1a17', bg: '#f6f1e7', x: '#7a1f2b', y: '#2f4a3a', z: '#1f1a17', grid: '#d6ccb8' } },
    { id: 'clay',       name: 'Soft Clay',        note: 'Neumorphic: one soft grey material, raised and pressed-in controls, no lines.',
      fig: { stroke: '#6c63ff', grad: '#ff7aa8', bg: '#e4e8ef', x: '#ff7aa8', y: '#6c63ff', z: '#3fb8af', grid: '#c4cad6' } },
    { id: 'paper',      name: 'Paper',     quiet: true, note: 'White page, near-black sans, one quiet blue. Hairlines, no cards.',
      fig: { stroke: '#2f5fb3', grad: '#1c1c1c', bg: '#fbfbf9', x: '#c0392b', y: '#2f8a57', z: '#2f5fb3', grid: '#dcdcd8' } },
    { id: 'notebook',   name: 'Notebook',  quiet: true, note: 'Cream page, a readable serif, ink-blue accent, faint rules.',
      fig: { stroke: '#23468c', grad: '#22201b', bg: '#f6f2e8', x: '#a5352b', y: '#3d6b48', z: '#23468c', grid: '#ddd6c4' } },
    { id: 'stone',      name: 'Stone',     quiet: true, note: 'Warm grey, soft raised cards, terracotta accent.',
      fig: { stroke: '#b5532f', grad: '#2c2824', bg: '#efebe5', x: '#b5532f', y: '#5d7a5a', z: '#4f6a8a', grid: '#d6cfc5' } },
    { id: 'sage',       name: 'Sage',      quiet: true, note: 'Pale green-grey, rounded pills, one muted green.',
      fig: { stroke: '#3f6b4f', grad: '#1f2a22', bg: '#eef2ec', x: '#a8443a', y: '#3f6b4f', z: '#45658a', grid: '#d3dbd0' } },
    { id: 'kraft',      name: 'Kraft',     quiet: true, note: 'Brown-paper ground, flat surfaces, dark brown ink, no shadows.',
      fig: { stroke: '#5a3a1e', grad: '#2b2117', bg: '#e8ddcb', x: '#9a3324', y: '#4c6a3a', z: '#3d5878', grid: '#cbbca3' } },
    { id: 'fog',        name: 'Fog',       quiet: true, note: 'Cool off-white, borderless floating cards, slate accent.',
      fig: { stroke: '#3d5a80', grad: '#1f2933', bg: '#f3f5f7', x: '#b83a3a', y: '#3a8a63', z: '#3d5a80', grid: '#dce1e7' } },
    { id: 'reader',     name: 'Reader',    quiet: true, note: 'A book page: white, black serif, small-caps headings, brick red for the selection.',
      fig: { stroke: '#1a1a1a', grad: '#a33a25', bg: '#fdfcf9', x: '#a33a25', y: '#3f6a4a', z: '#34558a', grid: '#e0dbd0' } },
    { id: 'evening',    name: 'Evening',   quiet: true, note: 'The dark one: warm charcoal, cream text, soft amber accent.',
      fig: { stroke: '#e3b061', grad: '#ece6da', bg: '#1b1a18', x: '#f08a7a', y: '#9cc59a', z: '#8fb3e0', grid: '#3a3833' } },
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
      const sheets = ['_base.css'].concat(theme.quiet ? ['_quiet.css'] : [], [theme.id + '.css']);
      for (const href of sheets.map(f => base + f)) {
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
