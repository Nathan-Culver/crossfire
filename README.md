# Crossfire · The Situation Room

An independent, mobile-first infantry browser adaptation of Arty Conliffe's Crossfire.

**Play:** https://nathan-culver.github.io/crossfire/

Select **Plan an operation**, choose a scenario and AI difficulty, and deploy. Select a blue stand, choose **Move**, tap inside the next terrain feature, and confirm. Your side keeps initiative until a qualifying failure. The command desk explains each pending decision, including reactive fire during an enemy movement.

- Infantry only: rifle squads, SMGs, HMGs, platoon commanders and company commanders.
- Continuous 2D terrain/LOS; no movement grid or fixed turns.
- Solo Easy/Normal/Hard, or two-player hotseat.
- Autosave, a separate local checkpoint, JSON export/import across devices.
- Mobile touch pan/pinch, desktop wheel/keyboard zoom, full-map fit and full screen.
- Five optional infantry variants from Steven Thomas's Balagan house rules; all default off.

Use **Operations → Field guide** for help, scope and references. This is an infantry release with documented boundaries, not an exhaustive reproduction of every original rule, force list or supplement. See [coverage](docs/STATUS.md) and [sources](docs/SOURCES.md).

## Development

No dependencies or build framework.

```sh
npm test
npm run build
```

GitHub Pages serves the root source directly. `dist/` is an equivalent static preview build. Save files use a versioned schema; local data stays in the browser unless exported. Install through the browser's Add to Home Screen where supported; the service worker caches application files for offline reuse after the first online visit.

Crossfire belongs to Arty Conliffe. Original code, fictional scenarios, native vector assets, and paraphrased guidance are used here. No scanned rulebook or official art is included.
