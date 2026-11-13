# Safety before any test {#before-you-test}

Nothing in the question bank is a work permit. NFPA 70E-2024 Article 110 is the general electrical-safety practice article. Article 120 is how an electrically safe work condition is established. Article 130 is the work that is still exposed to a hazard.

## Electrically safe work condition {#eswc}

70E-2024 110.2(A) says the employer’s electrically safe work condition policy has to put hazard elimination first.

110.2(B): energized conductors or circuit parts at 50 volts or more are put into an electrically safe work condition before an employee works, if the employee is inside the limited approach boundary, or if the employee interacts with equipment whose conductors are not exposed but an increased likelihood of an arc-flash injury exists.

Conductors are not in that condition until the applicable requirements of 120.2 through 120.6 are done (110.2(C)). Until then, use practices that match the voltage and the energy.

**Normal operation** of equipment is allowed without establishing that condition only when all of the exception’s conditions are true (110.2(B) Exception No. 1): installed properly, maintained properly, rated for the available fault current, used as labeled and as the manufacturer instructs, doors closed and secured, covers on and secured, and no evidence of impending failure (arcing, overheating, loose or bound parts, visible damage, deterioration, water). One miss, and it is not “normal operation.”

Operating a disconnect to create the safe condition, or to return equipment to service, is its own exception (110.2(B) Exception No. 2), after a risk assessment.

## Process order {#loto}

120.6 lists the process in order, if feasible:

1. Find every source. Use up-to-date drawings.
2. Interrupt the load, then open each disconnect.
3. Where you can, see that the blades are fully open or that a drawout breaker is in the test or fully disconnected position.
4. Release stored electrical energy.
5. Block or relieve stored nonelectrical energy so it cannot reclose the circuit.
6. Apply lockout/tagout under a documented procedure.
7. Test for absence of voltage with an adequately rated portable instrument, phase-to-phase and phase-to-ground, at each point of work. Verify the instrument on a known voltage source before and after. 110.6(E) says the same before-and-after check when the circuit is 50 volts or more.
8. If induced voltage or stored energy is a real possibility, ground the conductors before you touch them. Temporary grounds have to be placed so no one is left across a dangerous difference of potential, and they have to carry the fault current long enough for the protective device to clear (120.6(8)).

120.5 is the lockout/tagout procedure itself (planning, who is exposed, simple versus complex, stored energy, verification that controls cannot restart, grounding needs, shift change). A lock holds the isolating device so it takes force to defeat. A tag is a warning in the same spot and, by itself, is weaker. OSHA 3120 makes that distinction in plain language; the electrical order you memorize is 120.6.

## Test instruments {#instruments}

110.6(A): only a qualified person tests, troubleshoots, or measures voltage where a hazard exists. 110.6(B): the instrument and its leads are rated for the circuit, approved for the purpose, and used as the manufacturer says. 110.6(D): look at the instrument and the leads before each use. If anything is damaged, it comes out of service until someone qualified repairs it. 110.6(E): on a circuit at 50 volts or more, prove the instrument on a known source before the absence-of-voltage test and again after it.

Capacitors are called out in 120.5(B)(2): discharge them, and short and ground high-capacitance elements before the associated gear is touched.

## Shock boundaries {#boundaries}

130.4 is the shock risk assessment. Table 130.4(E)(a) is the AC approach-boundary table. Distances are from the exposed energized part to the person. The restricted-approach column assumes elevation not over 3000 ft.

Checked rows for fixed equipment:

- 50 V to 150 V: limited approach 3 ft 6 in, restricted approach “avoid contact.”
- 151 V to 750 V (a 480 V system sits here): limited approach 3 ft 6 in, restricted approach 1 ft 0 in.
- 751 V to 5 kV: restricted approach 2 ft 1 in.
- 5.1 kV to 15 kV: limited approach for fixed parts 5 ft 0 in, restricted approach 2 ft 2 in.

Exposed movable conductors (overhead lines) use the longer limited-approach column, often 10 ft through the medium-voltage rows.

130.4(F)(3): an unqualified person crosses the limited approach boundary only after a qualified person explains the hazard and escorts them the whole time. They never cross the restricted approach boundary.

130.4(G): a qualified person does not bring a conductive object closer than the restricted approach boundary unless they are insulated from the part (gloves and sleeves count only for the parts actually being worked) or the part is insulated from them.

Shock boundaries and the arc-flash boundary are independent. The arc-flash boundary can be the farther one (note under 130.4(E)).

## Arc flash {#arc-flash}

Article 100 defines the arc-flash boundary as the distance at which the incident energy equals 1.2 cal/cm² (5 J/cm²). 130.5(E)(1) repeats that. 130.5(E)(2) allows the boundary from Table 130.7(C)(15)(a) or (b) when those tables’ conditions are met.

130.5(F): select arc-flash PPE by an incident-energy analysis (130.5(G)) or by the PPE category method (130.7(C)(15)). Either method may be used on a piece of equipment. Not both. Do not take an incident-energy number and then force it into a category in Table 130.7(C)(15)(c).

130.5(H): the data behind an equipment label is reviewed at least every 5 years, and the label is updated when the data shows it is wrong. The owner of the equipment owns the label.

130.7’s informational note is easy to over-read: the PPE rules target arc-flash and shock. They do not claim to stop blunt trauma from the pressure wave. A high arc rating is not a reason to skip 110.2.

## Gloves {#gloves}

Table 130.7(C)(7)(a), maximum use voltage (AC rms): class 00 is 500 V, class 0 is 1000 V, class 1 is 7500 V, class 2 is 17000 V, class 3 is 26500 V, class 4 is 36000 V. DC limits are higher and are in the same table. The protector cuff sits shorter than the rolled rubber cuff by the distance in that table.

130.7(C)(7)(c): inspect insulating equipment before each day’s use and after any incident that may have damaged it. Air-test gloves with that inspection. Table 130.7(C)(7)(b): gloves are electrically retested before first issue and every 6 months after. Blankets and sleeves are every 12 months. Protectors are worn over rubber gloves used for shock protection, with the narrow exception in 130.7(C)(7)(a) that requires a retest before reuse and a reduced voltage class.

## Energized work permit {#permit}

130.2(A): when work is done under 110.2(B), a documented energized electrical work permit is required if the work is inside the restricted approach boundary, or if the employee interacts with equipment whose parts are not exposed but an arc-flash injury is more likely.

130.2(C) exemptions, if a qualified person actually uses the safe practices and the PPE: testing, troubleshooting, and voltage measuring; thermography or visual inspection that does not cross the restricted approach boundary; access through an area when no electrical work is done and the restricted boundary is not crossed; housekeeping that stays outside the restricted boundary.

A permit’s contents are listed in 130.2(B), including shock boundaries from Table 130.4(E)(a)/(b), arc-flash results, and a briefing.

## Maintenance program {#nfpa70b}

NFPA 70B-2026 chapters 7 through 9 are the maintenance rules behind an electrical maintenance program. Fundamental tests apply wherever another section calls for them.

A retorque of hardware that is already installed stops at 90 percent of the manufacturer’s original torque. A new threaded joint uses the full specified torque. Equipment through 1000 V gets a DC insulation-resistance test that does not exceed the manufacturer’s test voltage. Above 1000 V, the maintenance program chooses the method. These chapters do not publish a polarization-index number, a dielectric-absorption number, or an infrared temperature-rise limit.

Field tests are classed online or offline, and standard or enhanced. Every test is recorded: who tested, what was tested, the conditions, the date, the test, the pass/fail rule, and the as-found and as-left values. The equipment is then called serviceable, limited-service, or nonserviceable.

Overall condition is the highest of three ratings: physical condition, criticality, and environment. Condition 1 is a clean, current program with nothing open. Condition 2 has at least one concern. Condition 3 is a real change, missed cycles, or an unaddressed alarm. An impending failure that threatens people is taken out of service and marked nonserviceable, unless shutting it down creates a greater hazard. Manufacturer intervals come first. Otherwise the interval table is a maximum, and any extension is written into the program. Two quiet intervals can justify a longer gap. Failures are a reason to shorten it.

The equipment chapters say which tests to run. They do not print numeric pass limits. Contact resistance is still investigated when it is above the manufacturer’s maximum. A few procedure points are explicit: low-voltage breakers are operated at least three times; the inverse-time test is at 300 percent of rated continuous current; control wiring that is tied to solid-state parts is not given an overpotential test. Cables over 1000 V pick at least one method from the list, and very-low-frequency there means below 1 Hz. Cable maintenance in that chapter stops at the final branch-circuit overcurrent device. Liquid-filled transformers get fluid tests that dry types do not. Vented cells get specific gravity; valve-regulated cells get an ohmic check instead. Stationary standby batteries are not the same chapter as a battery energy storage system above 1 kWh.

## Confined spaces {#confined}

29 CFR 1910.146 is the permit-required confined space rule. A confined space is large enough to enter and work in, has limited entry or exit, and is not designed for continuous occupancy. It becomes permit-required if it has any one of these: a hazardous atmosphere or the potential for one, a material that could engulf a person, a shape that could trap or asphyxiate someone, or any other recognized serious safety or health hazard. Entry starts as soon as any part of the body breaks the plane of the opening.

## OSHA work practices {#osha}

29 CFR 1910.147 is the general lockout/tagout rule. An energy-isolating device is a mechanical device that physically stops energy: a breaker, a disconnect, a valve. Push buttons, selector switches, and other control devices are not isolating devices. A lock holds the isolator. A tag is a warning and does not give the physical restraint of a lock. Locks and tags identify the person who put them on, and they are not used for other jobs.

29 CFR 1910.333 is electrical work practice. Exposed live parts are de-energized before work unless the employer can show that de-energizing adds hazards or is infeasible. Parts under 50 V to ground need not be de-energized if that does not increase burn or explosion exposure. Conductors that are off but not locked or tagged are still treated as energized. Control devices and interlocks are not the only means of de-energizing, and they are not a substitute for lockout. A qualified person proves the equipment will not restart, then tests the parts people will touch. If the circuit is over 600 V nominal, that test instrument is checked immediately before and immediately after. Before the gear is re-energized, a qualified person confirms tools, jumpers, shorts, and grounds are removed. The person who hung a lock takes it off, except for the absent-worker rule in that section. Only a qualified person may defeat a safety interlock, only while the work is in progress, and the interlock goes back in service when the work is done.

29 CFR 1910.334 requires test instruments, leads, and probes to be looked at before use. Damaged gear comes out of service until it is repaired and tested. 29 CFR 1910.269 covers generation, transmission, and distribution. It does not replace subpart S for ordinary workplace electrical installations.

## Common mistakes

- Testing “dead” with a meter you did not prove before and after.
- Calling an open door and a buzzing breaker “normal operation.”
- Quoting the 151–750 V restricted boundary for a 15 kV termination.
- Treating 1.2 cal/cm² as a PPE category instead of the arc-flash boundary definition.
- Using a class 00 glove on a 480 V test because “it’s low voltage.”
- Applying temporary grounds before the absence-of-voltage test.

## Temporary protective grounds {#grounds}

Under 29 CFR 1926.962, a line is worked de-energized without grounds only if it is de-energized, can't contact another source, and has no induced-voltage hazard. Grounds form an equipotential zone, are at least No. 2 AWG copper, carry the available fault current for the clearing time, and are installed ground end first with a live-line tool on the line end. Removal is the reverse. Test for absence of nominal voltage first unless a ground is already installed. Grounds may come off for a test only with insulating equipment and isolation. ASTM F855 grades assemblies. A withstand rating can be reused, and an ultimate rating can't. Table 1 covers low X/R, and Table 2 (H grades) covers high X/R. An assembly takes the grade of its weakest component.

## Field guide: confined space entry {#confined-entry}

Vaults, manholes, and transformer pits are part of the job. This guide adds the entry procedure to the definitions in [Confined spaces](#/study/safety.md/confined). Sources: 29 CFR 1910.146, read on eCFR because the held OSHA set lacks it; 29 CFR 1910.269(e) and (t) for utility enclosed spaces.

### Before entry

- **Evaluate the space.** Is it permit-required? Are there atmospheric, engulfment, or entrapment hazards? Are there electrical hazards? Lock out what feeds the space.
- **Permit.** The entry supervisor signs it. It lists the space, purpose, date and duration, entrants, attendant, hazards, controls, test results, rescue arrangements, and communications. It lasts no longer than the task. The supervisor cancels it at the end, and canceled permits are kept at least a year for the annual review (1910.146(e) and (d)(14)).
- **Isolate and ventilate.** Lock out the energy. Bring forced air from a clean source.

### Testing the atmosphere

1. Use a calibrated, bump-tested meter. 1910.269(e) wants instruments accurate to ±10%.
2. Test before entry, in order: oxygen, then flammables, then toxics (1910.146(d)(5)(iii)). Test at different levels, because gases stratify.
3. Hazardous atmosphere limits: oxygen below 19.5% or above 23.5%, or flammable gas above 10% of LFL (1910.146(b)).
4. Keep monitoring during the entry.

### Roles

- **Entrant.** Knows the hazards and stays in contact. Leaves when told, when they notice symptoms, when a prohibited condition shows up, or when an alarm sounds (1910.146(h)(5)).
- **Attendant.** Stays outside the whole time, keeps an accurate count, orders evacuation, calls rescue, and warns off unauthorized people. Takes on no duty that gets in the way of monitoring (1910.146(i)).
- **Entry supervisor.** Verifies the permit, tests, and rescue arrangements. Ends the entry and cancels the permit (1910.146(j)).

### Rescue

- Retrieval systems are the default for non-entry rescue. Vertical spaces deeper than 5 ft need a mechanical retrieval device (1910.146(k)(3)).
- Rescue teams practice at least every 12 months on representative spaces (1910.146(k)(2)(iv)).
- The attendant summons rescue and does not go in (1910.146(i)(4) and (i)(7)).

### Alternate procedures and reclassification

- When the atmosphere is the only hazard and continuous forced air alone keeps it safe, 1910.146(c)(5) allows simpler entry. You still test first (oxygen, flammables, toxics), keep the air running from a clean source, retest periodically, and get out if the meter alarms.
- Ventilation controls a hazard but doesn't eliminate it, so it is not grounds for calling a space non-permit (1910.146(c)(7) note).

### Utility vaults (1910.269)

Check for pressure and temperature hazards before removing a cover, and guard the opening. An attendant trained in first aid stays nearby. Test oxygen before entry unless continuous forced air is running, then test flammables (1910.269(e)).

### Common mistakes

- Testing only at the top of a manhole.
- Turning off the blower once people are in.
- Letting the attendant step away to fetch a tool.

## NEC working space (110.26) {#working-space}

Working space keeps you from being pinned between live parts and a wall, and keeps a way out. These numbers come from NFPA 70-2023 110.26, which applies to equipment likely to be examined, adjusted, serviced, or maintained while energized. The AHJ and the edition adopted locally govern a real installation.

### Depth, Table 110.26(A)(1)

Pick the row by nominal voltage to ground and the column by what faces the live parts. Measure from the live parts themselves, or from the enclosure or opening when they're enclosed.

- **Condition 1:** live parts on one side, and nothing live or grounded on the other. Or live parts on both sides, guarded by insulation.
- **Condition 2:** live parts on one side, grounded parts on the other. Concrete, brick, and tile walls count as grounded.
- **Condition 3:** live parts exposed on both sides of the space.
- **0–150 V:** 3 ft for all three conditions.
- **151–600 V:** 3 ft, 3 ft 6 in., 4 ft.
- **601–1000 V:** 3 ft, 4 ft, 5 ft.

Worked: 480Y/277 V gear facing a block wall is 277 V to ground, Condition 2, so 3 ft 6 in.

### Width, height, and the rest

- Width is the equipment width or 30 in., whichever is greater, and always enough for a 90° door opening.
- Height is 6½ ft or the equipment height, whichever is greater.
- Rear working space isn't required on dead-front assemblies serviced from the front. Rear access for nonelectrical parts gets 30 in.
- No storage in the working space (110.26(B)).
- Equipment rated 1200 A or more and over 6 ft wide needs an entrance at least 24 in. wide and 6½ ft high at each end. A single entrance is allowed with unobstructed egress or double the required depth (110.26(C)(2)).
- Equipment rated 800 A or more with a personnel door within 25 ft of the working space: the door opens at least 90° in the egress direction and has listed panic or fire exit hardware (110.26(C)(3)).
- Lighting is required, and it can't all be on automatic control (110.26(D)).
- Dedicated equipment space runs from the floor to 6 ft above the equipment or to the structural ceiling, whichever is lower (110.26(E)(1)(a)).

### In the field

Check the space before you open a door. A cart, a ladder, or a stack of reels in front of the gear is a working-space violation and a tripping hazard on the way out.
