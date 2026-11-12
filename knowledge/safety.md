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
