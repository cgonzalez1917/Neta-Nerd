# Field methods {#methods}

These notes describe how a test is run and how a number is judged. They are not a sign-off. Manufacturer curves and the coordination study outrank a rule of thumb. A calculated time that is not on the published curve is a check, not a verdict, until you confirm it.

## Primary-injection windows {#trip-window}

Primary injection pushes current through the poles. It is the test that sees the sensors, the trip unit, and the mechanical trip. Secondary injection does not.

Read the trip unit before you shoot: frame, rating plug or sensor (In), long-time pickup (Ir), long-time delay, short-time pickup and delay, instantaneous, and ground pickup and delay if the unit has them. Write the as-found settings down. If you raise instantaneous or short-time so they do not steal a long-time shot, put those dials back before you leave and record as-left against the study.

Many electronic units define the long-time delay at a stated multiple of Ir, often 6×, and publish a tolerance around that point. A common published band is +0/−30 percent, which means the allowed time at that multiple runs from 0.7 times the dial to the dial itself. Use the band in that unit’s manual. Two catalogs do not share one percent.

Long-time pickup is often stated as a percent of Ir with its own tolerance (a frequent manual line is 110 percent of Ir, ±5 percent). Again, that sentence belongs to the manual in your hand. ANSI/NETA ATS-2025 7.6.1.2 tells you to use the manufacturer’s published tolerance, and Table 100.8 only when that data is absent.

If the long-time test current sits inside the short-time or instantaneous pickup, the faster element trips and the long-time timer never gets its say. Raise the faster pickups for the shot, or pick a current that stays under them. A single pole of a breaker with ground fault and a neutral sensor can look like a ground fault. On a four-pole residual scheme, either defeat that path the way the manual allows or run the current out through the neutral pole so the residual is about zero.

Turn long-time memory off for a string of shots if the manual says the memory would stack, then turn it back on. Zone-selective interlocking that is not jumpered lets short-time and ground trip on the fast, unrestrained time. Jumper restraint only for the timing test, and remove the jumper.

Pass and fail here mean “inside or outside the published window.” They are not a decision to energize.

## CT ratio, polarity, excitation {#ct-knee}

ATS-2025 7.10.1 calls for insulation resistance of each CT and its secondary wiring at 1000 V DC for one minute (unless solid-state parts cannot take it), a polarity test per IEEE C57.13.1, a ratio check by the voltage or current method in that same guide, an excitation test on CTs used for relaying, and a burden measurement at the shorting block.

Polarity agrees with the marks. Current into H1 leaves X1. One ground on the secondary, where the drawings show it. Never open a secondary that can be driven by primary current. Short the CT at the block before you lift the burden.

Ratio error is (measured − nameplate) / nameplate, in percent. A low-voltage injection does not prove a metering-class accuracy at full voltage and burden. Excitation is a plot of secondary voltage against exciting current. The knee is a defined point on that curve — IEEE 30°, IEEE 45°, or the 10-percent-voltage / 50-percent-current marker — and those markers are not the same voltage. If the run stops before the slope criterion is met, the set may report no knee. That is a statement about the test, not automatically a failed CT.

A DC resistance shot magnetizes the core. Finish with an excitation run that actually drives the CT into saturation so the core is left demagnetized. Do not walk away after resistance only.

On a bushing CT, short the transformer winding on the opposite side or the ratio is pulled off by the magnetizing path. A CT inside a delta needs the compensation the test set provides, or a short of only the matching phase.

## Power factor and tan delta {#pf-method}

Insulation power factor is watts divided by volt-amperes. Tan delta (dissipation factor) is the tangent of the loss angle. On good insulation the two numbers are close. Correct liquid-filled results to 20 °C before you compare them with ATS-2025 Table 100.3 or with the factory report. Manufacturer data wins. Distribution transformers are compared with previous results, not forced into the power-transformer cap. Natural-ester fluid is judged on its own row, and it often reads higher than mineral oil.

Ground the test set to the tank first and remove that ground last. Jump the terminals of a winding together so you test the winding, not a single bushing. Stay at or below the line-to-ground rating of a wye winding. Do not use the line-to-line number as if it were line-to-ground.

A grounded-specimen test (GST) energizes one winding with the other winding grounded, so the reading includes that winding to ground and the insulation between windings. An ungrounded-specimen test (UST) measures between the leads and leaves the ground path out, which is how you see the interwinding insulation alone. Subtracting the grounded-specimen-with-guard result from the overall GST should land near the UST result. If those two stories disagree, fix the leads before you condemn the transformer.

Excitation current, when you run it on the same set, is a phase-to-phase comparison at one voltage. A three-leg core usually shows two similar currents and one lower current. It is not temperature-corrected the way power factor is.

## Relay element checks {#relay-elements}

ATS-2025 7.9.2: settings and logic agree with the latest engineered file, and element operation is judged against the manufacturer’s tolerances, not a single NETA percent. Download the file, compare it with the study, then test.

A feeder relay check, in order: metering, instantaneous pickup and a timing shot, time-overcurrent pickup and timing at more than one multiple, ground elements, voltage elements, frequency if it is used, and every input that is actually in the scheme. Trip the breaker from the relay output when the outage allows it. A relay that asserts only inside the test set has not proved the wire.

On a test switch, open the trip poles first, then the current poles, so the shorting blade shorts the CT before the circuit opens. Restore current poles, and close the trip poles last. Never open a loaded CT secondary.

## Motor branch steps {#motor-size}

Article 430 is a sequence, not one table. For a single motor the useful order is: table full-load current for the wires, the disconnect, and the branch short-circuit device; nameplate current for the overload. NEC 430.6(A) is the split. Sizing wire from the nameplate often comes out small because the nameplate is below the table.

Branch conductors are 125 percent of the table current (430.22). The overload is 125 percent or 115 percent of the nameplate, depending on the service factor and temperature rise (430.32). The branch breaker or fuse starts from Table 430.52(C)(1), and the next standard size up is allowed. The disconnect is 115 percent of the table current and in sight, which Article 100 treats as visible and not more than 50 ft. A feeder that supplies more than one motor does not get that “next size up” on the way 430.62 is written. Hermetic air-conditioning is Article 440. Do not pull a feeder number from this paragraph alone.

## SF6 handling {#sf6}

Sulfur hexafluoride is the insulating gas in much GIS and many breakers. EPA’s overview of SF6 emissions in electric power systems calls it a potent greenhouse gas: on a 100-year basis it is on the order of twenty thousand times CO2, and it stays in the atmosphere for thousands of years. Arcing in the gas makes decomposition products, including hydrogen fluoride. Do not vent a compartment to the room or the sky. Recover the gas, keep the cycle closed, and let trained people do the filling and the recovery. Pure gas is one thing; arced gas is another. Smell, residue, and a gas-quality reading are reasons to stop and use the handling procedure, not to crack a valve.

ATS Table 100.13 is the field screen for pure SF6 (moisture, SO2, purity). The manufacturer’s limits still govern, and mixtures are not that table.

## Dissolved gas {#dga}

ATS 7.2.2.B.15 takes the oil sample by ASTM D923 and the dissolved-gas test by IEEE C57.104 or ASTM D3612. ATS 7.2.2.D.15 says to evaluate that result in accordance with IEEE C57.104.

In IEEE C57.104-2019 clause 6.2.1, hydrogen comes mainly from corona-type partial discharge and from stray gassing. Methane, ethane, and ethylene come from heating of oil or paper. Acetylene comes from arcing at very high temperature. Carbon monoxide and carbon dioxide come from heating of cellulose or of the liquid. Clause 6.2.3’s Duval triangle uses methane, ethylene, and acetylene, not hydrogen. Clause 5.1.4.1: a sample opened to air tends to lose hydrogen. Clause 6 says a rising rate is more informative than one concentration, and a single pair of samples is a weak way to judge that rate.

## Micro-ohmmeter {#microohm}

A four-wire instrument, Kelvin style, drives current on one pair and senses voltage on the other, so lead resistance drops out. Clip the current leads outside the potential leads. A stable current and a recorded temperature beat a two-wire multimeter on a bus joint. Compare similar joints. When the manufacturer is silent, ATS still uses the 50-percent-of-the-lowest screen.

On a high-voltage circuit breaker, IEEE C37.09-2018 5.14 takes the dc resistance of the primary path, terminal to terminal of each pole in the closed position, with a dc test current of 100 A or more. The result must stay within the limit the manufacturer set for that rating.

## What the sheet is for {#records}

A megger sheet records test voltage, temperature, humidity, what was grounded, and the megohms, then the corrected value. Compare with the manufacturer or, if there is none, the ATS table for that equipment after the temperature correction. A ductor sheet records the current and the microhms of similar joints. Investigate a connection more than 50 percent above the lowest similar one when the manufacturer is silent.

A settings record is as-found versus the study, then as-left. It is not a pass stamp and it does not include a guess at a dial you could not read.
