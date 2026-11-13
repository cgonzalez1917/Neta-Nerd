# Low-resistance ohms {#dlro}

A DLRO (digital low-resistance ohmmeter) measures milliohms and microhms. Four terminals — Kelvin — split the job: one pair drives current, the other pair reads voltage inside the current leads, so lead resistance and most of the clip contact drop out of the answer. Two-wire ohms on a breaker pole is a measurement of the leads.

Use a stable current, write the current down, and do not unclip an inductive winding until the test set has ramped the current off. The collapse will bite.

## The 50 percent rule {#fifty-percent}

ATS repeats this for bolted connections and for many breaker poles. Wording from 7.4.D.1, and the same idea at 7.6.1.2.D.2 and 7.2.2.D.1:

Compare with similar connections. Investigate a value that deviates from the similar set by more than 50 percent of the lowest value.

That is 1.5 times the lowest reading, not 50 percent of the highest, and not a universal 100 µΩ ceiling. Manufacturer limits win when you have them.

Worked: poles at 40, 48, and 70 µΩ. Threshold = 40 × 1.5 = 60 µΩ. Investigate 70. Leave 48 alone under this screen.

Same screen on a medium-voltage air breaker when the manufacturer publishes no microhm limit (ATS 7.6.1.3.D.2). Poles at 28, 30, and 43 µΩ: half of 28 is 14, so the investigate threshold is 42 µΩ. Investigate 43. Leave 30 alone under this screen.

Millivolt drop is the same fact at a known current. `V = IR`. 200 A through 150 µΩ is 0.030 V, 30 mV.

## Winding resistance {#winding}

Liquid-filled transformers, ATS 7.2.2.D.8: temperature-corrected winding resistance shall compare within two percent of a previous test or of the adjacent phases.

Wait until the number stops drifting. Inductance, especially on a large delta, makes the first seconds lie. Record the tap, the winding temperature (not just the air), and the current. Correct copper with 234.5 and aluminum with 225 before you declare a phase high. See the math page.

Demagnetize when the test set offers it. Residual flux from a DC winding-resistance test is a classic cause of a brutal inrush on energization.

A single shorted turn may barely move DC resistance and still shout on excitation current and sometimes on TTR. Resistance is the better test for a loose joint, a broken strand, or a tap-changer contact.

## Busway insulation, because it is a resistance minimum {#busway}

ATS 7.4.D.2.a, low-voltage metal-enclosed busway, no manufacturer data: correct the reading to a nominal 100-foot run.

`Minimum megohms = 100 / length in feet`

A 200-foot run is 0.5 MΩ. A 50-foot run is 2 MΩ. Shorter bus should read higher. Do not apply the withstand until the insulation is above that floor (same paragraph).

Medium-voltage busway falls back to Table 100.1 when the manufacturer is silent (7.4.D.2.b). Connection resistance on the bus still uses the 50 percent screen (7.4.D.4) if there is no manufacturer band.
