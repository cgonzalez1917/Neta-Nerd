# Contributing questions

Humans and AI assistants both edit this bank. The rules are the same for both.

Write original questions. Do not copy NETA exam items, forum posts that recall exam wording, TestGuy prose, or passages from ATS, MTS, or NFPA 70E. Paraphrase. A single cited value is fine. A pasted table is not.

Do not commit PDFs, the 70E text, or an `uploads/` dump. This repository is public.

## Files

- `questions/index.json` lists each topic file.
- One JSON file per topic. Each file is an array of questions.
- `knowledge/*.md` is the study source. Link a question at the heading anchor with the `kb` field.
- `knowledge/review-queue.md` must contain `<!-- q:THE-ID -->` for every Level II and Level III question.
- `node scripts/validate.mjs` is the schema check. Run it before you commit.

## Question schema

```json
{
  "id": "xfmr-004",
  "level": "II",
  "topic": "transformers",
  "domain": "component",
  "question": "One stem, one idea.",
  "choices": ["Wrong", "Right", "Wrong", "Wrong"],
  "answer": 1,
  "explanation": "Why the right choice is right, and what the trap was.",
  "reference": "ANSI/NETA ATS-2025 7.2.2.D.3",
  "verified": true,
  "kb": "transformers.md#ttr",
  "link": "https://wiki.testguy.net/t/introduction-to-transformer-turns-ratio-testing/95"
}
```

| Field | Required | Rule |
| --- | --- | --- |
| `id` | yes | `{idPrefix}-{number}` from the manifest, at least three digits. Never reuse or renumber an id. |
| `level` | yes | `ETT`, `I`, `II`, `III`, or `IV`. |
| `topic` | yes | The manifest topic id for that file. |
| `domain` | yes | `safety`, `theory`, `component`, or `systems`. This is the NETA content-outline bucket, not the topic. |
| `question` | yes | Plain text. No HTML. |
| `choices` | yes | 2–6 unique non-empty strings. Four is the normal case. |
| `answer` | yes | Integer index into `choices`, starting at 0. |
| `explanation` | yes | Teach the idea. Do not say “choice B”; the site shuffles order. |
| `reference` | yes | ATS-2025 for acceptance, MTS-2023 for maintenance, 70E-2024 with the article or table you actually checked. If you are not sure of a table cell, write `verify in ATS` and set `verified` false. |
| `verified` | yes | `true` only when you checked that deciding fact in ATS-2025, MTS-2023, the 70E-2024 text, or OSHA 3120. Otherwise `false`. |
| `kb` | yes | `file.md#anchor`, and the markdown file contains `{#anchor}`. |
| `link` | no | Optional `https` URL, usually a TestGuy article that helped. Omit the field rather than leaving it empty. Shown as “Learn more”. |

`answer` is the answer index.

## Ids

Look at the highest number for that prefix and add one. Two people adding `safety-017` at the same time will fail the duplicate-id check; one of you renumbers. Do not fill gaps by recycling a deleted id.

Prefixes live in `questions/index.json` (`safety`, `math`, `ir`, `dlro`, `xfmr`, `brkr`, `relay`, `cable`, `gnd`, `ct`, `batt`, `thermo`).

## Levels and domains

Keep the bank heavy on Level II, then Level III. ETT, I, and IV stay thin until someone deliberately expands them.

Level II targets from the December 2022 outline, as reported by the TestGuy study guide: Safety 15%, Theory 25%, Component 55%, Systems 5%. Level III: 13% / 23% / 47% / 17%. The validator prints the live counts. It does not fail the build when you add one question and the percentage moves a point.

## Accuracy

- Manufacturer data outranks a NETA table when the paragraph says “in the absence of manufacturer’s data.”
- ATS and MTS limits are not interchangeable. Name the book.
- Do not invent a section number. Cite the standard and the article in general, or write `verify in ATS`.
- IEEE and NEC clauses that are not also printed inside ATS/MTS/70E get a general citation and `verified: false`.
- State one table cell you checked. Do not reproduce the table.
- Forum recollections are topic ideas only. Never present them as the exam.

## Add a question

1. Read the matching `knowledge/` page and the standard if you have it.
2. Append one object to the topic file. Keep the JSON an array.
3. Add a Level II or III row to `knowledge/review-queue.md` with `<!-- q:your-id -->`, the answer, and the citation.
4. Run `node scripts/validate.mjs`.
5. Commit the JSON, the queue line, and any knowledge anchor you added. Do not commit a PDF.

## Style

One concept per stem. Four choices a tired technician might actually pick, including the unit-conversion miss and the ATS-versus-MTS miss. The explanation should still teach if the reader never looks at the standard that night.

Colors live in `:root` in `css/styles.css`. Borders stay square.
