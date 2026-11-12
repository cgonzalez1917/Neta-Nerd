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
