# Fall-of-potential {#fop}

*Levels: II, III*

ATS 7.13.B.2: perform a fall-of-potential test, or an alternative, on the main grounding electrode or system in accordance with IEEE 81. NETA is telling you which standard owns the probe method. It is not, in that paragraph, giving you a homemade spacing.

In IEEE 81 practice the current probe is driven far enough that the potential probe can sit in a flat part of the resistance curve, classically near 62% of the current-probe distance for a simple electrode in uniform soil. You confirm the plateau with readings around that point (for example near 50%, 62%, and 70%). If the curve is still a slope, the current probe is too close. That 62% figure is IEEE 81 method, not an ATS table value. Mark it that way when you write a question.

A megohmmeter is the wrong tool. It is a high-voltage DC insulation instrument. Ground resistance sets inject a low voltage and are built to reject the noise in the soil.

A clamp-on ground tester measures a loop. It needs a return path through other grounds. An isolated rod with the bonding lifted will not yield a valid electrode resistance that way.

## Limits {#limits}

*Levels: II, III, IV*

ATS 7.13.D.2: resistance between the main grounding electrode and ground no greater than 5 ohms for large commercial or industrial systems, and 1 ohm or less for generating or transmission station grounds, unless the owner specifies otherwise. The citation in the paragraph is IEEE 142.

ATS 7.13.D.3: investigate point-to-point resistance above 0.5 ohm between the main grounding system and major frames, the system neutral, and derived neutrals.

These are not the NEC 25-ohm rod rule. NEC 250.53(A)(2) says a single rod, pipe, or plate that is not 25 ohms or less must be supplemented by an additional electrode. It does not require you to prove the pair is under 25 ohms. 250.53(B) spaces multiple rod, pipe, or plate electrodes at least 6 ft apart. That code minimum is not the same as spacing rods far enough apart that their resistance volumes stop overlapping (on the order of their length). Do not mix 0.5 ohm, 5 ohms, 1 ohm, and 25 ohms in one sentence.

Bolted ground connections still use the 50-percent-of-the-lowest screen (7.13.D.1) and Table 100.12 when the manufacturer is silent.

## Ground-fault sensors {#gfp}

*Levels: II, III, IV*

Low-voltage ground-fault protection is ATS 7.14, and the visual checks are where the scheme is won or lost:

- The ground connection is on the source side of the neutral disconnect link and on the source side of any ground-fault sensor.
- Neutral sensors are polarized correctly on primary and secondary.
- For a zero-sequence sensor, all phase conductors and the neutral pass through in the same direction.
- Grounding conductors do not pass through the zero-sequence sensor.
- The grounded conductor is solidly grounded.

Pickup and delay are set to the owner’s study. The section points at NEC 230.95 for the performance-test record on service equipment. A ground landed on the load side of the sensor can blind the relay or make it see normal current as a fault, depending on which conductor you stuffed through the window.

Neutral-to-ground insulation is measured with the neutral disconnect link temporarily removed, then the link goes back (7.14.B.2 and D.2). The result must be at least one megohm. Leaving the link in place shorts the measurement to the grounding system and hides a neutral-to-ground bond on the load side of the sensor.

Pickup is proved by primary current injection (7.14.B.4 and D.4). The measured pickup must be greater than 90 percent of the device setting and less than the smaller of 125 percent of the setting and 1200 A. For a 400 A setting that window is 360 A to 500 A. A 350 A result is below the lower bound and is not accepted just because it is "conservative."

Time delay is measured at 150 percent of pickup or higher (7.14.B.6 and D.6). The recorded time must agree with the manufacturer's data and, at 3000 A, must stay at or under one second, the value ATS cites from the National Electrical Code rule on equipment ground-fault protection.

A reduced-control-voltage trip check is also required (7.14.B.7 and D.7): 55 percent of nominal on ac control and 80 percent of nominal on dc control. A trip at full control voltage does not prove the device will still operate when the control source is depressed during a fault or a battery dip.

## Common mistakes

*Levels: II, III, IV*

- Reporting 25 ohms as the NETA substation target.
- Leaving the test probes inside the electrode’s sphere of influence and writing down the first number.
- Running the equipment-grounding conductor through a zero-sequence CT “so the fault has a path.”

## Soil resistivity (Wenner four-point) {#soil}

*Levels: II*

IEEE 81-2012 7.2.3. Four probes go in a straight line at equal spacing `a`. Current flows through the outer two, and voltage is read across the inner two. `R = V / I`.

With the probes driven no deeper than about a tenth of the spacing, apparent resistivity is `ρ = 2πaR`, in ohm-meters when `a` is in meters. Example: `a = 10 m`, `R = 1.5 Ω` gives about 94 Ω·m.

Each spacing samples to a depth of roughly `a`. Take a series of spacings. If the resistivity changes a lot from one spacing to the next, the soil is layered, and that profile is what the grid designer needs.

Soil moisture and temperature move the numbers. For conservative design data, IEEE 81 8.1.2 suggests measuring under adverse conditions, such as dry weather, and taking resistivity and grid readings under similar weather.

## Fall-of-potential in the field {#fop-field}

*Levels: II, III*

IEEE 81-2012 8.2.2.4:

- Drive the current probe well away from the electrode, typically at least five times the electrode's largest dimension.
- Put the potential probe in line with it. The 62% position is correct only for fairly uniform soil, probes far enough away to act like hemispheres, and an electrode with no other connections.
- Take readings on either side of 62%. A flat stretch means the reading is real. A steady slope means the current probe is too close.
- High probe resistance in dry soil has little effect on accuracy. It can starve the tester of current, so wet the probes or drive them deeper.
- Where the soil isn't uniform or the electrical center is unclear, Tagg's slope method takes readings at 0.2, 0.4, and 0.6 of the current-probe distance, computes `μ = (R3 − R2) / (R2 − R1)`, and looks up the true probe position in the guide's table.

ATS 7.13 adds point-to-point checks from the main grounding system to frames, the system neutral, and derived neutrals. Investigate anything above 0.5 Ω (7.13.D.3).

## Clamp-on (stakeless) testers {#clamp-on}

*Levels: II, III*

IEEE 81-2012 8.2.2.5 and Annex E.2. The clamp induces a test voltage and measures the loop current. The loop is the electrode under test in series with every other ground in parallel. The reading is only that electrode's resistance when the parallel return is close to zero ohms, which is the case for a pole ground on a long multigrounded neutral.

Where it goes wrong:

- No return loop (an isolated rod with its bond lifted). There is nothing to measure.
- A grid or structure with many paths to earth. The loop never leaves the grid.
- Test frequency of roughly 1–3.4 kHz. On a long neutral or shield, the inductive reactance can swamp the resistance.
- Corroded neutral splices. Jaws that don't mate cleanly. Noise on high-resistance grounds. These meters also need frequent calibration.

Use fall-of-potential when the result has to stand on its own.
