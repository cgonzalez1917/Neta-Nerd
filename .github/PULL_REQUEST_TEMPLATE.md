## What this adds

<!-- One or two sentences. Name the topic files you appended to. -->

## Checklist

- [ ] Branch name is `bot/<name>-<topic>`
- [ ] This pull request targets `main`. I did not push to `main`.
- [ ] New questions are appended. Existing questions were not reordered or renumbered.
- [ ] Each new id is the next number for that prefix and is unique.
- [ ] `level` is `ETT`, `I`, `II`, `III`, or `IV`.
- [ ] `domain` is `safety`, `theory`, `component`, or `systems`.
- [ ] `topic` matches the file in `questions/index.json`.
- [ ] Citation is a real clause or table I checked, for example `ATS-2025 7.x; ref. IEEE C57.104-2019, clause 6.2.1` or `NFPA 70B-2026, Table 15.3.5`. Equipment numbers I did not read in a manual are `per manufacturer data` or `verified: false`.
- [ ] Questions are original and paraphrased. No copyrighted standard, PDF, or manual is in the diff. No recalled exam item is presented as the exam.
- [ ] I did not invent a numeric limit the cited standard does not give.
- [ ] Unsourced answers are `verified: false` and have a `<!-- q:ID -->` block in `knowledge/review-queue.md`. Every new Level II and Level III question has that block.
- [ ] `node scripts/validate.mjs` passed locally.
- [ ] `css/styles.css` and `js/bg.js` are unchanged.

## Notes for the reviewer

<!-- Say what you could not verify, if anything. -->
