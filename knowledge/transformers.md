# Turns ratio {#ttr}

ATS 7.2.2.B.3: turns-ratio tests at all tap positions on a liquid-filled transformer, not only the as-found tap. 7.2.2.D.3: results shall not deviate by more than one-half percent from either the adjacent coils or the calculated ratio.

Calculated ratio for a 13800 / 480 nameplate is 28.75, line to line. Percent deviation is on the math page. 0.70% is a fail of this screen even if the set “looks close.”

Check the test-set self-test and the lead marks before you condemn a winding. A reversed lead looks like a ratio with the polarity flipped.

Polarity matters when transformers will be paralleled and when CTs or VTs land in a scheme. A polarity error between paralleled units is a short circuit, not a paperwork issue.

## Excitation {#excitation}

ATS 7.2.2.D.6: on a three-legged core the usual pattern is two similar currents and one lower current. Expect the pattern that matches that core, not three identical numbers. The center phase often reads lower because its magnetic path is shorter.

A shorted turn drives excitation current up hard on the affected phase. Ratio and winding resistance can still sit inside their screens when the short involves very little copper. Excitation is the sensitive test. Compare phases and compare with the last test at the same voltage and tap.

## Power factor {#power-factor}

Insulation power factor is watts over volt-amperes, the cosine of the angle between voltage and current in the insulation. For the small angles you see on good insulation it is nearly the same number as dissipation factor (tan δ).

Correct liquid-filled results to 20 °C before you compare them (ATS 7.2.2.D.4). Use top-oil temperature for the correction the test-set manual specifies, and do not compare a raw July number with a raw January number.

ATS-2025 Table 100.3, in the absence of consensus standards, recommended maximum at 20 °C: mineral oil, power transformers, regulators, and reactors, 0.5%. Natural ester fluid in that same row, 1.0%. Distribution-transformer power factor is compared with previous results, not with that 0.5% cap.

MTS-2023 Table 100.3 is a maintenance table and it is not the same. Oil maximum for power transformers there is 1.0%. Distribution transformers and apparatus, oil, 2.0%. Other fluids have their own columns. Do not paste an acceptance limit into a maintenance report or the reverse.

Worked: 10 kV test, 1.50 mA, 0.075 W. `VA = 10000 × 0.0015 = 15`. `PF = 0.075 / 15 = 0.005 = 0.50%`.

Bushings, ATS 7.2.2.D.5: investigate power factor more than 50 percent off the nameplate, capacitance more than 5 percent off the nameplate, and hot-collar watts above 0.1 W.

CHL is the insulation between the high-voltage and low-voltage windings. CH and CL are each winding to ground. An overall number hides a bad bushing; test the specimens the set is built to separate.

## Oil {#oil}

ATS 7.2.2.D.14 points insulating-liquid results at Table 100.4. Table 100.4.1, new mineral oil received in new equipment, cites IEEE C57.106. For 69 kV and below, individual limits you can be asked for: dielectric breakdown, D1816, 1 mm gap, 25 kV minimum; 2 mm gap, 45 kV minimum; water, D1533, 20 ppm maximum; power factor at 25 °C, D924, 0.05% maximum; neutralization number, D974, 0.03 mg KOH/g maximum. Higher voltage classes in that table are tighter on water and on D1816. Do not memorize a neighboring column by accident.

Dissolved-gas analysis is evaluated with IEEE C57.104 (7.2.2.D.15), not with a single “bad ppm” invented in the field. Acetylene is the gas associated with arcing; hydrogen with partial discharge; carbon oxides with cellulose. Sample into a sealed syringe or bottle so the gases stay in the oil.

## Core ground {#core}

ATS 7.2.2.D.11: core insulation resistance should be comparable to the factory value but not less than 500 MΩ at 500 V DC.

The intentional core ground is supposed to be a single point. If you megger the strap without lifting that bond, a healthy core reads about zero and you have proved nothing. Lift the designed ground, test core to tank, and put the ground back. A second unintentional ground is a circulating-current heater. DGA and excitation are how that fault often announces itself before the megger.

## Leakage reactance

ATS 7.2.2.D.10: investigate a three-phase equivalent leakage-reactance result more than 3% off the nameplate. Per-phase results should stay within 3% of the average of the three. This is a mechanical-movement clue (winding shift), not a ratio test.
