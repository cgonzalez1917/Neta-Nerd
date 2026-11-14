# Sources {#sources}


Question writers: use this list, then read the standard. Do not paste a forum memory into the bank and call it an exam item. Do not commit PDFs, the NFPA 70E text, or copied tables into this public repository.

## Standards checked for this bank


Private copies used for lookup only. They are not in git.

- ANSI/NETA ATS-2025. Acceptance limits and section numbers cited as ATS-2025.
- ANSI/NETA MTS-2023. Maintenance limits cited as MTS-2023. Where a number differs from ATS, the question says so.
- NFPA 70E-2024. Article, section, and table numbers cited only after they were found in the owner’s text.
- NFPA 70B-2026, chapters 7 through 9, from paraphrased notes of the free-access viewer. Cited by section, for example 7.2.1.4 or 9.3.2. Those chapters do not give PI, DAR, or infrared delta-T limits, so the bank does not invent them.
- OSHA 3120 (2002 revised), lockout/tagout booklet, for the lock-versus-tag distinction.

IEEE, NEC, and ASTM are cited generally unless the number also appears inside ATS or MTS (for example IEEE C57.106 as the source note under ATS Table 100.4.1).

## TestGuy study guide and threads


Exam format (closed book, about 100 questions, 2 hours, formula sheet, TI-30XS) and the domain percentages are taken from the TestGuy study guide, which cites the NETA December 2022 detailed content outline. Forum posts are anecdotal and vary by exam version.

- https://wiki.testguy.net/t/217
- https://wiki.testguy.net/t/2163
- https://wiki.testguy.net/t/6985
- https://wiki.testguy.net/t/2340
- https://wiki.testguy.net/t/2855
- https://wiki.testguy.net/t/3353
- https://wiki.testguy.net/t/3309
- https://wiki.testguy.net/t/3265
- https://wiki.testguy.net/t/1198
- https://wiki.testguy.net/t/1914
- https://wiki.testguy.net/t/1718
- https://wiki.testguy.net/t/707
- https://wiki.testguy.net/t/3655
- https://wiki.testguy.net/t/3689
- https://wiki.testguy.net/t/715
- https://wiki.testguy.net/t/660
- https://wiki.testguy.net/t/1391

Articles used as optional “Learn more” links, not as copied text:

- https://testguy.net/
- https://wiki.testguy.net/t/nfpa-70e-arc-flash-and-shock-hazard-boundaries-explained/120
- https://wiki.testguy.net/t/insulation-resistance-test-methods-a-beginners-guide/125
- https://wiki.testguy.net/t/introduction-to-transformer-turns-ratio-testing/95
- https://wiki.testguy.net/t/transformer-turns-ratio-ttr-explained/100
- https://wiki.testguy.net/t/transformer-winding-resistance-test-methods-and-procedures-explained/81
- https://wiki.testguy.net/t/transformer-diagnostics-and-condition-assessment/84
- https://wiki.testguy.net/t/transformer-insulating-oil-test-methods-astm/59
- https://wiki.testguy.net/t/10-critical-tests-for-new-power-circuit-breakers/113
- https://wiki.testguy.net/t/protective-relay-testing-and-maintenance-overview/76
- https://wiki.testguy.net/t/power-cable-testing-and-diagnostics-overview/79
- https://wiki.testguy.net/t/ground-resistance-testing-answers-to-frequently-asked-questions/119
- https://wiki.testguy.net/t/test-equipment-101-the-basics-of-electrical-testing/57
- https://wiki.testguy.net/t/important-nfpa-articles-for-electrical-test-technicians/250

## Also useful, not copied


- https://www.netaworld.org
- Exam format (100 questions / 2 hours for Levels II and III, 65 / 2 hours for Level IV, Pearson VUE, scaled 410): https://www.netaworld.org/certification-exam/technician-certification671 and https://www.netaworld.org/certification-exam/exam-preparation686 — InterNational Electrical Testing Association
- Official NETA Electrical Formulae Sheet, updated June 29, 2017, one page, shown on screen during the exam. Linked from https://www.netaworld.org/certification-exam/exam-preparation686. An older website PDF is an incomplete excerpt of that sheet. What the official sheet prints, and what it leaves out, is in `math.md`. Do not commit the PDF.
- Manufacturer breaker and relay manuals. They outrank a NETA table when ATS says “in the absence of manufacturer’s data.”

Manufacturer trip-unit manuals, relay manuals, and test-set manuals are cited as “per manufacturer data.” Job sheets and one-lines stay off this public repo. A time that was only calculated, and not read from the published curve, is not used as a quiz answer.

Cite the ATS or MTS clause first. When that clause names an IEEE document, add the IEEE edition and clause that was actually read, for example `ATS-2025 7.2.2.D.15; ref. IEEE C57.104-2019, clause 6.2.1`. Standards named by ATS or MTS that are not in the lookup set are listed in `knowledge/reference-gaps.md`.

Lookups used for later questions, cited by title only. The files themselves are not in this repo.

- 29 CFR 1910.147, 1910.269, 1910.331 through 1910.335 (OSHA, public text).
- EPA, Overview of SF6 Emissions Sources and Reduction Options in Electric Power Systems (2018).
- ABB, Use of SF6 insulating gas in ZX switchgear, manual HB 605/05 (paraphrased).
- Valence, Potential transformer testing (PT/VT), back to basics. Short credit only.
- Megger DELTA4000 applications guide; Megger S1-568 user manual; AEMC 6240 user manual; Eaton PXR 20/25 user manual. Procedures paraphrased and cited as manufacturer instructions.
- IEEE C57.104, IEEE 43, IEEE 400.2, IEEE C57.13.1, IEEE C37.2, cited by number. No IEEE text is in this repo.

## Adding a source later


Append a link and one sentence on what it is allowed to support. If you use it for a number, either verify that number in ATS, MTS, or 70E and set `verified` true with the clause, or leave `verified` false and say “verify in ATS” in the reference when you are not sure.

Lookups used for the Level IV field notes on the study pages, cited by short name and edition only. The files themselves are not in this repo.

- IEEE C37.110-2023 (relaying current-transformer application).
- Blackburn, J. L., and Domin, T. J., Protective Relaying, 4th ed.
- Lautenschlager, J., NETA World, Fall 2008 (paralleling electrical systems).
- IEEE C57.147-2018 (natural ester insulating liquid).
- ASTM D923-07 (sampling insulating liquids). The official exam list names D923-15; these notes flag the 2007 edition where it is used.
- Adamiak, M., Baigent, D., and Mackiewicz, R., IEC 61850 user overview.
- Littelfuse, Fuse Fundamentals, 2025. Coordination ratios in that paper apply only to the listed Littelfuse series.
- Locarno, M., Tully, L., and Wilson, A., SFRA for mechanical transformer damage, NETA Transformer Handbook, Vol. 1.
- IEEE C57.12.00-2021; IEEE C37.09-2018; IEEE 450-2020; IEEE C37.2-2022; IEEE 242-2001; IEEE 399-1997; IEEE 519-2022; IEEE 141-1993.
- ANSI/NETA ECS-2024, used with ATS-2025 Section 8 for system function tests and commissioning-plan practice.
