# Level III expectations {#expectations}

Level III is the certified technician who can run the test and defend the number. The same TestGuy study guide, citing the December 2022 outline, weights Level III about:

- Safety — 13%
- Theory — 23%
- Component testing — 47%
- Systems and commissioning — 17%

Systems is no longer a sliver. Expect control-schematic order, interlocks, ground-fault sensor routing, and more than one step of math (fault current from percent impedance, kvar from a power factor, a temperature rise converted without adding 32).

## What changes from Level II

- You choose the ATS paragraph or the MTS paragraph. Acceptance and maintenance limits are not interchangeable. Checked examples: liquid-filled power-transformer power factor, 15 kV VLF withstand, and the adjustable molded-case instantaneous band.
- Manufacturer data wins when it exists. NETA tables are what you use in the absence of that data.
- A passing ratio does not retire excitation, and a pretty winding-resistance set does not retire the core-ground reading.
- Print reading is text logic here: which coil picks up first, what an `a` contact and a `b` contact do when a lockout changes state, and why a second copy of a key interlock key defeats the scheme.

## Exam format {#exam-format}

Same published format as Level II: closed book, Pearson VUE, on-screen calculator and formula sheet, scaled pass mark 410 on a 200 to 500 scale. Level III is 100 questions in 2 hours. Level IV, for comparison, is 65 questions in the same 2 hours. The Level IV field notes, and a map of those topics, are on the [Level IV page](#/study/level-4.md/expectations). The on-screen sheet is the official NETA Electrical Formulae Sheet updated June 29, 2017. What it prints is on the math page. Source: NETA’s technician-certification and exam-preparation pages, linked from the About page.

Per-unit fault current, series and parallel inductors, and a wye capacitor measured line-to-line are not handed to you as finished recipes. Degree mode still matters when the question gives an angle instead of a power factor.

## Schemes worth drilling {#schemes}

**51 to 86 to 52.** A time-overcurrent element (51) that is wired to a lockout (86) picks up first. Its contact energizes the 86 coil. The 86 seals in, and an 86 contact energizes the breaker trip coil (52/TC). Resetting the breaker alone does not reset the 86.

**a and b contacts.** An `a` contact follows the device: open when the coil is dropped, closed when the coil is picked up (normally open). A `b` contact is the opposite (normally closed). A close-permissive circuit often uses an 86 `b` contact so a tripped lockout opens the permissive.

**Key interlocks.** The scheme only works if the trapped key is the only key. A spare cut to the same code lets someone open the grounded switch and the live switch together.

**Zone interlocking.** ATS lists it as an auxiliary function to verify on a low-voltage power breaker. In the scheme, a downstream trip sends a restraint so the upstream short-time or ground function waits. No restraint, and the upstream function is allowed to trip on its faster unrestrained time. Confirm the wiring in the breaker manual; do not assume every trip unit implements it the same way.

## Who leads the crew {#crew-leader}

ATS-2025 and MTS-2023 both say, in 3.2 item 2, that technicians are certified under ANSI/NETA ETT, and each on-site crew leader holds a current Level 3 or higher certification in electrical testing. ECS-2024 3.2 requires commissioning personnel to be trained, experienced, and able to work safely and judge the data, but it names no certification level. So the Level 3 crew-leader rule applies when the job is written to ATS or MTS. Check which standard the specification calls up.
