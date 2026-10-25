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
