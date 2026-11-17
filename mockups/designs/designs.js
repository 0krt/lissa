/* The Frost family: file, name, one-line description, and the figure's own
   colours (background and stroke), which live in the app's Look tab rather
   than in CSS. */
(function (root) {
  const DESIGNS = [
    { id: '01-frost', name: 'Frost', fig: ['#f4f7fa', '#0b6a87'], note: 'Light: blue-grey, deep teal and plum.' },
    { id: '02-sage', name: 'Sage', fig: ['#f5f8f4', '#2f6b45'], note: 'Light: green-grey, forest green and rust.' },
    { id: '03-blush', name: 'Blush', fig: ['#fbf6f7', '#b0305a'], note: 'Light: rose-grey, raspberry and slate blue.' },
    { id: '04-sand', name: 'Sand', fig: ['#f9f6f1', '#a14d12'], note: 'Light: warm stone, burnt orange and teal.' },
    { id: '05-iris', name: 'Iris', fig: ['#f6f5fb', '#4b45c2'], note: 'Light: lavender-grey, indigo and plum.' },
    { id: '06-frost-night', name: 'Frost Night', fig: ['#0f151b', '#4fb8d6'], note: 'Dark: slate, ice blue and lilac.' },
    { id: '07-sage-night', name: 'Sage Night', fig: ['#101511', '#6cc28d'], note: 'Dark: pine, mint and apricot.' },
    { id: '08-blush-night', name: 'Blush Night', fig: ['#171013', '#f27ba0'], note: 'Dark: plum-brown, pink and periwinkle.' },
    { id: '09-sand-night', name: 'Sand Night', fig: ['#15120f', '#e69a5a'], note: 'Dark: espresso, amber and aqua.' },
    { id: '10-iris-night', name: 'Iris Night', fig: ['#111021', '#9d97ff'], note: 'Dark: ink-violet, periwinkle and orchid.' },
  ];
  root.LissaDesigns = DESIGNS;
})(typeof window !== 'undefined' ? window : globalThis);
