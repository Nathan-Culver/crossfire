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
- Five optional infantry variants from Steven Thomas's Balagan house rules; all default off.

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
