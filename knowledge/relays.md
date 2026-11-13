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

## Distance zones {#zones}

ATS 7.9.1 tests a 21 as a distance relay: reach, angle, and timing. IEEE C37.113-2015 is the line-relaying guide that uses those device numbers (clause 3.2 points at IEEE C37.2).

Clause 4.4: the boundary of a zone is where the current transformers are. Overlap is deliberate so a fault at a boundary is in some zone. Clause 4.6: zone 2 is the time-delayed backup that covers from the end of zone 1 to the far end of the line, and it also backs up a failed zone 1. A second independent scheme (often called main 1 and main 2) is local redundancy. Remote backup is a relay at another station.

Clause 5.5.2: an instantaneous, non-piloted zone 1 is set so it does not overreach the remote terminal. Reach is measured from the voltage transformers. Direction comes from the current transformers. Line-side instrument transformers are the straightforward place to measure the line. Direct underreaching transfer trip uses elements set short of the remote bus. Permissive overreaching transfer trip uses an overreaching element and a permissive signal from the far end.

## Schemes {#schemes}

See the Level III page for the 51–86–52 order, `a` versus `b` contacts, and key interlocks. Short version: the 51 (or 50) decides, the 86 remembers, the 52 opens. An 86 `b` contact in the close circuit is closed only while the lockout is reset.

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

No IEC 61850 standard is in the held set. This section uses the SEL-751 instruction manual (Appendix G), IEEE C37.2-2022 Annexes B and D, and the EEI Handbook 11th ed. Ch. 10.

- **Model.** An IED is split into logical devices, which hold logical nodes, which hold data. Logical-node names follow function. C37.2 Table D.1 maps 50 to PIOC, 51 to PTOC, 52 to XCBR, 87 to PDIF, 27 to PTUV, 59 to PTOV, and 79 to RREC. MMXU is polyphase measurement.
- **MMS (IEC 61850-8-1).** Client/server. SCADA and engineering tools use it to browse data, receive reports, and move settings and event files.
- **GOOSE.** Fast peer-to-peer multicast for status, controls, trips, and interlocks. After a change, the message repeats at the minimum time, again at the minimum time, then at twice the minimum, then at the maximum interval until the next change. With the SEL default of 8 ms that is 0, 8, 16, and 32 ms. Subscribers filter by control-block reference and multicast address.
- **Testing flags.** An SEL-751 rejects incoming GOOSE data when the message is flagged Test or Needs Commissioning, the configuration revision changes, or it can't be decoded. Check those flags first when a subscribed trip doesn't act.
- **SCL files.** ICD lists what an IED can do. SSD describes the single-line. SCD covers the whole substation. CID is one IED's configuration as loaded.
- **Sampled values (IEC 61850-9-2).** Digitized currents and voltages on the network. The EEI handbook describes optical current sensors with a 9-2 output at 80 samples per cycle.
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
