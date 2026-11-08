/* Style editor for the shipping lissa design. It never touches the app's code:
   it adds themes/base.css (which maps the app's hard-coded colours, fonts and
   radii onto variables), then one generated <style> built from the controls
   below, and sets the figure's own colour inputs the way a user would.

   Every default equals the shipping design, so the editor opens on the app as
   it is. */
(function (root) {
  // Faces offered by the font selectors: family → [Google Fonts axis spec, generic fallback].
  const FONTS = {
    'IBM Plex Mono':         ['wght@300;400;500', 'monospace'],
    'IBM Plex Sans':         ['wght@400;500;600', 'sans-serif'],
    'Instrument Sans':       ['wght@400;500;600', 'sans-serif'],
    'Instrument Serif':      ['ital@0;1', 'serif'],
    'Figtree':               ['wght@400;500;600;700', 'sans-serif'],
    'Lexend':                ['wght@300;400;500;600', 'sans-serif'],
    'Karla':                 ['wght@400;500;700', 'sans-serif'],
    'Inter':                 ['wght@400;500;600', 'sans-serif'],
    'DM Sans':               ['opsz,wght@9..40,400;9..40,500;9..40,700', 'sans-serif'],
    'Manrope':               ['wght@400;500;600;700', 'sans-serif'],
    'Atkinson Hyperlegible': ['wght@400;700', 'sans-serif'],
    'Geist':                 ['wght@400;500;600', 'sans-serif'],
    'Public Sans':           ['wght@400;500;600', 'sans-serif'],
    'Work Sans':             ['wght@400;500;600', 'sans-serif'],
    'Space Grotesk':         ['wght@400;500;600', 'sans-serif'],
    'Source Serif 4':        ['opsz,wght@8..60,400;8..60,600', 'serif'],
    'Fraunces':              ['opsz,wght@9..144,400;9..144,600', 'serif'],
    'Newsreader':            ['opsz,wght@6..72,400;6..72,500', 'serif'],
    'JetBrains Mono':        ['wght@400;500', 'monospace'],
    'DM Mono':               ['wght@400;500', 'monospace'],
    'Geist Mono':            ['wght@400;500', 'monospace'],
    'Space Mono':            ['wght@400;700', 'monospace'],
  };
  const fontNames = Object.keys(FONTS);

  // The controls, grouped as the panel shows them. type: color | font | select | range | toggle.
  const GROUPS = [
    { title: 'Highlights', items: [
      { key: 'accent',  label: 'Highlight 1', type: 'color', def: '#3a9c9b', hint: 'active switches, values, sliders, titles' },
      { key: 'accent2', label: 'Highlight 2', type: 'color', def: '#3264a4', hint: 'group labels, modulation, help' },
      { key: 'figFollow', label: 'Figure uses highlight 1', type: 'toggle', def: true },
    ] },
    { title: 'Backgrounds', items: [
      { key: 'figBg',   label: 'Figure',         type: 'color', def: '#0c0c0e' },
      { key: 'panel',   label: 'Panels',         type: 'color', def: '#121215' },
      { key: 'card',    label: 'Sections',       type: 'color', def: '#121616' },
      { key: 'inset',   label: 'Fields & tracks', type: 'color', def: '#151519' },
    ] },
    { title: 'Text & lines', items: [
      { key: 'text',    label: 'Text',           type: 'color', def: '#d4d4d8' },
      { key: 'label',   label: 'Labels',         type: 'color', def: '#8787a1' },
      { key: 'muted',   label: 'Muted',          type: 'color', def: '#8b8b98' },
      { key: 'line',    label: 'Dividers',       type: 'color', def: '#2b2b36' },
      { key: 'outline', label: 'Control outlines', type: 'color', def: '#525260' },
    ] },
    { title: 'Fonts', items: [
      { key: 'fontUi',    label: 'Text',    type: 'font', def: 'Atkinson Hyperlegible' },
      { key: 'fontTitle', label: 'Titles',  type: 'font', def: 'Atkinson Hyperlegible' },
      { key: 'fontNum',   label: 'Numbers', type: 'font', def: 'Atkinson Hyperlegible' },
    ] },
    { title: 'Sections', items: [
      { key: 'secRadius', label: 'Corner radius', type: 'range', min: 0, max: 20, step: 1, unit: 'px', def: 7 },
      { key: 'secBorder', label: 'Outline', type: 'toggle', def: true },
      { key: 'secHeadTint', label: 'Tinted title bar', type: 'toggle', def: true },
      { key: 'titleCase', label: 'Title case', type: 'select', options: [['upper', 'UPPERCASE'], ['sentence', 'Sentence case']], def: 'upper' },
      { key: 'titleSize', label: 'Title size', type: 'range', min: 11, max: 20, step: 0.5, unit: 'px', def: 13 },
    ] },
    { title: 'Parameter boxes', items: [
      { key: 'groupLine', label: 'Left line', type: 'toggle', def: false },
      { key: 'groupFill', label: 'Fill', type: 'range', min: 0, max: 10, step: 0.5, unit: '%', def: 3 },
      { key: 'groupRadius', label: 'Corner radius', type: 'range', min: 0, max: 14, step: 1, unit: 'px', def: 4 },
      { key: 'groupLabel', label: 'Box label colour', type: 'select', options: [['accent2', 'Highlight 2'], ['accent', 'Highlight 1'], ['muted', 'Muted']], def: 'accent2' },
    ] },
    { title: 'Labels & values', items: [
      { key: 'labelSize', label: 'Label size', type: 'range', min: 10, max: 15, step: 0.5, unit: 'px', def: 11.5 },
      { key: 'valueColor', label: 'Value colour', type: 'select', options: [['accent', 'Highlight 1'], ['accent2', 'Highlight 2'], ['text', 'Text']], def: 'accent' },
      { key: 'quietIcons', label: 'Fade pin/lock until hover', type: 'toggle', def: true },
    ] },
    { title: 'Sliders', items: [
      { key: 'thumbShape', label: 'Handle', type: 'select', options: [['round', 'Round'], ['square', 'Square'], ['bar', 'Bar']], def: 'round' },
      { key: 'thumbSize', label: 'Handle size', type: 'range', min: 10, max: 22, step: 1, unit: 'px', def: 15 },
      { key: 'trackH', label: 'Track height', type: 'range', min: 2, max: 10, step: 1, unit: 'px', def: 4 },
      { key: 'track', label: 'Track colour', type: 'color', def: '#3f3f4c' },
    ] },
    { title: 'Buttons & switches', items: [
      { key: 'btnRadius', label: 'Corner radius', type: 'range', min: 0, max: 16, step: 1, unit: 'px', def: 5 },
      { key: 'activeStyle', label: 'Active state', type: 'select', options: [['fill', 'Filled'], ['outline', 'Outlined'], ['tint', 'Tinted']], def: 'outline' },
    ] },
    { title: 'Tabs & layout', items: [
      { key: 'tabIcons', label: 'Tab icons', type: 'toggle', def: true },
      { key: 'tabCase', label: 'Tab case', type: 'select', options: [['upper', 'UPPERCASE'], ['sentence', 'Sentence case']], def: 'upper' },
      { key: 'density', label: 'Spacing', type: 'select', options: [['compact', 'Compact'], ['normal', 'Normal'], ['roomy', 'Roomy']], def: 'compact' },
      { key: 'sidebarW', label: 'Sidebar width', type: 'range', min: 240, max: 380, step: 10, unit: 'px', def: 270 },
    ] },
  ];
  const DEFAULTS = Object.fromEntries(GROUPS.flatMap(g => g.items.map(i => [i.key, i.def])));

  const fam = name => `'${name}', ${(FONTS[name] || FONTS['IBM Plex Mono'])[1]}`;
  // Text on a filled highlight must read either way: dark on light colours, white on dark ones.
  function onColor(hex) {
    const n = parseInt(hex.slice(1), 16);
    const l = [n >> 16, (n >> 8) & 255, n & 255].map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * l[0] + 0.7152 * l[1] + 0.0722 * l[2] > 0.4 ? '#0c0c0e' : '#ffffff';
  }

  function buildCSS(s) {
    s = Object.assign({}, DEFAULTS, s);
    const mix = (c, p) => `color-mix(in srgb, ${c} ${p}%, transparent)`;
    const upper = s.titleCase === 'upper';
    const thumb = {
      round:  [s.thumbSize, s.thumbSize, '50%'],
      square: [s.thumbSize, s.thumbSize, '3px'],
      bar:    [Math.round(s.thumbSize * 0.45), Math.round(s.thumbSize * 1.4), '2px'],
    }[s.thumbShape];
    const gap = { compact: [6, 10], normal: [10, 16], roomy: [14, 22] }[s.density];
    const active = {
      fill: '',
      outline: `.wave-btn.active, .wave-btn.active:hover, .preset-btn.active, .preset-btn.active:hover {
  background: transparent; color: var(--accent); box-shadow: inset 0 0 0 1px var(--accent); }
.lfo-wave-btn.active, .mod-wave-btn.active, .mod-axis-btn.active { background: transparent; }`,
      tint: `.wave-btn.active, .wave-btn.active:hover { background: ${mix('var(--accent)', 18)}; color: var(--accent); }
.preset-btn.active, .preset-btn.active:hover { background: ${mix('var(--accent)', 18)}; }`,
    }[s.activeStyle];
    return `/* lissa style overrides — generated by mockups/index.html */
:root {
  --accent: ${s.accent}; --accent-hi: color-mix(in srgb, ${s.accent} 80%, white); --on-accent: ${onColor(s.accent)};
  --accent2: ${s.accent2}; --focus: ${s.text};
  --a1-soft: ${mix(s.accent, 7)}; --a1-mid: ${mix(s.accent, 12)};
  --a2-soft: ${mix(s.accent2, 12)}; --a2-mid: ${mix(s.accent2, 15)}; --a2-strong: ${mix(s.accent2, 28)};
  --panel: ${s.panel}; --card: ${s.card}; --bg: ${s.inset};
  --overlay: ${mix(s.panel, 86)}; --popover: ${s.card}; --dock: ${mix(s.panel, 90)};
  --text: ${s.text}; --label: ${s.label}; --muted: ${s.muted};
  --border: ${s.line}; --card-border: ${s.secBorder ? s.line : 'transparent'}; --control-border: ${s.outline};
  --track: ${s.track};
  --font-ui: ${fam(s.fontUi)}; --font-display: ${fam(s.fontTitle)}; --font-num: ${fam(s.fontNum)};
  --card-radius: ${s.secRadius}px; --head-wash: ${s.secHeadTint ? mix(s.accent, 4) : 'transparent'};
  --mod-edge: ${s.groupLine ? '2px' : '0px'}; --wash: color-mix(in srgb, ${s.text} ${s.groupFill}%, transparent);
  --thumb-w: ${thumb[0]}px; --thumb-h: ${thumb[1]}px; --thumb-radius: ${thumb[2]}; --thumb-ring: ${s.inset};
  --track-h: ${s.trackH}px; --track-radius: ${Math.ceil(s.trackH / 2)}px;
  --radius: ${s.btnRadius}px; --ctl-radius: ${Math.max(0, s.btnRadius - 2)}px; --btn-radius: ${s.btnRadius}px;
}
.mod-group, .map-row { border-left-width: var(--mod-edge); border-radius: ${s.groupRadius}px; }
.vel-label, .mod-group-label { color: var(--${s.groupLabel}); }
.section-label, .subsection-label, .preset-sidebar-head .section-label, .vel-label, .mod-group-label {
  text-transform: ${upper ? 'uppercase' : 'none'}; letter-spacing: ${upper ? '0.14em' : '0'};
}
.section-label { font-size: ${s.titleSize}px; }
.subsection-label { font-size: ${Math.max(10, s.titleSize - 2.5)}px; }
.param-header label, .checkbox-row label, .color-row label, .number-input label { font-size: ${s.labelSize}px; }
.param-header .val { color: var(--${s.valueColor}); font-size: ${s.labelSize - 0.5}px; }
${s.quietIcons ? `.param-row .pin-btn, .param-row .lock-btn { opacity: 0.3; transition: opacity 0.12s; }
.param-row:hover .pin-btn, .param-row:hover .lock-btn, .param-row:focus-within .pin-btn, .param-row:focus-within .lock-btn,
.pin-btn[aria-pressed="true"], .lock-btn[aria-pressed="true"] { opacity: 1; }
@media (hover: none) { .param-row .pin-btn, .param-row .lock-btn { opacity: 1; } }` : ''}
${active}
${s.tabIcons ? '' : '.tab-btn svg { display: none; }'}
${onColor(s.card) === '#0c0c0e' ? `/* Light sections: the app paints the waveform preview light-on-black, so invert it onto the card. */
.wave-preview { filter: invert(1) grayscale(1) contrast(1.4); mix-blend-mode: multiply; }` : ''}
.tab-btn { text-transform: ${s.tabCase === 'upper' ? 'uppercase' : 'none'}; letter-spacing: ${s.tabCase === 'upper' ? '0.12em' : '0'}; }
.param-row { margin-bottom: ${gap[0]}px; }
/* Handles taller than the stock 16px get room so they never cover the value above. */
input[type=range] { margin: ${Math.max(0, Math.ceil((thumb[1] - 16) / 2))}px 0; }
/* Pin and lock follow Muted (the app tied them to the track colour, which vanishes on light grounds). */
.pin-btn, .lock-btn { color: color-mix(in srgb, var(--muted) 45%, var(--card)); }
.pin-btn:hover, .lock-btn:hover { color: var(--label); }
.pin-btn[aria-pressed="true"] { color: var(--accent); }
.lock-btn[aria-pressed="true"] { color: var(--accent2); }
.sidebar { gap: ${gap[1]}px; width: ${s.sidebarW}px; min-width: ${s.sidebarW}px; }
`;
  }

  function setColor(doc, id, value) {
    const el = doc.getElementById(id);
    if (!el || !value || el.value === value) return;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function apply(win, state, base) {
    const doc = win.document;
    const s = Object.assign({}, DEFAULTS, state);
    if (!doc.querySelector('link[data-mockup="base"]')) {
      const l = doc.createElement('link');
      l.rel = 'stylesheet'; l.href = (base || 'themes/') + 'base.css'; l.dataset.mockup = 'base';
      doc.head.appendChild(l);
    }
    const faces = [...new Set([s.fontUi, s.fontTitle, s.fontNum])].filter(f => FONTS[f]);
    const href = 'https://fonts.googleapis.com/css2?' +
      faces.map(f => 'family=' + f.replace(/ /g, '+') + ':' + FONTS[f][0]).join('&') + '&display=swap';
    let fl = doc.querySelector('link[data-mockup="fonts"]');
    if (!fl) { fl = doc.createElement('link'); fl.rel = 'stylesheet'; fl.dataset.mockup = 'fonts'; doc.head.appendChild(fl); }
    if (fl.href !== href) fl.href = href;
    let st = doc.querySelector('style[data-mockup="editor"]');
    if (!st) { st = doc.createElement('style'); st.dataset.mockup = 'editor'; doc.head.appendChild(st); }
    st.textContent = buildCSS(s);
    // Keep the generated rules after base.css, whatever order they were added in.
    doc.head.appendChild(st);
    setColor(doc, 'bg-color', s.figBg);
    if (s.figFollow) setColor(doc, 'stroke-color', s.accent);
    clearTimeout(apply._t);
    apply._t = setTimeout(() => win.dispatchEvent(new Event('resize')), 120);
  }

  root.LissaEditor = { FONTS, fontNames, GROUPS, DEFAULTS, buildCSS, apply };
})(typeof window !== 'undefined' ? window : globalThis);
