# Delta-T {#delta-t}

*Level: II*

Infrared work in ATS is Section 9, and the suggested actions are Table 100.18. The table is a guideline where there is no consensus ΔT for that exact equipment. Load current matters, because heat tracks the square of current. Compare similar components under similar load when you can.

Checked rows:

- 1 °C to 3 °C between similar components (or 1 °C to 10 °C above ambient): possible deficiency, investigate.
- 4 °C to 15 °C between similar components (or 11 °C to 20 °C above ambient): probable deficiency, repair as time permits.
- Above 15 °C between similar components, or above 40 °C above ambient: major discrepancy, repair immediately.
- The 21 °C to 40 °C ambient band is “monitor until corrective measures can be accomplished.” There is no similar-component cell in that middle ambient row.

A temperature rise converts by 1.8 with no +32. A 10 °C difference is 18 °F, not 50 °F. See the math page.

Emissivity is why a shiny bus can lie. Low-emissivity metal reflects the room. Tape or a known-emissivity target, or compare two similar shiny parts with each other, before you condemn a connection from an absolute temperature.

The person shooting the picture has to know the gear. Table 100.18 says that in the notes. A hot spot on a bus joint and a hot spot on a transformer tank are not the same action just because the color bar matches.

Section 9 is referenced from equipment chapters (“perform thermographic survey in accordance with Section 9”). It is not a substitute for contact resistance. It finds the joint you should measure.

## Common mistakes

*Level: II*

- Quoting an absolute temperature with emissivity left at 0.95 on a bare copper bus.
- Comparing a loaded phase with an unloaded phase and calling it ΔT.
- Treating the table’s “repair immediately” row as permission to open energized gear with no shock or arc-flash plan. Thermography that does not cross the restricted approach boundary is one of the energized-work-permit exemptions in 130.2(C), and it is still energized work.

## Emissivity and reflections {#emissivity}

*Level: II*

The imager can't separate emitted from reflected energy. Shiny metal emits poorly and mirrors its surroundings. Painted, dirty, or oxidized surfaces are usually around 0.7 to 0.9. Visible color doesn't set emissivity. To check for a reflection, change your viewing angle: a reflection moves and real heat stays put. Sun on a surface can be a reflection or real solar heating, and those are different problems. Scan under as much load as you can, and record it, because heating goes roughly with current squared.

## Phase loading and imbalance {#phase-loading}

*Level: II*

Source: Fluke, Introduction to Thermography Principles, ch. 6 and ch. 7.

An infrared survey under load is the practical way to spot one phase carrying more than the others, because current imbalance shows up as uneven heating while the gear stays in service. Heat goes with I²R, so twice the current is four times the heat. Before calling a warm phase a bad connection, take clamp-on readings. If one phase carries much more current (say 190 A against 120 A and 115 A), the whole phase runs warm and the cause is load. Comparative work only means something when every variable but one is the same.

## Level III {#thermography-level-iii}

*Level: III*

## Reading a hot phase {#hot-phase-l3}

*Level: III*

Sources: Fluke, Introduction to Thermography Principles, ch. 6 and ch. 7; ANSI/NETA ATS-2025 Section 9 and Table 100.18 notes.

- **Balanced current, one hot joint:** suspect resistance. Plan the outage, inspect, check torque, and measure the connection with a low-resistance ohmmeter against similar connections (for busway, the 50% screen in ATS 7.4.D.1).
- **Light load:** the heat from a bad joint is predictable from I²R, but the temperature it reaches isn't. A small rise at light load can become a large one when load grows. Some practices call for at least 40% load or the highest normal load, and the ATS table notes say load current has a major effect on ΔT. Write the load down with the image.
