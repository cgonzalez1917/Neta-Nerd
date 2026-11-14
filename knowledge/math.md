# Math you do not get for free {#not-on-sheet}

*Level: II*

The certification exam shows a one-page formula sheet on screen. This bank follows the official NETA Electrical Formulae Sheet, updated June 29, 2017. It is linked from NETA’s exam-preparation page: https://www.netaworld.org/certification-exam/exam-preparation686

An older one-page PDF, from the previous exam-preparation address, is an incomplete excerpt. It stops after the power-factor line and drops the rest of the official sheet. Study the June 29, 2017 sheet.

Printed on that official sheet:

- DC: `V = IR`, `P = IV`
- Percent accuracy: `(actual − specified) / specified × 100%`
- Sine wave: `Vpeak = √2 × Vrms`
- `V(L-L) = √3 × V(L-N)`
- `V = IZ`
- `XL = 2πfL`
- `XC = 1/(2πfC)`
- `Z = √(R² + (XL − XC)²)`
- `P = VI cos θ = I²R`
- `cos θ = R/Z = power factor = watts / volt-amperes = kW/kVA`
- Three-phase: `VA = √3 × V × I`, and `kW = kVA × PF`
- Balanced delta: line current = `1.732 ×` phase current, and line voltage = phase voltage
- Balanced wye: line current = phase current, and line voltage = `1.732 ×` phase voltage
- `1 hp = 746 W`
- Torque: `33,000 × hp / (6.28 × rpm)` (pound-feet)
- Resistance per 1000 ft: measured resistance × (length of the run in feet / 1000)
- `C = VAR / (2πf V²)`
- `kVAR = kV² × 1000 / XC`
- Capacitor kvar at another voltage: `kVAR1 = kVAR2 × (kV1 / kV2)²`
- Resonance: `f = 1 / (2π √(LC))`
- Machine frequency: `f = P × ns / 120` (P is poles, ns is synchronous rpm)
- Watthour meters: Kh is the watthours one disk revolution stands for. With instrument transformers, the primary Kh is the energy figure for the primary circuit.

Not on the sheet, so memorize them. Each of these was checked against the June 29, 2017 sheet and is absent:

- Sine, cosine, and tangent of ordinary angles. The sheet uses `cos θ` inside the power and power-factor lines. It does not print a value for 30°, 45°, or 60°, and it does not print `tan θ`.
- ELI and ICE: current lags voltage in an inductor and leads in a capacitor.
- Copper temperature correction with the constant 234.5. Aluminum uses 225. Neither constant is printed.
- Polarization index (10 min / 1 min) and dielectric absorption (60 s / 30 s).
- The kvar triangle identity `kvar = √(kVA² − kW²)`.
- Parallel-resistor shortcuts, including product over sum.
- Unit prefixes (milli, micro, and the rest). The reactance lines want henries and farads.

Insulation-resistance temperature multipliers are a table, not a line on the sheet. The on-screen calculator is a TI-30XS. If it is in radians, `cos(60)` is not one half. Switch to degrees before an angle problem.

## Level II {#math-level-ii}

*Level: II*

## Power {#power}

*Level: II*

The sheet prints single-phase `P = VI cos θ`, power factor as `kW/kVA`, three-phase `VA = √3 × V × I`, and `kW = kVA × PF`.

`S (VA) = √3 × VLL × IL`

`P (W) = S × PF`, the same statement as `kW = kVA × PF`.

`kvar = √(kVA² − kW²)` when you were not given the angle. That square root is not on the sheet. If you were given θ, `kvar = kW × tan θ`, and tan is also not printed for you.

Worked: 200 kW at 0.80 PF. `kVA = 200 / 0.80 = 250`. `kvar = √(250² − 200²) = √22500 = 150`.

Worked: 240 kW at 0.80 lagging PF. `kVA = 240 / 0.80 = 300`. The sine of the angle is 0.60, so `kvar = 300 × 0.60 = 180`. Same answer from `kvar = √(300² − 240²)`.

Worked, two loads on one feeder: 100 kW at 0.80 lagging, and 60 kVA at 0.50 lagging. Convert each load to real and reactive power, add those parts, then recombine. The first load is 125 kVA and 75 kvar. The second is 30 kW and about 52 kvar. Combined P is 130 kW and combined Q is about 127 kvar, so `S = √(130² + 127²) ≈ 182 kVA`. You cannot add a kW figure to a kVA figure.

Worked: 480 V, 100 A, unity PF. `P = 1.732 × 480 × 100 = 83.1 kW`. Drop the √3 and you report the single-phase product, 48 kW.

## Also on the official sheet {#official-rest}

*Level: II*

Balanced delta: line current is 1.732 times phase current, and line voltage equals phase voltage. A delta phase current of 10 A is a line current of 17.32 A. The voltage you read line to line is the phase voltage.

Balanced wye: line current equals phase current, and line voltage is 1.732 times phase voltage. 277 V from line to neutral is `1.732 × 277 ≈ 480 V` line to line. That is the same relationship as `V(L-L) = √3 × V(L-N)`. The sheet writes 1.732 on the delta and wye lines and a radical on the line-to-neutral line.

`1 hp = 746 W` is printed. Shaft horsepower is output. A 25 hp shaft is `25 × 746 = 18,650 W` out of the shaft. Line current that also folds in efficiency is not printed as one formula. Build it from this line, three-phase VA, and the efficiency you were given.

Torque in pound-feet: `33,000 × hp / (6.28 × rpm)`. The 6.28 stands in for 2π. At 10 hp and 1800 rpm, `330,000 / (6.28 × 1800) ≈ 29.2 lb-ft`.

Resistance and length of run, as printed: resistance × (length of the run in feet / 1000). Read it as scaling a per-1000-ft value up or down to a run: 0.20 Ω per 1000 ft over a 500 ft run is `0.20 × (500 / 1000) = 0.10 Ω`. To go the other way, from a measured run to a per-1000-ft value, multiply by 1000 / length. A 500 ft run that measures 0.20 Ω is 0.40 Ω per 1000 ft. See [run length](#/study/math.md/run-length).

Capacitance from reactive power: `C = VAR / (2πf V²)`, farads. A 10,000 var capacitor at 480 V and 60 Hz is about 115 µF. The companion line is `kVAR = kV² × 1000 / XC`. At 0.48 kV and `XC = 23.04 Ω`, that is `0.2304 × 1000 / 23.04 = 10 kvar`.

A capacitor moved to another voltage: `kVAR1 = kVAR2 × (kV1 / kV2)²`. A 100 kvar unit rated 4.16 kV, energized at 4.00 kV, delivers `100 × (4.00 / 4.16)² ≈ 92.4 kvar`.

Series resonance: `f = 1 / (2π √(LC))`. `L = 0.20 H` and `C = 50 µF` (`50 × 10⁻⁶ F`) resonate near 50.3 Hz.

Machine frequency: `f = P × ns / 120`. Four poles at 1800 rpm synchronous is `4 × 1800 / 120 = 60 Hz`.

Watthour meters are a note, not one algebra line. Kh is the watthours one revolution of the disk stands for. When instrument transformers feed the meter, the primary Kh is the constant for energy in the primary circuit.

## Reactance {#xl}

*Level: II*

`XL = 2πfL` is on the sheet. Henries are not millihenries. 10 mH is 0.010 H.

At 60 Hz, `XL = 2 × π × 60 × 0.010 ≈ 3.77 Ω`. Leave the “milli” off and you publish about 3770 Ω.

`XC = 1/(2πfC)` with C in farads. 10 µF is `10 × 10⁻⁶ F`. At 60 Hz, `XC ≈ 265 Ω`.

ELI: current lags voltage in an inductor. ICE: current leads voltage in a capacitor. The sheet will build Z for you; it will not tell you which way the phasor points.

Net reactance on the sheet is `XL − XC`, not the sum. `R = 3 Ω`, `XL = 10 Ω`, `XC = 4 Ω` gives `Z = √(3² + 6²) = √45 ≈ 6.71 Ω`, not 17 Ω.

## Circuit laws the sheet assumes {#kvl}

*Level: II*

Series resistances add. Two equal resistors in parallel are half of one: 12 Ω || 12 Ω = 6 Ω. `Rparallel = (R1 × R2) / (R1 + R2)`.

A divider: 480 V across 30 Ω in series with 10 Ω. Current is `480 / 40 = 12 A`. The 10 Ω resistor drops 120 V. The two drops add to the source (KVL). They do not split in proportion to the smaller resistor’s name.

Inductors combine like resistors. 20 mH in series with 20 mH is 40 mH. The same two in parallel are 10 mH.

## CT ratio {#ct-ratio}

*Level: II*

Secondary amperes = primary amperes × (secondary rating / primary rating).

A 600:5 CT with 240 A primary: ratio 120, secondary `240 / 120 = 2.0 A`.

Polarity in the field: current into H1 leaves X1. One ground on the secondary circuit, where the drawings put it.

## Turns-ratio percent {#ttr-pct}

*Level: II*

Percent accuracy on the official sheet is `(actual − specified) / specified × 100`. For a turns-ratio check, the calculated ratio is the specified value and the measured ratio is the actual value:

`% deviation = (measured − calculated) / calculated × 100`

Nameplate 13800 / 480 = 28.75. Measured 28.95.

`(28.95 − 28.75) / 28.75 × 100 = 0.70%`, which is outside the one-half percent ATS allows. The half-percent rule is in the transformer pages; the arithmetic is yours.

## Copper temperature correction {#copper}

*Level: II*

Not on the official sheet. For copper windings:

`R2 = R1 × (234.5 + T2) / (234.5 + T1)`

with temperatures in °C. Aluminum uses 225 instead of 234.5.

0.420 Ω at 25 °C, corrected to 75 °C:

`0.420 × (234.5 + 75) / (234.5 + 25) = 0.420 × 309.5 / 259.5 = 0.501 Ω`.

Flip the fraction and you “correct” the wrong direction, to about 0.352 Ω. A hot winding reads higher resistance. Comparing a 25 °C reading with a 75 °C factory value without this step makes a healthy winding look low.

Insulation resistance moves the other way: hotter insulation reads lower megohms. That correction is a table multiplier, `Rc = Ra × K`, not the copper formula. See insulation.

## Per-unit fault current {#per-unit}

*Level: II*

Percent impedance on a transformer nameplate is the percent of rated voltage that, applied to one winding with the other shorted, circulates rated current.

`Isc ≈ IFL / Zpu` when the source is stiff and you ignore cable. `Zpu = percent / 100`.

1500 kVA at 480 V:

`IFL = 1,500,000 / (√3 × 480) ≈ 1804 A`.

At 5.75% Z, `Zpu = 0.0575`, `Isc ≈ 1804 / 0.0575 ≈ 31.4 kA`.

Multiplying by 5.75 instead of dividing by 0.0575 is the usual miss (you land near 10 kA).

## A temperature rise is not a temperature {#delta-t}

*Level: II*

Table 100.18 talks about a difference, ΔT. A difference in Celsius converts by 1.8, with no +32. A 10 °C rise is an 18 °F rise. Adding 32 turns a rise into a fake temperature (50 °F) and will make a mild connection look like a fire.

## Unit prefixes {#prefixes}

*Level: II*

Not on the sheet. Every step is a factor of 1000.

- tera (T) = 10¹²
- giga (G) = 10⁹
- mega (M) = 10⁶
- kilo (k) = 10³
- milli (m) = 10⁻³
- micro (µ, sometimes typed u) = 10⁻⁶
- nano (n) = 10⁻⁹
- pico (p) = 10⁻¹²

Capital M is mega and lowercase m is milli. That one letter is the difference between a megohm and a milliohm. Worked: 2,500 MΩ = 2.5 GΩ. 0.047 µF = 47 nF. 1,500 µΩ = 1.5 mΩ.

## Single-loop RLC, start to finish {#rlc}

*Level: II*

The sheet gives every piece: `XL = 2πfL`, `XC = 1/(2πfC)`, `Z = √(R² + (XL − XC)²)`, `V = IZ`, and `cos θ = R/Z`. The work is doing them in order without dropping a prefix.

Worked: 120 V, 60 Hz, R = 30 Ω, L = 0.20 H, C = 50 µF.

1. `XL = 2π × 60 × 0.20 = 75.4 Ω`
2. `XC = 1 / (2π × 60 × 50×10⁻⁶) = 53.1 Ω`
3. Net `X = 75.4 − 53.1 = 22.3 Ω`, inductive because XL is larger
4. `Z = √(30² + 22.3²) = 37.4 Ω`
5. `I = 120 / 37.4 = 3.21 A`
6. `PF = 30 / 37.4 = 0.80`, lagging. `θ = cos⁻¹(0.80) = 36.7°` in degree mode

If XC is the larger one, the circuit is capacitive and current leads. ELI the ICE man tells you the direction. The sheet doesn't.

## Combining capacitors and resistors {#cap-combos}

*Level: II*

Not on the sheet.

- Resistors and inductors: series add. Parallel use reciprocals: `1/R = 1/R1 + 1/R2 + …`. The parallel total is always below the smallest branch.
- Capacitors are backward: parallel add, and series use reciprocals. 10 µF and 15 µF in series is 6 µF. In parallel it's 25 µF.

Three resistors in parallel, 60, 30, and 20 Ω: `1/60 + 1/30 + 1/20 = 6/60`, so the total is 10 Ω. Product over sum works only two at a time.

## 4–20 mA scaling {#loop-scaling}

*Level: II*

Not on the sheet. Analog transducers and transmitters commonly use a 4–20 mA loop (IEEE C37.1 lists it as a standard dc analog signal range). 4 mA is the bottom of the range, not zero current, and the live span is 16 mA.

- Reading from current: `value = (mA − 4) / 16 × full range`
- Current from reading: `mA = 4 + 16 × (value / full range)`

Worked: 0–150 °C transmitter at 8 mA: `(8 − 4) / 16 × 150 = 37.5 °C`. A 0–2000 A transducer at 1200 A: `4 + 16 × 0.6 = 13.6 mA`. The usual miss is treating the loop as 0–20 mA.

## RMS, peak, and peak-to-peak {#rms-peak}

*Level: II*

The sheet prints `Vpeak = √2 × Vrms`. Peak-to-peak is twice peak, and that step is not printed. Meters and relays usually report rms. Oscilloscopes and some event records show peak or peak-to-peak.

Worked: 480 V rms peaks at 679 V. A scope trace of 340 V peak-to-peak is 170 V peak, which is 120 V rms.

## More drills on the lower block {#sheet-drills}

*Level: II*

- **Delta and wye.** Delta line current 52 A is a phase current of `52 / 1.732 = 30 A`. A 4160 V wye has `4160 / 1.732 = 2402 V` per phase.
- **Capacitor on another voltage.** 100 kvar at 480 V on a 440 V bus: `100 × (440/480)² = 84 kvar`. The square matters.
- **kvar from reactance.** `kVAR = kV² × 1000 / XC`. At 0.48 kV and 4.608 Ω: 50 kvar. Enter kilovolts, not volts.
- **Resonance.** 10 mH and 100 µF: `f = 1 / (2π √(0.010 × 100×10⁻⁶)) = 159 Hz`. At resonance Z = R.
- **Machine speed.** `ns = 120 × f / P`. Six poles at 60 Hz is 1200 rpm. Four poles at 50 Hz is 1500 rpm.
- **Watthour meters.** Kh is watthours per disk revolution. `kW = 3.6 × revolutions × Kh / seconds`, where 3.6 is 3600 seconds per hour divided by 1000 W per kW. Primary Kh = Kh × CT ratio × VT ratio.
- **Torque.** 50 hp at 1750 rpm: `33,000 × 50 / (6.28 × 1750) = 150 lb-ft`.
- **Motor current.** Build it: hp × 746 = output watts, divide by efficiency for input watts, divide by PF for VA, then `I = VA / (1.732 × V)`.
- **Percent accuracy.** Divide by the specified value, not the measured one. Keep the sign.

## Resistance and run length {#run-length}

*Level: II*

Conductor resistance is proportional to length. Check the units every time you use the resistance-and-length line: a longer run must read more ohms.

- From a per-1000-ft value to a run: `R_run = R_per_1000ft × (length / 1000)`. 0.20 Ω per 1000 ft over 2,500 ft is 0.50 Ω. This is the arrangement the sheet's line prints.
- From a measured run to a per-1000-ft value: `R_per_1000ft = R_measured × (1000 / length)`. A 2,000 ft shield that measures 30 Ω is 15 Ω per 1000 ft.

If an answer says a long run reads less than its per-1000-ft value, the fraction is upside down.

## Level III {#math-level-iii}

*Level: III*

## Harmonics at the point of common coupling {#harmonics}

*Level: III*

ATS section 6.6 is the harmonic study. The report compares calculated voltage and current distortion with IEEE 519 and calls out anything over those limits. It also wants the impedance-versus-frequency plot, so resonances are visible, and a check of transformer capability under the nonsinusoidal current using the method in IEEE C57.110.

Field work includes recognizing the effects, not only reading the study (IEEE 519-2022; IEEE 141-1993 Ch. 8). Nonlinear loads, such as a large rectifier, inject harmonic current. Capacitors have falling impedance with frequency, so they can absorb a large share of that current and overheat. Transformers on the same bus see extra heating as well, hotter than the kVA load would suggest, and voltage waveforms can look flat-topped. Temporary monitoring should stay in place long enough to characterize the condition, and a study or mitigation should come before anyone adds more capacitors, which can make a resonance worse.

IEEE 519-2022 clause 5 puts the voltage-distortion limits at the point of common coupling, not on each drive or each panel. The weekly short-time values use the table; the very-short-time daily values are allowed up to one and a half times those table values. A bus from just over 1 kV through 69 kV is the row whose total voltage distortion limit is 5 percent. Lower voltage buses are allowed more distortion. Higher voltage buses are allowed less. Do not paste the whole table into a report; use the row for the voltage at the point of common coupling.

## Wye capacitors, line to line {#caps}

*Level: III*

Three equal capacitors in wye: a measurement from phase A to phase B sees two units in series. Series capacitance is half of one unit when they match. 100 µF cans read about 50 µF from A to B. Do not call the bank failed because the line-to-line reading is not the nameplate microfarads of one can.

## Level IV {#math-level-iv}

*Level: IV*

## Base changes and fault math {#fault-math}

*Level: IV*

Sources: Blackburn and Domin, Protective Relaying, 4th ed., 2.5 through 2.8 and 2.10; IEEE 242-2001, Clause 2; ANSI/NETA ETT-2026, 8.4.2.B and 8.4.2.H.6.

**Changing the MVA base.** Per-unit impedance grows in proportion to the base MVA: `Znew = Zold x (MVAnew / MVAold)`. An 8% impedance on a 15 MVA base is `0.08 x 100 / 15 ≈ 0.533 pu` (53.3%) on a 100 MVA base.

**Changing the voltage base.** If the rated voltage of the equipment differs from the study base at the same point, also multiply by `(kVold / kVnew)^2`. A 25 MVA, 13.2 kV generator with Xd'' = 0.18 on a 100 MVA, 13.8 kV base:

1. MVA change: `0.18 x 100 / 25 = 0.72`.
2. Voltage change: `(13.2 / 13.8)^2 ≈ 0.915`.
3. Result: `0.72 x 0.915 ≈ 0.659 pu`.

Apply the voltage term only when the two kV values belong to the same voltage level. Across a transformer, the bases are linked by the turns ratio.

**Per-unit to ohms.** `Zohms = Zpu x kV^2 / MVA`. Take a 12% reactance rated 20 MVA at 13.8 kV: the result is `0.12 x 9.52 ≈ 1.14 ohms`.

**Add the source.** For a 2500 kVA, 480 V, 5.75% transformer fed from a 500 MVA utility source, put both on the transformer base: source `2.5 / 500 = 0.005 pu`, total `0.0625 pu`. Full-load current is about 3007 A, so the bolted fault is about `3007 / 0.0625 ≈ 48 kA`. The infinite-bus answer is about 52 kA.

**Generator contribution.** Use saturated subtransient reactance for the first few cycles. A 50 MVA, 13.8 kV machine with Xd'' = 0.15 has rated current near 2092 A and a terminal fault near `2092 / 0.15 ≈ 13.9 kA`.

**Base current.** `Ibase = MVA / (1.732 x kV)`. At 100 MVA and 138 kV this is about 418 A, so a 0.30 pu impedance to the fault gives about 1395 A.

## Symmetrical components and asymmetry {#sequence}

*Level: IV*

Sources: IEEE 242-2001, 2.4 Equation (2-3), 2.7, and 8.3.2; Blackburn and Domin, Protective Relaying, 4th ed., Chapter 4; IEEE C37.230-2020, 6.2; ANSI/NETA ETT-2026, 8.4.2.B and 8.4.2.G.

**Asymmetrical rms factor.** The first-cycle rms current with full offset is the symmetrical current times `sqrt(1 + 2 x e^(-2 pi / (X/R)))`.

- X/R = 15: `2 pi / 15 ≈ 0.419`, `e^(-0.419) ≈ 0.658`, factor `sqrt(2.316) ≈ 1.52`. A 20 kA symmetrical fault is about 30.4 kA asymmetrical.
- X/R = 25: `e^(-0.251) ≈ 0.778`, factor `sqrt(2.556) ≈ 1.60`. That is the familiar 1.6 multiplier, which is only valid up to about this X/R.

**Phase-to-phase faults.** A bolted line-to-line fault is about 0.87 of the three-phase value. If the three-phase fault is 2400 A and pickup is 600 A, the phase-to-phase multiple is `0.87 x 2400 / 600 ≈ 3.48`.

**Single line-to-ground fault.** `IF = 3 x VLN / (Z1 + Z2 + Z0 + 3 x ZG)`. On a 13.8 kV system, `3 x 7967 ≈ 23,900 V`. With Z1 = Z2 = 0.5, Z0 = 0.6, and an 8 ohm ground impedance, the bottom is `0.5 + 0.5 + 0.6 + 24 = 25.6 ohms`, so IF is about 934 A. Forgetting the 3 on ZG overstates the current by more than double.

**Sequence currents in a ground fault.** With one phase faulted to ground, I0 = I1 = I2 = IF / 3. A 600 A fault has 200 A in each sequence, and the residual (3 x I0) a ground relay sees is 600 A.
