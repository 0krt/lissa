/* The ten designs: file, name, one-line description, and the figure's own
   colours (background and stroke), which live in the app's Look tab rather
   than in CSS. */
(function (root) {
  const DESIGNS = [
    { id: '01-paper',     name: 'Paper',     fig: ['#f3eee4', '#b3341c'], note: 'Warm editorial light. Open sections ruled by a heavy ink line, square corners, hairline tracks.' },
    { id: '02-brutal',    name: 'Brutal',    fig: ['#fffdf5', '#2433ff'], note: 'White slabs, 2px black outlines, hard offset shadows, yellow title strips.' },
    { id: '03-frost',     name: 'Frost',     fig: ['#f4f7fa', '#0b6a87'], note: 'Cool clinical light. Rounded borderless white cards on soft shadows, pill switches and tabs.' },
    { id: '04-phosphor',  name: 'Phosphor',  fig: ['#000000', '#3dff6e'], note: 'Green-screen terminal. Dashed square frames, inverted title blocks, bar handles, glow.' },
    { id: '05-neon',      name: 'Neon',      fig: ['#0d0619', '#ff4fd8'], note: 'Synth night. Cut-corner cards and buttons, diamond handles, magenta-to-cyan rules.' },
    { id: '06-clay',      name: 'Clay',      fig: ['#16110d', '#e8875a'], note: 'Warm earth dark. Leaf corners (two round, two tight), folder tabs, teardrop handles.' },
    { id: '07-swiss',     name: 'Swiss',     fig: ['#fafafa', '#d0021b'], note: 'International style. No outlines or radii; sections hang from thick black bars.' },
    { id: '08-abyss',     name: 'Abyss',     fig: ['#06111d', '#34e3c4'], note: 'Deep-sea glass. Frosted rounded panes with a lit edge, pills everywhere, haloed handles.' },
    { id: '09-lilac',     name: 'Lilac',     fig: ['#f4f1fa', '#5a3ecf'], note: 'Soft UI. Pillowy raised cards, switches and tracks sunk into the surface.' },
    { id: '10-blueprint', name: 'Blueprint', fig: ['#0b2a50', '#ffffff'], note: 'Drafting sheet. Dashed frames with corner ticks on a grid, hollow handles and switches.' },
  ];
  root.LissaDesigns = DESIGNS;
})(typeof window !== 'undefined' ? window : globalThis);
