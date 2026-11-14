# Life-safety power and other NFPA field tests {#life-safety}

*Level: II*

This page covers the NFPA documents a NETA tester runs into on emergency, health-care, fire, hazardous-area and storage jobs. It points to the edition and section for each item. The NFPA text itself is not reproduced here; read the adopted edition on NFPA LiNK or your client's copy. Which edition applies, and whether a document applies at all, is decided by local adoption and the AHJ.

NFPA 72, 99, 101, 110, 111, 20, 780, 496, 499, and 855 are not on the ETT-2026 reference list. Treat those sections as background for field work; they are less likely to appear on the exam. NFPA 79 is on the Level IV list (the exam list names the 2021 edition; these notes follow 2024). The 70E-2027 points are called out in their own sections.

Generator Type, Class and Level, and the NFPA 110 test program, are in the [transfer switch field guide](#/study/apparatus.md/ats-functional).

## Level II {#life-safety-level-ii}

*Level: II*

## Emergency lighting and exit signs (NFPA 101-2027) {#emergency-lighting}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Duration.** Emergency lighting has to last at least 1.5 hours after normal lighting fails (7.9.2.1). A new generator feeding it is rated Type 10, Class 1.5, Level 1 or better (7.9.2.2).
- **Light levels at the start (7.9.2.1.1).** On the egress path floor, the average must be at least 1 foot-candle and no single spot may be under 0.1 foot-candle. Check both. A good average does not excuse a dark spot.
- **Light levels at the end (7.9.2.1.2).** The light may fade over the run. At 1.5 hours the floor may be down to an average of 0.6 and a spot minimum of 0.06 foot-candle.
- **Uniformity (7.9.2.1.3).** Divide the highest reading by the lowest. The answer may not exceed 40. Example: 5.0 / 0.1 = 50, which fails.
- **Testing options (7.9.3.1).** The owner picks one of four paths:
  - Manual (7.9.3.1.1): a 30-second functional test every month, spaced 3 to 5 weeks apart, plus a 1.5-hour test every year on battery units.
  - Self-testing units (7.9.3.1.2): the unit runs its own 30-second check every 30 days and flags a failure. People still look at it at least every 30 days and run the yearly 1.5-hour test.
  - Computer-based self-testing (7.9.3.1.3): the system logs its own monthly and yearly tests and can show the history of tests and failures at any time.
  - The fourth option (7.9.3.1.4) points back to another section. Read it before you rely on it.
- **Records.** Keep written results for the AHJ on every path.
- **Exit signs.** An externally lit sign needs at least 5 foot-candles on the face, with a contrast ratio of 0.5 or better (7.10.6.3). An internally lit sign is listed to UL 924 (7.10.7.1). Battery exit signs are tested the same way as battery emergency lights (7.10.9).

## Stored-energy systems (NFPA 111-2025) {#stored-energy}

*Level: II*

Background: not on the ETT-2026 reference list.

NFPA 111 is the UPS and battery version of NFPA 110.

- **Type (Table 4.2.2) is the allowed gap at the load terminals.** O has no gap, A is a quarter cycle, B is one cycle, 10 is 10 seconds, and M is manual with no limit.
- **Class (Table 4.3) is the run time at rated load, in hours.** 0.033 is 2 minutes, 0.083 is 5 minutes, 0.25 is 15 minutes, and 1.5 is 90 minutes. Class X is whatever the application needs.
- **Acceptance (7.6.2).**
  - Start with charged batteries and a rated load.
  - Cut normal power by opening its own switches or breakers, with every emergency load connected.
  - Record how long the system took to pick up the load, plus voltage and current, and frequency and waveform where they apply.
  - Recharge on normal power for 24 hours.
  - Then run a full-Class load test. A load bank equal to the equipment rating may make up missing load.
- **Read 7.6.2.3.3 and 7.6.2.3.4 together.** The first run and the later procedure each mention a shorter "15 minutes or Class time" duration. This guide doesn't settle how that fits with the full-Class test. Take it to the AHJ.
- **Ohmic baseline (7.6.5).** A lead-acid battery with permanent ohmic monitoring gets a baseline on every cell roughly half a year after the full-load test, or two weeks following the latest discharge, fully charged on float.
- **Routine.** Level 1 equipment is inspected monthly (8.4.1). Record output and battery voltage and test duration at the start and end of each load test (8.4.3.1). An unacceptable ohmic deviation sends you to a full-Class load test (8.4.3.2).
- **Annual load test (8.4.4).** Pick one: full load for 60% of the Class time, or 60% load for the whole Class time. On Class 1.5, that is full load for 54 minutes, or 60% load for 90 minutes.
- **Recharge (5.2.8.2).** After a full-Class outage, a battery system must reach 80% charge in no more than 12 × the discharge time, and to 100% within 48 hours. Ultracapacitor and flywheel-type systems recover fully within an hour.

## Hospital essential electrical system (NFPA 99-2027) {#hospital-ees}

*Level: II*

Background: NFPA 99 is not on the ETT-2026 reference list.

- **Branches.** The life safety and critical branches come back automatically within 10 seconds (6.7.5.3.1). The equipment branch follows on a delay, or by hand in sequence, so the source isn't overloaded (6.7.5.1.4.2, 6.7.3.4.1).
- **Monthly tests (6.7.4.1.1.5).** On-site sources are tested 12 times a year, 20 to 40 days apart. The test runs under load and simulates a real failure, and EES loads are transferred both automatically and manually. Generators are tested the NFPA 110 Chapter 8 way.
- **The 10-second rule on monthly runs (6.7.4.1.1.2).** The 10-second target isn't enforced on the monthly test. If it is missed, the facility needs a set way to confirm the capability once a year.
- **Feeders (6.7.4.1.2.1).** Insulation resistance on the main feeders is taken before acceptance and again any time damage is suspected.
- **Program (6.9).** EES components belong in an NFPA 70B maintenance program. Table 6.9.4.1 puts transfer equipment on a monthly inspection, with service and test every 3 years. Records are kept 5 years.

## Patient-care grounding and receptacles {#patient-care-grounding}

*Level: II*

Background: NFPA 99 is not on the ETT-2026 reference list.

From NFPA 99-2027, section 6.3.3.

- **Receptacles (6.3.3.2).**
  - Check physical condition, ground continuity and polarity.
  - Check that the grounding blade is held with at least 115 g (4 oz). Locking types are exempt.
  - Non-hospital-grade receptacles in the named patient locations are tested at least every 12 months.
- **Grounding performance (6.3.3.1).**
  - In new construction, measure voltage and impedance from a reference point, at 10% of the receptacle grounding contacts in each patient care vicinity.
  - The meter must be accurate to ±5%.
  - Impedance may be up to 0.2 ohm where isolated-ground receptacles are used, and up to 0.1 ohm otherwise.
- **Ground-fault protection (6.3.3.4).** Each level is performance tested when first installed.

## Isolated power and the LIM {#isolated-power}

*Level: II*

Background: NFPA 99 is not on the ETT-2026 reference list.

- **Installation (6.3.2.9.2).** Each isolated conductor, receptacles included, must show more than 200,000 ohms to ground. Afterward, restore the LIM ground and record its unloaded reading for future comparison.
- **What the LIM does (6.3.2.9.3).** Green means isolation is good. Red plus an audible alarm come on at 5.0 mA of total hazard current. It must stay quiet below 3.7 mA of fault hazard current.
- **Before service (6.3.3.3.2).** Ground each line in turn through a resistor of 200 ohms per volt of measured line voltage. Both the light and the horn must work. On 120 V that is 200 × 120 = 24,000 ohms. Repeat after distribution repairs or renovation (6.3.3.3.4).
- **Routine (6.3.3.3.3).** Press the test switch at least monthly, or up to every 12 months for a LIM with automatic self-test and self-calibration.

## Fire alarm power and batteries (NFPA 72-2025) {#fire-alarm-power}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Transfer (10.6.6).** The secondary supply takes over within 10 seconds at the protected premises.
- **Capacity (10.6.7.2).**
  - A plain alarm system needs 24 hours of standby, then 5 minutes of alarm.
  - A voice system needs 24 hours, then 15 minutes at full connected load.
  - Count every load that isn't shed on transfer.
- **Generator as secondary (10.6.11.3).** It must be Type 10, Class 24, Level 1.
- **Annual secondary test (Table 14.4.3.2 item 8).**
  - Remove primary power and confirm trouble.
  - Check current demand against the battery rating with margin.
  - Run the general alarm at least 5 minutes, or voice at least 15, then restore primary.
- **VRLA checks (Table 14.4.3.2 item 9).** Do these at acceptance and every six months, and protect volatile panel software before battery work.
  - **Temperature.** Measure the cabinet ambient on opening, then each unit at its negative terminal. Replace a unit running hotter than ambient by more than 18°F (10°C).
  - **Charger.** Set it to the manufacturer's value. If it is adjustable and no value is given, use 2.265 V per cell, ±0.015 V, at 77°F.
  - **Ohmic.** Compare with the baseline. Replace at a 30% conductance drop or a 40% resistance or impedance rise.
  - **Capacity.** Every 3 years, replace the battery or load test it at a 3-hour-or-longer rate. Replace at 80% or less, and replace at the next scheduled test when it is below 85%.
- **Inspection (Table 14.3.1).** Replace a unit with corrosion, distortion or leakage, or one past its replacement date.
- **Not used here.** The table's per-unit voltage criterion (item 9(3)) wasn't clear enough in our notes to teach, so it is left out. Read the item and its configuration notes yourself.

## Fire pump controllers and transfer switches (NFPA 20-2025) {#fire-pump}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Voltage limits (9.4).** During starting, the controller line terminals may drop no more than 15% below the controller rating. With the motor drawing 115% of full-load amps, the contactor load terminals may drop no more than 5% below the motor rating.
- **Transfer switch (10.8).**
  - A manual transfer switch between the two supplies is not allowed.
  - The switch is listed for fire pump service and rated for the available fault current.
  - It operates electrically and latches mechanically, carries 115% or more of motor full-load amps, and can switch locked-rotor current.
  - It starts the generator and transfers when any normal phase drops below 85% of motor-rated voltage.
- **Acceptance (14.2).**
  - The installer completes the motor, control and supply wiring before startup.
  - Each phase current stays at or under service-factor amps.
  - Voltage at the contactor output lugs stays within 5% below to 10% above the nameplate.
  - Phase reversal is tested on each source.
  - At least 6 automatic and 6 manual starts, each at full speed for 5 minutes (variable-speed pumps are exempt from the run time).
  - Simulate normal power loss at peak load. Transfer and retransfer must not trip the overcurrent protection on either line.
  - At least half the operations run on the alternate source.
  - Total run time across the tests is at least 1 hour.
- **After acceptance.** Periodic inspection, testing and maintenance follow NFPA 25 (14.4).

## Lightning protection (NFPA 780-2026) {#lightning}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Electrodes (4.12).** Each down conductor ends at its own lightning electrodes, or at a bonded multi-electrode system with a ground ring. Rods measure at least 8 ft by 1/2 in. When it is practical, connected rods sit no closer than their driven depths added together. Pipes and rods of other systems don't count as lightning electrodes.
- **Bonding (4.13, 4.14).** Grounded systems are tied together within 12 ft of the structure base. Over 60 ft tall, use a ground loop and add a roof-level tie within 12 ft of the main roof.
- **SPDs (4.19).** An SPD goes at every power service, with 20 kA or more nominal discharge per phase (8/20 µs). SPDs also go where circuits between buildings run over 100 ft.
- **Inspection (Annex D).** Annex D is informational, so treat its intervals as recommendations unless a spec or the AHJ adopts them.
  - It recommends inspection at completion, a visual inspection at least yearly, and a complete inspection every 3 to 5 years (1 to 3 for critical systems).
  - It also recommends an extra look after building work or a known strike.
  - The complete inspection adds continuity of hidden parts and earth resistance of the system and of each electrode where it can be disconnected.
  - Judge resistance by comparing with earlier results taken the same way. Annex D gives no single ohm limit.

## Battery energy storage commissioning (NFPA 855-2026) {#bess}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Timing (6.1).** Commission after installation and before final inspection and approval.
- **Plan (6.1.3).** The installer or commissioning agent writes it. It covers the system, its controls and its safety systems: detection, suppression, thermal management, ventilation, spill control and safety interlocks.
- **Report (6.1.5).** It goes to the owner and the AHJ before approval, and a copy stays with the O&M manuals. Open issues need an AHJ-accepted corrective plan before service.
- **Recommissioning (6.4).** Qualifying alterations, additions or relocation mean recommissioning the whole system. A like-for-like repair does not.
- **Ongoing tests (7.3).** They follow the manufacturer and the O&M documents. The general chapter gives no single calendar interval.

## Purged and pressurized enclosures (NFPA 496-2027) {#purged-enclosures}

*Level: II*

Background: not on the ETT-2026 reference list.

- **Pressure (4.4).** Keep the inside at 25 Pa (0.1 in. water) or more over ambient whenever the equipment is on. A bypass needs an alarm and tool or password protection.
- **On pressure loss.** Type X generally cuts power automatically, with a short delay allowed only where a sudden trip is worse, and alarms at an attended spot (4.11). Type Z only has to detect and alarm or indicate (4.9).
- **Purge before energizing (5.4, 5.5).** At least 4 enclosure volumes, or 10 for motors and generators, while holding 25 Pa. Type Y and Z may skip the purge when pressure is up and the inside is known to be safe. Type X may not.
- **Doors (5.5.2).** A Type X enclosure that opens without a tool must de-energize the unsuitable circuits when opened.
- **Field note.** These are function checks, not a calendar interval. Follow the equipment instructions.

## Hazardous-area classification (NFPA 497 and 499, 2027) {#hazloc}

*Level: II*

Background: NFPA 497 and 499 are not on the ETT-2026 reference list.

Both are recommended practices. They tell the classification team how to draw the boundaries. They don't set an electrical test schedule.

- **Gas and vapor (497).**
  - Division 1 means a flammable mixture can occur in normal work, including frequent maintenance. Division 2 means it is likely only when something goes wrong.
  - Zone 0 means the mixture is present all the time or for long periods.
  - Zone and Division labels are not interchangeable.
- **Sizing the area (497 5.6, 5.9).** Use the material, the release conditions, the real ventilation and the site layout. Ask operators and maintenance staff about leaks. Don't paste in a stock diagram.
- **Dust (499).**
  - Clouds in normal work or frequent maintenance point to Zone 20 or 21, or Class II, Division 1.
  - Layer depth and buildup rate feed the review, but they are not a pass/fail number for a motor or panel.
  - Housekeeping and tight equipment shrink the classified area.

## Test before touch: 70E-2027 points {#test-before-touch-2027}

*Level: II*

This bank's safety page is written to 70E-2024. These are 2027 items the notes support. They are not a full change list.

- **Absence of voltage (120.6(7)).** At every work location, check each phase line to line and line to ground, with a rated tester proved on a live source before and after. The same sequence is in 70E-2024 at 120.6(7).
- **Noncontact testers (Exception 2).** Above 1000 V, a noncontact capacitive tester may check each phase. The 2027 note adds that it has a minimum operating voltage, so it shows no detectable voltage, not zero. Exception 2 itself is also in 70E-2024 at 120.6(7).
- **Standby person (130.2(A)(2)).** New in the 2027 edition. If a permit specifies shock or arc-flash PPE, a second person trained in emergency response must be present, standing beyond whichever boundary is bigger, limited approach or arc flash.

## IT rooms, telecom, plants and fuel cells (NFPA 75, 76, 850, 853) {#other-nfpa}

*Level: II*

- **NFPA 75-2024.** The IT room disconnect also separates a room UPS battery from the load (11.5.1). Replacement lithium-ion UPS batteries must match the UPS listing (11.5.4.2).
- **NFPA 76-2024.** Battery-room fan failure and hydrogen alarms send a supervisory signal, plus local warning if staff are at risk (8.4.2.2.5 to 8.4.2.2.6).
- **NFPA 850-2026.** Separation of outdoor oil transformers is set in the fire protection design basis document, using firewalls or spacing (6.1.4).
- **NFPA 853-2025.** Fuel cell gas detection alarms at 25% of the LFL and shuts off the fuel at 60%. Loss of required ventilation or exhaust shuts the unit down (7.2.2, 7.3.4, 8.1.5).

## Level III {#life-safety-level-iii}

*Level: III*

## Current-driven circuits (70E-2027 Exception 3) {#current-driven-2027}

*Level: III*

Exception 3 is new in the 2027 edition; 70E-2024 has only Exceptions 1 and 2 at 120.6(7). When a voltage test alone can't prove the circuit is dead, add another method, such as checking for absence of current.

## Level IV {#life-safety-level-iv}

*Level: IV*

## Machine wiring tests (NFPA 79-2024) {#machine-wiring}

*Level: IV*

NFPA 79 is on the ETT Level IV reference list. The exam list names the 2021 edition; these notes follow 2024.

- **What is always required (18.1).** Continuity of the ground-fault current path is always verified and documented. The other tests below are done when they apply.
- **Continuity (18.2).** Either measure impedance, 0.1 ohm or less after subtracting the leads, or drive at least 10 A from a SELV source and keep the drop within Table 18.2. For 14 AWG that is 1.9 V.
- **Insulation resistance (18.3).** 500 V dc between power conductors and the ground path. At least 1 megohm.
- **Voltage test (18.4).** Ramp to 1500 V ac (or the 2121 V dc equivalent) and hold at least 1 second. Use a supply of at least 500 VA, and disconnect parts that can't take it.
- **Also (18.5 to 18.7).** Residual voltage and functional checks, especially safety functions. After any change, retest the changed part.
