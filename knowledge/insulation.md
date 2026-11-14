# Insulation resistance {#spot}

*Level: II*

A megohmmeter applies DC and reports megohms. It is the wrong instrument for a ground-rod resistance and the wrong instrument for a circuit board. Discharge the winding before you take the leads off. People have been knocked down by a “finished” megger test.

ATS separates the minimums:

- Table 100.1 — apparatus and systems other than rotating machines, values at 20 °C. A 600 V rating with no manufacturer number: 1000 V DC test, 100 MΩ minimum. A 250 V rating: 500 V DC, 25 MΩ.
- Table 100.5 — transformer windings. Liquid-filled, 600 V and below: 1000 V DC, 100 MΩ. Dry-type at the same voltage: 500 MΩ. Above 5 kV liquid-filled: 5000 V DC test, 5000 MΩ. Ester-filled units often read lower than mineral oil; compare them with factory data (note 4).
- Table 100.11 — rotating machines, one minute, corrected to 40 °C. Random-wound and small form-wound coils: 5 MΩ. Form-wound AC windings built after 1970: 100 MΩ. Older windings and many field windings: kV + 1.

Note 6 on Table 100.1: do not energize a cable, or keep it in service, on those megohm floors alone. Length, geometry, and the manufacturer’s ohms-per-length matter.

Manufacturer data wins. Every insulation paragraph you will use says “in the absence of manufacturer’s data.”

## PI and DAR {#pi-dar}

*Level: II*

ATS 7.15.1.B.2, AC induction machines, and the same pattern on DC machines in 7.15.3:

- Larger than 200 hp (150 kW): ten-minute test, calculate polarization index.
- 200 hp and less: one-minute test, dielectric absorption ratio over the 60-second and 30-second points.

For those AC induction machines, 7.15.1.D.2: PI not less than 2.0, and DAR not less than 1.4. The one-minute megohms still have to meet Table 100.11.

Liquid-filled transformers are a different floor. ATS 7.2.2.D.2: investigate insulation resistance below the manufacturer or Table 100.5, and the polarization index shall not be less than 1.0. A PI of 1.2 can be acceptable on that transformer rule and unacceptable on the motor rule. Use the section for the equipment in front of you.

In field practice PI is the 10-minute reading divided by the 1-minute reading, which matches the ten-minute machine test above. DAR for the short machine test is the 60-second reading over the 30-second reading, which is what 7.15.1 writes as “60/30 second periods.” Guard the ratio against a calculator inversion: 400 MΩ at 1 minute and 1000 MΩ at 10 minutes is PI = 2.5, not 0.4.

## Temperature {#temp-correction}

*Level: II*

Insulation resistance falls as temperature rises. Compare only after correction.

Table 100.14.1 corrects to 20 °C (`Rc = Ra × K`). Use it with Table 100.1 and with transformer insulation that is being compared at 20 °C. Oil-immersed insulation at 40 °C (104 °F) uses K = 3.95. The table’s own pattern: 2 MΩ measured there becomes 7.9 MΩ at 20 °C. Solid insulation (not rotating machines) at the same 40 °C uses K = 2.50.

Table 100.14.2 corrects to 40 °C. That is the companion to Table 100.11. The notes say the oil column halves about every 10 °C and the solid-insulation column about every 15 °C.

Do not “correct” a hot reading downward. The multiplier for a temperature above the reference, when you are correcting to the cooler reference, is greater than 1.

## Setup habits

*Level: II*

- One minute is the usual spot test unless the machine rule above says ten.
- Record temperature, humidity, test voltage, which winding, and what was grounded.
- Phase-to-phase and phase-to-ground mean different circuits. A breaker test is both, plus across the open pole.
- Isolate solid-state trip units and relays the manual says cannot take the voltage. Burning a trip unit to get a megohm reading is not an acceptance test.
- Do not start a dielectric withstand until the insulation-resistance minimum is met. ATS 7.4.D.2.a says that in words for busway, and the same judgment belongs everywhere a withstand follows a megger.

## Common mistakes

*Level: II*

- Comparing tonight’s 40 °C reading with last winter’s 20 °C reading raw.
- Using the motor PI of 2.0 to fail a transformer, or the transformer PI of 1.0 to accept a large motor.
- Quoting Table 100.1 for a stator.
- Leaving the winding charged.

## What the megger is actually measuring {#current-components}

*Level: II*

IEEE 43-2013 (clauses 3 and 5.1) splits the dc current into parts:

- **Geometric capacitive current.** Large and brief. It charges the winding's capacitance and dies away in seconds.
- **Absorption (polarization) current.** Starts high and decays over minutes as the insulation polarizes.
- **Conduction current.** Steady. It flows through the bulk insulation.
- **Surface leakage current.** Also steady. It runs over dirty or damp surfaces, such as end turns. The guard terminal can steer it away from the measurement.

The reading is applied voltage divided by total current. As absorption decays, total current falls and megohms climb. That rise is what PI captures. On small random-wound machines the absorption current is gone in seconds, so PI tells you little (5.4).

Low readings caused by dirt or moisture can often be recovered by cleaning and drying, and PI is a common way to judge when drying can stop (11.2). A winding below its minimums should not get an overvoltage test.

Pick the DC test voltage from IEEE 43-2013 Table 1 or the ATS table for the equipment's rating. Use the manufacturer's value first. Good, dry insulation reads about the same at any voltage up to the peak of its rating. A sharp drop as voltage rises points to cracks or contamination (6.4).

## Discharge and recovery voltage {#discharge}

*Level: II*

The test isn't over when the set stops. IEEE 43-2013 clause 4 and 6.5:

- Start discharged. Leftover charge from an earlier test corrupts the reading. Check that discharge current is near zero and there's no meaningful return voltage before you begin.
- Ground through a resistor after the test, and keep it grounded for at least four times as long as voltage was applied. A 10-minute PI test means 40 minutes or more.
- A brief ground is not enough. When dc is removed, the absorption current reverses and bleeds out slowly, sometimes for more than 30 minutes on large insulation (5.5). Lift the ground early and voltage climbs back onto the terminals.

The discharge current has two parts: a fast capacitive part and a slow absorption part that flows opposite to the charging current. Discharge-current diagnostics, such as the dielectric-discharge reading some test sets offer, are built on that slow part. IEEE 43 Annex C covers monitoring charge and discharge current. Acceptance limits for those diagnostics come from the test-set manufacturer, not from ATS.

## Field sequence {#ir-field}

*Level: II*

1. Get the equipment in an electrically safe work condition and confirm the isolation points on the one-line.
2. Read the nameplate, find the section for the equipment (ATS 7.15.1 for induction machines, 7.2 for transformers, 7.6 for breakers), and pick the test voltage and minimum from the manufacturer or the ATS table that section names.
3. Isolate anything that can't take the voltage: solid-state trip units, relays, surge devices, VFD inputs.
4. Ground everything not under test. Connect the guard if surface leakage will mislead you.
5. Record winding and ambient temperature and humidity.
6. Run the timed test (one minute, or ten for the PI machines) and record the readings the section asks for.
7. Discharge and keep grounded per the section above.
8. Correct to the table's base temperature, then compare. Compare with earlier results only after correction.

## Field guide: step-voltage insulation test {#step-voltage}

*Level: II*

A step-voltage test applies dc in equal steps and checks whether insulation resistance holds as the stress goes up. It is a controlled overvoltage test. Sources: IEEE 95-2002 3.23, 6.4, 7.6 and 7.8; IEEE 43-2013 12.1; Megger S1-568 user guide 8.6. No test voltages are given here. Pick them from the manufacturer, the ATS section for the equipment, or the test specification.

### Setup

*Level: II*

- Equipment in an electrically safe work condition. Isolate surge capacitors, arresters, VFDs, and electronics.
- Run an insulation-resistance or PI test first. A winding below the IEEE 43 minimum isn't a candidate for any overvoltage test.
- Discharge fully after the PI test. Leftover charge distorts the first steps.
- Ground everything not under test. Use the guard if surface leakage is a concern.

### Connections

*Level: II*

Same as a normal insulation test: line lead to the winding (all phases tied together, or one phase with the others grounded), earth lead to the frame, guard where needed. Keep the high-voltage lead off the floor and away from sharp edges. Corona at the leads can look like a failing winding.

### Procedure

*Level: II*

1. Choose the final voltage and divide it into equal steps. A common tester routine uses five steps of equal voltage and time. IEEE 95 also allows graded steps and a smooth ramp.
2. Set each step quickly at the start, then leave the setting alone. IEEE 95 says adjust within the first 10 s and don't readjust, because changing voltage mid-step injects charging current.
3. Read at the end of each step. Hold steps longer if absorption current is still large. IEEE 95 suggests about 3 minutes for older asphalt-mica windings.
4. Plot resistance (or current) against voltage as you go.
5. At the end, turn the output to zero, let the voltage decay, discharge through a resistor, and ground the winding.

### What the readings mean

*Level: II*

- **Flat or slightly rising resistance:** no sign of voltage-dependent weakness.
- **Resistance falling at higher steps,** or current curving upward faster than voltage: cracks, contamination, or moisture are starting to conduct. Confirm with one more step and stop if the trend repeats.
- **Current rising with time at a constant step:** a warning of approaching breakdown.
- A smooth ramp keeps charging current constant, so a bend in the curve is easier to see.

### Common mistakes

*Level: II*

- Skipping the PI test and starting the steps on a wet winding.
- Comparing step readings taken at different temperatures or on different plotting scales.
- Chasing the voltage up and down during each step.
- Blaming the winding for corona at a test clip.

### Safety

*Level: II*

Stored charge is the main hazard. The winding stays dangerous until it is discharged and solidly grounded, and a big machine can recover voltage after a short ground. Barricade the far end of the circuit and anything connected to it.
