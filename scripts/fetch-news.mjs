#!/usr/bin/env node
/* Write data/news.json, the saved headline list the home page uses
   when /api/news is unavailable. Does not print article text. */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { collectNews } from "../js/news-feed.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const payload = await collectNews();
const items = payload.items || [];

if (!items.length) {
  console.error("No headlines. Left data/news.json unchanged.");
  process.exit(1);
}

const required = ["title", "source", "date", "href"];
let previous = Infinity;
for (const item of items) {
  const keys = Object.keys(item);
  if (required.some((key) => keys.indexOf(key) === -1) || keys.some((key) => required.indexOf(key) === -1 && key !== "image")) {
    console.error("Headline has unexpected fields.");
    process.exit(1);
  }
  if (item.image != null && (typeof item.image !== "string" || !item.image.startsWith("https://") || /\s/.test(item.image) || item.image.length > 2000)) {
    console.error("Bad image.");
    process.exit(1);
  }
  if (typeof item.title !== "string" || item.title.length < 12) {
    console.error("Bad title.");
    process.exit(1);
  }
  if (typeof item.href !== "string" || !item.href.startsWith("https://") || /\s/.test(item.href)) {
    console.error("Bad link.");
    process.exit(1);
  }
  const time = Date.parse(item.date);
  if (!Number.isFinite(time) || time > previous) {
    console.error("Headlines are not sorted newest first.");
    process.exit(1);
  }
  previous = time;
}

const file = join(root, "data/news.json");
await mkdir(join(root, "data"), { recursive: true });
await writeFile(file, JSON.stringify(payload, null, 2) + "\n");
console.log("Wrote " + items.length + " headlines at " + payload.updated);
for (const item of items) {
  console.log("- " + item.date.slice(0, 10) + " [" + item.source + "] " + item.title);
  console.log("  " + item.href);
}
