# Insulation resistance {#spot}

A megohmmeter applies DC and reports megohms. It is the wrong instrument for a ground-rod resistance and the wrong instrument for a circuit board. Discharge the winding before you take the leads off. People have been knocked down by a “finished” megger test.

ATS separates the minimums:

- Table 100.1 — apparatus and systems other than rotating machines, values at 20 °C. A 600 V rating with no manufacturer number: 1000 V DC test, 100 MΩ minimum. A 250 V rating: 500 V DC, 25 MΩ.
- Table 100.5 — transformer windings. Liquid-filled, 600 V and below: 1000 V DC, 100 MΩ. Dry-type at the same voltage: 500 MΩ. Above 5 kV liquid-filled: 5000 V DC test, 5000 MΩ. Ester-filled units often read lower than mineral oil; compare them with factory data (note 4).
- Table 100.11 — rotating machines, one minute, corrected to 40 °C. Random-wound and small form-wound coils: 5 MΩ. Form-wound AC windings built after 1970: 100 MΩ. Older windings and many field windings: kV + 1.

Note 6 on Table 100.1: do not energize a cable, or keep it in service, on those megohm floors alone. Length, geometry, and the manufacturer’s ohms-per-length matter.

Manufacturer data wins. Every insulation paragraph you will use says “in the absence of manufacturer’s data.”

## PI and DAR {#pi-dar}

ATS 7.15.1.B.2, AC induction machines, and the same pattern on DC machines in 7.15.3:

- Larger than 200 hp (150 kW): ten-minute test, calculate polarization index.
- 200 hp and less: one-minute test, dielectric absorption ratio over the 60-second and 30-second points.

For those AC induction machines, 7.15.1.D.2: PI not less than 2.0, and DAR not less than 1.4. The one-minute megohms still have to meet Table 100.11.

Liquid-filled transformers are a different floor. ATS 7.2.2.D.2: investigate insulation resistance below the manufacturer or Table 100.5, and the polarization index shall not be less than 1.0. A PI of 1.2 can be acceptable on that transformer rule and unacceptable on the motor rule. Use the section for the equipment in front of you.

In field practice PI is the 10-minute reading divided by the 1-minute reading, which matches the ten-minute machine test above. DAR for the short machine test is the 60-second reading over the 30-second reading, which is what 7.15.1 writes as “60/30 second periods.” Guard the ratio against a calculator inversion: 400 MΩ at 1 minute and 1000 MΩ at 10 minutes is PI = 2.5, not 0.4.

## Temperature {#temp-correction}

Insulation resistance falls as temperature rises. Compare only after correction.

Table 100.14.1 corrects to 20 °C (`Rc = Ra × K`). Use it with Table 100.1 and with transformer insulation that is being compared at 20 °C. Oil-immersed insulation at 40 °C (104 °F) uses K = 3.95. The table’s own pattern: 2 MΩ measured there becomes 7.9 MΩ at 20 °C. Solid insulation (not rotating machines) at the same 40 °C uses K = 2.50.

Table 100.14.2 corrects to 40 °C. That is the companion to Table 100.11. The notes say the oil column halves about every 10 °C and the solid-insulation column about every 15 °C.

Do not “correct” a hot reading downward. The multiplier for a temperature above the reference, when you are correcting to the cooler reference, is greater than 1.

## Setup habits

- One minute is the usual spot test unless the machine rule above says ten.
- Record temperature, humidity, test voltage, which winding, and what was grounded.
- Phase-to-phase and phase-to-ground mean different circuits. A breaker test is both, plus across the open pole.
- Isolate solid-state trip units and relays the manual says cannot take the voltage. Burning a trip unit to get a megohm reading is not an acceptance test.
- Do not start a dielectric withstand until the insulation-resistance minimum is met. ATS 7.4.D.2.a says that in words for busway, and the same judgment belongs everywhere a withstand follows a megger.

## Common mistakes

- Comparing tonight’s 40 °C reading with last winter’s 20 °C reading raw.
- Using the motor PI of 2.0 to fail a transformer, or the transformer PI of 1.0 to accept a large motor.
- Quoting Table 100.1 for a stator.
- Leaving the winding charged.
