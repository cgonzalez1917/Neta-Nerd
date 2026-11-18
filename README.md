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

## Tools gear list

`data/tools.json` is the shared list of tools and materials Angelo and Cristian have bought. Add an object to `items` by hand. Do not put an address, account number, invoice, order number, or card number in this file. A price paid is fine.

`categories` is the work-category list, in the order the page uses. An item's `category` must be one of those names. `subcategory` is the heading inside that category. The page shows a category only when it has items, and groups cards under the subcategory.

| Field | Rule |
| --- | --- |
| `id` | Short unique id, used in the image file name. |
| `added_by` | `Angelo` or `Cristian`. The page filters on this. |
| `date` | `YYYY-MM-DD`. |
| `maker`, `model`, `name` | What the card shows. |
| `category`, `subcategory` | Work category, then the group inside it. |
| `use` | One short paragraph. The page shows it in full. |
| `qty`, `unit` | Count and unit. `EA` is priced “each”. `PK` is priced “per pack”. |
| `unit_price_paid`, `currency` | The price paid. A number, in `currency`. |
| `rating` | The maker's rating text, shown in full, unchanged. |
| `official_url` | `https` maker page. When this is set, the card shows Official page and the distributor button. |
| `distributor_name`, `distributor_url` | The second button when `official_url` is set. Newark is the default: `distributor_name` is `Newark` and `distributor_url` is that item's Newark product page. `https`, no tracking parameters. Omit both when the item has no maker page. |
| `shop_name`, `shop_url` | Optional. For off-brand or small-shop gear with no maker page. When `official_url` is omitted, both are required, and the card shows one link: `shop_name` to `shop_url`. `shop_url` is `https`. |
| `notes` | A short muted line on the card. |
| `image` | Repo path such as `img/tools/<id>.svg`. |
| `image_credit` | `Photo: Pomona Electronics` for a maker photo, or `Render, not a photo` for a drawing. The card shows this line. Pomona's terms do not allow copying their product pictures into this repo, so a drawing uses the second credit. |
| `field_notes` | 1 to 3 strings. The card puts them in a collapsed Field notes list. |

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
