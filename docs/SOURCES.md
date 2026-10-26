# Sources and interpretation

Crossfire is by Arty Conliffe. This independent fan adaptation uses original code, vector terrain, counters, and fictional scenarios. It does not distribute scanned rules, official miniature artwork, or commercial scenarios.

Baseline: the 1996 Crossfire infantry rules, cross-checked against the author's [2001 clarifications](https://balagan.info/crossfire-clarifications-by-arty-confliffe-from-2001) and [introduction](https://crossfire.wargaming.info/introduction/). Rules are paraphrased in the interface.

User-supplied references:

- [Matthew Welch: A Simplified Guide, version 0.5](https://squaregear.net/CrossfireSimplified.pdf). A learning reference, not the baseline. Its introduction explicitly says it is not fully compatible with Crossfire. In particular, this implementation does not substitute its simplified close-combat modifiers or group-movement organization rules.
- [Lloydian Crossfire resources](https://www.lloydianaspects.co.uk/wargaming/crossfireMain.html). Tactical and explanatory context; the site's optional additions are not silently made standard.
- [Balagan data sheets, 2006-03-28](https://balagan.info/wp-content/downloads/crossfire-datasheets-2006-03-28.pdf). Primarily vehicle and fire-support data. No vehicles, guns or HE artillery are included. The 50/81/120 mm smoke-screen lengths are cross-checked against the supplied data sheets and original smoke rules.
- [Steven Thomas: Balagan house rules](https://balagan.info/balagan-house-rules-for-crossfire). Optional infantry switches are separately attributed by section. The page's vehicle rules, mine interpretation, contour system, moving clock, human waves and direct-fire mortar rules are not claimed implemented.

Implemented Balagan optional switches (default off):

| Switch | Source section |
| --- | --- |
| Commander must occupy the subordinate's building sector | CF2.3 / CF8.4 |
| One platoon in the attacking close-combat force | CF8.2 |
| Concealed fire reveals on a die showing 1 | CF6.7 variation 2 |
| As above; a 2 marks the firing feature | CF6.7 variation 3 |
| Designated recon: independent movement, recon on 5+ | New: Recon troops |

The requested **suppressed nearest target is optional** switch defaults OFF. It follows [Lloydian scenario house rules](https://www.lloydianaspects.co.uk/wargaming/crossfireScenarios.html): the closest suppressed target may still be fired on, or bypassed for the nearest eligible non-suppressed target. This is a house rule, not silently presented as the baseline; switch it on to bypass suppressed proximity targets.

The two concealed-fire options are mutually exclusive. Recon designation applies to each side's first rifle squad, with no added protective-cover benefit. Force lists and victory conditions are original scenario parameters, not reproductions of a historical organization table.

Rendering uses Three.js (MIT, vendored license in vendor/THREE-LICENSE.txt) bundled from the pinned npm dependency. Geometry, poses, scenic bases, terrain meshes, procedural grass and the software rasterizer are original project code. No scanned miniatures or official artwork is included. The orthographic/perspective cameras and picking follow official Three.js documentation. Full-screen orientation requests follow MDN ScreenOrientation guidance and fall back to the CSS full-table view where the browser does not permit a lock.
