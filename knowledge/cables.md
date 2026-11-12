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
