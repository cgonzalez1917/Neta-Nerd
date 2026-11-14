# What is visual, and what is electrical {#inspections}

*Level: II*

ATS low-voltage power breakers are 7.6.1.2. Molded-case breakers are 7.6.1.1.1. The note in the molded-case section: MCCBs typically have a spring, over-center handle; insulated-case breakers have a two-step stored-energy mechanism. Do not use those names as synonyms.

Visual and mechanical inspection (the A steps) includes comparing the nameplate with the drawings, looking at the mechanism, operating it, torque, and confirming the settings match the coordination study. Torque with no manufacturer value uses Table 100.12.

Electrical tests (the B steps) include insulation resistance, contact resistance, and primary-current injection of long-time, short-time, ground-fault, and instantaneous pickup. A question that calls contact resistance a “visual inspection” is wrong. A question that calls the nameplate check an “electrical test” is wrong.

Table 100.12.1, heat-treated steel, cadmium or zinc plated, national coarse: a 1/2 inch SAE grade 5 bolt is 48 pound-feet. Grade 2 at the same diameter is 30. Match the head marks before you use the column. Metric hardware is the manufacturer’s table, not this one.

## Primary and secondary injection {#primary}

*Level: II*

Primary injection pushes high current through the poles, so it exercises the sensors or CTs, the trip unit, and the mechanical trip. That is how ATS writes the long-time, short-time, ground-fault, and instantaneous tests (7.6.1.2.B.3 through B.6, and the same pattern on molded-case breakers).

Secondary injection, 7.6.1.2.B.7, is marked optional. It stimulates the trip unit. It does not prove the sensors or the power path. Do not offer it as a substitute for the primary tests the section lists as the method.

Long-time is the inverse-time overload. Short-time is the intentional delay that lets a downstream device clear. Instantaneous has no intentional delay. Ground is the ground-fault function, with its own pickup and delay. The letters LSIG are those four.

On a typical electronic trip unit the rating plug sets In. A long-time pickup of 1.0 is 1.0 times the plug, not times the frame. The frame is the mechanical and interrupting structure. Changing the plug does not change the interrupting rating, and it still has to respect the conductors and the study.

## Tolerances {#tolerances}

*Level: II*

If the manufacturer’s curve exists, trip times have to land in that band. If it does not, molded-case inverse-time testing at 300% of rated continuous current uses Table 100.7.

Checked cell: 51–100 A range, 251–600 V frame column, maximum trip time 160 seconds. The ≤250 V column on that same row is 140 seconds. A 0–30 A, ≤250 V breaker is 50 seconds. Read the row and the voltage column. Integrally fused breakers tested with solid links can take longer (note under the table).

Instantaneous field tolerances, Table 100.8:

- ATS-2025: electronic trip units +30% / −30% of the setting; adjustable +40% / −40%; nonadjustable, +25% above the high side of the published band and −25% below the low side.
- MTS-2023 Table 100.8: electronic still +30% / −30%; adjustable is +40% / −30%, not ±40%. Nonadjustable matches the ±25% band rule.

Using the acceptance adjustable band on a maintenance test, or hanging the adjustable band on an electronic unit, is a wrong table. Both tables cite NEMA AB 4.

Medium-voltage air breakers are judged the same way against the manufacturer, not against "it felt normal." ATS 7.6.1.3 includes a contact-timing test and requires the timing values to agree with the times the manufacturer publishes (A.15, C.4, and C.5). Travel and velocity, when recorded, are judged the same way.

IEEE C37.09-2018 5.12, written for high-voltage breaker design tests, also records opening time on every circuit breaker, and travel-versus-time traces on S2-class units whose interrupting time is three cycles or shorter. Once a breaker is already in service, those same records may be used to judge whether operation is still correct.

## Contact resistance and control wire {#contact}

*Level: II*

7.6.1.2.D.2: contact resistance shall not exceed the manufacturer’s high end. With no data, investigate a pole that deviates from adjacent poles or similar breakers by more than 50 percent of the lowest value. Same screen as bolted connections.

7.6.1.2.D.3: control-wiring insulation resistance shall not be less than 2 MΩ.

Insulation resistance on the poles themselves, with no manufacturer voltage, uses Table 100.1 (7.6.1.2.B.1): one minute, breaker closed phase-to-phase and phase-to-ground, and across each open pole. Pull the plugs or fuses the manual requires before that voltage hits a solid-state trip unit, and put them back.

## Auxiliaries {#aux}

*Level: II*

7.6.1.2.B.8: verify auxiliary features, including trip and pickup indicators, zone interlocking, electrical close and trip, trip-free, antipump, and the trip-unit battery. Then reset trip logs.

Trip-free: the breaker will trip even if the close command is held. Antipump: one close attempt per close signal; it will not hammer closed and trip and closed again while the close input stays picked up.

Zone interlocking is listed because you have to prove the restraint wiring, not because the standard spells the logic in that sentence. See the Level III schemes note: a downstream device restrains the upstream short-time or ground function; no restraint, and the upstream device is allowed to use its faster time.

Table 100.20.1, rated control voltages for circuit breakers (from IEEE C37.06 as cited): 125 V DC indoor closing and auxiliary functions, 100–140 V; the opening-function column on that row runs 70–140 V. Measure closing voltage at the breaker with no operating current, and minimum voltage with maximum operating current, as the table introduction says. A 125 V coil that only sees 80 V on a close may not be a bad breaker.

## Common mistakes

*Level: II*

- Calling secondary injection “good enough” on a new breaker.
- Torque from the wrong SAE column.
- Forgetting to restore the trip plugs before the breaker is racked in.
- Applying Table 100.7 at a current other than 300% and still quoting its seconds.

## Field sequence for a power breaker {#field-sequence}

*Level: II*

ATS 7.6.1.2 is a list, not a mandated order, but a sensible order keeps you from testing something you'll have to redo:

1. **Nameplate against drawings** (A.1). Wrong frame, sensor, or plug stops everything.
2. **Mechanical**: condition, arc chutes, contacts and wipe, mechanism and alignment per the manual, torque (Table 100.12 if the manual is silent), cell fit, racking, lubrication (A.2–A.13).
3. **Counter**: record as-found. It should advance one count per close-open cycle (A.15, C.4).
4. **Insulation resistance**: one minute, each pole closed (phase-to-phase and phase-to-ground) and across each open pole (B.1). For 600 V gear with no manufacturer value, Table 100.1 gives 1000 V dc and 100 MΩ. Pull anything the trip-unit manual says can't take it.
5. **Contact resistance** (B.2). Investigate deviations over 50% of the lowest similar pole when there's no manufacturer band (D.2).
6. **Primary injection**: long-time, short-time, ground-fault, and instantaneous pickup and delay against the manufacturer's curves (B.3–B.6).
7. **Auxiliaries**: trip and pickup indicators, zone interlocking, electrical close and trip, trip-free, antipump, trip-unit battery. Then reset trip logs and indicators (B.8).
8. **Charging mechanism** per the manufacturer (B.9, D.10).
9. **Final settings** per the coordination study (A.14, C.3), recorded as-left with the counter.

Medium-voltage air breakers (ATS 7.6.1.3.B.4 and D.4) add a test-position sequence that is easy to short-cut: close and trip from the control switch, a trip initiated from every protective relay assigned to the breaker, and checks that charging, trip-free, and antipump behavior all work as designed. A control-switch close and trip alone does not finish that list.

## Maintenance mode (energy-reducing maintenance switching) {#maintenance-mode}

*Level: II*

Many trip units have a maintenance or arc-reduction mode, sold under names such as ERMS, ARMS, or RELT. NFPA 70E-2024 Informative Annex O.2.3(3) describes the idea: the trip unit is set to operate faster while someone works inside the arc flash boundary, then set back to normal when the work is done, with a local indicator showing its state.

Why it works: IEEE 1584-2018 found that incident energy grows roughly in proportion to arc duration (Annex G.3). Cut the clearing time and you cut the energy. Available fault current and working distance don't change.

What it costs: while it's on, the breaker trips with no intentional delay above its maintenance pickup. A fault on a downstream feeder can take out the whole bus, because the time separation the coordination study relied on is gone. Turn it off and confirm the indicator when the work ends.

Product example, Eaton PXR 20/25 (manual MN013003EN, 3.5 and 4.6):

- A front switch labeled MAINT. MODE turns it on locally, and a blue ring lights while it's active. It can also be enabled by a remote contact or over communications.
- Enabled over communications means disabled over communications. Cycling the front switch won't turn it off.
- The maintenance pickup is adjustable. Picking it is a study decision, partly so motor inrush on the same feeder doesn't trip it.

Testing: relay-based arc-energy reduction schemes are checked under ATS-2025 7.9.2.B.6: element pickup and timing, zone interlocking, normal versus maintenance mode logic, communication-failure alarms, and light-sensor pickup against ambient. ATS-2025 7.27 is reserved, so there is no separate section yet. For trip units, prove the mode per the manufacturer.

Labels: NFPA 70E-2024 130.5(G) requires the incident energy analysis to account for the device's clearing time, including its condition of maintenance. A breaker that hasn't been exercised and trips slowly can make the label understate the hazard.
