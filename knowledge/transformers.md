# Turns ratio {#ttr}

*Level: II*

ATS 7.2.2.B.3: turns-ratio tests at all tap positions on a liquid-filled transformer, not only the as-found tap. 7.2.2.D.3: results shall not deviate by more than one-half percent from either the adjacent coils or the calculated ratio.

Calculated ratio for a 13800 / 480 nameplate is 28.75, line to line. Percent deviation is on the math page. 0.70% is a fail of this screen even if the set “looks close.”

Check the test-set self-test and the lead marks before you condemn a winding. A reversed lead looks like a ratio with the polarity flipped.

Polarity matters when transformers will be paralleled and when CTs or VTs land in a scheme. A polarity error between paralleled units is a short circuit, not a paperwork issue. Sweep-frequency response after a through-fault or a move is in [SFRA](#/study/transformers.md/sfra).

## Level II {#transformers-level-ii}

*Level: II*

## Excitation {#excitation}

*Level: II*

ATS 7.2.2.D.6: on a three-legged core the usual pattern is two similar currents and one lower current. Expect the pattern that matches that core, not three identical numbers. The center phase often reads lower because its magnetic path is shorter.

A shorted turn drives excitation current up hard on the affected phase. Ratio and winding resistance can still sit inside their screens when the short involves very little copper. Excitation is the sensitive test. Compare phases and compare with the last test at the same voltage and tap.

## Power factor {#power-factor}

*Level: II*

Insulation power factor is watts over volt-amperes, the cosine of the angle between voltage and current in the insulation. For the small angles you see on good insulation it is nearly the same number as dissipation factor (tan δ).

Correct liquid-filled results to 20 °C before you compare them (ATS 7.2.2.D.4). Use top-oil temperature for the correction the test-set manual specifies, and do not compare a raw July number with a raw January number.

ATS-2025 Table 100.3, in the absence of consensus standards, recommended maximum at 20 °C: mineral oil, power transformers, regulators, and reactors, 0.5%. Natural ester fluid in that same row, 1.0%. Distribution-transformer power factor is compared with previous results, not with that 0.5% cap.

MTS-2023 Table 100.3 is a maintenance table and it is not the same. Oil maximum for power transformers there is 1.0%. Distribution transformers and apparatus, oil, 2.0%. Other fluids have their own columns. Do not paste an acceptance limit into a maintenance report or the reverse.

Worked: 10 kV test, 1.50 mA, 0.075 W. `VA = 10000 × 0.0015 = 15`. `PF = 0.075 / 15 = 0.005 = 0.50%`.

Bushings, ATS 7.2.2.D.5: investigate power factor more than 50 percent off the nameplate, capacitance more than 5 percent off the nameplate, and hot-collar watts above 0.1 W.

CHL is the insulation between the high-voltage and low-voltage windings. CH and CL are each winding to ground. An overall number hides a bad bushing; test the specimens the set is built to separate.

## Oil {#oil}

*Level: II*

ATS 7.2.2.D.14 points insulating-liquid results at Table 100.4. Table 100.4.1, new mineral oil received in new equipment, cites IEEE C57.106. For 69 kV and below, individual limits you can be asked for: dielectric breakdown, D1816, 1 mm gap, 25 kV minimum; 2 mm gap, 45 kV minimum; water, D1533, 20 ppm maximum; power factor at 25 °C, D924, 0.05% maximum; neutralization number, D974, 0.03 mg KOH/g maximum. Higher voltage classes in that table are tighter on water and on D1816. Do not memorize a neighboring column by accident.

Dissolved-gas analysis is evaluated with IEEE C57.104 (7.2.2.D.15), not with a single “bad ppm” invented in the field. Acetylene is the gas associated with arcing; hydrogen with partial discharge; carbon oxides with cellulose. Sample into a sealed syringe or bottle so the gases stay in the oil. A longer note on interpreting the gases is in [dissolved gas](#/study/field-methods.md/dga). Through-fault duration on a reclosing feeder is in [through-fault duration](#/study/transformers.md/through-fault).

## Sampling insulating liquid (ASTM D923) {#sampling-insulating-liquid-astm-d923-07}

*Level: II*

ATS 7.2.2.B.15 takes the oil sample by ASTM D923. The official exam list names D923-15. These notes were first written from the 2007 edition and have since been checked against D923-15, which agrees on the points and clause numbers below.

- **Where to draw.** For a liquid whose specific gravity is less than 1, such as mineral oil, water and some other impurities settle near the floor, so the sample is taken from the bottom unless a different location is specified (3.1.1.1, 5.4). In drums, cans, and small vessels the device should draw about 3 mm off the floor; in large vessels, tank trucks, and tank cars, within 13 mm of the floor. Liquids with specific gravity greater than 1 are sampled from the surface layer. New liquid in containers should sit undisturbed at least 8 hours before a referee sample is taken.
- **Energized apparatus (5.1, 7.2).** Do not sample energized instrument transformers such as CTs and PTs, and do not sample any energized apparatus that has only a small volume of oil, especially if oil would have to be added to keep the insulation's electric strength. An energized unit that is sampled must be under positive pressure at the sample valve so air is not drawn in. Do not use a drain plug as the sampling point, because flow is hard to control. Keep the liquid level high enough that the insulation's electric strength is not reduced.
- **Dissolved gas and water (5.2, 5.4, 6.4 to 6.6).** Prefer a glass syringe or a stainless-steel cylinder. Ordinary bottles and soldered cans let gases escape or let air in, and soldered seams can contaminate the sample. It is undesirable to take atmosphere-exposed samples when relative humidity exceeds 50%, or in rain or snow, and the liquid should be at least as warm as the air so the sample does not pick up condensed moisture. Clear bottles help you see impurities; amber bottles, or storage in the dark, protect samples from light when that matters.

## Core ground {#core}

*Level: II*

ATS 7.2.2.D.11: core insulation resistance should be comparable to the factory value but not less than 500 MΩ at 500 V DC.

The intentional core ground is supposed to be a single point. If you megger the strap without lifting that bond, a healthy core reads about zero and you have proved nothing. Lift the designed ground, test core to tank, and put the ground back. A second unintentional ground is a circulating-current heater. DGA and excitation are how that fault often announces itself before the megger.

## Leakage reactance

*Level: II*

ATS 7.2.2.D.10: investigate a three-phase equivalent leakage-reactance result more than 3% off the nameplate. Per-phase results should stay within 3% of the average of the three. This is a mechanical-movement clue (winding shift), not a ratio test.

## Field guide: reading a transformer nameplate {#nameplate}

*Level: II*

The nameplate is the first test you run on a transformer, and ATS starts every transformer section with it: compare the nameplate with the drawings. Sources: IEEE C57.12.00-2021 5.12 and Tables 6 to 8, 5.7, 4.1.2.1 and 5.11.1.1; ATS-2025 and MTS-2023 7.2.2.

### Setup

*Level: II*

- Work from the outside of the enclosure, or with the unit de-energized and locked out if you have to open a compartment to see the plate.
- Bring the one-line, the transformer submittal, and the protective-device settings sheet. Photograph the plate so the data travels with your test record.

### What to read, row by row

*Level: II*

- **Nameplate type.** A is for 500 kVA and under with HV BIL below 150 kV. B is other units of 500 kVA and under. C is over 500 kVA. A has no BIL row. C adds step-up suitability, maximum primary voltage, and tank, pressure, and liquid data.
- **kVA and cooling class.** Every rating is listed when the unit has more than one (ONAN, then ONAF, and so on).
- **Voltages.** The way the voltages are written tells you the connection:
  - 2400/4160Y: the winding can be connected delta for 2,400 V or wye for 4,160 V, with no neutral brought out.
  - 4160Y/2400: permanently wye, with a fully insulated neutral brought out.
  - 12470GrdY/7200: wye with reduced insulation at the neutral end. Use it only where the neutral is effectively grounded.
  - 240/120: 240 V at full kVA, or three-wire with half the kVA from the midpoint to each outer terminal. 120/240 is series or parallel.
  - 240 × 480: series or parallel only, not three-wire.
  - E1 is √3 × E. So 7,200 V delta pairs with 12,470 V wye.
- **Taps.** Tap voltages are separated by a slash or listed in a table. Tap 1 (or A) gives the highest HV-to-LV ratio. Units of 501 kVA and over list rated currents on every tap. A load tap changer uses N, then R and L positions.
- **Percent impedance.** Given between each pair of windings, with the voltage connection and kVA base. It is the tested value at 501 kVA and over. Use it for fault-current math. See [per-unit fault current](#/study/math.md/per-unit).
- **Polarity or phasor diagram.** Single-phase units of 200 kVA or less with HV of 8,660 V or less are additive. All other single-phase units are subtractive. On three-phase delta-wye or wye-delta units, the LV side lags the HV side by 30°.
- **Temperature rise.** 65 °C is the average winding rise over an ambient of no more than 40 °C (30 °C 24-hour average). The matching hottest-spot rise is 80 °C.
- **Liquid and PCB.** Liquid type and volume. The PCB labeling that ATS 7.2.2 checks.
- **Scott or T connection.** IEEE C57.12.00-2021 5.3.2 describes a Scott-connected or T-connected transformer as the arrangement used to convert a three-phase supply to two-phase, or the reverse. A plain delta-wye unit does not give a two-phase output, and a zig-zag grounding transformer is not the arrangement given for that conversion.


### What the readings mean

*Level: II*

- If the nameplate voltage or connection doesn't match the drawing, stop before any ratio test. Your TTR expected ratio comes from the plate and the tap position.
- The tap the plate calls nominal is not always where the unit was left. ATS wants the de-energized tap left as specified, so record the as-found and as-left positions.

### Common mistakes

*Level: II*

- Reading 2400/4160Y as two tap voltages.
- Assuming tap 5 is the highest voltage. Tap 1 is the highest ratio.
- Calling a GrdY winding suitable for an ungrounded system.
- Comparing %Z from the plate against a value calculated on a different kVA base.

### Safety

*Level: II*

The plate is often on the tank wall next to the LV throat or a cabinet. Don't open a cabinet on an energized unit just to read it. Use the submittal or come back during the outage.

## Field guide: transformer gauges and accessories {#gauges}

*Level: II*

Gauges are cheap early warning. Acceptance and maintenance both test the alarm and trip paths, not just the dial. Sources: ATS-2025 7.2.2.A, MTS-2023 7.2.2.A, IEEE C57.12.00-2021 6.6.2 and Table 6 note m, Gill 2nd ed. 4.5.2.2.

### What is on a typical liquid-filled unit

*Level: II*

- **Top-liquid temperature indicator**, often with a maximum (drag) pointer and alarm and trip contacts. Larger units add a winding temperature indicator.
- **Liquid-level gauge**, usually with a low-level alarm contact.
- **Pressure-vacuum gauge** on sealed-tank units.
- **Pressure relief device**, sometimes with an alarm contact.
- **Fault-pressure (sudden-pressure) relay and gas accumulator** on larger units.
- **Valves** (drain, sampling, radiator isolation) and, on gas-blanketed units, the nitrogen system.

### Procedure

*Level: II*

1. Record every reading as found, with load and ambient, before anything is reset.
2. Compare the alarm, control, and trip settings with the specification (ATS 7.2.2.A.9).
3. Operate each alarm, control, and trip circuit from the indicator, pressure relief device, gas accumulator, and fault-pressure relay. Confirm the signal arrives where the drawings say: annunciator, SCADA point, lockout (ATS 7.2.2.A.10, MTS 7.2.2.A.6).
4. Check the liquid level in the tank and the bushings (A.13), valve positions (A.14), and positive pressure on a gas blanket (A.15). MTS also offers an optional oxygen-percentage check on the blanket.
5. Reset the maximum pointers after recording them, and write down that you did.

### What the readings mean

*Level: II*

- **Sealed-tank pressure.** The gas and liquid volume is fixed, so the gauge should swing above and below zero as the oil warms and cools. A gauge that sits at zero visit after visit points to a leak in the gas space. Pull a top sample for moisture.
- **Liquid level.** On Nameplate C units with a gas cushion, the plate gives the level at 25 °C and the change per 10 °C. Correct for today's oil temperature before you call it low.
- **Gas blanket at zero pressure.** Air and moisture can get in. Find the leak or the empty cylinder.

### Common mistakes

*Level: II*

- Turning a dial pointer by hand to "test" the contact and calling the trip circuit good without proving the trip reached the breaker or lockout.
- Resetting a maximum pointer before recording it.
- Leaving a radiator valve closed after an oil job.

### Safety

*Level: II*

A sealed tank can be under pressure or vacuum. Follow the manufacturer before opening any fill plug or valve, and never open one on an energized unit just for a level check.

## Level IV {#transformers-level-iv}

*Level: IV*

## Through-fault duration {#through-fault}

*Level: IV*

Through-fault duration is not an oil test, but it is a nameplate-and-application check you make on the same visit. IEEE C57.12.00-2021 7.1.3.1 limits the defined short-circuit duration, for Categories II through IV, to two seconds unless the user specifies otherwise. Category I uses a separate duration equation. On a feeder that recloses, units in all categories must ride through those repeated faults without first cooling back to normal temperature, as long as the total time stays inside that single-event limit. If a longer fault time is expected, it has to be specified, not assumed.

## Natural ester fluid (IEEE C57.147-2018) {#natural-ester-fluid-ieee-c57-147-2018}

*Level: IV*

Do not judge a natural ester with a mineral-oil playbook. The numbers below are from IEEE C57.147-2018.

- **Flash and fire point, as received (4.10 and Table 2).** Unused natural ester is expected to show a minimum flash point of 275 °C and a minimum fire point of 300 °C, both by ASTM D92. Lower values suggest contamination with a lower-flash material such as conventional mineral oil. Those D92 results are laboratory response data, not a complete fire-risk assessment by themselves.
- **Water.** Absolute milligram-per-kilogram limits written for mineral oil do not transfer (4.16 and Annex B). Natural esters hold far more water in solution at a given temperature, on the order of 15 to 20 times as much at saturation at room temperature. Dielectric strength tracks percent of saturation, and that curve is essentially the same for both liquids, so compare by relative saturation, not by a mineral-oil ppm cap.
- **Oxidation and tanks (4.15, 4.9).** Natural esters are not as oxidation-resistant as mineral oil. Free-breathing tanks, including a conservator with no bladder, are not recommended. Continuous, long-term exchange of air should be avoided, especially at operating temperature. Oxidation shows up first as a rise in viscosity. Natural esters are already more viscous than mineral oil; a further rise can hurt cooling and, over time, the insulation system's dielectric strength.
- **Acceptance water and dielectric, Table 3.** After unused natural ester has been processed into new equipment, or after a site fill, and has stood for the required time, dissolved water by ASTM D1533 is limited to 300 mg/kg at 69 kV and below, 150 mg/kg above 69 kV and below 230 kV, and 100 mg/kg at 230 kV and above. The fire point minimum remains 300 °C in every class. Those after-fill water numbers are tighter than the 200 mg/kg as-received shipment limit in Table 2. In-service continued-use water limits in Table 4 are higher (450 / 350 / 200 mg/kg). ASTM D1816, 1 mm gap, minima in Table 3 are 25 kV, 30 kV, and 35 kV for those same three voltage classes; the 2 mm gap minima are 45 kV, 55 kV, and 60 kV. In-service Table 4 1 mm figures are lower (23 / 28 / 30 kV).
- **Sit time after a fill (Clause 7).** Natural esters generally take longer to impregnate cellulose than mineral oil. If the manufacturer has no better figure, consider at least 8 hours, with 24 hours preferred, for a distribution transformer, and at least 24 hours, or more, for a power transformer, and run any circulating pumps for at least several hours of that time. Do not high-potential or energize on the mineral-oil wait. A cautious alternative is to wait until the unit has returned to ambient temperature.
- **In-service fire point (Table 4 note d, 6.5 note 1).** A fire point under 300 °C on a unit that must keep a less-flammable or K-class rating is a sign of leftover mineral oil and should be investigated. It is not acceptable for that rating.
- **Heating and fill (6.4.1, 6.5).** If the liquid must be warmed so it will pump, keep heater surface loading at or below 1.9 W/cm², which is 12 W per square inch, and keep the heater face at 100 °C or less. Scorching shows up as a high dissipation factor, a darkened liquid, a burnt odor, or charred residue on the element. During a fill, ground all accessible bushing terminals, the tank, and the filtering equipment including the hoses: liquid moving through filter paper or ungrounded hoses can charge the windings. Prefer equipment used only on natural ester. Otherwise flush with a volume equal to at least 5% of the ester charge so leftover mineral oil does not pull the fire point down. Do not exceed the tank vacuum limit on the nameplate.


## Sweep-frequency response (SFRA) {#sfra}

*Level: IV*

Source: Locarno, Tully, and Wilson, SFRA article, NETA Transformer Handbook, Vol. 1.

SFRA is a condition-assessment tool aimed at mechanical problems: winding movement, radial buckling, or axial deformation from shipping or short-circuit forces, and loss of core grounds. The most severe in-service forces come from close-in faults, from a fault inside an LTC, and from unsynchronized closing of a generator step-up. Inadequate restraints during transport can also move the core and windings.

The article places the test with power factor, exciting current, turns ratio, leakage reactance, and the other diagnostics, and treats it as corroborative evidence before an expensive decision, not as a stand-alone condemnation. A changed SFRA trace with a still-acceptable power factor and ratio is a reason to keep investigating, not to ignore the trace.

When it is particularly useful:

- After a fault or a protection trip, to help judge the nature and extent of any mechanical damage.
- During a condition assessment, especially if the unit has seen short circuits over time and apparently withstood them, to look for possible damage and remaining short-circuit capability.
- Before and after a relocation, so any mechanical movement from the move is visible.
- On new or refurbished units, to obtain fingerprint traces for later comparison. Traces from sister units of similar design can be used as references when a trace from the exact transformer is not on file. Manufacturers also use the method as a quality check on units built to the same design.
