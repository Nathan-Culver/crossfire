# Infantry release coverage · v0.2.0

This is an infantry-first playable adaptation, not a claim of exhaustive reproduction of every Crossfire supplement, organization, or asset.

## Included

- Free positions on a continuous 1200 × 1000 vector board; no hexes, movement allowance, weapon range limit, fixed turns, or forced time limit.
- Straight movement with an initial pivot, standalone pivot, group movement, retreat, ground hugging, reactable standing up, terrain-center membership and building capacities.
- National command doctrines, platoon/company organization, troop quality, nearby commander bonuses, PC replacement.
- Exact polygon/segment terrain sight lines, building-center firing, friendly-base direct-fire blocking, spotting independent of unit blocking, HMG arcs, group rear-arc restrictions, nearest-target priority.
- Rifle/SMG/HMG direct fire, separate rolls per firing stand, firegroups, PC-directed Crossfires, reactive fire along a declared route, individual NO FIRE markers, suppression stacking, group-move initiative transfer deferred until all declared members move.
- Concealed deployment in the Farm scenario, feature-wide reveal/search, recon by fire, ambush bonus, separate optional concealment variants.
- Close combat, optional commander inclusion, reinforcing a staged assault, building sub-combat allocation and repeated rounds, casualty removal and company-break victory.
- Three original infantry scenarios; solo Easy/Normal/Hard and same-device hotseat; autosave, independent checkpoint, portable JSON export/import, seeded dice and pending-decision serialization.
- Actual 3D painted squad/weapon/command miniatures on scenic bases, three-dimensional buildings, tree clusters, fields, hills, rubble, and cotton-wool smoke screens. WebGL provides lighting and shadows; a Canvas rasterizer renders the same geometry without GPU access.
- Drag-to-move with a live route, invalid-drop snapback, saved recent movement trails, separate deployment, explicit pan mode, two-pointer pinch/pan, focus, tilt, full-screen and a 2D tactical view.
- Readiness explanations, movement coaching, identifiers, contextual help, automatic status tokens and an explicit manual referee marker tray.
- Custom army list building, point budgets and standalone army JSON export/import. See ARMY-CREATION.md for cost coverage and historical-list limitations.

## Deliberate boundaries / remaining work

- No vehicles, AT weapons, guns, HE indirect fire, snipers, engineering, mines, wire or fortifications in this release. Off-table smoke support and forward observers are included.
- Custom army list building and point totals are included. There is no complete historical organization/period catalog, random scenario generator, adjacent-building complex system, linear terrain, depression system, multiplayer networking, or full Hit the Dirt supplement.
- Original scenario terrain polygons define the playable geometry; trees, roofs and road drawings are decoration. Roads have no separate mechanical effect. Terrain capacities other than buildings are explicitly scenario-defined.
- Group destinations default to preserving relative offsets. Use each member's Set path button to choose an individual route; all must end within one stand of the leader's designated endpoint.
- Each movement action offers one reactive fire action against its current mover. Visibility intervals are partitioned by analytic geometry events. Reaction selection uses a 0.1%-of-route slider; the engine rechecks the exact chosen point.
- Close combat in open ground uses the target and an eligible nearby support squad automatically when the target is a heavy weapon/commander; that supporting squad is not yet individually selectable. Eligible commanders are optional. The solo AI chooses a single combined building defence; hotseat offers subdivisions.
- Hidden deployments and physical counters remain in downloaded saves (like a tabletop referee record). Saves are not encrypted. Hotseat is cooperative pass-and-play, not a secure hidden-information network service.
- AI is a local heuristic, not a trained adversary. Hard considers more routes and enemy exposure; Normal coordinates fire; Easy limits coordination and uses less consistent priorities. All use the same dice and legal rules. No rule grants the AI bonus dice.

See tests for covered edge cases and sources for the distinction between baseline and variants.

The GPU-free 3D fallback uses software depth rasterization and a cached scenery layer. WebGL provides the richer live lighting/shadow path on supported browsers. Terrain and miniature detail is built from local meshes, not a stretched background screenshot. The initial table fits the board; Focus and pinch expose model detail. Rendering does not grant elevation or concealment benefits beyond the 2D rules.
