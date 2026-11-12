# More apparatus {#apparatus}

## Switchgear assembly {#switchgear}

ATS 7.1.1 starts with the cubicle, not the breaker. Nameplate, mimic, and fuse or breaker sizes have to match the drawings and the coordination study. Shipping bracing comes out. Interlocks are proved by trying a locked-open device and by walking the key exchange, not by defeating the lock. Shutters and barriers have to be in place. Bus insulation resistance has to be above the minimum before a dielectric withstand. Control wiring is held to a 2 megohm floor, which is not the Table 100.1 floor used for power insulation.

## Medium-voltage vacuum breakers {#mv-vacuum}

ATS-2025 7.6.3 is the vacuum medium-voltage breaker. Insulation resistance with no manufacturer voltage uses Table 100.1. Control wiring is not less than 2 MΩ. Contact resistance uses the manufacturer’s band or, if there is none, the 50-percent-of-the-lowest screen against adjacent poles. Close and trip coil pickup uses Table 100.20 when the manual is silent.

The vacuum bottle itself is a withstand across the open interrupter. With no manufacturer pressure number, ATS 7.6.3.D.9 says each interrupter’s pressure shall not be greater than 1×10⁻² Pa and shall not differ from the adjacent poles by more than two orders of magnitude. A magnetron atmospheric-condition test is optional. Bushing power factor and capacitance, when they are tested, should stay within 10 percent of the nameplate; hot-collar results are compared with similar bushings.

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

## EV charging {#evse}

ATS 7.26 is the charging equipment. The electrical list includes the equipment ground, protective-conductor resistance, touch voltage, personal-protection trip, nuisance trip, proximity pilot, and control pilot. Investigate a protective-conductor resistance above 0.5 Ω. Interlocks are part of the visual and mechanical inspection. The trip thresholds themselves come from the charger manual.
