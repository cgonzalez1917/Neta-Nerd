# Device numbers {#numbers}

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

Sources: Blackburn and Domin, Protective Relaying, 4th ed., Chapters 8.9 through 8.12; IEEE C37.2-2022, 3.1.32 and 3.1.40. These are application notes, not a substitute for the machine's setting study or IEEE C37.102.

- **Loss of field (40).** Normal generation sits slightly lagging, in the first quadrant of the P-Q plane. When the field breaker opens, or excitation is lost, operation moves into the fourth quadrant and the system has to supply the missing vars (8.11.1). If the system can feed those vars without a steep voltage decline, the unit may keep running as an induction generator; otherwise it can fall out of step. The change is not instantaneous, so an early alarm may let an operator restore the field.

  Complete-loss setting (mode 1): a smaller circle in the fourth quadrant, diameter on the order of the synchronous reactance Xd, with the top of the circle 50% to 75% of the transient reactance Xd' below the origin. A trip in about 0.2 to 0.3 s is typical when the unit is to be shut down.

  Partial-plus-complete setting (mode 2): a wider circle, preferably inside the minimum-excitation limiter and outside the capability and steady-state stability curves. A directional unit is required so nearby faults and stable swings do not operate it; the 40 then operates below the directional line and inside the circle. Where used, an undervoltage element that drops out in the 87% to 80% band of rated voltage supervises the scheme. If voltage stays healthy, alarm and a delayed trip, typically 10 s to 1 min, give the operator time to restore field. If voltage falls below that dropout, trip in about 0.2 to 0.3 s. Large, important units often run both the small and the wide 40 settings.

- **Motoring (32).** If the prime mover is removed while the generator stays online with the field excited, the system motors the unit at synchronous speed. That overheats steam turbines and can cavitate hydro runners. Typical reverse-power values to keep the machine spinning with no prime-mover input: condensing steam about 1% to 3% of nameplate kW, noncondensing steam 3% or more, hydro 0.2% to 2% or more, diesel about 25%, and gas turbine 50% or more (8.12.1). A backup 32 is recommended even though the machine control has its own detection. Microprocessor relays can be as sensitive as 1 mA, with an operating time of about 2 s. IEEE C37.2 uses this reverse-power, loss-of-prime-mover case as the example for device 32. Device 40 is the field over/under-excitation relay, not the motoring function.

- **Volts per hertz (24).** Machines and transformers already run close to the saturation knee, so a modest overvoltage produces large exciting current. A dangerous window is while the unit is off the system and speed is changing, because voltage tracks frequency and flux. Pickup should stay constant on a V/Hz basis; a plain 59 does not do that during start or shutdown (8.12.2). A typical two-level supplement to the machine controls is about 110% of rated to alarm and then trip in about 1 min, and about 120% of rated to trip in about 6 s, preferably from a separate VT so a blown metering-VT fuse cannot operate the 24.

- **Inadvertent energization.** Closing the generator breaker into a live bus while the machine is on the turning gear, while it is coasting, at standstill, or after a bad synchronize can find ordinary stator protection impaired or unavailable at low frequency (8.12.3 and 8.10). Because the unit breaker itself may be the problem, adjacent breakers need to be opened at once by local breaker-failure or remote trip. Blackburn describes a 67 directional inverse-time overcurrent element in each phase, looking into the generator, typically picked up at about 0.5 pu and operating in about 0.25 s at 2.0 pu. That application can also stand in for motoring protection and is faster on these events.

- **Field ground (64).** On brushed units a voltage-divider 64 can be added if the exciter equipment does not already provide one. Brushless machines typically drop pilot brushes now and then to measure field insulation, and watch the exciter field continuously (8.9). These checks usually alarm so the operator can decide what to do, but they may be wired to trip when the owner prefers that.

## What ATS tells you to test {#testing}

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


## Distance zones {#zones}

ATS 7.9.1 tests a 21 as a distance relay: reach, angle, and timing. IEEE C37.113-2015 is the line-relaying guide that uses those device numbers (clause 3.2 points at IEEE C37.2).

Clause 4.4: the boundary of a zone is where the current transformers are. Overlap is deliberate so a fault at a boundary is in some zone. Clause 4.6: zone 2 is the time-delayed backup that covers from the end of zone 1 to the far end of the line, and it also backs up a failed zone 1. A second independent scheme (often called main 1 and main 2) is local redundancy. Remote backup is a relay at another station.

Clause 5.5.2: an instantaneous, non-piloted zone 1 is set so it does not overreach the remote terminal. Reach is measured from the voltage transformers. Direction comes from the current transformers. Line-side instrument transformers are the straightforward place to measure the line. Direct underreaching transfer trip uses elements set short of the remote bus. Permissive overreaching transfer trip uses an overreaching element and a permissive signal from the far end.

## Schemes {#schemes}

See the Level III page for the 51–86–52 order, `a` versus `b` contacts, and key interlocks. Short version: the 51 (or 50) decides, the 86 remembers, the 52 opens. An 86 `b` contact in the close circuit is closed only while the lockout is reset.

For a short-circuit study whose goal is the largest initial current at a generator bus, use the saturated subtransient reactance, Xd''. A synchronous machine normally runs saturated, and the saturated value is lower than the unsaturated figure, so it yields the higher current (Blackburn, 2.8). Convert that reactance to the study MVA base before you use it. Time-delayed currents answer other questions, such as relay sensitivity, and are not a substitute for that initial-current check.

Saturation of a CT is not instantaneous. IEEE C37.110-2023 (4.5.1 and 4.5.2.3) notes that some high-speed instantaneous overcurrent elements can still operate in the time-to-saturation window, before the core has entered the saturated region. That is one reason a 50 element can still be acceptable on a circuit whose CT may later saturate on a fully offset fault. See [relaying CT application](#/study/instrument-transformers.md/ct-field).


## CT secondaries

Never open a current-transformer secondary while the primary can carry current. The secondary will try to keep ampere-turns flowing and the voltage can become dangerous. Short the secondary or keep it on its burden. ATS 7.10.1 also wants exactly one ground on the CT secondary circuit, at the place the drawings specify.

## Common mistakes

- Swapping 50 and 51 on a one-line.
- Reporting a numeric relay “in cal” because the software element picked up, with the breaker trip contact lifted.
- Leaving a shipping screw in an electromechanical disk.
- Meggering through a shorting bar that was left open, or the reverse, and calling the result a ratio.

## Reading the drawing set {#drawings}

Different drawings answer different questions. Grab the right one.

- **One-line (single-line).** Single lines and symbols show the course of the power system and its devices. Physical layout is ignored (IEEE 315 A4.1.1). Use it for switching, isolation points, sources, CT and VT locations, and protection zones.
- **Three-line.** All three phases drawn out. Use it when phasing, CT polarity, or delta connections matter.
- **Schematic (elementary).** Shows how a circuit works without regard to where parts physically sit (IEEE 315 A4.1.2). Use it to trace control logic: the 52a contact, the 86 seal-in, the trip coil. Devices are drawn de-energized. A device with no de-energized position, such as a control switch or a breaker-housing TOC, is drawn normally open with a note on when it closes (IEEE C37.2-2022 4.5.3).
- **Wiring (connection).** Locates devices, terminals, and wires in an assembly. Use it to find which terminal a lead lands on.
- **Control sequence (truth table).** A chart of which contacts are made in each position of a switch (C37.2 4.5.2).
- **As-built.** The drawing corrected to match what was installed. ECS-2024 5.4 wants all drawing packages as-built, a full set left on site, and a duplicate to the owner. Its pre-energization lists have test data, as-built drawings, and relay as-left files submitted before energizing.

Almost every ATS section starts with "compare equipment nameplate data with drawings." Settings and test values come from the drawings and studies, so a mismatch caught there saves everything after it.

## IEC 61850 basics {#iec61850}

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

