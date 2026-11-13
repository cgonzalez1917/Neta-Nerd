# Cable insulation and withstand {#ir}

Shielded medium- and high-voltage cable is ATS 7.3.3. Low-voltage cable, 1000 V and below, is 7.3.2. Low-voltage insulation resistance with no manufacturer data uses Table 100.1, and values under the table get investigated. Table 100.1 note 6 still warns you not to declare a cable energizable from that table alone.

Both ends of a shielded cable under test are isolated. The shield is the return. Discharge afterward, and stay clear while it comes down. A DC test on a long cable holds charge.

## VLF {#vlf}

Very low frequency withstand is the field AC test ATS points at for shielded cable. Table 100.6.3 (ATS-2025) is the acceptance table, sinusoidal, phase-to-ground, adapted from IEEE 400.2. Checked row: a 15 kV system, acceptance test voltage 21 kV rms. The notes: hold at least 30 minutes without failure; 60 minutes if the circuit is critical; if it fails and you repair it, the full test is repeated. For a cosine-rectangular waveform, multiply the rms table value by √2.

Maintenance is not that table. MTS-2023 Table 100.6.3, 15 kV system, maintenance voltage 16 kV rms phase-to-ground, same 30-minute note in that edition. Quoting 21 kV on a maintenance ticket, or 16 kV on a new-cable acceptance, is the ATS-versus-MTS miss.

Why 0.1 Hz: charging current is `2πfCV`. Dropping from 60 Hz to 0.1 Hz cuts that current by about 600, which is why a portable set can energize a long cable. The standard still cares that the voltage and the time are the ones in the table. A short, timid test can leave a weak spot in service.

ATS Table 100.6.1 note 2: after 5 years of service, DC testing is not recommended for those extruded dielectric cables. DC on aged XLPE is the test that can damage sound insulation. Do not “just hipot it DC because the truck has a DC set.”

## Tan delta {#tan-delta}

Table 100.6.6 defines the voltage steps for VLF tan delta. Uo is nominal rms phase-to-ground. The note’s example: a new 15 kV cable, `Uo = 15 / √3 = 8.7 kV`. An existing cable operating at 13.8 kV uses `13.8 / √3 ≈ 8.0 kV`, not the nameplate system voltage, when you are testing the cable as it is operated. Steps are 0.5 Uo, 1.0 Uo, and 1.5 Uo, with several readings at each step.

Table 100.6.7.1, PE-based insulations, values in units of 10⁻³, sinusoidal 0.1 Hz: standard deviation at a step is acceptable below 0.1, further study 0.1 to 0.5, action required above 0.5. Tip-up (1.5 Uo minus 0.5 Uo) acceptable below 5, action required above 80. Mean value at a step acceptable below 4, action required above 50. If any one criterion is in the worse column, the cable takes that worse grade.

EPR has its own table (100.6.7.2) and depends on the fill. Do not grade an EPR cable with the PE numbers.

## Common mistakes

- Using phase-to-phase voltage as Uo.
- Starting a withstand with a miserable megger reading and hoping the hipot “cleans it up.”
- Forgetting the shield ground, or leaving a surge arrester connected so the arrester becomes the test.
- Treating a tan-delta tip-up in “percent” when the table is in thousandths.

## TDR and accessories {#tdr}

A time-domain reflectometer sends a low-voltage pulse between conductor and shield and times the echoes. The reflection coefficient is (Zd - Zo)/(Zd + Zo): +1 for an open, -1 for a short. TDR finds length, joints, opens, and corroded neutrals, not insulation quality. There is a blind spot near the injection point that depends on pulse width. ATS 7.3.3.B.3 and D.3 want the graphical records to clearly identify the cable length and the characteristic signature of the cable, and each phase's trace to match the others. A passed withstand test does not replace that record. If you take the optional TDR, noisy plots that do not show a clear length or signature are not complete; rerun them or document why the optional test cannot be used. Thumping to locate a fault should use the least voltage and time that works. On separable connectors, the test point is a capacitively coupled voltage-sensing tap, and a parked elbow sits on an insulated parking bushing. NEC 315.10 uses 100% insulation level where ground faults clear within a minute and 133% where they clear within an hour.

## Withstand modes and figures of merit {#vlf-modes}

Sources: IEEE 400.2-2024 Clause 3, 5.2.4, 5.3.4 and 5.4.3.

- **Simple withstand (SW):** a set voltage for a set time. If the cable survives, it passes. On new cable it mainly finds gross workmanship defects, and it doesn't show how the insulation responds during the test.
- **Monitored withstand (MW):** the same withstand while tan delta, PD, or leakage is watched. Those readings join the pass/fail result.
- **Figures of merit, most to least sensitive:** tan delta stability over time at constant voltage, then tip-up (the change between voltage steps), then the mean value.
- **Units.** Tables list tan delta in 10⁻³. Multiply by 100 for percent: 0.1 × 10⁻³ = 0.01%.
- These figures are most useful compared with history for the same cable type, including its splices and terminations.

## Partial discharge on cable {#cable-pd}

Sources: IEEE 400.3-2022 Clause 3, 5.2.2.3, 7.3 and 8.4.3; ATS-2025 7.3.3.B.7 and B.8.

- **PDIV** is where repetitive discharge starts as the voltage rises. **PDEV** is where it stops as the voltage comes down. If PDEV is below the operating voltage, a discharge started by a transient can keep running at service voltage. An electrical tree can then grow to failure in minutes to weeks.
- **Noise.** On an offline test, anything seen before the voltage is raised is noise. Some noise also rises with voltage, so not every voltage-dependent signal is PD.
- **Calibration.** Inject a known pulse at the near end first to prove the setup, then at the far end where possible to judge sensitivity to distant PD. ATS wants the calibration recorded on offline tests and the noise floor recorded on online tests.
- **Units.** IEC 60270-calibrated systems report apparent charge in pC. Ultra-wideband systems report mV after a sensitivity check. The two aren't directly convertible.

## Shield and window-CT checks {#shield-tests}

Sources: ATS-2025 7.3.3; IEEE C57.13.3-2014 A.2; IEEE 242-2001 10.5.2.3.4.

- **Continuity.** Measure each shield end to end with an ohmmeter (ATS 7.3.3.B.2). See [VLF](#/study/cables.md/vlf) for the related ATS values.
- **Insulation resistance.** Test each conductor to its shield, with the other conductors grounded (B.1).
- **Window (zero-sequence) CTs.** When the shield is grounded at the CT end, the ground lead runs back through the CT window. Shield current then flows through the window twice in opposite directions and cancels, so the ground relay sees only true zero-sequence current. ATS 7.3.3.A.8 asks you to confirm this termination. Test the whole scheme by passing current through the window on a test conductor.
