# Ratio and polarity {#ratio}

Current transformers, ATS 7.10.1. Voltage transformers, ATS 7.10.2. Insulation resistance of instrument transformers is held to Table 100.5, not to a guess.

Polarity results shall agree with the marks (7.10.1.D.2 and 7.10.2.D.2). H1 and X1 are the pair: current into H1 leaves X1.

CT ratio error, 7.10.1.D.3, is “in accordance with IEEE C57.13.” ATS does not restate a single percent there. Do not invent one.

VT ratio, 7.10.2.D.3, citing IEEE C57.13, is explicit:

- Revenue metering: ratio error within ±0.1 percent, and phase angle within ±0.9 mrad (three minutes).
- Other applications: ratio error within +1.2 percent as that sentence is written, and phase angle within ±17.5 mrad (one degree).

A low-voltage TTR (tens of volts) does not fully excite a 15 kV VT core. The Ritz technical bulletin on field VT ratio testing, which is a manufacturer note and not a NETA table, suggests treating about ±3% against the marked turns as the field screen for that low-voltage method, and sending true accuracy (burden, phase angle, 90/100/110% voltage) to a lab. Do not confuse that bulletin with the ±0.1% revenue limit above. They answer different questions.

Ratio verification is not an accuracy class test. For bushing CTs on a power transformer, secondary voltage injection is the practical field method: keep the voltage below the knee (a working band often quoted is about half to three-quarters of the knee), offset the frequency slightly from 60 Hz so station voltage does not add, and short the opposite winding so magnetizing impedance does not dominate. Open-circuit setups have been reported to miss by several percent. Short every CT secondary you are not testing. CTs inside a delta need the 1/3 or 2/3 compensation, or a short of only the matching low-voltage phase. That procedure is field practice from instrument-transformer work, not a sentence in ATS 7.10.1.

## Excitation {#excitation}

CT excitation (saturation) is compared with the manufacturer curve or IEEE C57.13.1 (ATS 7.10.1.D.4). You are looking for the knee, not for a turns ratio. A CT that saturates early under a fault delivers less secondary current than the relay was set for, so an overcurrent relay can be slow or blind, and a differential scheme can false-trip if the two CTs saturate differently on a through-fault. That is why percentage restraint exists.

Measure burden and compare it with the CT rating (7.10.1.D.5). Extra cable and extra devices push the CT toward the knee.



Knee point and saturation voltage are not the same number (IEEE C37.110-2023, Clause 3 and 4.3). Saturation voltage is read on a log-log excitation plot where the two straight stretches of the curve meet. The knee the guide uses, unless it says otherwise, is definition A: the 45-degree tangent on a square-decade plot. Definition B is the 10-percent voltage / 50-percent current marker. Those two knees are not interchangeable. On a square log-log plot, definition B sits higher, about 20% to 25% above definition A, and corresponds to a shallower tangent of about 13 degrees. Always confirm which definition a manufacturer or a setting sheet is using.

C-class and T-class are not interchangeable when you try to compute ratio error from an excitation curve (4.4). Leakage flux is small enough on a C-class unit that the excitation characteristic can be used for that calculation. A T-class unit has enough leakage that IEEE C57.13 wants overcurrent ratio curves, and the ratio error has to come from a test, not from the excitation plot alone.

Remanence shortens the time a CT stays unsaturated when the leftover flux has the same polarity as the fault transient (4.6.1 and Annex C). In the guide's C800, 1200:5 example on a 24 kA fully offset fault, time-to-saturation falls from 25 ms with a clean core, to 8.3 ms at 50% remanence, to 5 ms at 75% remanence, all at the same burden. Service measurements have found remanence approaching 80% of saturation flux. Opposite-polarity remanence can actually help. A small air gap can cut remanence to almost nothing without changing the relaying accuracy class (4.6.2). Large-gap, sometimes called linearized, cores have little or no remanence. Cold-rolled grain-oriented silicon steel, by contrast, can hold remanence up to that 80% figure.

## One ground {#ground}

ATS 7.10.1.B.9 and D.9, and the VT companion: the secondary circuit is grounded at one point, where the engineer showed it, consistent with IEEE C57.13.3. Two grounds circulate current and can move a differential off balance. Zero grounds let the secondary float.

Dielectric withstand, when the optional or required test applies, uses Table 100.9. A 15 kV, 95 kV or 110 kV BIL instrument transformer has a field AC withstand of 25.5 kV in that table. Do not apply the factory BIL.

## Common mistakes

- Calling a 0.3% metering class “failed” because a handheld TTR at 8 V missed by 1%.
- Leaving a second ground on a long CT run because both ends “should be safe.”
- Opening a CT secondary to “see if it’s dead.”

## CT field tests, what each one proves {#ct-field}

ATS 7.10.1.B points to IEEE C57.13.1-2017 for the methods.

- **Ratio** (C57.13.1 6.1). Proves the installed ratio and taps are what was specified and wired to the right terminals. It is not an accuracy-class test.
- **Polarity** (6.2, clause 9). Proves secondary current flows the predicted direction. It matters most where currents are summed or compared: differential, directional, and residual ground. Methods include a dc kick, ac with an oscilloscope, ac current comparison, and phase angle.
- **Excitation** (6.5, clause 12). Confirms the accuracy class and finds shorted turns by comparison with the manufacturer's curve. It's run by applying voltage to the secondary with the primary open, because driving the primary would put high voltage on the open secondary and need a very large current (12.3).
- **Winding resistance** (6.4). Finds high-resistance joints in the CT or its leads.
- **Burden** (6.7, ATS B.5). Measured at the CT shorting block. Compare with the CT rating (ATS D.5).
- **One ground** (ATS B.9). Prove it by removing the intended ground and checking insulation to ground at that point (C57.13.1 Annex A.1).

Demagnetize after any dc test, including a dc polarity kick or an ohmmeter check through a test switch. The voltage method drives the core into saturation with ac on the secondary and ramps the voltage smoothly to zero (5.1).

Burden and the knee: a C-class rating is the secondary voltage the CT delivers to a standard burden at 20 times rated current within 10% error (IEEE C57.13-2016 6.4.1.3). A C100 CT with 1.5 Ω of total loop burden would need 100 A × 1.5 Ω = 150 V at 20 times rated, which is past its rating, so expect saturation on a big fault.

## CT hazards {#ct-hazards}

- **Open secondary.** IEEE C57.13-2016 6.7.1: never operate a CT with the secondary open, because hazardous peak voltages can develop. Conforming CTs only have to survive one minute open-circuited, and only where the open-circuit voltage stays at or below 3500 V peak. Above that, the user should consider a varistor or spark gap. Short at the shorting block before lifting a wire.
- **Lifting the ground while the primary is energized.** C57.13.1 Annex A.1: dangerous voltage can appear on the secondary through electrostatic coupling even with no primary current.
- **Breaking a dc polarity circuit.** C57.13.1 9.1: interrupting the battery can kick a dangerous voltage. Put a resistor near the winding's dc resistance across it first, or make and break with a hot stick or rubber gloves.
- **Tapped windings.** Voltage on one tap section appears, scaled up, across the full winding (12.1). Don't hold voltage above the knee longer than the readings need.
- **Demagnetizing.** The terminal voltage can approach the secondary limit while you do it (5.1).


Relaying application, IEEE C37.110-2023, starts from the fact that a CT sized only for symmetrical current can still saturate on a fully offset fault. At maximum offset, core flux can rise to as much as 1 + X/R times the steady ac flux, using the primary-system reactance and resistance seen by the CT (4.5.1). Avoiding ac saturation needs a saturation voltage Vx greater than Is times Zs. Avoiding saturation with a fully offset dc component is harder: Vx has to exceed Is times Zs times (1 + X/R) (4.5.2.3). That second demand is often impractical, so the protection plan may have to live with a short time-to-saturation window. The flux does not jump instantly; some high-speed instantaneous (50) elements can still operate in that window, before the core is saturated.

Burden magnitude and burden power factor both move time-to-saturation (4.5.3). A larger total secondary burden, at the same power factor, shortens it. For two impedances of equal size, the more inductive one (lower power factor) lengthens it, because that inductance looks like a small impedance to the dc offset and cuts the burden voltage the core has to support as flux.

Direct current forced through the winding, including a battery ratio or polarity shot that is not followed by a demagnetizing run, leaves remanence, and remanence barely fades in normal service (4.6). Reducing it to less than 10% of saturation flux density takes a voltage of about 60% of the knee-point. IEEE C57.13.1 is the demagnetizing practice the guide points to.

The accuracy-class voltage (C400, C800, and so on) is a convenient way to state steady-state capability. It is not a recommended operating point for close-in faults (Clause 5 introduction and 4.5.2). Performance still has to be checked for the actual current, burden, offset, and remanence.

An auxiliary CT reflects its secondary burden to the main CT by the square of the auxiliary ratio (5.1 and 5.7). A 1.0 ohm burden looks like 0.25 ohm through a 2:1 step-down, and like 4.0 ohms through a 1:2 step-up. Stepping current up that way is poor practice when it can be avoided, and the auxiliary CT still needs its own knee checked against its own burden.

Two identical CTs in series can split the burden, double the voltage capability, and halve the impedance each CT sees (5.5). They must be identical and should sit next to each other, for example both on the same bushing, so a fault cannot occur between them. A fault between the two drives their secondaries in opposite directions and can overvoltage both windings. For new work, one adequately rated CT, or a lower burden, is preferred over a series pair.
