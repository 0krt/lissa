/* The Minimal family, after the current design for comparison: file, name, one-line description, and the figure's own
   colours (background and stroke), which live in the app's Look tab. */
(function (root) {
  const DESIGNS = [
    { id: '00-current', name: 'Current', fig: ['#0c0c0e', '#3a9c9b'], note: 'The app as it ships today, for comparison.' },
    { id: '01-signal', name: 'Signal', fig: ['#f3f3f3', '#d8101b'], note: 'Light: white, signal red, blue.' },
    { id: '02-cobalt', name: 'Cobalt', fig: ['#f2f3f6', '#0a45dc'], note: 'Light: white, cobalt, orange.' },
    { id: '03-flare', name: 'Flare', fig: ['#08080a', '#ffd000'], note: 'Dark: black, yellow, sky blue.' },
    { id: '04-field', name: 'Field', fig: ['#f1efe9', '#007636'], note: 'Light: warm white, green, magenta.' },
    { id: '05-pulse', name: 'Pulse', fig: ['#08080a', '#ff2e8b'], note: 'Dark: black, hot pink, cyan.' },
    { id: '06-ember', name: 'Ember', fig: ['#f0f0f0', '#c23e00'], note: 'Light: paper white, orange, navy.' },
    { id: '07-volt', name: 'Volt', fig: ['#08080a', '#00c2ff'], note: 'Dark: graphite, cyan, coral.' },
    { id: '08-ultra', name: 'Ultra', fig: ['#f4f2fa', '#5d17f0'], note: 'Light: white, ultraviolet, green.' },
    { id: '09-acid', name: 'Acid', fig: ['#08080a', '#b8f400'], note: 'Dark: black, lime, pink.' },
    { id: '10-primary', name: 'Primary', fig: ['#f3f3f3', '#d2131c'], note: 'Light: white, red, blue, yellow rule.' },
  ];
  root.LissaDesigns = DESIGNS;
})(typeof window !== 'undefined' ? window : globalThis);
