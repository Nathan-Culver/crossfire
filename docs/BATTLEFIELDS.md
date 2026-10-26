# Custom and generated battlefields (0.3.0)

In **Plan an operation**, open **Create / generate / manage maps**. Choose the original scenario map, an edited map, or any saved slot for the next operation.

The builder supports woods, fields, hills, rough ground and building sectors. Add a feature or draw a polygon by tapping vertices and choosing Finish. Drag features and their white corner handles, rename them, set squad capacity, resize, rotate or remove them. Empty ground pans; the zoom buttons help with precise phone placement. Invalid or overlapping changes snap back with an explanation. The same terrain boundaries determine LOS in both the tactical and 3D views.

The automatic battlefield generator has mixed countryside, woodland, village and farmland styles, three terrain densities, and reproducible seeds. Generated layouts remain editable. It uses a local seeded layout algorithm; no external AI account or network service is required. Road decoration is optional and does not change movement or LOS.

Save into **one of ten numbered slots**. A full collection does not silently evict a map: choose the slot whose map should be replaced. Saved maps are local to that browser/device. Map JSON export/import transfers reusable maps between devices; portable battle saves also include their complete map. Load a saved slot directly from setup or inside the builder.

Farm assault requires two building objectives in the eastern half. Mark them in the editor, or use the first two eligible building sectors. Generated maps include two objective sectors. Their actual IDs determine victory and AI objective selection. Custom deployment separates stands and respects squad capacities; Farm defenders are placed around the selected sectors. Original scenario maps and existing saves remain supported.

Validation: all 74 automated checks passed. Nine map-specific checks cover generation, geometry validation, ten-slot storage, portable files, map-driven LOS, deployment, Farm objectives and invalid map handling. Fourteen phone-width browser checks passed for touch editing, saving/loading, setup preservation, and 2D/3D rendering. Generated-map patrol battles completed on Easy (111 actions), Normal (115), and Hard (37), with periodic save/load checks; results are in MAP-PLAYTHROUGHS.json. Hardware WebGL remains unavailable in this browser environment, so visual browser checks used the software 3D path.
