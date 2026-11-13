# Device numbers {#numbers}

*Levels: II, III, IV*

IEEE device numbers are the short language of a one-line. Learn these until they are boring:

- 21 distance
- 25 synchronism check
- 27 undervoltage
- 32 directional power
- 40 loss of field
- 46 negative-sequence / current unbalance
- 47 phase-sequence voltage
- 49 thermal
- 50 instantaneous overcurrent
- 51 time overcurrent
- 52 circuit breaker
- 59 overvoltage
- 63 sudden pressure
- 64 ground detector
- 67 directional overcurrent
- 79 reclosing
- 81 frequency
- 86 lockout
- 87 differential

50 is no intentional time delay. 51 is the inverse-time element. 87 compares currents into and out of a zone. 86 is a lockout that stays tripped until a person resets it. 52 is the breaker, not the relay.

Generator applications of 32, 40, 24, 64, and 67, including loss-of-field and motoring practice, are in [generator protection](#/study/relays.md/generator).

## Generator protection {#generator}

*Levels: IV*

Sources: Blackburn and Domin, Protective Relaying, 4th ed., Chapters 8.9 through 8.12; IEEE C37.2-2022, 3.1.32 and 3.1.40. These are application notes, not a substitute for the machine's setting study or IEEE C37.102.

- **Loss of field (40).** Normal generation sits slightly lagging, in the first quadrant of the P-Q plane. When the field breaker opens, or excitation is lost, operation moves into the fourth quadrant and the system has to supply the missing vars (8.11.1). If the system can feed those vars without a steep voltage decline, the unit may keep running as an induction generator; otherwise it can fall out of step. The change is not instantaneous, so an early alarm may let an operator restore the field.

  Complete-loss setting (mode 1): a smaller circle in the fourth quadrant, diameter on the order of the synchronous reactance Xd, with the top of the circle 50% to 75% of the transient reactance Xd' below the origin. A trip in about 0.2 to 0.3 s is typical when the unit is to be shut down.

  Partial-plus-complete setting (mode 2): a wider circle, preferably inside the minimum-excitation limiter and outside the capability and steady-state stability curves. A directional unit is required so nearby faults and stable swings do not operate it; the 40 then operates below the directional line and inside the circle. Where used, an undervoltage element that drops out in the 87% to 80% band of rated voltage supervises the scheme. If voltage stays healthy, alarm and a delayed trip, typically 10 s to 1 min, give the operator time to restore field. If voltage falls below that dropout, trip in about 0.2 to 0.3 s. Large, important units often run both the small and the wide 40 settings.

- **Motoring (32).** If the prime mover is removed while the generator stays online with the field excited, the system motors the unit at synchronous speed. That overheats steam turbines and can cavitate hydro runners. Typical reverse-power values to keep the machine spinning with no prime-mover input: condensing steam about 1% to 3% of nameplate kW, noncondensing steam 3% or more, hydro 0.2% to 2% or more, diesel about 25%, and gas turbine 50% or more (8.12.1). A backup 32 is recommended even though the machine control has its own detection. Microprocessor relays can be as sensitive as 1 mA, with an operating time of about 2 s. IEEE C37.2 uses this reverse-power, loss-of-prime-mover case as the example for device 32. Device 40 is the field over/under-excitation relay, not the motoring function.

- **Volts per hertz (24).** Machines and transformers already run close to the saturation knee, so a modest overvoltage produces large exciting current. A dangerous window is while the unit is off the system and speed is changing, because voltage tracks frequency and flux. Pickup should stay constant on a V/Hz basis; a plain 59 does not do that during start or shutdown (8.12.2). A typical two-level supplement to the machine controls is about 110% of rated to alarm and then trip in about 1 min, and about 120% of rated to trip in about 6 s, preferably from a separate VT so a blown metering-VT fuse cannot operate the 24.

- **Inadvertent energization.** Closing the generator breaker into a live bus while the machine is on the turning gear, while it is coasting, at standstill, or after a bad synchronize can find ordinary stator protection impaired or unavailable at low frequency (8.12.3 and 8.10). Because the unit breaker itself may be the problem, adjacent breakers need to be opened at once by local breaker-failure or remote trip. Blackburn describes a 67 directional inverse-time overcurrent element in each phase, looking into the generator, typically picked up at about 0.5 pu and operating in about 0.25 s at 2.0 pu. That application can also stand in for motoring protection and is faster on these events.

- **Field ground (64).** On brushed units a voltage-divider 64 can be added if the exciter equipment does not already provide one. Brushless machines typically drop pilot brushes now and then to measure field insulation, and watch the exciter field continuously (8.9). These checks usually alarm so the operator can decide what to do, but they may be wired to trip when the owner prefers that.

## Generator setting math {#gen-math}

*Levels: IV*

Sources: IEEE C37.102-2023, 4.3.3.2.2, 4.5.2.4, 4.5.3, 4.5.5, 4.5.6.3, 4.6.2.3, and 5.4; ANSI/NETA ETT-2026, 8.4.3.E and 8.4.3.J. The machine data below are a worked example, not settings for a real unit.

**Example machine.** 120 MVA, 13.8 kV, Xd = 1.80 pu, Xd' = 0.25 pu. CTs 6000:5 (ratio 1200). VTs 14,400:120 (ratio 120).

**Ohms on the relay side.**

1. Base impedance: `Zb = kV^2 / MVA = 13.8^2 / 120 ≈ 1.587 ohms` primary.
2. Relay ohms = primary ohms x CTR / VTR = 1.587 x 1200 / 120 ≈ 15.87 ohms for 1.0 pu.
3. So Xd is about 1.80 x 15.87 ≈ 28.6 ohms and Xd'/2 is about 0.125 x 15.87 ≈ 1.98 ohms.

A frequent slip is inverting the ratio (VTR / CTR), which shrinks every value by a factor of 100.

**Loss of field (40), two-zone mho, offset Xd'/2.**

- Zone 1: diameter 1.0 pu (about 15.9 ohms), offset about 1.98 ohms, short delay.
- Zone 2: diameter Xd (about 28.6 ohms), same offset, delay near half a second.
- The far edge of the zone 2 circle sits at offset plus diameter: 1.98 + 28.6 ≈ 30.5 ohms.

**Second scheme with a directional unit.** With a 0.20 pu system reactance Xs (3.17 ohms on the relay base), the outer reach is `1.1 x Xd + Xs = 31.4 + 3.17 ≈ 34.6 ohms` and its offset is Xs.

**Reverse power (32).** A 1.0 MW reverse-power setting on this machine is `1,000,000 / (1200 x 120) ≈ 6.94 W` three-phase secondary. Divide per phase only if the relay asks for it. For a 2 MW diesel on 150:5 and 4200:120, 10% is 200 kW, which is `200,000 / (30 x 35) ≈ 190 W` secondary, with a delay of about 6 to 10 s.

**Volts per hertz (24).** Per-unit V/Hz is per-unit voltage divided by per-unit frequency.

- Rated voltage at 54 Hz: `1.0 / 0.90 ≈ 1.11 pu`.
- 14.49 kV at 58 Hz: `1.05 / 0.967 ≈ 1.086 pu`.
- On the relay side, the VT base for 13.8 kV is 13,800 / 120 = 115 V, not 120 V. A 126 V reading at 57 Hz is `(126 / 115) / 0.95 ≈ 1.15 pu`.

**Inadvertent energization.** Rated current is `120,000 / (1.732 x 13.8) ≈ 5020 A`. If the weakest close-in event drives 1.2 pu, a pickup at half of that is about 3012 A primary, or about 2.5 A secondary. Backfeed from an auxiliary transformer can be only about 0.1 pu, roughly 0.42 A secondary here, which is why a separate low setting or other logic is used for that case.

**Negative sequence (46).** The heating limit is `I2^2 x t = K`. With K = 10 and I2 = 0.5 pu, `t = 10 / 0.25 = 40 s`. For a 400 MVA directly cooled rotor the continuous I2 limit is `8 - (400 - 350) / 300 ≈ 7.83%`.

**Voltage-restrained overcurrent (51V).** If the restrained element runs down to 25% of its pickup at zero volts, a 6.0 A setting becomes 1.5 A during a close-in fault.

**Stator ground (59G).** A terminal ground fault puts full line-to-neutral voltage, 13,800 / 1.732 ≈ 7967 V, on the grounding transformer. Through 14,400:240 (60:1) the relay sees about 133 V. A 5 V pickup reaches to `5 / 133 ≈ 3.8%` of the winding from the neutral, covering roughly 96%.

## What ATS tells you to test {#testing}

*Levels: II, III, IV*

Electromechanical and solid-state relays are ATS 7.9.1. Microprocessor relays are 7.9.2. Read the section that matches the relay. Do not hipot a numeric relay because the electromechanical section told you to megger a case.

7.9.1 electrical tests are element by element. Examples you can be asked to list, not to invent:

- 50: determine pickup.
- 51: minimum pickup, and time delay at two points on the curve.
- 67: directional-unit pickup at maximum torque angle, the closing zone, the torque angle, the overcurrent unit.
- 87: operating-unit pickup, each restraint unit, slope, harmonic restraint, instantaneous pickup, and the restraint characteristic.

The section tells you to determine harmonic restraint. It does not, in that paragraph, name the second harmonic. In transformer differential practice the second harmonic is the inrush restraint and the fifth is associated with overexcitation. Confirm both in the relay manual before you argue with a setting.

Functional tests in 7.9.1: each contact has to do its job in the scheme, including breaker trip, close inhibit, 86 lockout, and alarms. A relay that picks up in a test set and never moves the trip wire has not been commissioned.

Microprocessor relays do not drift the way a dirty induction disk does. You still prove inputs, outputs, the trip path, and that the as-left file is the file the study asked for. Download events before you wipe them.

Settings that do not match the coordination study get written down as found. As-left is the engineered file unless the owner directs otherwise. You do not invent a time dial to make a test pretty.

ATS 7.9.2 also wants the internal scheme logic walked against the owner's narrative or logic diagram, and the settings and the logic to match the latest engineered files (7.9.2.B.3 and C.3). Pickup and timing in isolation do not prove the scheme.

When a machine is brought up through reduced frequency, review whether the whole protection package still works once frequency is up to about one-quarter to one-half of rated, and above (Blackburn and Domin, Protective Relaying, 4th ed., 8.10). Some steam units spend hours in that band. If a relay or an instrument transformer cannot perform there, add temporary supplemental protection until the unit is at rated speed and voltage.

## Inverse-time curve math {#curve-math}

*Levels: IV*

Sources: IEEE C37.112-2018, 3.2 Equations (1) to (3), 3.3, 3.4, Table 1, and Annex A.2 and A.3; IEC 60255-151:2009, 3.10 and 4.4.1.3; ANSI/NETA ETT-2026, 8.4.2.B and 8.4.2.H.4. Work every number yourself; a test set or relay manual may use a different time-dial convention.

**The operate equation.** For a constant current, the IEEE family of curves gives

`t = A / (M^p - 1) + B`

where M is the multiple of pickup (current seen by the relay divided by its pickup, both on the same side of the CT). The constants for the three standard IEEE shapes are:

- Moderately inverse (MI): `A = 0.0515`, `B = 0.1140`, `p = 0.02`, reset constant `tr = 4.85`.
- Very inverse (VI): `A = 19.61`, `B = 0.491`, `p = 2`, `tr = 21.6`.
- Extremely inverse (EI): `A = 28.2`, `B = 0.1217`, `p = 2`, `tr = 29.1`.

**The time dial.** C37.112 does not fix a time-dial scale. In this bank, a "time-dial factor" multiplies A, B, and tr together, so a factor of 0.5 halves the whole curve. Scale both terms, not just A.

**Worked example, VI at M = 5, factor 1.0.**

1. `M^2 - 1 = 25 - 1 = 24`.
2. `A / 24 = 19.61 / 24 ≈ 0.817 s`.
3. Add B: `0.817 + 0.491 ≈ 1.31 s`.

**Worked example, MI at M = 10.** The exponent is 0.02, not 2. `10^0.02 ≈ 1.0471`, so the bottom is about 0.0471 and `0.0515 / 0.0471 ≈ 1.093 s`. Add B and t is about 1.21 s. If you key p as 2 you get roughly 0.11 s, which is far too fast.

**Getting M from a fault study.** Convert the pickup to primary amps first. A 5.0 A pickup on 600:5 CTs (ratio 120) is 600 A primary, so a 4800 A fault is M = 8. Then VI gives `19.61 / 63 + 0.491 ≈ 0.80 s`.

**Solving for the dial.** If you need 0.60 s from an EI curve at M = 6, find the factor-1.0 time first: `28.2 / 35 + 0.1217 ≈ 0.927 s`. Then the factor is `0.60 / 0.927 ≈ 0.65`.

**Reset.** For an electromechanical-style reset, `t_reset = tr / (M^2 - 1)` with M below 1. This is a negative number; read its size. At M = 0 the reset time equals tr times the dial factor, for example 0.5 x 21.6 = 10.8 s for VI. If a recloser's dead time is shorter than that, the relay starts the next shot partly wound up.

**Currents that change during a fault.** The standard expresses operation as an integral: the relay trips when the sum of (time spent / operate time at that current) reaches 1. Example: 0.5 s at M = 5 (VI, full time 1.31 s) uses about 0.382 of the travel. The rest, 0.618, at M = 10 (full time about 0.689 s) takes about 0.426 s. Total is close to 0.93 s.

**High multiples.** Because B is a fixed floor, the curve flattens at high M. At M = 40 a VI curve is about 0.503 s, mostly B. Annex A.3 also points out that the electromechanical designs the equations model stop getting faster beyond a few multiples of pickup, sooner for MI than for EI.

**Conformance band.** C37.112 uses a band of 0.85 to 1.15 times the equation time, over 1.5 to 20 times pickup, to say whether a relay's curve has the named shape. It is a shape test, not the acceptance tolerance for your test. At M = 5 on VI the band is about 1.11 to 1.50 s.

**IEC curves.** IEC 60255-151 writes the operate time as `TMS x [k / ((G / GS)^alpha - 1) + c]`. The constants are in that standard's annex; use the relay's own table. Two points carry over: time scales in direct proportion to TMS (1.20 s at TMS 0.30 becomes 0.40 s at TMS 0.10), and the dependent-time range runs from 2 x GS up to GD, where GD is at least 20 x GS. The relay must start no lower than GS and no higher than 1.3 x GS.

## Feeder coordination math {#coordination}

*Levels: IV*

Sources: IEEE C37.230-2020, 5.2, 6.1.1, 6.1.3, 6.2, and 6.2.1; IEEE C37.112-2018, 3.2 and 3.3; IEEE 242-2001, 15.5 with Tables 15-1 and 15-2; ANSI/NETA ETT-2026, 8.4.2.H.4 and 8.4.2.H.6.

**Phase pickup.** C37.230 describes phase time-overcurrent pickups set between 1.25x and 3.00x of the heaviest steady load. For 320 A of load that is 400 A to 960 A primary. On 600:5 CTs, divide by 120 to get about 3.33 A to 8.0 A. Then check that the pickup still sees the smallest fault at the end of the zone.

**Coordinating time interval (CTI).** IEEE 242 gives typical minimum margins between curves.

- Relay to relay, induction disk: 0.30 s when field calibrated, 0.35 s if not. Static relays: 0.20 s calibrated, 0.25 s if not.
- Relay backing up a fuse: start from the fuse total clearing time and add 0.22 s (induction disk) or 0.12 s (static). There is no breaker time in this margin because the fuse is the device that clears.

Example: two VI relays at the same fault. The downstream relay, factor 0.5 at M = 15, is `0.5 x (19.61 / 224 + 0.491) ≈ 0.289 s`. The upstream relay, factor 0.4 at M = 5, is `0.4 x 1.31 ≈ 0.523 s`. The gap is about 0.23 s, which meets a 0.20 s static margin but not a 0.30 s induction-disk margin.

**Transformer inrush.** Plot inrush as points the fast trip must clear. For a 150 kVA single-phase unit at 7.2 kV, full-load current is `150 / 7.2 ≈ 20.8 A`. Using the conservative small-unit factors of 12 at 0.1 s and 25 at 0.01 s gives about 250 A and 521 A. Larger three-phase units use smaller factors.

**Shifting curves across a delta-wye bank.** Put both curves on one voltage base before you compare them.

- Phase faults: shift the high-side curve by the turns ratio. For the closest phase-to-phase case, C37.230 uses 87% of the turns ratio. On 115/13.2 kV that is `0.87 x 8.71 ≈ 7.58`, so a 200 A high-side pickup plots at about 1516 A on the 13.2 kV base.
- Ground faults on the wye side: the high side sees less current per phase. The shift factor is about the turns ratio times 1.732. On 138/12.5 kV, `1.732 x 11.04 ≈ 19.1`, so 100 A high side is about 1912 A on the feeder base.

**Fuse saving with a recloser.** The fast curve saves the fuse only where it is below the fuse's minimum-melt curve. If those curves cross at 800 A, a 1500 A fault melts the fuse and trips the fast curve too, so every customer still gets a blink. Partial-range fuse saving stops the fast curve's reach near the crossing so higher faults are left to the fuse.

**Reset and reclosing.** If an upstream induction-disk relay has not fully reset when the recloser closes back in, its next run starts partway along. Over several shots it can catch up with the downstream device. Fixes include matching reset behavior, adding margin, or lengthening the dead time beyond the relay's reset time.


## Distance zones {#zones}

*Levels: III, IV*

ATS 7.9.1 tests a 21 as a distance relay: reach, angle, and timing. IEEE C37.113-2015 is the line-relaying guide that uses those device numbers (clause 3.2 points at IEEE C37.2).

Clause 4.4: the boundary of a zone is where the current transformers are. Overlap is deliberate so a fault at a boundary is in some zone. Clause 4.6: zone 2 is the time-delayed backup that covers from the end of zone 1 to the far end of the line, and it also backs up a failed zone 1. A second independent scheme (often called main 1 and main 2) is local redundancy. Remote backup is a relay at another station.

Clause 5.5.2: an instantaneous, non-piloted zone 1 is set so it does not overreach the remote terminal. Reach is measured from the voltage transformers. Direction comes from the current transformers. Line-side instrument transformers are the straightforward place to measure the line. Direct underreaching transfer trip uses elements set short of the remote bus. Permissive overreaching transfer trip uses an overreaching element and a permissive signal from the far end.

## Schemes {#schemes}

*Levels: II, III, IV*

See the Level III page for the 51–86–52 order, `a` versus `b` contacts, and key interlocks. Short version: the 51 (or 50) decides, the 86 remembers, the 52 opens. An 86 `b` contact in the close circuit is closed only while the lockout is reset.

For a short-circuit study whose goal is the largest initial current at a generator bus, use the saturated subtransient reactance, Xd''. A synchronous machine normally runs saturated, and the saturated value is lower than the unsaturated figure, so it yields the higher current (Blackburn, 2.8). Convert that reactance to the study MVA base before you use it. Time-delayed currents answer other questions, such as relay sensitivity, and are not a substitute for that initial-current check.

Saturation of a CT is not instantaneous. IEEE C37.110-2023 (4.5.1 and 4.5.2.3) notes that some high-speed instantaneous overcurrent elements can still operate in the time-to-saturation window, before the core has entered the saturated region. That is one reason a 50 element can still be acceptable on a circuit whose CT may later saturate on a fully offset fault. See [relaying CT application](#/study/instrument-transformers.md/ct-field).


## CT secondaries

*Levels: II, III, IV*

Never open a current-transformer secondary while the primary can carry current. The secondary will try to keep ampere-turns flowing and the voltage can become dangerous. Short the secondary or keep it on its burden. ATS 7.10.1 also wants exactly one ground on the CT secondary circuit, at the place the drawings specify.

## Common mistakes

*Levels: II, III, IV*

- Swapping 50 and 51 on a one-line.
- Reporting a numeric relay “in cal” because the software element picked up, with the breaker trip contact lifted.
- Leaving a shipping screw in an electromechanical disk.
- Meggering through a shorting bar that was left open, or the reverse, and calling the result a ratio.

## Reading the drawing set {#drawings}

*Levels: II, III*

Different drawings answer different questions. Grab the right one.

- **One-line (single-line).** Single lines and symbols show the course of the power system and its devices. Physical layout is ignored (IEEE 315 A4.1.1). Use it for switching, isolation points, sources, CT and VT locations, and protection zones.
- **Three-line.** All three phases drawn out. Use it when phasing, CT polarity, or delta connections matter.
- **Schematic (elementary).** Shows how a circuit works without regard to where parts physically sit (IEEE 315 A4.1.2). Use it to trace control logic: the 52a contact, the 86 seal-in, the trip coil. Devices are drawn de-energized. A device with no de-energized position, such as a control switch or a breaker-housing TOC, is drawn normally open with a note on when it closes (IEEE C37.2-2022 4.5.3).
- **Wiring (connection).** Locates devices, terminals, and wires in an assembly. Use it to find which terminal a lead lands on.
- **Control sequence (truth table).** A chart of which contacts are made in each position of a switch (C37.2 4.5.2).
- **As-built.** The drawing corrected to match what was installed. ECS-2024 5.4 wants all drawing packages as-built, a full set left on site, and a duplicate to the owner. Its pre-energization lists have test data, as-built drawings, and relay as-left files submitted before energizing.

Almost every ATS section starts with "compare equipment nameplate data with drawings." Settings and test values come from the drawings and studies, so a mismatch caught there saves everything after it.

## IEC 61850 basics {#iec61850}

*Levels: III, IV*

Sources for this section: Adamiak, Baigent, and Mackiewicz, IEC 61850 user overview; the SEL-751 instruction manual (Appendix G); IEEE C37.2-2022 Annexes B and D; and the EEI Handbook 11th ed. Ch. 10.

- **Model.** An IED is split into logical devices, which hold logical nodes, which hold data. Logical-node names follow function. IEC 61850-7-4 groups them by a standard first letter: A automatic control, C supervisory control, G generic, I interfacing and archiving, L system, M metering and measurement, P protection, R protection-related, S sensors, T instrument transformers, X switchgear, Y power transformers, and Z other equipment. XCBR is a circuit breaker. MMXU is a three-phase measurement unit; MMXU1 and MMXU2 are typical instance suffixes when one device measures more than one feeder. C37.2 Table D.1 maps 50 to PIOC, 51 to PTOC, 52 to XCBR, 87 to PDIF, 27 to PTUV, 59 to PTOV, and 79 to RREC.
- **MMS (IEC 61850-8-1).** Client/server. SCADA and engineering tools use it to browse data, receive reports, and move settings and event files. The abstract models are mapped to the Manufacturing Message Specification (MMS, ISO 9506) because it is a public ISO protocol with a proven record that can carry the named objects and rich services of the model. Mapping the same model onto a protocol that only offers simple read and write of register numbers would be clumsy. Logical devices map to MMS domains. MMS traffic can run over TCP/IP or ISO transport.
- **GOOSE and sampled values on the stack.** GOOSE and sampled values are placed directly in the Ethernet frame, skipping the middle layers. That is a change from the older UCA-style GSSE event, which ran over connectionless ISO services. GOOSE is still the fast peer-to-peer multicast for status, controls, trips, and interlocks. After a change, the message repeats at the minimum time, again at the minimum time, then at twice the minimum, then at the maximum interval until the next change. With the SEL default of 8 ms that is 0, 8, 16, and 32 ms. Subscribers filter by control-block reference and multicast address.
- **Testing flags.** An SEL-751 rejects incoming GOOSE data when the message is flagged Test or Needs Commissioning, the configuration revision changes, or it can't be decoded. Check those flags first when a subscribed trip doesn't act.
- **SCL files (Part 6).** All four use the same XML methods and format, but they are not interchangeable. SSD is the system specification. ICD is what one IED is capable of. SCD is the configured substation automation system as a whole. CID is one IED as configured, ready to be loaded.
- **Process bus and sampled values.** A merging unit at the process layer collects currents, voltages, and status, samples them at an agreed, synchronized rate, and publishes sampled measured values so an IED can align data from more than one unit. IEC 61850-9-1 is a unidirectional point-to-point link with a fixed dataset. 9-2 is a configurable dataset, described in SCL, that can be multicast from one publisher to many subscribers, and is the more general process-bus form. As of the Adamiak overview's implementation agreement, a common base rate was 80 samples in each power-system cycle for ordinary protection and monitoring, and 256 samples in each cycle for high-frequency work such as power quality or high-resolution oscillography. Later editions of 9-2 may publish other rates; read the edition in force on the job. The EEI handbook also describes optical current sensors with a 9-2 output at 80 samples per cycle.
- **Legacy gateways.** A single physical device may contain more than one logical device, so a concentrator, or a gateway that fronts several devices, can present each legacy IED (for example a DNP or Modbus unit) as its own logical device without leaving the model.
- **The network is the wiring.** C37.2 calls managed Ethernet switches the auxiliary relays of a GOOSE scheme, device 16 with suffix ES. Their settings decide whether a trip arrives, so record and back them up like relay settings. ATS 7.23 covers firmware, settings, time sync, and failover.

## Logic for relay and control work {#logic}

*Levels: II, III, IV*

Sources: IEEE C37.2-2022 4.2.1 and 4.5.1; SEL-751 instruction manual Section 4 (SELOGIC operators and latch bits).

- **Contacts are gates.** Contacts in series make an AND. Contacts in parallel make an OR. A b contact is a NOT of its device.
- **Drawn at rest.** Diagrams show b contacts closed and a contacts open, with the device non-operated. aa is an early a, bb is an early b, and LC is the breaker's latch-check switch.
- **Seal-in.** SV05 := (SV05 OR IN101) AND (IN103 OR RB02). The output feeds its own OR, like a relay contact across a start button, and holds until the AND term goes false.
- **Precedence in SELOGIC,** high to low: parentheses, NOT, R_TRIG and F_TRIG, math, comparisons, AND, OR. So A OR B AND C means A OR (B AND C). Use parentheses rather than relying on memory.
- **NOT of a group.** NOT(RB01 OR SV02) is a NOR: it is 1 only when both inputs are 0.
- **Edges.** R_TRIG and F_TRIG pulse for one processing interval. They're used for event triggers and counters.
- **Latches.** SET makes the latch bit 1, and RST makes it 0. If both are true, reset wins. The state is kept through a power loss, but an output contact driven by it drops until the relay restarts.
- **Math with NOT.** MV01 := 12 * IN101 + (MV01 + 1) * NOT IN101 is an if/else: 12 when the input is on, otherwise count up.

Proving the scheme, not only the element, is a logic check. A trip programmed as 50 AND 67, with an 86 contact in series, needs every term true, including that 86 contact in the trip path. If the elements assert in the test set and the breaker stays closed because a wiring error held the 86 contact open, the installation is not accepted. Walk the internal logic against the owner's narrative or diagram before you sign the relay off (ATS-2025 7.9.2).

