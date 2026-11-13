# More apparatus {#apparatus}

## Switchgear assembly {#switchgear}

ATS 7.1.1 starts with the cubicle, not the breaker. Nameplate, mimic, and fuse or breaker sizes have to match the drawings and the coordination study. Shipping bracing comes out. Interlocks are proved by trying a locked-open device and by walking the key exchange, not by defeating the lock. Shutters and barriers have to be in place. Bus insulation resistance has to be above the minimum before a dielectric withstand. Control wiring is held to a 2 megohm floor, which is not the Table 100.1 floor used for power insulation.

## Medium-voltage vacuum breakers {#mv-vacuum}

ATS-2025 7.6.3 is the vacuum medium-voltage breaker. Insulation resistance with no manufacturer voltage uses Table 100.1. Control wiring is not less than 2 MΩ. Contact resistance uses the manufacturer’s band or, if there is none, the 50-percent-of-the-lowest screen against adjacent poles. Close and trip coil pickup uses Table 100.20 when the manual is silent.

The vacuum bottle itself is a withstand across the open interrupter. With no manufacturer pressure number, ATS 7.6.3.D.9 says each interrupter’s pressure shall not be greater than 1×10⁻² Pa and shall not differ from the adjacent poles by more than two orders of magnitude. A magnetron atmospheric-condition test is optional. Bushing power factor and capacitance, when they are tested, should stay within 10 percent of the nameplate; hot-collar results are compared with similar bushings.

## Network protectors {#network}

A 600 V network protector, ATS 7.8, sits on the secondary of a network transformer. The acceptance tests prove it will close when voltage is on the transformer side only, and that it will open when the source feeder breaker opens. Master and phasing relays are calibrated with a network-protector test set. Trip-free operation, the collector-bus isolation switch, and the primary switch (open, close, and ground) are part of the same job. Control wiring is still the 500 V or 1000 V insulation-resistance test used on other 300 V and 600 V control cable.

## Sectionalizers {#sectionalizers}

A line sectionalizer, ATS 7.24.2, is not tested like a molded-case breaker. You prove the counting function with simulated fault current above 160 percent of its continuous rating, then the lockout at each count, then the reset timing. It is meant to open and stay open after the upstream device has cleared, which is why the count and the lockout are the tests, not a long-time thermal curve.

## Reclosers {#reclosers}

Oil and vacuum reclosers are ATS 7.24.1, not the low-voltage molded-case section. The electrical screens rhyme with the breaker: Table 100.1 if the manufacturer gives no insulation value, 2 MΩ on control wiring, contact resistance within 50 percent of the lowest similar pole if no manufacturer band, insulating liquid per Table 100.4, and the same vacuum-pressure screen as 7.6.3 when the manufacturer is silent. Operate the recloser and its control through the mechanical checks before you call the electronic control “fine.”

## Surge arresters {#arresters}

Medium- and high-voltage arresters are ATS 7.19.2. Insulation resistance uses the manufacturer or Table 100.1. The connection from the arrester ground terminal to the ground system shall be less than 0.5 Ω, and it still has to satisfy the grounding section. Watts-loss is a comparison with similar units and with the test-set data, not a single universal watt limit in that paragraph.

## Motors {#motors}

AC induction machines are ATS 7.15.1. Above 200 hp (150 kW) the insulation test is ten minutes and you calculate polarization index; at 200 hp and below it is one minute and a 60/30 dielectric absorption ratio. PI not less than 2.0 and DAR not less than 1.4 on that section, and the one-minute megohms still have to meet Table 100.11 after correction to 40 °C. On machines rated 2300 V and above, measure phase-to-phase stator resistance. The overload relay is sized from the nameplate; the conductors are not. See the motor steps in the field-methods note.

## Emergency systems {#emergency}

Engine generators (7.22.1) need phase rotation, phasing, and synchronizing proved before they are paralleled. A UPS (7.22.2) is proved by a static transfer to bypass and back, on real load when you can. An automatic transfer switch (7.22.3) is timed: delay on transfer, transfer, delay and retransfer when normal returns. Control wiring on the transfer switch is not less than 2 MΩ, and the power contacts still get a microhm check. These are system tests. A relay that “passes” in the panel does not prove the transfer.

## Fiber {#fiber}

ATS 7.25 treats fiber as an optical test, not a megger test. An optical time-domain reflectometer looks down the strand for length, breaks, and splice reflections. Attenuation is reported in dB/km and is held to the site spec or, if there is none, to the manufacturer. Bend radius is the manufacturer’s minimum. A kink that still “has light” can be out of spec.

## Capacitors {#capacitors}

ATS 7.20.1 measures insulation resistance, the capacitance of every terminal combination, and the resistance of the internal discharge resistors. D.4 cites NFPA 70 Article 460: residual voltage must fall to 50 V within 1 minute at 600 V and below, and within 5 minutes above 600 V. Still verify absence of voltage before contact. Shunt reactors and regulators share the liquid-filled power-factor table with transformers: mineral oil 0.5 percent at 20 °C when the manufacturer is silent.

## EV charging {#evse}

ATS 7.26 is the charging equipment. The electrical list includes the equipment ground, protective-conductor resistance, touch voltage, personal-protection trip, nuisance trip, proximity pilot, and control pilot. Investigate a protective-conductor resistance above 0.5 Ω. Interlocks are part of the visual and mechanical inspection. The trip thresholds themselves come from the charger manual.

## Switches {#switches}

Low-voltage air switches are ATS 7.5.1.1. The inspection covers blade alignment, penetration, travel stops, interlock sequencing, and fuse size and type against the drawings and studies. The electrical list covers contact resistance across blades and fuseholders, insulation resistance closed and across each open pole, fuse resistance, and the ground-fault test when one is fitted. Fuse resistances that differ by more than 15% are investigated. Medium-voltage metal-enclosed switches (7.5.1.2) add arc-interrupter operation, expulsion-limiting devices on expulsion fuses, and a withstand per Table 100.2. Open outdoor switches (7.5.1.3) add motor-operator limit switches, the operation counter, and Table 100.19. Gill sorts low-voltage switches into isolating, safety (load-break), and interrupter switches. Bolted-pressure mains carry very high continuous current, rely on integral current-limiting fuses for fault interruption, and power their ground-fault trip from a small source-side control transformer.

## Fuses {#fuses}

A current-limiting fuse clears in the first half-cycle, so the fault never reaches its prospective peak. A non-current-limiting fuse can't do that. Class L covers 601-6000 A at 600 V. J, T, RK1, RK5, CC, and G are current-limiting branch fuses up to 600 A or less. Fuses open one phase at a time, so a three-phase fused circuit can single-phase a motor. Fused gear often adds an anti-single-phase trip. Cutouts (ATS 7.5.5) get a check of the latching mechanism along with alignment and penetration.

## Busways and outdoor bus {#bus}

Metal-enclosed busway is ATS 7.4. Withstand is each phase to ground with the others grounded, per the manufacturer or Table 100.17. Where that table shows no dc value, use ac. Tie sections fed from separate sources are phased from their permanent sources. For low-voltage busway with no manufacturer minimum, the megohm minimum is 100 divided by the run length in feet, and the withstand waits until insulation resistance is above that. Outdoor bus is ATS 7.21. Support insulators are inspected, insulation resistance is phase to ground with others grounded for equipment below 46 kV, and the one-minute withstand uses Table 100.19.

## Reactors and regulators {#regulators}

Step-voltage regulators are ATS 7.12.1.1. Read the impact recorder before unloading. Check the motor cutoffs at maximum raise and lower and the voltage range limiter. The control is checked for bandwidth, time delay, voltage level, and line-drop compensation. Turns ratio on each step is held to 0.5% of calculated, winding resistance to 2% of factory or adjacent, and PI to at least 1.0 without factory data. Dry reactors (7.20.3.1) hold winding resistance to 1% of factory, and the field ac withstand is limited to 75% of the factory value. Liquid-filled reactors (7.20.3.2) keep a positive nitrogen blanket that is tested for oxygen.

## Drives, starters, and MCCs {#drives}

Adjustable-speed drives are ATS 7.17. The drive's motor overcurrent settings are checked against motor full-load current, with individual overloads for multi-motor drives. Overload elements are proved by primary injection at 300% against the curve. The protective functions are exercised: phase loss, overvoltage, rotation, overtemperature, dc overvoltage, overfrequency, overload, and alarms. The speed range is swept slowly while you listen for resonance. NEMA ICS 7.2 adds bypass practice (check rotation both ways, and allow time for the motor's residual voltage to decay) and bearing-current mitigations. NEMA MG 1 advises against power-factor capacitors on a drive's output. Low-voltage MCCs have no single ATS list: the assembly goes to 7.1, switches to 7.5, breakers to 7.6, and starters to 7.16.1.1, where contactor gap, wipe, alignment, and pressure are checked.

## Metering {#metering}

ATS 7.11 checks meter accuracy, the instrument multiplier (CT ratio times VT ratio), and intact CT and VT secondaries. Digital meters also get their firmware recorded and owner settings loaded, and readings are compared with real load after energization. By Blondel's theorem, N wires need N - 1 elements. With a disk meter, kW = 3.6 x revolutions x Kh x multiplier / seconds. Percent registration is registered energy divided by true energy, times 100. Percent error is the difference from 100.

## Automation and SCADA {#automation}

ATS 7.23 covers firmware, backup batteries, date and time, HMI and remote metering, communication failover, tagging and local/remote control, deadband and zero deadband, and clearing events after testing. IEEE C37.1 defines the terms: deadband suppresses analog changes smaller than a set count, a chatter filter disables a status point that changes too often, and select-before-operate arms one point before an operate command can execute. IEEE C37.2 names the RTU as the main SCADA interface and a remote I/O module as having no SCADA master connection. Accuracy stated as a percent of full scale becomes a much larger percent of a small reading.

## Studies and maintenance intervals {#studies}

MTS Appendix C ties study updates to events. New work, an annual data check, or a source change marks all five (one-line, short-circuit, coordination, incident energy, load flow). A change in impedance, configuration, or loading marks the one-line, short-circuit, and incident energy. A settings change marks the one-line, coordination, incident energy, and load flow. Five years with no update marks the one-line, short-circuit, and incident energy. MTS Appendix B gives base months for visual, mechanical, and electrical work and a multiplier by reliability requirement and condition (from 0.25 for high reliability in poor condition up to 2.5 for low reliability in good condition). IEEE 399 uses first-cycle currents for low-voltage interrupting duty and medium-voltage close-and-latch duty, and time-delayed currents with motors left out for relay sensitivity.

## Commissioning (ECS) {#commissioning}

ANSI/NETA ECS-2024 starts where ATS stops. Components are proved by factory and field acceptance tests. Commissioning then proves the system against the Owner's Project Requirements (what the owner needs and how success is measured) and the Basis of Design (how the designer met them). The commissioning authority drafts the commissioning plan during design and keeps it current through construction, acceptance, and occupancy. The work runs in three phases: pre-energization (document reviews, settings, CT circuits, interlocks, energization plan), energization (restricted access, grounds removed, phasing and rotation, differential operate and restraint at medium voltage), and post-energization (fluid and gas samples, infrared under load, loading checks, report). The commissioning organization is an independent third party. The report includes an issues log of open and closed items. Turnover replaces commissioning locks and tags with the operator's.

## Vacuum breaker field sequence {#mv-vacuum-field}

ATS-2025 7.6.3, in a workable order:

1. Nameplate against drawings. Confirm the manufacturer's special tools and gauges are on hand (A.1, A.4).
2. Mechanical operation per the manual, critical distances such as contact gap (manufacturer values, A.7 and C.1), torque, cell fit, racking, lubrication.
3. Contact timing (A.12, required). Coil current signature (A.13) and motion analysis (A.14) are optional. Timing, coil current, travel, and velocity are all judged against the manufacturer (C.4–C.6).
4. Counter as-found and as-left. One count per close-open cycle (A.15, C.7).
5. Insulation resistance, one minute, closed and across each open pole (B.1). For 15 kV class with no manufacturer value, Table 100.1 gives 2,500 V dc and 5,000 MΩ. Control wiring is at least 2 MΩ (D.2).
6. Contact resistance (B.3), with the 50%-of-lowest screen when there's no manufacturer band.
7. Minimum pickup on trip and close coils (B.4). With no manufacturer data, Table 100.20.1 for 125 V dc: closing 100–140 V indoor, opening 70–140 V.
8. Trip-free, antipump, electrical close and trip (B.5). Then trip the breaker from each protective device and reset targets (B.6). That end-to-end trip is the check injection alone can't give.
9. Vacuum bottle integrity: a withstand across each open interrupter, strictly per the manufacturer (B.10). The magnetron atmospheric-condition test is optional (B.9).
10. Overall withstand per the manufacturer, or Table 100.19 (B.11). The 15 kV class row is 20.4 kV ac or 28.8 kV dc maximum in the field.
11. Heaters (B.12) and the breaker's instrument transformers per 7.10 (B.13).
