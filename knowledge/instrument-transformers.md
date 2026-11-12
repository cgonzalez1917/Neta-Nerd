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

## One ground {#ground}

ATS 7.10.1.B.9 and D.9, and the VT companion: the secondary circuit is grounded at one point, where the engineer showed it, consistent with IEEE C57.13.3. Two grounds circulate current and can move a differential off balance. Zero grounds let the secondary float.

Dielectric withstand, when the optional or required test applies, uses Table 100.9. A 15 kV, 95 kV or 110 kV BIL instrument transformer has a field AC withstand of 25.5 kV in that table. Do not apply the factory BIL.

## Common mistakes

- Calling a 0.3% metering class “failed” because a handheld TTR at 8 V missed by 1%.
- Leaving a second ground on a long CT run because both ends “should be safe.”
- Opening a CT secondary to “see if it’s dead.”
