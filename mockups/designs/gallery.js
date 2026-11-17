/* Design gallery: loads the unmodified app once (as srcdoc, so it is same-origin
   with this page), then swaps one <style> inside it and sets the figure's own
   colours, as a user would in the Look tab. Needs designs.js first and the app
   at the URL in <body data-app>. */
(function () {
  const D = window.LissaDesigns;
  const $ = id => document.getElementById(id);
  const frame = $('app');
  const css = {};
  let cur = 0;
  const pick = (s, k) => (s.match(new RegExp('--' + k + ':\\s*(#[0-9a-fA-F]{6})')) || [])[1];

  function chips() {
    const row = $('chips');
    D.forEach((d, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip'; b.id = 'chip-' + d.id;
      b.setAttribute('aria-pressed', 'false');
      const s = css[d.id];
      b.innerHTML = '<span class="sw"><i style="background:' + pick(s, 'panel') + '"></i><i style="background:' +
        pick(s, 'accent') + '"></i><i style="background:' + pick(s, 'accent2') + '"></i></span>' +
        '<span class="nm">' + d.name + '</span>';
      b.addEventListener('click', () => show(i));
      row.appendChild(b);
    });
  }

  function setColor(doc, id, v) {
    const el = doc.getElementById(id);
    if (!el) return;
    el.value = v;
    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function show(i) {
    cur = (i + D.length) % D.length;
    const d = D[cur];
    document.querySelectorAll('.chip').forEach(c => c.setAttribute('aria-pressed', String(c.id === 'chip-' + d.id)));
    $('chip-' + d.id).scrollIntoView({ block: 'nearest', inline: 'nearest' });
    $('note').textContent = d.note;
    $('num').textContent = String(cur + 1).padStart(2, '0') + ' / ' + D.length;
    try { localStorage.setItem('lissa.design', d.id); } catch (e) {}
    const win = frame.contentWindow, doc = win && win.document;
    if (!doc || !doc.head) return;
    let st = doc.getElementById('lissa-design');
    if (!st) { st = doc.createElement('style'); st.id = 'lissa-design'; doc.head.appendChild(st); }
    st.textContent = css[d.id];
    setColor(doc, 'bg-color', d.fig[0]);
    setColor(doc, 'stroke-color', d.fig[1]);
    setTimeout(() => win.dispatchEvent(new Event('resize')), 60);
  }

  async function copy() {
    const t = css[D[cur].id];
    try { await navigator.clipboard.writeText(t); $('copy').textContent = 'Copied'; }
    catch (e) { $('copy').textContent = 'Copy failed'; }
    setTimeout(() => { $('copy').textContent = 'Copy CSS'; }, 1400);
  }

  document.addEventListener('keydown', e => {
    if (e.target !== document.body) return;
    if (e.key === 'ArrowRight' || e.key === ']') show(cur + 1);
    if (e.key === 'ArrowLeft' || e.key === '[') show(cur - 1);
  });
  $('prev').addEventListener('click', () => show(cur - 1));
  $('next').addEventListener('click', () => show(cur + 1));
  $('copy').addEventListener('click', copy);

  (async () => {
    try {
      const [app, ...sheets] = await Promise.all([document.body.dataset.app || 'app.html', ...D.map(d => d.id + '.css')]
        .map(u => fetch(u).then(r => { if (!r.ok) throw new Error(u); return r.text(); })));
      D.forEach((d, i) => { css[d.id] = sheets[i]; });
      chips();
      let start = 0;
      try { start = Math.max(0, D.findIndex(d => d.id === localStorage.getItem('lissa.design'))); } catch (e) {}
      cur = start;
      frame.addEventListener('load', () => show(cur), { once: true });
      frame.srcdoc = app;
    } catch (e) {
      $('note').textContent = 'Could not load ' + e.message + '. Serve the repository (python3 -m http.server) and open /mockups/designs/.';
    }
  })();
})();
