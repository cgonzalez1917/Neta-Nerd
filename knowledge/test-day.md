# Test day and the TI-30XS {#test-day}

*Levels: II, III, IV*

What actually happens on exam day, and how to keep the on-screen calculator from costing you points. Format facts come from NETA's technician-certification, exam-reminders, and exam-preparation pages and from Pearson VUE's NETA page, checked November 2026. Pearson interface details are the platform's usual behavior, not a NETA-written spec, so confirm them in the Pearson demo before you go.

## Format at a glance {#format}

*Levels: II, III, IV*

- Computer-based, multiple choice, closed book, taken onsite at a Pearson VUE test center. No hands-on or practical section at any level.
- Level II: 100 questions in 2 hours. Level III: 100 questions in 2 hours. Level IV: 65 questions in 2 hours.
- Domain weights (December 2022 outline): Level II safety 15%, theory 25%, component 55%, systems 5%. Level III 13 / 23 / 47 / 17. Level IV 10 / 15 / 55 / 20.
- Scored on a scale of 200 to 500. A scaled 410 or higher passes. NETA does not publish a raw percent cutoff, so don't trust anyone quoting one.
- If you fail, there is a 60-day wait before you can be reauthorized. That goes through your company's accredited representative or branch manager, not through Pearson.
- Pearson has an OnVUE (remote) page for NETA, but NETA's own pages still describe onsite testing. Treat taking it from home as unconfirmed until NETA says otherwise.

## Check-in {#check-in}

*Levels: II, III, IV*

- Plan to arrive about 30 minutes early. Pearson's NETA page warns that arriving more than 15 minutes late can cost you the appointment.
- Bring the ID the confirmation asks for. Expect a photo, a palm-vein scan, and a signature.
- Phones, notes, watches, and your own calculator go in a locker. You get nothing from home at the desk.
- Scratch work is usually on an erasable noteboard and marker the center hands you. Ask at check-in if you don't see one.

## On the screen {#screen}

*Levels: II, III, IV*

- A timer and an item counter sit at the top. Next and previous move between items.
- Flag for review marks an item to come back to. Use it on long math so one problem doesn't eat ten minutes.
- A button opens the formula sheet. It is NETA's official one-page Electrical Formulae Sheet, updated June 29, 2017, including the lower block (three-phase, delta and wye, 746 W per hp, torque, capacitor kvar, resonance, machine frequency, and the watthour Kh note). What it prints and what it doesn't is on the [math page](#/study/math.md/not-on-sheet).
- Another button opens the calculator.
- After the last item, a review screen lists every item and shows which are flagged or unanswered. End Exam is final.
- Practice the layout in Pearson's free demo: https://www.pearsonvue.com/us/en/test-takers/demo-test.html
- NETA's paid practice exam (40 to 50 retired items, one hour) runs on a different vendor's site. It is good for content, but it is not the Pearson screen.

## The TI-30XS {#calculator}

*Levels: II, III, IV*

NETA's exam-preparation page shows the on-screen calculator as a TI-30XS MultiView and tells you to use the `mode` key and arrows. The setting marked there is **CLASSIC**, not MathPrint.

- CLASSIC is only the display style: one-line entry, like a basic scientific calculator. The angle unit is a separate line in the same menu. Set **DEG** too.
- Prove degree mode in two seconds: `sin(30)` must read 0.5. In radian mode it reads about −0.988. `cos(0)` reads 1 in both modes, so it proves nothing.
- Enter prefixes as powers of ten. 40 mH is `40 × 10⁻³` (or 0.040). 25 µF is `25 × 10⁻⁶`. Most reactance misses on this exam are a dropped prefix, not bad algebra.
- Use the reciprocal key (`x⁻¹`) for XC and for parallel resistors. Work out 2πfC, then press `x⁻¹` on the answer. For parallel resistors, add the reciprocals, then `x⁻¹` the sum.
- Put parentheses around a whole radicand or denominator. `√(30² + 22.3²)` is not the same keystrokes as `√30² + 22.3²`.
- Write intermediate results on the noteboard. Closing the calculator window usually clears it.

## Sanity checks before you click {#sanity}

*Levels: II, III, IV*

Most wrong answers on the math items fail a quick reasonableness test. Run these before you move on:

- Power factor sits between 0 and 1. If you got 1.25, you inverted R/Z or W/VA.
- Z is never smaller than R. At resonance Z equals R.
- A parallel resistor total is below the smallest branch. A series capacitor total is below the smallest capacitor.
- A capacitor on a lower voltage gives fewer kvar, by the square of the voltage ratio.
- A longer cable run reads more resistance, not less.
- Peak is larger than rms. Line-to-line is larger than line-to-neutral in a wye.
- A hot insulation reading corrected to a cooler base goes up. A hot winding resistance corrected to a cooler base goes down.
- A reactance in the thousands of ohms for a small reactor usually means millihenries went in as henries.

## Time {#time}

*Levels: II, III, IV*

Two hours for 100 items is about 72 seconds each. Level IV gives about 110 seconds each for 65 items. Make a first pass, answer what you know, and flag the long calculations. Before you end the exam, use the review screen to make sure nothing is left blank, since a blank can't earn credit.

## How to use the official exam outline {#outline}

*Levels: II, III, IV*

NETA's detailed content outline (the DCO, updated December 2022) is the closest thing to a syllabus. It sits in ANSI/NETA ETT Section 8, and NETA posts it on the exam-preparation page with the June 2026 roadmaps and the October 2023 reference list.

- Each level's outline is split into the same four domains with the weights above. Under each domain is a list of tasks and topics.
- Use it as a checklist. For each line, find the matching study page or question set here, work it, and mark it. Lines you can't match are where to spend time.
- The reference list tells you which documents the items are written from. ATS and MTS Section 2 (applicable references) lists the IEEE, NFPA, and other standards each test procedure leans on. That is how you find the book behind a test.
- The roadmaps lay out a phased plan (training, field time, practice exam, scheduling) for each level. They are study plans, not new exam content.
- Responsibility matters at Level III. ATS-2025 3.2.2 says each on-site crew leader holds a current Level 3 or higher certification, and the Level III outline is written around supervising, switching, and evaluating results.

Don't study from recalled exam items posted online. This site writes original questions about the same skills.
