# Validation for v0.1.0

- 29 engine/regression checks: terrain and unit blocking, arcs, proximity, movement boundaries, individual firing dice, NO FIRE, Crossfire command, mid-route visibility, rally, national command, concealment, cover, save serialization, variant switches, PC replacement, group completion after reactive suppression, route grouping, and combat cleanup.
- Nine scenario/difficulty combinations each exercised for up to 70 legal AI actions with state validation after each action.
- Full seeded AI-versus-AI Crossroads battles finished on Easy (113 actions), Normal (117), and Hard (125). The 400-step harness limit is only a test guard; no action limit exists in play. Detailed results: AI-FLOW-RESULTS.json. These runs demonstrate completion, not exhaustive strategic or rule coverage.
- Browser checks: deploy, select infantry, plan/commit a movement into terrain, next-action guidance, save export download, file-picker import of that export, and local checkpoint creation.
- Phone-width iframe (390 × 844): 8/8 interaction/layout checks passed: no page overflow, full map fit, pinch, pan, reset-to-fit, touch selection, help-dialog bounds, full-screen bounds. Touch input used synthetic PointerEvents through a test page, not physical phone hardware.

The UI and rules are independently implemented and remain subject to further tabletop comparison. Coverage boundaries are documented in STATUS.md.

## v0.1.1 completion audit

All 14 additional seeded battles reached victory: every scenario at Easy, Normal and Hard (9 runs), plus each of the five optional variants in a Farm battle. State was validated after every action and portable saves were repeatedly encoded/decoded during play. Full results are in COMPLETION-AUDIT.json. These are automated engine playthroughs, not a claim that every possible human decision path was tested.

The review also found and fixed a UI edge case: the automatic AI commander choice in close combat could include a commander forbidden by the optional same-building rule. The UI now uses the engine's shared eligibility check. Version 0.1.0 saves remain supported and upgrade on load. Two regression checks cover the fix and save compatibility (31 total tests).

## v0.2.0 tabletop and army update

- 47 automated checks pass, including custom lists and budgets, smoke LOS and expiry, FO restrictions, deployment, referee markers, recent-move saves, malformed-save rejection and the small-force AI routing regression.
- Phone-width 390 × 844 browser harness: 19/19 checks passed for active 3D rendering, live origin-to-pointer drag routes, release-to-commit, invalid-drop snapback, pan/pinch without moving troops, explicit Pan mode, pinned-unit restrictions, visible NO FIRE, smoke placement/use/expiry, and bounded movement help.
- Tactical 2D view: 4/4 checks passed for a live drag route, deployment drop, actual movement trail and camera-only Pan mode.
- Army Creation was exercised through the UI: SMG template, extra platoon, budget update, other-side edit and deployment of the resulting 22-stand / 17-stand forces.
- Six custom patrol/company playthroughs reached victory at all three AI difficulties, with periodic save/load validation. See CUSTOM-ARMY-PLAYTHROUGHS.json. A small-force stall found during testing was fixed by considering nearby reachable terrain as well as distant forward cover.
- Nine further battles with smoke support available reached victory across all three scenarios and difficulties. See SMOKE-PLAYTHROUGHS.json. Availability does not require the AI to use smoke in every battle.
- The preview browser disables WebGL; browser interaction and visual QA ran on the software 3D rasterizer using the same camera and meshes. Hardware WebGL lighting/shadows were not visually verified in this environment. No browser security or GPU settings were changed.

The browser harnesses are kept as development fixtures in tests/; copy them to the dist root after a build to run them against a preview. Their saved states are test-only and should not be used on a personal in-progress game.
