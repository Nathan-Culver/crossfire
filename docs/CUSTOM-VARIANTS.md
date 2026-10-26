# Optional custom variants · v0.5.0

These are Nathan Culver’s house rules. All three switches start off in **Plan an operation → Optional infantry variants**. Enable them separately or together. Battles retain their choices through autosave, checkpoint and portable export/import. Older saves without these switches retain ordinary rules.

## Three-dice smoke missions

An eligible forward observer selects a visible target and screen angle, then rolls exactly three dice. Each 5 or 6 is a success. Every attempt spends one fire mission.

| Successes | Smoke | Initiative |
| --- | --- | --- |
| 0 | Opponent chooses the hit point. It must be on the table and have LOS to both the original target point and observer. | Pass immediately; placement must finish before other orders. |
| 1 | Screen on the original target. | Pass. |
| 2 | Screen on the original target. | Retain. |
| 3 | Screen on the original target, then another different target visible to the same observer. | Retain. |

The second screen costs no extra mission and requires no extra roll. Placement previews show actual LOS. The first screen from this mission is excluded when checking the second target, so its own smoke does not invalidate the mission’s original visibility. Other smoke still blocks LOS. The opponent may choose the original point on a zero-success result. Both screens use the support’s normal length and lift when their owner next receives initiative. Pending placement is part of the save. Solo AI makes placement decisions only for its own side.

## Three-dice rally

Roll exactly three dice. Each 5 or 6 removes one level:

**Suppressed → Pinned → Ready**

One success clears Pinned or reduces Suppressed to Pinned. Two successes clear Suppressed. Extra successes do nothing. At least one removed level retains initiative; no successes passes it. The ordinary quality, commander, status target number and no-visible-enemy modifier are replaced by this fixed success rule.

## Simultaneous assault

The ordinary approach and defensive reaction fire happen first. Once in contact, every participating stand on each side selects one opposing participant and rolls three dice. The human chooses their side’s targets; AI chooses its own. Hotseat offers both sides’ selections. Optional nearby commanders may join and receive their own roll.

Every 5 or 6 is a success. Use these result categories:

| Category | Result |
| --- | --- |
| 0 | Miss |
| 1 | Pin |
| 2 | Suppress |
| 3 | Destroy |

Add +1 category against a target that began the exchange Pinned, or +2 against one that began Suppressed. Cap at Destroy. These bonuses apply even with zero successes. The ordinary second-Suppression-destroys rule remains in effect, so a suppressed target receiving category 2 is destroyed.

All rolls are collected before results are applied. A stand destroyed by the exchange still delivers its return roll. Bonuses use the status snapshot at the start, so one earlier roll cannot increase another’s bonus. Separate firing stands do not pool successes. This replaces the ordinary opposed combat rolls, combat modifiers and cover dice reductions; every involved stand, including a pinned/suppressed participant, rolls exactly three dice.

Survivors on both sides remain in contact for another exchange. No ordinary rally, fire or movement orders occur while contact remains. The assaulting side retains initiative during this unresolved contact; if its force is eliminated, initiative passes. Company-break and scenario victory still apply.

Either side may choose **force falls back**. The game chooses legal rearward paths, preferring attackers’ original positions where those paths are legal. Fallback keeps status/prone markers, checks table bounds, terrain transitions, base spacing and capacity, and permits ordinary reactive fire outside the initial terrain. All surviving participants on the chosen side withdraw. Initiative passes to the other side after the declared withdrawal finishes. If there is no legal rearward route for every stand, fallback is unavailable and the exchange can continue.

## Validation

The custom regression suite covers all four smoke outcomes; both smoke LOS requirements; manual dice and pending saves; all rally status/success combinations; simultaneous mutual destruction; category bonuses and status snapshots; independent targets; both sides’ fallback, reaction fire and save/load; strict default-off behavior; malformed imports; and AI placement/withdrawal.

`tests/variants-qa.html` exercises setup switches, manual dice, map placement and LOS previews, partial rally, assault target selectors, defending dice, retained contact and fallback in an 844 × 390 landscape viewport. `tests/variant-campaigns.mjs` plays seeded Easy/Normal/Hard patrol battles with all three variants and repeated save/load to a winner. Results are in CUSTOM-VARIANT-PLAYTHROUGHS.json. Tests cover defined workflows, not every possible battlefield.
