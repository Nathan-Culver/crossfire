# Crossfire · The Situation Room

An independent, mobile-first infantry browser adaptation of Arty Conliffe's Crossfire.

**Play:** https://nathan-culver.github.io/crossfire/

Select **Plan an operation**, choose a scenario or create both army lists, and deploy. Arrange your stands, press **Begin battle**, then drag a ready blue miniature toward cover. The live route explains legal endpoints; release to commit. Move + tap + Confirm is also available. Your side keeps initiative until a qualifying failure. The command desk explains each pending decision, including reactive fire during an enemy movement.

- Infantry, SMGs, HMG crews, commanders and optional smoke forward observers.
- Painted 3D squad miniatures on scenic stands and detailed 3D terrain; WebGL plus a software 3D fallback.
- Separate deployment, drag-to-move, live route lines, pan mode and explicit movement-readiness guidance.
- Army Creation with platoons, attachments, quality, commanders, point budgets and portable army files.
- Physical-style Pin/Suppression/NO FIRE tokens, manual referee controls and rules-controlled smoke screens.
- Continuous 2D terrain/LOS; no movement grid or fixed turns.
- Solo Easy/Normal/Hard, or two-player hotseat.
- Autosave, a separate local checkpoint, JSON export/import across devices.
- Mobile touch pan/pinch, desktop wheel/keyboard zoom, full-map fit and full screen.
- Five optional infantry variants from Steven Thomas's Balagan house rules default off; the requested Lloydian suppressed-target option defaults off.

Use **Operations → Field guide** for help, scope and references. This is an infantry release with documented boundaries, not an exhaustive reproduction of every original rule, force list or supplement. See [coverage](docs/STATUS.md) and [sources](docs/SOURCES.md).

## Development

Native browser modules; Three.js is bundled locally with esbuild. No CDN dependency is needed at runtime.

```sh
npm ci
npm test
npm run build
```

GitHub Pages serves the root source directly. `dist/` is an equivalent static preview build. Save files use a versioned schema; local data stays in the browser unless exported. Install through the browser's Add to Home Screen where supported; the service worker caches application files for offline reuse after the first online visit.

Crossfire belongs to Arty Conliffe. Original code, fictional scenarios, native vector assets, and paraphrased guidance are used here. No scanned rulebook or official art is included.

See [controls](docs/CONTROLS.md) and [Army Creation](docs/ARMY-CREATION.md) for the new workflows. Existing v0.1.0/v0.1.1 battle saves remain compatible.

## Update 0.2.1

Player-controlled dice and the saved **Auto-roll my dice** switch are available in Operations. Physical dice entry is optional. Historical shot lines, Find shot, and colored LOS inspections explain reactive fire. See [player dice](docs/PLAYER-DICE.md) and [LOS feedback](docs/LOS-FEEDBACK.md) for controls and validation.

To fire: select an infantry or HMG stand during your initiative, choose **Fire** beside the map, choose a highlighted enemy or **Target** button, then **Open fire**. With auto-roll off, roll the requested dice; resolution and qualifying initiative loss happen automatically.

## Update 0.3.0

Setup now includes a custom battlefield editor, automatic landscape generation, ten reusable map slots, and map export/import. Terrain boundaries are shared by LOS and both renderers. Farm assault supports custom objective sectors. See [battlefield controls and validation](docs/BATTLEFIELDS.md).

## Update 0.4.0

Full-screen tabletop play keeps Orders, Units, Markers, Dice/log, Game and Camera in translucent overlays. Tap a friendly stand and then an enemy to plan fire. Hold a friendly stand for context orders. Shift-click friendly stands (or use touch Multi-select) to form a group; the first selected stand is the leader. Drag any selected group member to preview the whole group.

Orbit/pan/tilt, perspective/orthographic projection, camera height and two-finger twist are available. Tables can be rectangular, square, round, oval, hexagonal or a drawn convex outline. Choose dimensions, draw deployment zones or pick starting edges, choose concealment and first initiative, and save maps for reuse.

Suppressed enemies are optional proximity targets when the variant is enabled: you can bypass them for the nearest eligible unsuppressed enemy, while retaining the nearest suppressed enemy as a choice. Enable this labelled house rule during setup to change the standard proximity targeting. It applies equally to both sides and firegroups/Crossfires. See [tabletop controls and validation](docs/TABLETOP-CONTROLS.md).

## Update 0.5.0

Three separately selectable, default-off house rules add three-dice smoke, level-removing rally and simultaneous per-stand assaults. Smoke resolves 0–3 successes with initiative changes, opponent scatter placement and a bonus second target. Rally removes one condition level per 5–6. Assaults roll both sides before damage, with target status category bonuses and either-side fallback. Human manual/physical dice, automatic dice, AI decisions and pending saves are supported. See [custom variant details and controls](docs/CUSTOM-VARIANTS.md).
