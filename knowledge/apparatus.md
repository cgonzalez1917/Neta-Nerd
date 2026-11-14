# More apparatus {#apparatus}

*Level: II*

## Level II {#apparatus-level-ii}

*Level: II*

## Switchgear assembly {#switchgear}

*Level: II*

ATS 7.1.1 starts with the cubicle, not the breaker. Nameplate, mimic, and fuse or breaker sizes have to match the drawings and the coordination study. Shipping bracing comes out. Interlocks are proved by trying a locked-open device and by walking the key exchange, not by defeating the lock. Shutters and barriers have to be in place. Bus insulation resistance has to be above the minimum before a dielectric withstand. Control wiring is held to a 2 megohm floor, which is not the Table 100.1 floor used for power insulation.

On a double-ended or dual-source lineup, ATS 7.1.1.B.13 and D.13 require phasing checks from each source, so the bus phasing agrees with the design, before the sources can be paralleled or transferred. A clean insulation-resistance test does not prove that.

Current-circuit injection, 7.1.1.B.10 and D.10, drives at least 1.0 A in the secondary wiring and requires the correct magnitude at each device in that circuit, not only at the first relay. Optional primary injection uses the same 1.0 A secondary criterion. Proving one relay does not prove a tap, a shorted winding, or a swapped lead farther down the run.

Control-power transformer tests and control-transfer-relay function are separate checks (7.1.1.B.7.5 and D.8.5). Secondary voltage can be right while a transfer relay fails to switch sources, leaving a dead control bus on loss of one CPT. Operate the transfer relays and show they perform as designed before you accept the lineup.

## Medium-voltage vacuum breakers {#mv-vacuum}

*Level: II*

ATS-2025 7.6.3 is the vacuum medium-voltage breaker. Insulation resistance with no manufacturer voltage uses Table 100.1. Control wiring is not less than 2 MΩ. Contact resistance uses the manufacturer’s band or, if there is none, the 50-percent-of-the-lowest screen against adjacent poles. Close and trip coil pickup uses Table 100.20 when the manual is silent.

The vacuum bottle itself is a withstand across the open interrupter. With no manufacturer pressure number, ATS 7.6.3.D.9 says each interrupter’s pressure shall not be greater than 1×10⁻² Pa and shall not differ from the adjacent poles by more than two orders of magnitude. A magnetron atmospheric-condition test is optional. Bushing power factor and capacitance, when they are tested, should stay within 10 percent of the nameplate; hot-collar results are compared with similar bushings.

## Network protectors {#network}

*Level: II*

A 600 V network protector, ATS 7.8, sits on the secondary of a network transformer. The acceptance tests prove it will close when voltage is on the transformer side only, and that it will open when the source feeder breaker opens. Master and phasing relays are calibrated with a network-protector test set. Trip-free operation, the collector-bus isolation switch, and the primary switch (open, close, and ground) are part of the same job. Control wiring is still the 500 V or 1000 V insulation-resistance test used on other 300 V and 600 V control cable.

## Sectionalizers {#sectionalizers}

*Level: II*

A line sectionalizer, ATS 7.24.2, is not tested like a molded-case breaker. You prove the counting function with simulated fault current above 160 percent of its continuous rating, then the lockout at each count, then the reset timing. It is meant to open and stay open after the upstream device has cleared, which is why the count and the lockout are the tests, not a long-time thermal curve.

## Reclosers {#reclosers}

*Level: II*

Oil and vacuum reclosers are ATS 7.24.1, not the low-voltage molded-case section. The electrical screens rhyme with the breaker: Table 100.1 if the manufacturer gives no insulation value, 2 MΩ on control wiring, contact resistance within 50 percent of the lowest similar pole if no manufacturer band, insulating liquid per Table 100.4, and the same vacuum-pressure screen as 7.6.3 when the manufacturer is silent. Operate the recloser and its control through the mechanical checks before you call the electronic control “fine.”

## Surge arresters {#arresters}

*Level: II*

Medium- and high-voltage arresters are ATS 7.19.2. Insulation resistance uses the manufacturer or Table 100.1. The connection from the arrester ground terminal to the ground system shall be less than 0.5 Ω, and it still has to satisfy the grounding section. Watts-loss is a comparison with similar units and with the test-set data, not a single universal watt limit in that paragraph.

## Motors {#motors}

*Level: II*

AC induction machines are ATS 7.15.1. Above 200 hp (150 kW) the insulation test is ten minutes and you calculate polarization index; at 200 hp and below it is one minute and a 60/30 dielectric absorption ratio. PI not less than 2.0 and DAR not less than 1.4 on that section, and the one-minute megohms still have to meet Table 100.11 after correction to 40 °C. On machines rated 2300 V and above, measure phase-to-phase stator resistance. The overload relay is sized from the nameplate; the conductors are not. See the motor steps in the field-methods note.

ATS 7.15.1 also wants the stator RTD circuits compared with the drawings, a resistance measurement on those circuits, and a check that they agree with the design and with the protection-device manufacturer's data (A.10, B.11, D.11). Bearing RTDs are a separate check that they indicate the correct temperature. Landing the leads is not the same as proving the circuits.

## Emergency systems {#emergency}

*Level: II*

Engine generators (7.22.1) need phase rotation, phasing, and synchronizing proved before they are paralleled. A UPS (7.22.2) is proved by a static transfer from the inverter to bypass and back, using normal load if possible, and the transfer has to work the way the manufacturer specifies (7.22.2.B.2 and D.2). A clean inverter waveform does not prove the transfer path. An automatic transfer switch (7.22.3) is timed: delay on transfer, transfer, delay and retransfer when normal returns. Control wiring on the transfer switch is not less than 2 MΩ, and the power contacts still get a microhm check. These are system tests. A relay that “passes” in the panel does not prove the transfer. For emergency lighting, UPS, hospital, fire alarm and fire pump tests, see [life-safety power](#/study/life-safety.md/life-safety).

## Fiber {#fiber}

*Level: II*

ATS 7.25 treats fiber as an optical test, not a megger test. An optical time-domain reflectometer looks down the strand for length, breaks, and splice reflections. Attenuation is reported in dB/km and is held to the site spec or, if there is none, to the manufacturer. Bend radius is the manufacturer’s minimum. A kink that still “has light” can be out of spec.

## Capacitors {#capacitors}

*Level: II*

ATS 7.20.1 measures insulation resistance, the capacitance of every terminal combination, and the resistance of the internal discharge resistors. Capacitance is compared with the manufacturer's published data, and values that differ are investigated (B.3 and D.3). A satisfactory insulation-resistance test does not excuse a capacitance mismatch, which can mean a failed can, an open internal fuse, or a wrong unit. D.4 cites NFPA 70 Article 460: residual voltage must fall to 50 V within 1 minute at 600 V and below, and within 5 minutes above 600 V. Still verify absence of voltage before contact. Shunt reactors and regulators share the liquid-filled power-factor table with transformers: mineral oil 0.5 percent at 20 °C when the manufacturer is silent.

## EV charging {#evse}

*Level: II*

ATS 7.26 is the charging equipment. The electrical list includes the equipment ground, protective-conductor resistance, touch voltage, personal-protection trip, nuisance trip, proximity pilot, and control pilot. Investigate a protective-conductor resistance above 0.5 Ω. Interlocks are part of the visual and mechanical inspection. The trip thresholds themselves come from the charger manual.

## Switches {#switches}

*Level: II*

Low-voltage air switches are ATS 7.5.1.1. The inspection covers blade alignment, penetration, travel stops, interlock sequencing, and fuse size and type against the drawings and studies. The electrical list covers contact resistance across blades and fuseholders, insulation resistance closed and across each open pole, fuse resistance, and the ground-fault test when one is fitted. Fuse resistances that differ by more than 15% are investigated. Medium-voltage metal-enclosed switches (7.5.1.2) add arc-interrupter operation, expulsion-limiting devices on expulsion fuses, and a withstand per Table 100.2. Open outdoor switches (7.5.1.3) add motor-operator limit switches, the operation counter, and Table 100.19. Gill sorts low-voltage switches into isolating, safety (load-break), and interrupter switches. Bolted-pressure mains carry very high continuous current, rely on integral current-limiting fuses for fault interruption, and power their ground-fault trip from a small source-side control transformer.

## Fuses {#fuses}

*Level: II*

A current-limiting fuse clears in the first half-cycle, so the fault never reaches its prospective peak. A non-current-limiting fuse can't do that. Class L covers 601-6000 A at 600 V. J, T, RK1, RK5, CC, and G are current-limiting branch fuses up to 600 A or less. Fuses open one phase at a time, so a three-phase fused circuit can single-phase a motor. Fused gear often adds an anti-single-phase trip. Cutouts (ATS 7.5.5) get a check of the latching mechanism along with alignment and penetration. Overload versus short circuit, voltage and interrupting ratings, Class R time delay, and series-specific coordination ratios are in [fuse ratings and let-through](#/study/apparatus.md/fuse-ratings).

## Busways and outdoor bus {#bus}

*Level: II*

Metal-enclosed busway is ATS 7.4. Withstand is each phase to ground with the others grounded, per the manufacturer or Table 100.17. Where that table shows no dc value, use ac. Tie sections fed from separate sources are phased from their permanent sources. For low-voltage busway with no manufacturer minimum, the megohm minimum is 100 divided by the run length in feet, and the withstand waits until insulation resistance is above that. Outdoor bus is ATS 7.21. Support insulators are inspected, insulation resistance is phase to ground with others grounded for equipment below 46 kV, and the one-minute withstand uses Table 100.19.

## Reactors and regulators {#regulators}

*Level: II*

Step-voltage regulators are ATS 7.12.1.1. Read the impact recorder before unloading. Check the motor, the drive, and the end-of-travel cutoffs, and confirm that the cutoff stops the drive at both ends of raise and lower travel (ATS 7.12.3.A.9 and C.4). An operation-counter increment does not prove the cutoff. The control is checked for bandwidth, time delay, voltage level, and line-drop compensation. Turns ratio is taken at all tap positions. The results should follow a normal pattern from one voltage step to the next, and no position should differ from the calculated ratio by more than one-half percent (B.7 and D.7). Winding resistance is held to 2% of factory or adjacent, and PI to at least 1.0 without factory data. Dry reactors (7.20.3.1) hold winding resistance to 1% of factory, and the field ac withstand is limited to 75% of the factory value. Liquid-filled reactors (7.20.3.2) keep a positive nitrogen blanket that is tested for oxygen.

## Drives, starters, and MCCs {#drives}

*Level: II*

Adjustable-speed drives are ATS 7.17. The drive's motor overcurrent settings are checked against motor full-load current, with individual overloads for multi-motor drives. Overload elements are proved by primary injection at 300% against the curve. The protective functions are exercised: phase loss, overvoltage, rotation, overtemperature, dc overvoltage, overfrequency, overload, and alarms. The speed range is swept slowly while you listen for resonance. NEMA ICS 7.2 adds bypass practice (check rotation both ways, and allow time for the motor's residual voltage to decay) and bearing-current mitigations. NEMA MG 1 advises against power-factor capacitors on a drive's output. Low-voltage MCCs have no single ATS list (7.16.2.1): the bus is inspected and tested as switchgear or switchboard assemblies (7.1), switches and circuit breakers follow their own sections (7.5 and 7.6), and starters follow the low-voltage starter section (7.16.1.1), where contactor gap, wipe, alignment, and pressure are checked. A main-breaker test alone is not a complete MCC acceptance.

## Metering {#metering}

*Level: II*

ATS 7.11 checks meter accuracy, the instrument multiplier (CT ratio times VT ratio), and intact CT and VT secondaries. Digital meters also get their firmware recorded and owner settings loaded, and readings are compared with real load after energization. By Blondel's theorem, N wires need N - 1 elements. With a disk meter, kW = 3.6 x revolutions x Kh x multiplier / seconds. Percent registration is registered energy divided by true energy, times 100. Percent error is the difference from 100.

## Studies and maintenance intervals {#studies}

*Level: II*

MTS Appendix C ties study updates to events. New work, an annual data check, or a source change marks all five (one-line, short-circuit, coordination, incident energy, load flow). A change in impedance, configuration, or loading marks the one-line, short-circuit, and incident energy. A settings change marks the one-line, coordination, incident energy, and load flow. Five years with no update marks the one-line, short-circuit, and incident energy.

Applying study numbers in the field, and MTS Appendix B maintenance intervals, are in [applying study data](#/study/apparatus.md/studies-apply). Misoperation review and through-fault duration on a reclosing feeder are in [study review after a misoperation](#/study/apparatus.md/studies-events).

For paralleling two transformers or two buses, see [paralleling and phasing](#/study/apparatus.md/paralleling).

## Transformer paralleling and phasing {#paralleling}

*Level: II*

Source: Lautenschlager, NETA World, Fall 2008 (paralleling electrical systems). Do the nameplate checks first, then the voltage measurements. Do not close a tie on phase letters or on a rotation meter alone.

### Before any phasing shots

*Level: II*

Both transformers should be on the same voltage tap, and each unit's percent impedance should sit between 92.5% and 107.5% of the other. The unit left on a higher secondary voltage, or the stiffer unit (the one with the smaller percent impedance), will take more of the load once the buses are tied.

### What "in phase" means

*Level: II*

Phasing is proved only by measuring voltage across each pair of like-named phases on the two buses and getting a reading of zero, or essentially zero, with a voltmeter or phasing sticks rated for the system. A rotation or sequence meter cannot make that call. That instrument is for confirming motor direction after a reconnection. Do not trust phase letters; they often do not line up from one system to the next. A phase-angle meter or a scope can show which side leads, but those tools are optional.

### Standard angular relationships

*Level: II*

On a standard wye-delta or delta-wye bank, the high-voltage side is 30 degrees ahead of the low-voltage side. On a standard delta-delta or wye-wye transformer that lead is 0 degrees. A standard delta-wye can therefore be paralleled with a standard wye-delta (aside from the lack of a grounded neutral on a delta secondary), and a wye-wye can be paralleled with a delta-delta. A delta-wye cannot be paralleled with a delta-delta or a wye-wye. Older nonstandard banks can have other shifts, including 150 degrees.

### Reading the voltage between like-named phases (Table 1)

*Level: II*

Assume the two buses have the same line-to-line voltage. Lautenschlager's Table 1 converts the voltage between correspondingly named phases into an angle:

- Near zero volts: in phase, 0 degrees
- About half of line-to-ground voltage: about 30 degrees
- A line-to-ground reading: about 60 degrees
- About 1.4 times line-to-ground: about 90 degrees
- A line-to-line reading: about 120 degrees
- About 1.9 times line-to-ground: about 150 degrees
- Twice line-to-ground: 180 degrees

Scattered, inconsistent readings usually mean at least one side is ungrounded. Load can nudge the field numbers a little off the table. Those voltages will not tell you which side leads.

### Common situations and the correction

*Level: II*

- **Situation 2.** Phase-to-phase voltage between every pair of correspondingly named phases, same rotation: the buses are 120 degrees apart, typically a transformer or tie-switch lead sequence error. Rotate the leads on one side so A moves to the old B position, B to C, and C to A. If they are still 120 degrees out, repeat that rotation once more.
- **Situation 3.** Phase-to-phase voltage on two correspondingly named pairs and zero volts on the third, often on wye-delta banks: the two systems have opposing rotation, typically from two leads reversed. Exchange the primary or secondary (or switch) leads on the two phases that showed the phase-to-phase voltage. Do not swap the pair that already reads zero.
- **Situation 5.** Phase-to-ground voltage (60 degrees) between all three correspondingly named buses on the 480 V side of a double-ended substation: one transformer is incorrectly phased relative to the other, often because a standard unit replaced a mirror-image unit. Exchange two primary leads and the same two secondary leads. If H1 and H2 are swapped, X1 and X2 must be swapped as well. Exchanging only the primary leaves the secondaries wrong.
- **Situation 7.** Consistent readings of about 0.5, 1.4, or 1.9 times line-to-ground voltage (30, 90, or 150 degrees): the two systems have different phase relationships, typically delta-wye or wye-delta on one side and delta-delta or wye-wye on the other, and they cannot be paralleled. If all three readings are the same and the rotations match, motor loads may still be transferred by dropping one source and picking the loads up on the other. That is a break-before-make transfer, not a parallel.
- **Situation 8.** Inconsistent voltages, and one or both systems appear ungrounded. Confirm by looking at each bus's line-to-ground voltages; capacitance unbalance on an ungrounded bus can push those readings above twice line-to-line voltage. When both sides are ungrounded, land a fused jumper, rated only for charging current, on the like-named phase of each bus, then take the three shots again. If the buses may be tied, the three readings should be essentially zero, and the pair you jumpered is already at zero. Pull the jumpers before closing the tie. When only one side is already grounded, you can still phase by joining one like-named phase and reading the other two, but a wrong-phase jumper can drive the remaining ungrounded phases to 2.0 times, and 2.75 times, their usual line-to-ground voltage.

## Vacuum breaker field sequence {#mv-vacuum-field}

*Level: II*

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

## Field guide: transfer switch functional test {#ats-functional}

*Level: II*

A transfer switch test proves two things: the switch itself is sound, and the whole emergency sequence works the way the design says. Sources: ATS-2025 7.22.3, NFPA 70-2023 Articles 700 and 701, and NFPA 110-2025 Chapters 4, 6, 7 and 8. NFPA 110 sets the classification, the minimum delay settings, and the test program. The actual settings come from the manufacturer and the design, within those limits (ATS 7.22.3.D.8).

### Setup

*Level: II*

- Coordinate with the owner. A functional test transfers real load, and the building's life-safety loads ride on it.
- Get the design settings: pickup and dropout of the voltage and frequency sensing relays, time delay on engine start, time delay on transfer, retransfer delay, cooldown.
- Have a stopwatch or a recorder that sees both sources and the switch position, and a phase rotation meter.

### Component checks first (switch de-energized and isolated)

*Level: II*

- Manual transfer operation and positive mechanical interlocking between sources (A.9, A.10).
- One-minute insulation readings on every pole, between phases and to ground, with the switch in each source position, plus across open poles (B.2). Optional control-wiring test: 500 V dc for 300 V cable, 1,000 V dc for 600 V cable, 2 MΩ minimum (B.3, D.3).
- Contact or pole resistance. Without manufacturer data, investigate poles more than 50% above the lowest (B.4, D.4).
- Relays and timers calibrated per Section 7.9 (B.6). Phase rotation, phasing, and synchronized operation where the application uses it (B.7).

### Functional sequence (B.8)

*Level: II*

1. Fail the normal source the way the design expects, usually by opening the normal feeder breaker. Note the time.
2. Normal-source sensing relays drop out. Start the time delay on engine start.
3. Engine starts. The alternate-source sensing relays pick up when voltage and frequency are right.
4. After the time delay on transfer, the switch transfers. Check interlocks and limit switches.
5. Restore normal. The retransfer time delay runs, then the switch retransfers.
6. Engine runs its cooldown and shuts down.

Record each setting and each measured time. Compare them with the manufacturer's data and the design, and check that the delays meet the NFPA 110 minimums below. Don't go by a number you remember from another job.

### NEC points to know

*Level: II*

- Emergency transfer equipment is automatic, listed, and marked for emergency use. It prevents inadvertent interconnection of the sources, and it carries only emergency loads (700.5(A), (E)). An ATS is electrically operated and mechanically held (700.5(C)). Reconditioned transfer switches aren't permitted (700.2).
- When emergency loads are on a single feeder, redundant transfer equipment or a bypass-isolation switch is required so the ATS can be maintained (700.5(D)).
- Emergency power within the required time, not to exceed 10 s (700.12). Legally required standby within 60 s (701.12).
- A time delay keeps the switch from retransferring on a brief return of normal power (700.12(D)(1)).
- The AHJ witnesses the commissioning test. Periodic tests follow an approved schedule, and a written record of tests and maintenance is kept (700.3).

### NFPA 110 points to know

*Level: II*

NFPA 110-2025 covers the whole emergency power supply system (EPSS): the generator, its fuel and the transfer switches. Local adoption and the AHJ decide whether it applies to a given site.

- **Type, Class, Level (4.1 to 4.4, Tables 4.1(a) and (b)).**
  - Type is the longest permitted loss of power at the transfer-switch load terminals: Type 10 is 10 s, Type 60 is 60 s, Type 120 is 120 s.
  - Class is the minimum time, in hours, the system carries rated load without refueling or recharging. Class 2 is 2 h, Class 0.25 is 15 min, Class 0.083 is about 5 min, and Class X is some other specified time.
  - Level 1 is for systems whose failure could kill or badly hurt someone. Level 2 is for systems whose failure matters less to people's safety.
- **ATS timing features (6.2.5 to 6.2.10).**
  - A start delay keeps brief dips from starting the engine.
  - Level 1 systems get an adjustable delay that staggers transfer after the EPS reaches proper voltage and frequency.
  - An adjustable retransfer delay lets normal power settle. It is bypassed automatically if the EPS fails.
  - Before shutdown, the engine runs unloaded for at least 5 min to cool down. Small air-cooled engines (15 kW and under) are exempt. No separate timer is needed when the engine control panel provides it or a utility feeder serves as the EPS.
- **Delay settings for operational tests (8.4.5).**
  - Start delay: at least 1 s, or 0.5 s for gas turbines.
  - Transfer to emergency: no minimum.
  - Return to normal: at least 5 min.
  - Shutdown: at least 5 min.
  - Apply these together with the Type limit and the equipment exceptions.
- **Acceptance test of a generator EPSS (7.13).**
  - Notify the AHJ ahead of time.
  - Start with the engine cold and the emergency loads running.
  - Fail normal power: in a new, empty building, open the normal supply. In an occupied building, use an ATS test function or open the normal supply to the ATSs being commissioned.
  - Run on building or representative load for at least 1.5 h. This first part has no minimum load percentage.
  - Record:
    - start delay, cranking time, and time to rated speed and to stable operation
    - voltage, frequency and current
    - oil pressure and water temperature where they apply
    - each retransfer delay (set at 5 min or more) and the cooldown
  - Let the unit cool at least 5 min.
  - Then run a 2 h load test: at least 30% of nameplate kW for 30 min, at least 50% for 30 min, then 100% for 60 min. Site derating applies, and a load bank may add to building load. Coolant temperature must be stable for at least the last 30 min. Take readings every 15 min.
- **Routine inspection and exercise (8.4.1 to 8.4.4).**
  - Inspect Level 1 equipment weekly and Level 2 equipment at least monthly.
  - Exercise both levels under load at least monthly, for at least 30 min.
  - A diesel needs enough load to reach the manufacturer's minimum exhaust temperature, or at least 30% of its standby kW rating (a load bank may make up the 30%). Spark-ignited units use whatever EPSS load is available.
  - Start the test with a simulated outage through an ATS, paralleling gear or a remote test, or by opening a normal breaker. Rotate which ATS starts it.
  - Generator load tests include a full cold start.
- **Annual supplemental load (8.4.2.4).** A diesel that can't meet the monthly criteria still runs monthly on available load. Once a year it also runs at least 50% of nameplate kW for 30 min, then at least 75% for 60 min, for 1.5 h or more without stopping.
- **Monthly transfer switch operation (8.4.6).** Operate each ATS electrically from primary to alternate and back every month. The Type time doesn't have to be met on that monthly run, but there must be a way to confirm it once a year.
- **36-month Level 1 test (8.4.9).**
  - At least once every 36 months, run a Level 1 EPSS continuously for its Class duration. When the Class is longer than 4 h, you may stop after 4 h.
  - Start it with ATS test functions, or by opening the normal supply to the ATSs in the test.
  - A diesel carries at least 30% of nameplate kW, or enough load for the minimum exhaust temperature.
  - It can be combined with the monthly and annual tests under the combined-loading rules.
- **Records (8.3.3, 8.5).**
  - Keep a written maintenance and test schedule.
  - Keep records of inspections, tests, exercises, repairs and changes, and show them to the AHJ on request.
  - Each record covers the date, who did the work, deficiencies found, corrective action and parts, and testing after repairs.
  - Facility management or the AHJ sets how long records are kept.

### Common mistakes

*Level: II*

- Testing by pressing the switch's test button only. That doesn't prove the normal-source sensing works on a real loss of the feeder.
- Forgetting to restore the delay settings you changed to speed up the test.
- Not checking phase rotation on the alternate source after generator work.

### Safety

*Level: II*

The load side stays live through the whole test. Keep the switch doors closed during the functional sequence and wear the PPE the arc-flash label calls for when you operate the source breakers.

## Level III {#apparatus-level-iii}

*Level: III*

## Automation and SCADA {#automation}

*Level: III*

ATS 7.23 covers firmware, backup batteries, date and time, HMI and remote metering, communication failover, tagging and local/remote control, deadband and zero deadband, and clearing events after testing. On microprocessor relays, ATS 7.9.2.B.8 through B.10 also wants the mapped SCADA points proved — protection-operate, protection-fail, communications-fail, and a fault-recorder trigger where used — plus the setting-change alarm, and a confirmation that the communication paths for those points actually work. Isolated element tests do not prove those points. IEC 61850 file types, GOOSE, MMS, and sampled values are in [IEC 61850 basics](#/study/relays.md/iec61850). IEEE C37.1 defines the terms: deadband suppresses analog changes smaller than a set count, a chatter filter disables a status point that changes too often, and select-before-operate arms one point before an operate command can execute. IEEE C37.2 names the RTU as the main SCADA interface and a remote I/O module as having no SCADA master connection. Accuracy stated as a percent of full scale becomes a much larger percent of a small reading.

## Applying study data {#studies-apply}

*Level: III*

MTS Appendix B gives base months for visual, mechanical, and electrical work and a multiplier by reliability requirement and condition (from 0.25 for high reliability in poor condition up to 2.5 for low reliability in good condition). IEEE 399 uses first-cycle currents for low-voltage interrupting duty and medium-voltage close-and-latch duty, and time-delayed currents with motors left out for relay sensitivity. Interrupting duty for a low-voltage breaker or fuse is checked with that first-cycle or interrupting current, including motor contribution as the study specifies, not with a time-delayed current used for relay sensitivity (IEEE 242-2001 Ch. 2; IEEE 399-1997 Ch. 6).

If the field setting sheet on a main is faster than the coordination study, hold the test and get the setting reconciled with the study before you energize or apply the field setting (IEEE 242-2001 Ch. 15). The coordination on the plot is not the coordination that will be in service if the as-left file does not match.

For a short-circuit study whose goal is the largest initial current at a generator bus, use the saturated subtransient reactance, Xd''. A synchronous machine normally runs saturated, and the saturated value is lower than the unsaturated figure, so it yields the higher current (Blackburn, 2.8). Convert that reactance to the study MVA base before you use it. Time-delayed currents answer other questions, such as relay sensitivity, and are not a substitute for that initial-current check.

## Commissioning (ECS) {#commissioning}

*Level: III*

ANSI/NETA ECS-2024 starts where ATS stops. Components are proved by factory and field acceptance tests. Commissioning then proves the system against the Owner's Project Requirements and the Basis of Design (6.2 and 6.3, following the ASHRAE Guideline 0 usage ECS cites). The Owner's Project Requirements are the written statement of what the owner needs, how the facility will be used, measurable performance criteria, success measures, and cost limits. The Basis of Design is the record of the concepts, calculations, product selections, and code decisions used to meet those requirements and the applicable rules. Do not mix the two documents up when you review scope.

The commissioning authority writes the plan while the project is still in design (6.4). The work itself runs in three phases: pre-energization (document reviews, settings, CT circuits, interlocks, energization plan), energization (restricted access, grounds removed, phasing and rotation, differential operate and restraint at medium voltage), and post-energization (fluid and gas samples, infrared under load, loading checks, report).

System function tests are how you show that sensing, processing, and action devices work together correctly. ATS Section 8 points those tests at ECS. Passing isolated component tests does not prove the system.

The commissioning organization is an independent third party. The report includes an issues log of open and closed items. Turnover replaces commissioning locks and tags with the operator's.

Keeping the plan current, and the checks before first energization, are in [the commissioning plan](#/study/apparatus.md/commissioning-plan).

## Fuse ratings and let-through {#fuse-ratings}

*Level: III*

Sources: NFPA 70-2023 110.9, 240.60, 240.67 and 240.83(C); Gill 2nd ed. 7.2.2 and 8.4.1 (Table 8.1).

- **Interrupting rating** must be at least the available fault current at the line terminals (110.9). Fuses are marked with their interrupting rating when it is other than 10,000 A, and with "current limiting" where that applies. Breakers are marked when it is other than 5,000 A.
- **Rejection.** Holders for current-limiting fuses must refuse non-current-limiting fuses (240.60(B)). That is what stops a 10 kA Class H fuse from going where 65 kA is available.
- **Classes from Gill's Table 8.1:**
  - Non-current-limiting: plug fuses and Class H, 10,000 A maximum.
  - Current-limiting, 200,000 A symmetrical: Class J, T, RK1, RK5, R, G, CC (and L).
  - Class K: 50,000 to 200,000 A.
  - Class L: 601 to 6000 A at 600 V.
- **Current limitation.** A current-limiting fuse clears in less than a half cycle. Total clearing time is melting time plus arcing time. Gill takes the first half-cycle asymmetrical rms as 1.4 times the symmetrical rms and the peak as 1.7 times that, about 2.4 times the symmetrical rms. Let-through is close to a triangle, so its rms is the peak divided by √3. Worked: a 30 kA peak is about 17.3 kA rms.
- **Arc energy reduction, fuses 1200 A and up (240.67).** Documentation of the fuse locations. A fuse that clears in 0.07 s or less at the arcing current, or a listed means set below the arcing current (differential relaying, an energy-reducing maintenance switch, active arc-flash mitigation, electronically actuated current-limiting fuses). Performance testing by primary injection or another approved method at first installation, with a written record for the AHJ.


Littelfuse, Fuse Fundamentals, 2025, is a manufacturer paper, not a UL standard. Use it for the application ideas below, and stay inside what that paper actually says. Coordination ratios in its Table 2 apply only to the listed Littelfuse POWR-PRO and POWR-GARD series, not to every brand.

- **Overload versus short circuit.** An overload is overcurrent that stays in the normal current paths, with no insulation breakdown: too much connected load, overloaded machinery, or a mechanical failure such as a failed bearing. If it is not interrupted in time, a sustained overload overheats parts and damages insulation. A short circuit is current that has left the normal path and must be interrupted quickly because of heating, magnetic stress, and arcing. Used as intended, a fuse can cover overloads as well as short circuits. In some uses, such as backing up a breaker or providing motor-branch short-circuit protection, the fuse may be applied for short-circuit duty only.
- **Current limitation.** The paper describes a current-limiting fuse as one that opens and clears a short circuit in less than 180 electrical degrees, that is, in the first half-cycle, and that greatly reduces the destructive heat energy expressed as I²t. Supplemental and Class K fuses are the usual exceptions; most other everyday classes used in modern systems are treated as current-limiting under that description. Because I²t scales with the square of current, a tenfold current rise is a hundredfold energy rise.
- **Voltage rating.** Call that rating the highest ac or dc value the fuse is built to carry, and to interrupt, under. It has to be at least the highest voltage on the circuit where the fuse is installed. A fuse may be listed ac only, dc only, or both. A dc circuit needs a fuse specifically listed for dc. Using an ac-only fuse on dc, or exceeding the voltage rating, can lead to a violent fuse failure. A higher ac rating is not a reason to put an ac-only fuse on a 250 V dc control circuit.
- **Interrupting rating.** That rating is the largest short-circuit current the fuse is listed to clear, at its rated voltage. A UL-listed fuse must clear every overcurrent between its ampere rating and that interrupting rating. Standard UL listings go as high as 300 kA. NEC 110.9 requires any device meant to open fault current to be listed for at least the available short-circuit current at its line-side terminals. In the paper's example, a board with 125 kA available is fitted with 200 kA fuses, which meets the duty and leaves margin if available current later increases.
- **Class R.** UL 248-12 covers Class R at 250 V and 600 V ac (and listed dc ratings), from 0 to 600 A, with a 200 kA rms symmetrical interrupting rating. The class splits into RK1 and RK5. Class R may or may not be a time-delay type; a time-delay fuse in that class must hold 500% of its current rating for a minimum of 10 seconds. RK1 offers a high degree of current limitation and can provide IEC Type 2 (no-damage) protection for motor starters and controls. RK5 offers a moderate degree that is adequate for most applications. Class R fuses fit rejection holders that will not accept a non-Class R fuse.
- **Selectivity, Table 2 of that paper.** For a pair to be coordinated, the downstream fuse has to finish clearing with less I²t than it takes to melt the upstream fuse. For the listed Littelfuse series, that table gives an 8:1 line-to-load ratio for a time-delay RK1 supplying a time-delay RK5, so a 400 A RK1 over a 50 A RK5 meets that row. Class L to Class L, and Class L to RK1 or Class J, are shown at 2:1 for those same series. Do not treat those ratios as a generic rule for every manufacturer.

## Low-voltage switch test values {#switch-values}

*Level: III*

Source: ATS-2025 7.5.1.1 and Table 100.1.

- **Insulation resistance:** one-minute readings on every pole, between phases and to ground with the switch closed, plus across every open pole. Without manufacturer data, use Table 100.1. For 600 V equipment that is 1,000 V dc and 100 MΩ.
- **Contact resistance** across each blade and fuseholder: within the manufacturer's range. Otherwise investigate values more than 50% above the lowest of adjacent poles or similar switches.
- **Fuse resistance:** investigate fuses that deviate from each other by more than 15%. Worked: 0.50 and 0.60 mΩ differ by 20%.
- **Other items:** a ground-fault test per 7.14 where fitted, other protective devices per 7.9, and space heaters working.
- Don't mix up the 15% fuse rule and the 50% contact rule. They answer different questions.

## Voltage and current unbalance {#unbalance}

*Level: III*

Sources: Gill 2nd ed. 12.6.3.9 and 10.4.4; NEMA MG 1-2016 (Rev 2018) 14.3, from the summary of changes in the held excerpt. The MG 1 12.45 and 14.36 derating text isn't in the held excerpt.

- **Formula:** percent unbalance = largest deviation from the average ÷ average × 100. Use it for voltage and for current.
- **Worked, voltage:** 460, 467, 450 V. Average 459. Largest deviation 9. 9 ÷ 459 × 100 ≈ 1.96%.
- **Worked, current:** 100, 108, 94 A. Average 100.67. Largest deviation 7.33. About 7.3%.
- **Guidance:** Gill keeps voltage unbalance within 1–2%. The current effect is roughly 8 times larger. About 3% raises winding temperature by about 25%, 2–3% heats like a 10% overload, and a motor is derated at 4%. MG 1 treats more than 1% supply unbalance as an unusual service condition.
- **Current unbalance** generally stays under 10%. It can be tolerated if the highest leg is within FLA × service factor. When voltage unbalance and distortion are fine but current unbalance is high, suspect the motor: winding damage or an uneven air gap.
- **Causes on the supply side:** loose connections and worn contacts as often as uneven single-phase loading. A blown fuse can leave a motor single-phasing.

## Level IV {#apparatus-level-iv}

*Level: IV*

## Study review after a misoperation {#studies-events}

*Level: IV*

After a misoperation, review the documentation, the coordination study, and the as-left settings, and analyze the event record, before you recommend a corrective action or change a setting (ECS-2024 Section 6; IEEE 242-2001 Ch. 15). Changing a setting first can make coordination worse.

A Category IV transformer on a reclosing feeder still has to stay within the two-second single-event through-fault limit of IEEE C57.12.00-2021 7.1.3.1, counting the accumulated time of the repeated faults, not only the first shot. See [through-fault duration](#/study/transformers.md/through-fault).

## The commissioning plan {#commissioning-plan}

*Level: IV*

The team keeps the commissioning plan current through construction, acceptance, and occupancy (6.4). Everyone executing the plan works from the most up-to-date version; a stale draft on a laptop is not good enough. The plan should describe the work that will be done before, during, and after energization.

Do not energize over open factory or field acceptance deficiencies. ECS includes a review of those records, including open deficiencies, so you can confirm the equipment is in acceptable condition and is ready for first energization and for final acceptance.


## Paralleling math {#paralleling-math}

*Level: IV*

Sources: Lautenschlager, A Guide to Paralleling Electrical Systems, NETA World, Fall 2008, Table 1 and the pre-phasing checks; ANSI/NETA ETT-2026, 8.4.2.A.4.

**Voltage between like phases.** Two sources with equal phase-to-ground voltage VLG and an angle between them read `2 x VLG x sin(angle / 2)` across like phases.

- 0 degrees: 0 V.
- 30 degrees: about 0.52 x VLG.
- 60 degrees: about VLG (2400 V on a 4160Y/2400 V system).
- 90 degrees: about 1.41 x VLG (about 392 V on a 277 V system).
- 120 degrees: phase-to-phase voltage (about 12.47 kV on 12.47Y/7.2 kV).
- 180 degrees: 2 x VLG.

The reading gives the size of the angle, not whether one side leads or lags. Readings that do not settle into this pattern can mean an ungrounded system.

**Fixing 120 degrees.** If all three pairs read phase-to-phase and rotation matches, roll the leads on one side one position and phase again.

**Impedance window.** With taps matched, the guide wants the two %Z values within 92.5% to 107.5% of each other. For a 5.75% unit, the window is `0.925 x 5.75 ≈ 5.32%` to `1.075 x 5.75 ≈ 6.18%`. A 6.25% unit is outside.

**Load sharing.** Parallel paths split load in inverse proportion to impedance on a common base. Two 1000 kVA units at 5.0% and 6.0% carrying 1800 kVA split about `1800 x 6 / 11 ≈ 982 kVA` and `1800 x 5 / 11 ≈ 818 kVA`. The lower-impedance unit takes more of the load.
