/* Applies a mockup theme to a running lissa document without touching its code:
   it adds the stylesheets, then sets the figure's own colour controls the way a
   user would (value + input event), so the canvas matches the chrome.
   Everything else — state, presets, MIDI, audio — is the app as it ships.

   applyTheme(win, id, base, opts)
     opts.mode   'bright' | 'dark'
     opts.accent '#rrggbb' to replace the theme's highlight colour, or null
     opts.text   a FONTS key to replace the theme's text face, or null
     opts.title  a FONTS key to replace the theme's title face, or null */
(function (root) {
  // Stylesheets per theme, in order: base.css always; quiet.css for the shared
  // structure; type.css for the round-3 type rules; then <id>.css; in Dark
  // also dark.css and <id>-dark.css.
  const THEMES = [
    { id: 'current', name: 'Current', note: 'The shipping design, for reference.' },
    { id: 'instrument', name: 'Instrument', type: true,
      note: 'Instrument Sans for controls, Instrument Serif for titles.',
      fig: { bright: { bg: '#fbfaf8', grid: '#e2e0d9' }, dark: { bg: '#1a191f', grid: '#34323c' } } },
    { id: 'figtree', name: 'Figtree', type: true,
      note: 'Figtree: friendly geometric sans, rounder controls.',
      fig: { bright: { bg: '#fbfaf8', grid: '#e2e0d9' }, dark: { bg: '#1d1916', grid: '#3a332d' } } },
    { id: 'lexend', name: 'Lexend', type: true,
      note: 'Lexend: wide letterforms and loose spacing, built for easy scanning.',
      fig: { bright: { bg: '#fbfaf8', grid: '#e2e0d9' }, dark: { bg: '#151c1b', grid: '#2f3a38' } } },
    { id: 'sage', name: 'Sage',
      note: 'Karla on a green-grey ground, rounded pills, one muted green.',
      fig: { bright: { bg: '#eef2ec', grid: '#d3dbd0' }, dark: { bg: '#181e19', grid: '#313c32' } } },
    { id: 'fog', name: 'Fog',
      note: 'Inter on cool off-white, borderless floating cards, slate accent.',
      fig: { bright: { bg: '#f3f5f7', grid: '#dce1e7' }, dark: { bg: '#161b21', grid: '#2f3843' } } },
  ];

  // Faces offered by the font selectors: family → [Google Fonts axis spec, generic fallback].
  const FONTS = {
    'Instrument Sans':       ['wght@400;500;600', 'sans-serif'],
    'Instrument Serif':      ['ital@0;1', 'serif'],
    'Figtree':               ['wght@400;500;600;700', 'sans-serif'],
    'Lexend':                ['wght@300;400;500;600', 'sans-serif'],
    'Karla':                 ['wght@400;500;700', 'sans-serif'],
    'Inter':                 ['wght@400;500;600', 'sans-serif'],
    'DM Sans':               ['opsz,wght@9..40,400;9..40,500;9..40,700', 'sans-serif'],
    'Manrope':               ['wght@400;500;600;700', 'sans-serif'],
    'Atkinson Hyperlegible': ['wght@400;700', 'sans-serif'],
    'IBM Plex Sans':         ['wght@400;500;600', 'sans-serif'],
    'Geist':                 ['wght@400;500;600', 'sans-serif'],
    'Public Sans':           ['wght@400;500;600', 'sans-serif'],
    'Nunito':                ['wght@500;700;800', 'sans-serif'],
    'Work Sans':             ['wght@400;500;600', 'sans-serif'],
    'Source Serif 4':        ['opsz,wght@8..60,400;8..60,600', 'serif'],
    'Fraunces':              ['opsz,wght@9..144,400;9..144,600', 'serif'],
    'Newsreader':            ['opsz,wght@6..72,400;6..72,500', 'serif'],
    'EB Garamond':           ['wght@500;600', 'serif'],
    'IBM Plex Mono':         ['wght@400;500', 'monospace'],
    'DM Mono':               ['wght@400;500', 'monospace'],
  };

  function setColor(doc, id, value) {
    const el = doc.getElementById(id);
    if (!el || !value) return;
    el.value = value;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function addSheet(doc, href, kind) {
    const l = doc.createElement('link');
    l.rel = 'stylesheet'; l.href = href; l.dataset.mockup = kind;
    doc.head.appendChild(l);
    return l;
  }

  const family = name => `'${name}', ${FONTS[name][1]}`;
  // Text on a filled accent needs to read either way: dark on light picks, white on dark ones.
  function onAccent(hex) {
    const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255].map(v => {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] > 0.4 ? '#141414' : '#ffffff';
  }

  function applyTheme(win, id, base, opts) {
    const doc = win.document, html = doc.documentElement;
    opts = opts || {};
    base = base || 'themes/';
    const theme = THEMES.find(t => t.id === id) || THEMES[0];
    const mode = opts.mode === 'dark' ? 'dark' : 'bright';
    const custom = theme.id !== 'current';

    doc.querySelectorAll('link[data-mockup]').forEach(l => l.remove());
    if (custom) {
      const sheets = ['base.css', 'quiet.css'].concat(theme.type ? ['type.css'] : [], [theme.id + '.css'],
        mode === 'dark' ? ['dark.css', theme.id + '-dark.css'] : []);
      sheets.forEach(f => addSheet(doc, base + f, 'theme'));
    }

    // Manual overrides sit on the root element's inline style, above every sheet.
    ['--accent', '--on-accent', '--font-ui', '--font-num', '--font-display'].forEach(p => html.style.removeProperty(p));
    const picked = [opts.text, opts.title].filter(f => custom && f && FONTS[f]);
    if (picked.length) {
      const q = [...new Set(picked)].map(f => 'family=' + f.replace(/ /g, '+') + ':' + FONTS[f][0]).join('&');
      addSheet(doc, 'https://fonts.googleapis.com/css2?' + q + '&display=swap', 'font');
    }
    if (custom && opts.text && FONTS[opts.text]) {
      html.style.setProperty('--font-ui', family(opts.text));
      html.style.setProperty('--font-num', family(opts.text));
    }
    if (custom && opts.title && FONTS[opts.title]) html.style.setProperty('--font-display', family(opts.title));
    if (custom && opts.accent) {
      html.style.setProperty('--accent', opts.accent);
      html.style.setProperty('--on-accent', onAccent(opts.accent));
    }
    html.dataset.mockup = theme.id;
    html.dataset.mockupMode = mode;

    // The figure follows the highlight colour: read it back once the sheets apply.
    const paintFigure = () => {
      if (!custom) {
        const f = { stroke: '#c8f060', grad: '#5b8def', bg: '#0c0c0e', x: '#e5484d', y: '#4cc38a', z: '#5b8def', grid: '#8b909a' };
        Object.entries({ 'stroke-color': f.stroke, 'grad-color': f.grad, 'bg-color': f.bg, 'frame-col-x': f.x,
          'frame-col-y': f.y, 'frame-col-z': f.z, 'frame-col-grid': f.grid }).forEach(([k, v]) => setColor(doc, k, v));
        return;
      }
      const toHex = c => { const m = c.match(/\d+(\.\d+)?/g); return m && m.length >= 3
        ? '#' + m.slice(0, 3).map(v => Math.round(+v).toString(16).padStart(2, '0')).join('') : null; };
      const probe = doc.createElement('span'); probe.style.color = 'var(--accent)'; doc.body.appendChild(probe);
      const accent = toHex(win.getComputedStyle(probe).color); probe.style.color = 'var(--text)';
      const text = toHex(win.getComputedStyle(probe).color); probe.remove();
      const f = theme.fig[mode];
      setColor(doc, 'stroke-color', accent);
      setColor(doc, 'grad-color', text);
      setColor(doc, 'bg-color', f.bg);
      setColor(doc, 'frame-col-x', mode === 'dark' ? '#e5806e' : '#b42318');
      setColor(doc, 'frame-col-y', mode === 'dark' ? '#8fc29a' : '#2f7a4f');
      setColor(doc, 'frame-col-z', mode === 'dark' ? '#8fb3e0' : '#2f5fb3');
      setColor(doc, 'frame-col-grid', f.grid);
    };
    const links = [...doc.querySelectorAll('link[data-mockup="theme"]')];
    Promise.all(links.map(l => new Promise(r => { l.onload = l.onerror = r; }))).then(paintFigure);
    if (!links.length) paintFigure();

    // Panel widths differ per theme; let the app re-measure its figure box.
    setTimeout(() => win.dispatchEvent(new Event('resize')), 60);
    setTimeout(() => win.dispatchEvent(new Event('resize')), 400);
    return theme;
  }

  root.LissaMockups = { THEMES, FONTS, applyTheme };
})(typeof window !== 'undefined' ? window : globalThis);
