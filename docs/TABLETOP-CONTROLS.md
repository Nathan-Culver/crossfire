# Tabletop play · 0.4.0

Expand the map for a full-window table. Orders, Units, Markers, Dice/log, Game and Camera open as translucent overlays. Game contains save/load, setup, Army Creation and help. The browser-full-screen button also requests landscape orientation where supported; browser restrictions may leave the CSS full-window view in place.

Select a friendly stand, then tap an enemy to plan a shot. Use Open fire to commit and roll when prompted. Hold a friendly stand for context orders. Shift-click toggles friendly stands without changing selection order; Multi-select provides the same choice on touch. The first selected stand is the movement leader. Drag any selected member to preview all paths; group membership, command, terrain, spacing and endpoint rules are checked before committing. Select Firegroup or Crossfire for their respective firing rules; commanders do not add small-arms dice.

Drag empty table space to pan. Pan mode works even over miniatures. Orbit mode rotates/tilts with one finger. Two fingers pan and pinch; twist rotates. Desktop right-drag orbits, middle/Space-drag pans, wheel zooms. WASD/arrows pan; Q/E rotate, R/F tilt, Page Up/Down changes target height. Camera sliders offer the same controls, plus projection, Fit, Focus, North, overhead and zone/shot overlays. Camera height has no rules effect.

The map builder accepts rectangle, square, circle, oval, hexagon and drawn convex boundaries. Applying dimensions scales/clips terrain. Draw custom Blue/Red zones or choose edge and depth during setup. Every deployment stand must fit wholly inside its zone and the table. Saved maps retain dimensions, boundary, terrain, objectives and drawn zones; explicit setup edge selections override saved zones. Up to ten maps can be stored, plus exported files.

The requested suppressed-target house rule defaults off. A nearest suppressed enemy remains selectable, and may be bypassed for the nearest eligible unsuppressed enemy. It does not allow skipping a nearer ready/pinned eligible enemy, bypassing LOS/arcs, or revealing concealed troops. It applies to single fire, firegroups and Crossfires on both sides. Enable it in setup to change strict baseline proximity targeting. Existing saves retain an explicit choice; saves without the option use the standard rule.

## Validation

- 32 browser checks across landscape controls, Shift groups, touch hold/twist, group drag, Crossfire, overlays, table shapes, deployment, manual dice and target priority.
- Automated regression tests cover geometry, commands, shooting, saves, tables, zones and targeting.
- Deterministic Easy oval, Normal hexagon and Hard circular-table patrol battles are played to a winner with periodic save/load round trips. Results: TABLE-PLAYTHROUGHS.json.
- Rotated overlapping bases are detected along every polygon edge, preventing repeated contact assaults without close combat. AI endpoints are checked at their planned final facing.

These checks demonstrate tested workflows, not certification of every Crossfire rule. See STATUS.md for remaining infantry and wider-game limitations. Browser QA used the software 3D renderer; real-device native landscape locking and GPU rendering were not tested here.
