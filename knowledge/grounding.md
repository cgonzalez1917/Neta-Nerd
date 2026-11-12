# Fall-of-potential {#fop}

ATS 7.13.B.2: perform a fall-of-potential test, or an alternative, on the main grounding electrode or system in accordance with IEEE 81. NETA is telling you which standard owns the probe method. It is not, in that paragraph, giving you a homemade spacing.

In IEEE 81 practice the current probe is driven far enough that the potential probe can sit in a flat part of the resistance curve, classically near 62% of the current-probe distance for a simple electrode in uniform soil. You confirm the plateau with readings around that point (for example near 50%, 62%, and 70%). If the curve is still a slope, the current probe is too close. That 62% figure is IEEE 81 method, not an ATS table value. Mark it that way when you write a question.

A megohmmeter is the wrong tool. It is a high-voltage DC insulation instrument. Ground resistance sets inject a low voltage and are built to reject the noise in the soil.

A clamp-on ground tester measures a loop. It needs a return path through other grounds. An isolated rod with the bonding lifted will not yield a valid electrode resistance that way.

## Limits {#limits}

ATS 7.13.D.2: resistance between the main grounding electrode and ground no greater than 5 ohms for large commercial or industrial systems, and 1 ohm or less for generating or transmission station grounds, unless the owner specifies otherwise. The citation in the paragraph is IEEE 142.

ATS 7.13.D.3: investigate point-to-point resistance above 0.5 ohm between the main grounding system and major frames, the system neutral, and derived neutrals.

These are not the NEC 25-ohm rod rule. NEC 250.53(A)(2) says a single rod, pipe, or plate that is not 25 ohms or less must be supplemented by an additional electrode. It does not require you to prove the pair is under 25 ohms. 250.53(B) spaces multiple rod, pipe, or plate electrodes at least 6 ft apart. That code minimum is not the same as spacing rods far enough apart that their resistance volumes stop overlapping (on the order of their length). Do not mix 0.5 ohm, 5 ohms, 1 ohm, and 25 ohms in one sentence.

Bolted ground connections still use the 50-percent-of-the-lowest screen (7.13.D.1) and Table 100.12 when the manufacturer is silent.

## Ground-fault sensors {#gfp}

Low-voltage ground-fault protection is ATS 7.14, and the visual checks are where the scheme is won or lost:

- The ground connection is on the source side of the neutral disconnect link and on the source side of any ground-fault sensor.
- Neutral sensors are polarized correctly on primary and secondary.
- For a zero-sequence sensor, all phase conductors and the neutral pass through in the same direction.
- Grounding conductors do not pass through the zero-sequence sensor.
- The grounded conductor is solidly grounded.

Pickup and delay are set to the owner’s study. The section points at NEC 230.95 for the performance-test record on service equipment. A ground landed on the load side of the sensor can blind the relay or make it see normal current as a fault, depending on which conductor you stuffed through the window.

Neutral-to-ground insulation is measured with the neutral disconnect link removed, then the link goes back (7.14.B.2).

## Common mistakes

- Reporting 25 ohms as the NETA substation target.
- Leaving the test probes inside the electrode’s sphere of influence and writing down the first number.
- Running the equipment-grounding conductor through a zero-sequence CT “so the fault has a path.”
