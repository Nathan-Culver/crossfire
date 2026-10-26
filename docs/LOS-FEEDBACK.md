# LOS and reactive-fire feedback (0.2.1)

LOS and direct-fire legality use the same 2D terrain footprints in both camera views. Decorative trees, roofs, and painted soldier geometry do not determine visibility. The endpoint terrain features are ignored as blockers; intervening woods, fields, hills and buildings block, rough ground does not. Friendly bases block direct fire. Smoke blocks both spotting and direct fire, with the existing point-blank assault exception.

Reactive fire is checked at the chosen point along the declared route, before the move finishes. A missed shot allows movement to continue. Therefore neither final nor initial positions alone establish whether that reaction was legal.

The orange LAST SHOT line stores the firing and target positions at resolution, even if either stand later moves or is killed. The Last resolution panel identifies its action/initiative and explains reactions. Find shot opens and fits the table; Shot line toggles the historical overlay. Records survive save/load. Exact concealed enemy origins remain withheld under hidden-fire variants. Old saves load safely, but shots made before this version have no historical coordinates to display.

Inspect LOS displays a green or red direct sightline and names the blocker beneath the map, including in full screen. Target and firer building sectors use their centers in both renderers. Reaction previews use the slider's virtual movement point and actual firing restrictions.

Validation: original 47 automated checks passed; seven new regression checks passed, including a legal middle-of-route exposure with both endpoints blocked, rejection of blocked fire with no state mutation, fully blocking terrain and smoke, friendly bases/HMG arcs, building centers, concealed origins, and save validation. Fourteen phone-width browser checks passed across tabletop and tactical views. The browser exercised the software 3D renderer because hardware WebGL is disabled in this environment.
