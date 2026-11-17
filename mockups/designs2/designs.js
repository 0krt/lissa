/* The Pulse family, after the current design and before the oldest one in the
   repository, for comparison: file, name, description, and the figure's own
   colours (background and stroke), which live in the app's Look tab. */
(function (root) {
  const DESIGNS = [
    { id: '00-current', name: 'Current', fig: ['#0c0c0e', '#3a9c9b'], note: 'The app as it ships today, for comparison.' },
    { id: '01-coral', name: 'Pulse Coral', fig: ['#08080a', '#ff8070'], note: 'Coral and cyan.' },
    { id: '02-tangerine', name: 'Pulse Tangerine', fig: ['#08080a', '#ff9d45'], note: 'Tangerine and cyan.' },
    { id: '03-amber', name: 'Pulse Amber', fig: ['#08080a', '#ffcb45'], note: 'Amber and cyan.' },
    { id: '04-lime', name: 'Pulse Lime', fig: ['#08080a', '#b9f04f'], note: 'Lime and cyan.' },
    { id: '05-violet', name: 'Pulse Violet', fig: ['#08080a', '#b8a3ff'], note: 'Violet and cyan.' },
    { id: '06-orchid', name: 'Pulse Orchid', fig: ['#08080a', '#e993ff'], note: 'Orchid and cyan.' },
    { id: '07-mint', name: 'Pulse Mint', fig: ['#08080a', '#4fe8ae'], note: 'Mint and violet (cyan sits too close to mint).' },
    { id: '08-volt', name: 'Volt', fig: ['#0a0c0e', '#1ec8ff'], note: 'Graphite, cyan and coral, now with round handles.' },
    { id: '09-oldest', name: 'Oldest', fig: ['#0c0c0e', '#c8f060'], note: 'The first look in the repository (2 Aug), on today\'s layout. Kept as found: its muted text fails contrast.' },
  ];
  root.LissaDesigns = DESIGNS;
})(typeof window !== 'undefined' ? window : globalThis);
