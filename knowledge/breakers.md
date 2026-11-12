# What is visual, and what is electrical {#inspections}

ATS low-voltage power breakers are 7.6.1.2. Molded-case breakers are 7.6.1.1.1. The note in the molded-case section: MCCBs typically have a spring, over-center handle; insulated-case breakers have a two-step stored-energy mechanism. Do not use those names as synonyms.

Visual and mechanical inspection (the A steps) includes comparing the nameplate with the drawings, looking at the mechanism, operating it, torque, and confirming the settings match the coordination study. Torque with no manufacturer value uses Table 100.12.

Electrical tests (the B steps) include insulation resistance, contact resistance, and primary-current injection of long-time, short-time, ground-fault, and instantaneous pickup. A question that calls contact resistance a “visual inspection” is wrong. A question that calls the nameplate check an “electrical test” is wrong.

Table 100.12.1, heat-treated steel, cadmium or zinc plated, national coarse: a 1/2 inch SAE grade 5 bolt is 48 pound-feet. Grade 2 at the same diameter is 30. Match the head marks before you use the column. Metric hardware is the manufacturer’s table, not this one.

## Primary and secondary injection {#primary}

Primary injection pushes high current through the poles, so it exercises the sensors or CTs, the trip unit, and the mechanical trip. That is how ATS writes the long-time, short-time, ground-fault, and instantaneous tests (7.6.1.2.B.3 through B.6, and the same pattern on molded-case breakers).

Secondary injection, 7.6.1.2.B.7, is marked optional. It stimulates the trip unit. It does not prove the sensors or the power path. Do not offer it as a substitute for the primary tests the section lists as the method.

Long-time is the inverse-time overload. Short-time is the intentional delay that lets a downstream device clear. Instantaneous has no intentional delay. Ground is the ground-fault function, with its own pickup and delay. The letters LSIG are those four.

On a typical electronic trip unit the rating plug sets In. A long-time pickup of 1.0 is 1.0 times the plug, not times the frame. The frame is the mechanical and interrupting structure. Changing the plug does not change the interrupting rating, and it still has to respect the conductors and the study.

## Tolerances {#tolerances}

If the manufacturer’s curve exists, trip times have to land in that band. If it does not, molded-case inverse-time testing at 300% of rated continuous current uses Table 100.7.

Checked cell: 51–100 A range, 251–600 V frame column, maximum trip time 160 seconds. The ≤250 V column on that same row is 140 seconds. A 0–30 A, ≤250 V breaker is 50 seconds. Read the row and the voltage column. Integrally fused breakers tested with solid links can take longer (note under the table).

Instantaneous field tolerances, Table 100.8:

- ATS-2025: electronic trip units +30% / −30% of the setting; adjustable +40% / −40%; nonadjustable, +25% above the high side of the published band and −25% below the low side.
- MTS-2023 Table 100.8: electronic still +30% / −30%; adjustable is +40% / −30%, not ±40%. Nonadjustable matches the ±25% band rule.

Using the acceptance adjustable band on a maintenance test, or hanging the adjustable band on an electronic unit, is a wrong table. Both tables cite NEMA AB 4.

## Contact resistance and control wire {#contact}

7.6.1.2.D.2: contact resistance shall not exceed the manufacturer’s high end. With no data, investigate a pole that deviates from adjacent poles or similar breakers by more than 50 percent of the lowest value. Same screen as bolted connections.

7.6.1.2.D.3: control-wiring insulation resistance shall not be less than 2 MΩ.

Insulation resistance on the poles themselves, with no manufacturer voltage, uses Table 100.1 (7.6.1.2.B.1): one minute, breaker closed phase-to-phase and phase-to-ground, and across each open pole. Pull the plugs or fuses the manual requires before that voltage hits a solid-state trip unit, and put them back.

## Auxiliaries {#aux}

7.6.1.2.B.8: verify auxiliary features, including trip and pickup indicators, zone interlocking, electrical close and trip, trip-free, antipump, and the trip-unit battery. Then reset trip logs.

Trip-free: the breaker will trip even if the close command is held. Antipump: one close attempt per close signal; it will not hammer closed and trip and closed again while the close input stays picked up.

Zone interlocking is listed because you have to prove the restraint wiring, not because the standard spells the logic in that sentence. See the Level III schemes note: a downstream device restrains the upstream short-time or ground function; no restraint, and the upstream device is allowed to use its faster time.

Table 100.20.1, rated control voltages for circuit breakers (from IEEE C37.06 as cited): 125 V DC indoor closing and auxiliary functions, 100–140 V; the opening-function column on that row runs 70–140 V. Measure closing voltage at the breaker with no operating current, and minimum voltage with maximum operating current, as the table introduction says. A 125 V coil that only sees 80 V on a close may not be a bad breaker.

## Common mistakes

- Calling secondary injection “good enough” on a new breaker.
- Torque from the wrong SAE column.
- Forgetting to restore the trip plugs before the breaker is racked in.
- Applying Table 100.7 at a current other than 300% and still quoting its seconds.
