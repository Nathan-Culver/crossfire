# Player dice and auto-roll (0.2.1)

Open Operations and toggle **Auto-roll my dice**. The same checkbox is available when planning a new operation. Off is the default; the setting is included in battle saves.

- Off: fire, reactive fire, rally, recon, smoke calls and close combat prompt your side for each batch. Tap Roll dice to generate the faces; the action resolves immediately after its final batch. Or open Use physical dice instead and enter exactly the requested number of faces, each 1–6.
- On: your actions generate and resolve dice immediately, matching the prior seeded engine behavior.
- Enemy dice remain automatic in solo play. In hotseat, both players are prompted when auto-roll is off.
- Firegroups roll each stand separately. Close-combat ties request new rolls. All modifiers and results are still applied by the engine.
- Cancel is available before any dice are recorded. Accepted faces are saved and cannot be discarded or rerolled by closing the dialog. Incomplete actions and recorded batches survive portable export/import and browser reload. The battlefield changes only after the whole action has its required results.

Pending actions replay from an unchanged baseline using recorded player dice and deterministic enemy dice. This avoids partially applied fire or smoke missions while waiting for input. Physical dice consume the same number of random-seed steps as built-in dice, keeping subsequent automatic rolls stable.

Validation: ten focused engine tests cover batching, physical input validation, cancellation, save/load, seeded automatic behavior, solo/hotseat, reactions, smoke, recon, rally and tied close combats. Thirteen phone-width browser checks cover the actual roll UI, physical entry, reload after recorded results, and the persisted auto-roll switch. All 64 automated tests passed after the combined LOS/dice changes.

Firing controls are available beside the map, including full screen: select your stand, Fire, choose a highlighted eligible target (or a Target button), then Open fire. The target list uses the same fire-set and nearest-target rules as resolution. A focused regression also verifies that pinned troops may fire, suppressed troops may not, and concealed targets are withheld.

## Automatic resolution (0.2.2)

There is no final Continue or Pass requirement. Accepting the last required dice immediately applies results and passes initiative for failed direct fire, failed rally/recon, lost close combat, or movement suppressed/killed by reactive fire. Group movement still completes its declared members before transferring initiative. A direct-fire Pin is insufficient to retain initiative. A reactive Pin stops the moving stand but retains its side’s initiative. Failed smoke arrival retains initiative under the standard exception.
