# Contributing to Neta Nerd

Humans and AI agents follow the same rules. Read this file before you edit anything. Do the steps in order.

The live site is [https://neta-nerd-evy.pages.dev/](https://neta-nerd-evy.pages.dev/). Cloudflare Pages deploys from the `main` branch. A merge to `main` is what publishes the site.

## 1. Workflow

Do not push to `main`. Do not force-push `main`. Do not commit on `main`.

1. Start from an up-to-date `main`.
2. Create a branch named `bot/<name>-<topic>`.
   - `<name>` is you: your name, or the bot’s short name. Lowercase, hyphens only.
   - `<topic>` is the subject of this change, also lowercase with hyphens.
   - Examples: `bot/alex-batteries`, `bot/relay-bot-sf6`.
3. Put only this change on that branch.
4. Run `node scripts/validate.mjs`. It must print `OK` and exit 0. If it fails, fix the bank and run it again. Do not commit a failing tree.
5. Commit, push the branch, and open a pull request into `main`.
6. Cristian reviews and merges. The merge deploys. You do not merge your own pull request unless Cristian has told you to.

One branch, one topic. If the work is unrelated, open a second branch and a second pull request.

## 2. Which files you may edit

Every topic file under `questions/` is open to any contributor. The list and the id prefix for each file are in `questions/index.json`.

| Topic id | File | Id prefix |
| --- | --- | --- |
| `electrical-safety` | `questions/safety.json` | `safety` |
| `meters-math` | `questions/meters.json` | `math` |
| `insulation-resistance` | `questions/insulation.json` | `ir` |
| `contact-resistance` | `questions/resistance.json` | `dlro` |
| `transformers` | `questions/transformers.json` | `xfmr` |
| `lv-breakers` | `questions/breakers.json` | `brkr` |
| `protective-relays` | `questions/relays.json` | `relay` |
| `cables` | `questions/cables.json` | `cable` |
| `grounding` | `questions/grounding.json` | `gnd` |
| `instrument-transformers` | `questions/instrument.json` | `ct` |
| `batteries` | `questions/batteries.json` | `batt` |
| `thermography` | `questions/thermography.json` | `thermo` |
| `mv-breakers` | `questions/mv-breakers.json` | `mvbr` |
| `reclosers` | `questions/reclosers.json` | `recl` |
| `surge-arresters` | `questions/arresters.json` | `arr` |
| `motors` | `questions/motors.json` | `mot` |
| `emergency-systems` | `questions/emergency.json` | `emg` |
| `fiber-optic` | `questions/fiber.json` | `fbr` |
| `ev-charging` | `questions/evse.json` | `evse` |

Append new question objects at the end of the array. Do not reorder, renumber, or rewrite existing questions in the same edit. If two people append to the same file, keep both objects and fix only a duplicate id.

You may add a short section to a file in `knowledge/` when a new question needs an anchor. Do not delete someone else’s study notes.

Do not change `css/styles.css`, `js/bg.js`, or the three-phase background unless Cristian asks. Colors stay the amber and cyan theme. Corners stay square.

Do not add a build step, a framework, or a dependency. The site is static files.

## 3. Question schema

Each topic file is a JSON array. One object is one question. Fields the validator does not list are rejected. `link` is the only optional field.

```json
{
  "id": "batt-006",
  "level": "II",
  "topic": "batteries",
  "domain": "component",
  "question": "One stem, one idea.",
  "choices": ["Wrong", "Right", "Wrong", "Wrong"],
  "answer": 1,
  "explanation": "Why the right choice is right, without saying choice B.",
  "reference": "ANSI/NETA ATS-2025 7.18.1.1.A.3",
  "verified": true,
  "kb": "batteries.md#flooded"
}
```

| Field | Required | Rule |
| --- | --- | --- |
| `id` | yes | `{prefix}-{number}` using the prefix in the table above. At least three digits (`batt-006`). Unique across the whole bank. Never reuse or renumber an id. Take the current highest number for that prefix and add 1. Do not fill gaps. |
| `level` | yes | Exactly one of `ETT`, `I`, `II`, `III`, `IV`. A missing or blank level fails validation. The site shows this as a badge such as `NETA Level II`. |
| `topic` | yes | The topic id for that file, from the table. It must match the file. |
| `domain` | yes | `safety`, `theory`, `component`, or `systems`. This is the NETA exam bucket, not the equipment name. |
| `question` | yes | Plain text. No HTML. |
| `choices` | yes | 2 to 6 unique non-empty strings. Four is normal. |
| `answer` | yes | Integer index into `choices`, starting at 0. |
| `explanation` | yes | Teach the idea. The site shuffles choices, so do not write “choice B”. |
| `reference` | yes | The citation. See the formats below. Non-empty string. |
| `verified` | yes | Boolean. `true` only after you checked the deciding fact in a source you were allowed to read. Otherwise `false`. |
| `kb` | yes | `file.md#anchor`. The file is under `knowledge/`, and that file contains `{#anchor}`. |
| `link` | no | Optional `https` URL with no spaces, usually a public article. Omit the field. Do not set it to `""`. Shown as “Learn more”. |

### Citation format

Lead with the acceptance or maintenance book when that is the rule, then the outside standard that book points at:

- `ANSI/NETA ATS-2025 7.2.2.D.15; ref. IEEE C57.104-2019, clause 6.2.1`
- `ANSI/NETA MTS-2023 7.2.2` when the fact is a maintenance limit. Do not mix ATS and MTS numbers in one sentence without saying which book.
- `NFPA 70E-2024 130.2(A)` or `NFPA 70E-2024 Table 130.4(E)(a)`
- `NFPA 70B-2026, Table 15.3.5` or `NFPA 70B-2026, 18.1`
- `29 CFR 1910.146` for OSHA text you read on ecfr.gov

`verified` is `true` only when that citation is a clause, table, or section you actually checked, and the answer comes from it. A calculation you did yourself (three-phase current, ohms) can be `true` when the explanation shows the arithmetic. Equipment settings, trip times, and nameplate ratings that are not in a standard are cited `per manufacturer data` and are `true` only when you read that manual. If you did not, use `verified: false`.

NFPA 70B maintenance chapters name which tests to run. They usually do not give pass/fail numbers. Do not invent a kilovolt, an ohm limit, a trip time, or an oil limit from a 70B test list.

## 4. Content rules

- Write original questions in your own words. Paraphrase.
- Never quote a standard, a table, a manual, or a book. Never upload, link, or commit a copyrighted PDF, scan, OCR dump, or manual. `uploads/` and `*.pdf` stay off this public repo.
- Never present a real exam question, or a recalled exam item, as if it were the exam. Forum and chat recollections are topic ideas only. Do not copy their wording, and do not use a guessed answer in parentheses unless a standard you checked says the same thing.
- One idea per stem. Distractors should be mistakes a technician might make, including another equipment’s test list or the other book’s limit (ATS versus MTS).
- Keep Level II the largest share, then Level III. Targets from the December 2022 outline: Level II safety 15%, theory 25%, component 55%, systems 5%. Level III 13% / 23% / 47% / 17%. The validator prints counts. It does not fail for a one-point drift.
- Every Level II and Level III question that is still `verified: false` needs a block in `knowledge/review-queue.md` that contains `<!-- q:YOUR-ID -->`, the stem, the choices with the answer marked, and the citation. Copy the shape of the blocks already in that file. Append. Do not reorder the queue. A question leaves that queue once the deciding fact has been checked and `verified` is `true`.
- An answer you cannot source still gets added, with `verified: false`, and it still gets the review-queue block. Say in the explanation that the deciding fact was not in a source you checked.

## 5. Before every commit

From the repo root, with Node installed:

```bash
node scripts/validate.mjs
```

The command must print `OK` and exit 0. A pull request that fails this check is not ready. GitHub runs the same command on every pull request.

## 6. What not to change

Leave the theme and the three-phase background alone unless Cristian asks. That means `css/styles.css` and `js/bg.js`. Do not recolor the amber (`#ffb000`) and cyan (`#00e5ff`) accents, and do not restyle or remove the background canvas.

Leave Cloudflare settings alone: framework preset None, empty build command, output directory `/`.
