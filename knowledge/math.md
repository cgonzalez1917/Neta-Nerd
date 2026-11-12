# Math you do not get for free {#not-on-sheet}

The TestGuy study guide (wiki.testguy.net/t/217) describes the NETA formula sheet supplied at the exam, vintage about 2017. Treat that list as study-guide information, not as a page you will see reproduced here.

On the sheet, as that guide describes it: `V = IR`, `P = IV`, percent accuracy, peak and rms, `VLL = √3 VLN`, `V = IZ`, `XL = 2πfL`, `XC = 1/(2πfC)`, `Z = √(R² + (XL − XC)²)`, `P = VI cos θ = I²R`, `PF = R/Z = W/VA`, three-phase `VA = √3 VI`, `kW = kVA × PF`, delta/wye relations, `1 hp = 746 W`, torque, length-corrected resistance, capacitor kvar, resonance, synchronous speed, and watthour-meter Kh.

Not on that sheet, so they have to be memory or table lookup: sine and cosine of ordinary angles, “ELI the ICE man,” micro-to-unit conversion, the parallel-resistor recipe, copper’s 234.5 constant, insulation multipliers, PI and DAR time points, turns-ratio percent error, and kvar once you only know kW and kVA.

The on-screen calculator is a TI-30XS. If it is in radians, `cos(60)` is not one half. Switch to degrees before an angle problem.

## Power {#power}

Balanced three-phase:

`S (VA) = √3 × VLL × IL`

`P (W) = S × PF`

`kvar = √(kVA² − kW²)` when you were not given the angle. That square root is the piece the sheet does not spell out. If you were given θ, `kvar = kW × tan θ`, and tan is also not printed for you.

Worked: 200 kW at 0.80 PF. `kVA = 200 / 0.80 = 250`. `kvar = √(250² − 200²) = √22500 = 150`.

Worked: 480 V, 100 A, unity PF. `P = 1.732 × 480 × 100 = 83.1 kW`. Drop the √3 and you report the single-phase product, 48 kW.

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

`% deviation = (measured − calculated) / calculated × 100`

Nameplate 13800 / 480 = 28.75. Measured 28.95.

`(28.95 − 28.75) / 28.75 × 100 = 0.70%`, which is outside the one-half percent ATS allows. The half-percent rule is in the transformer pages; the arithmetic is yours.

## Copper temperature correction {#copper}

Not on the formula sheet. For copper windings:

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
