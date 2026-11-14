# Neta Nerd

Practice drills for NETA electrical testing: certification Levels II–IV, weighted toward Level II and then Level III. The questions are original. They are not recalled exam items, and this site is not affiliated with NETA, NFPA, or IEEE.

The question bank is JSON under `questions/`. The study notes question-writers use are Markdown under `knowledge/`. Nothing here needs a build.

## Run it locally

`fetch` will not load the bank from a `file://` URL. Serve the folder:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`. Any static server works (`npx serve .` is fine).

Check the bank after you edit a question:

```bash
node scripts/validate.mjs
```

## Deploy on Cloudflare Pages

Connect the GitHub repository `cgonzalez1917/Neta-Nerd`.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | **None** |
| Build command | *(leave empty)* |
| Build output directory | `/` |

A merge to `main` republishes the site. Contributors do not push to `main`. Open a pull request from a `bot/<name>-<topic>` branch and Cristian merges it. See `CONTRIBUTING.md`. There is no Node build and no environment variable.

## Home news

The Home page list is headlines only: title, source name, date, and a link. Article text is not stored.

`functions/api/news.js` runs on Cloudflare Pages. It reads public RSS feeds (NETA World Journal, plus EC&M, T&D World, and Safety+Health, kept only when the title is about testing, maintenance, arc flash, or the same kind of work). It keeps the newest six and caches that list until the next 2:00 AM Pacific time. No API key and no secret.

`data/news.json` is a saved copy. The page uses it when `/api/news` is missing or empty, and says so. Refresh that file with `node scripts/fetch-news.mjs` and open a pull request. Do not commit it straight to `main`.

Pages serves the function from the `functions` directory with the existing empty build command and output directory `/`. If a preview returns 404 for `/api/news`, Cloudflare’s static-site note is to set the build command to `exit 0` and leave the output directory as `/`. That is not a dependency and not a secret. Until then, the saved file still fills the panel.

## How a drill works

- **Practice** filters by level, domain (safety, theory, component, systems), and topic. Level II starts selected. Feedback, the reference, and a study link show as soon as you check an answer.
- **Timed quiz** draws up to 25 questions from the same filters and allows 72 seconds each (30:00 when all 25 are used). Answers can be changed until you submit or the clock hits zero.
- **Missed questions** stay in this browser’s `localStorage` until you answer them correctly.
- **An in-progress drill** is saved on this device, one session at a time for practice, the timed quiz, missed review, and the mock exam. Leave or refresh and the home page offers Resume or Discard. Timed and mock clocks store the original end time, so a refresh keeps the remaining time and an exam that ran out while you were away is submitted on its own.

Each question has a **Report a problem** link that opens a GitHub issue on this repo with the id and the stem filled in.

## Study pages

`knowledge/` is the source for future questions: procedures, the numbers that were checked in ANSI/NETA ATS-2025, ANSI/NETA MTS-2023, and NFPA 70E-2024, and the math that is not on the NETA formula sheet. The site renders those files at `#/study`. `knowledge/review-queue.md` lists every Level II and Level III item for a human pass.

Adding questions is described in `CONTRIBUTING.md`.

## Study resources

- [TestGuy](https://testguy.net/) — articles and the electrical-testing community
- [NETA](https://www.netaworld.org) — InterNational Electrical Testing Association

Own copies of the standards still govern. This site does not reproduce them.
