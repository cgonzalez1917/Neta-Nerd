# Math you do not get for free {#not-on-sheet}

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

## Power {#power}

The sheet prints single-phase `P = VI cos θ`, power factor as `kW/kVA`, three-phase `VA = √3 × V × I`, and `kW = kVA × PF`.

`S (VA) = √3 × VLL × IL`

`P (W) = S × PF`, the same statement as `kW = kVA × PF`.

`kvar = √(kVA² − kW²)` when you were not given the angle. That square root is not on the sheet. If you were given θ, `kvar = kW × tan θ`, and tan is also not printed for you.

Worked: 200 kW at 0.80 PF. `kVA = 200 / 0.80 = 250`. `kvar = √(250² − 200²) = √22500 = 150`.

Worked: 480 V, 100 A, unity PF. `P = 1.732 × 480 × 100 = 83.1 kW`. Drop the √3 and you report the single-phase product, 48 kW.

## Also on the official sheet {#official-rest}

Balanced delta: line current is 1.732 times phase current, and line voltage equals phase voltage. A delta phase current of 10 A is a line current of 17.32 A. The voltage you read line to line is the phase voltage.

Balanced wye: line current equals phase current, and line voltage is 1.732 times phase voltage. 277 V from line to neutral is `1.732 × 277 ≈ 480 V` line to line. That is the same relationship as `V(L-L) = √3 × V(L-N)`. The sheet writes 1.732 on the delta and wye lines and a radical on the line-to-neutral line.

`1 hp = 746 W` is printed. Shaft horsepower is output. A 25 hp shaft is `25 × 746 = 18,650 W` out of the shaft. Line current that also folds in efficiency is not printed as one formula. Build it from this line, three-phase VA, and the efficiency you were given.

Torque in pound-feet: `33,000 × hp / (6.28 × rpm)`. The 6.28 stands in for 2π. At 10 hp and 1800 rpm, `330,000 / (6.28 × 1800) ≈ 29.2 lb-ft`.

Resistance per 1000 ft, as printed: measured ohms × (length of the run in feet / 1000). A 500 ft run that measures 0.20 Ω gives `0.20 × (500 / 1000) = 0.10 Ω` on that line.

Capacitance from reactive power: `C = VAR / (2πf V²)`, farads. A 10,000 var capacitor at 480 V and 60 Hz is about 115 µF. The companion line is `kVAR = kV² × 1000 / XC`. At 0.48 kV and `XC = 23.04 Ω`, that is `0.2304 × 1000 / 23.04 = 10 kvar`.

A capacitor moved to another voltage: `kVAR1 = kVAR2 × (kV1 / kV2)²`. A 100 kvar unit rated 4.16 kV, energized at 4.00 kV, delivers `100 × (4.00 / 4.16)² ≈ 92.4 kvar`.

Series resonance: `f = 1 / (2π √(LC))`. `L = 0.20 H` and `C = 50 µF` (`50 × 10⁻⁶ F`) resonate near 50.3 Hz.

Machine frequency: `f = P × ns / 120`. Four poles at 1800 rpm synchronous is `4 × 1800 / 120 = 60 Hz`.

Watthour meters are a note, not one algebra line. Kh is the watthours one revolution of the disk stands for. When instrument transformers feed the meter, the primary Kh is the constant for energy in the primary circuit.

## Reactance {#xl}

`XL = 2πfL` is on the sheet. Henries are not millihenries. 10 mH is 0.010 H.

At 60 Hz, `XL = 2 × π × 60 × 0.010 ≈ 3.77 Ω`. Leave the “milli” off and you publish about 3770 Ω.

`XC = 1/(2πfC)` with C in farads. 10 µF is `10 × 10⁻⁶ F`. At 60 Hz, `XC ≈ 265 Ω`.

ELI: current lags voltage in an inductor. ICE: current leads voltage in a capacitor. The sheet will build Z for you; it will not tell you which way the phasor points.

Net reactance on the sheet is `XL − XC`, not the sum. `R = 3 Ω`, `XL = 10 Ω`, `XC = 4 Ω` gives `Z = √(3² + 6²) = √45 ≈ 6.71 Ω`, not 17 Ω.

## Circuit laws the sheet assumes {#kvl}

Series resistances add. Two equal resistors in parallel are half of one: 12 Ω || 12 Ω = 6 Ω. `Rparallel = (R1 × R2) / (R1 + R2)`.

A divider: 480 V across 30 Ω in series with 10 Ω. Current is `480 / 40 = 12 A`. The 10 Ω resistor drops 120 V. The two drops add to the source (KVL). They do not split in proportion to the smaller resistor’s name.

Inductors combine like resistors. 20 mH in series with 20 mH is 40 mH. The same two in parallel are 10 mH.

## CT ratio {#ct-ratio}

Secondary amperes = primary amperes × (secondary rating / primary rating).

A 600:5 CT with 240 A primary: ratio 120, secondary `240 / 120 = 2.0 A`.

Polarity in the field: current into H1 leaves X1. One ground on the secondary circuit, where the drawings put it.

## Turns-ratio percent {#ttr-pct}

Percent accuracy on the official sheet is `(actual − specified) / specified × 100`. For a turns-ratio check, the calculated ratio is the specified value and the measured ratio is the actual value:

`% deviation = (measured − calculated) / calculated × 100`

Nameplate 13800 / 480 = 28.75. Measured 28.95.

`(28.95 − 28.75) / 28.75 × 100 = 0.70%`, which is outside the one-half percent ATS allows. The half-percent rule is in the transformer pages; the arithmetic is yours.

## Copper temperature correction {#copper}

Not on the official sheet. For copper windings:

`R2 = R1 × (234.5 + T2) / (234.5 + T1)`

with temperatures in °C. Aluminum uses 225 instead of 234.5.

0.420 Ω at 25 °C, corrected to 75 °C:

`0.420 × (234.5 + 75) / (234.5 + 25) = 0.420 × 309.5 / 259.5 = 0.501 Ω`.

Flip the fraction and you “correct” the wrong direction, to about 0.352 Ω. A hot winding reads higher resistance. Comparing a 25 °C reading with a 75 °C factory value without this step makes a healthy winding look low.

Insulation resistance moves the other way: hotter insulation reads lower megohms. That correction is a table multiplier, `Rc = Ra × K`, not the copper formula. See insulation.

## Per-unit fault current {#per-unit}

Percent impedance on a transformer nameplate is the percent of rated voltage that, applied to one winding with the other shorted, circulates rated current.

`Isc ≈ IFL / Zpu` when the source is stiff and you ignore cable. `Zpu = percent / 100`.

1500 kVA at 480 V:

`IFL = 1,500,000 / (√3 × 480) ≈ 1804 A`.

At 5.75% Z, `Zpu = 0.0575`, `Isc ≈ 1804 / 0.0575 ≈ 31.4 kA`.

Multiplying by 5.75 instead of dividing by 0.0575 is the usual miss (you land near 10 kA).

## A temperature rise is not a temperature {#delta-t}

Table 100.18 talks about a difference, ΔT. A difference in Celsius converts by 1.8, with no +32. A 10 °C rise is an 18 °F rise. Adding 32 turns a rise into a fake temperature (50 °F) and will make a mild connection look like a fire.

## Harmonics at the point of common coupling {#harmonics}

ATS section 6.6 is the harmonic study. The report compares calculated voltage and current distortion with IEEE 519 and calls out anything over those limits. It also wants the impedance-versus-frequency plot, so resonances are visible, and a check of transformer capability under the nonsinusoidal current using the method in IEEE C57.110.

IEEE 519-2022 clause 5 puts the voltage-distortion limits at the point of common coupling, not on each drive or each panel. The weekly short-time values use the table; the very-short-time daily values are allowed up to one and a half times those table values. A bus from just over 1 kV through 69 kV is the row whose total voltage distortion limit is 5 percent. Lower voltage buses are allowed more distortion. Higher voltage buses are allowed less. Do not paste the whole table into a report; use the row for the voltage at the point of common coupling.

## Wye capacitors, line to line {#caps}

Three equal capacitors in wye: a measurement from phase A to phase B sees two units in series. Series capacitance is half of one unit when they match. 100 µF cans read about 50 µF from A to B. Do not call the bank failed because the line-to-line reading is not the nameplate microfarads of one can.
