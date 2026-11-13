#!/usr/bin/env node
/**
 * Validate the Neta Nerd question bank.
 * Usage: node scripts/validate.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LEVELS = new Set(["ETT", "I", "II", "III", "IV"]);
const DOMAINS = new Set(["safety", "theory", "component", "systems"]);
const REQUIRED = ["id", "level", "topic", "domain", "question", "choices", "answer", "explanation", "reference", "verified", "kb"];
const OPTIONAL = new Set(["link"]);

const errors = [];
function fail(msg) { errors.push(msg); }

const index = JSON.parse(await readFile(join(root, "questions/index.json"), "utf8"));
if (!index.issuesUrl || !index.issuesUrl.startsWith("https://")) fail("questions/index.json issuesUrl must be https");
if (!Array.isArray(index.topics) || !index.topics.length) fail("manifest topics missing");

const seenPrefix = new Set();
const seenTopic = new Set();
const questions = [];

for (const topic of index.topics) {
  for (const key of ["id", "title", "file", "idPrefix"]) {
    if (!topic[key]) fail(`topic missing ${key}: ${JSON.stringify(topic)}`);
  }
  if (seenTopic.has(topic.id)) fail(`duplicate topic id ${topic.id}`);
  seenTopic.add(topic.id);
  if (seenPrefix.has(topic.idPrefix)) fail(`duplicate idPrefix ${topic.idPrefix}`);
  seenPrefix.add(topic.idPrefix);
  const path = join(root, "questions", topic.file);
  let rows;
  try { rows = JSON.parse(await readFile(path, "utf8")); }
  catch (e) { fail(`${topic.file}: ${e.message}`); continue; }
  if (!Array.isArray(rows)) { fail(`${topic.file} is not an array`); continue; }
  const idRe = new RegExp("^" + topic.idPrefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "-\\d{3,}$");
  for (const q of rows) {
    q.__file = topic.file;
    const where = `${topic.file}:${q && q.id ? q.id : "?"}`;
    if (!q || typeof q !== "object") { fail(`${where} not an object`); continue; }
    for (const key of REQUIRED) if (!(key in q)) fail(`${where} missing ${key}`);
    for (const key of Object.keys(q)) {
      if (key === "__file") continue;
      if (!REQUIRED.includes(key) && !OPTIONAL.has(key)) fail(`${where} unknown field ${key}`);
    }
    if (typeof q.id !== "string" || !idRe.test(q.id)) fail(`${where} id must match ${topic.idPrefix}-###`);
    if (q.level == null || (typeof q.level === "string" && !q.level.trim())) fail(`${where} missing level`);
    else if (!LEVELS.has(q.level)) fail(`${where} bad level ${q.level}; expected ETT, I, II, III, or IV`);
    if (!DOMAINS.has(q.domain)) fail(`${where} bad domain ${q.domain}`);
    if (q.topic !== topic.id) fail(`${where} topic ${q.topic} != ${topic.id}`);
    if (typeof q.question !== "string" || !q.question.trim()) fail(`${where} empty question`);
    if (typeof q.explanation !== "string" || !q.explanation.trim()) fail(`${where} empty explanation`);
    if (typeof q.reference !== "string" || !q.reference.trim()) fail(`${where} empty reference`);
    if (typeof q.verified !== "boolean") fail(`${where} verified must be boolean`);
    if (!Array.isArray(q.choices) || q.choices.length < 2 || q.choices.length > 6) fail(`${where} choices must be 2–6 strings`);
    else {
      const texts = q.choices.map((c) => (typeof c === "string" ? c.trim() : ""));
      if (texts.some((c) => !c)) fail(`${where} empty choice`);
      if (new Set(texts).size !== texts.length) fail(`${where} duplicate choices`);
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.choices || []).length) fail(`${where} answer index out of range`);
    if (typeof q.kb !== "string" || !/^[a-z0-9-]+\.md#[a-z0-9-]+$/.test(q.kb)) fail(`${where} kb must look like file.md#anchor`);
    if (q.link != null) {
      if (typeof q.link !== "string" || !q.link.startsWith("https://") || /\s/.test(q.link)) fail(`${where} link must be https`);
    }
    questions.push(q);
  }
}

const ids = new Map();
for (const q of questions) {
  if (ids.has(q.id)) fail(`duplicate id ${q.id} in ${ids.get(q.id)} and ${q.__file}`);
  else ids.set(q.id, q.__file);
}

const kbCache = new Map();
for (const q of questions) {
  const [file, anchor] = q.kb.split("#");
  if (!kbCache.has(file)) {
    try { kbCache.set(file, await readFile(join(root, "knowledge", file), "utf8")); }
    catch { kbCache.set(file, null); }
  }
  const text = kbCache.get(file);
  if (text == null) fail(`${q.id} kb file missing: ${file}`);
  else if (!text.includes(`{#${anchor}}`)) fail(`${q.id} kb anchor {#${anchor}} not in ${file}`);
}

const queue = await readFile(join(root, "knowledge/review-queue.md"), "utf8");
for (const q of questions) {
  if ((q.level === "II" || q.level === "III") && q.verified === false) {
    if (!queue.includes(`<!-- q:${q.id} -->`)) fail(`review queue missing ${q.id}`);
  }
}

const by = {};
for (const q of questions) {
  by[q.level] = by[q.level] || {};
  by[q.level][q.domain] = (by[q.level][q.domain] || 0) + 1;
}
const verified = questions.filter((q) => q.verified).length;

if (errors.length) {
  console.error(`FAILED ${errors.length} problem(s):`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}

console.log(`OK ${questions.length} questions, ${verified} marked verified.`);
for (const level of ["ETT", "I", "II", "III", "IV"]) {
  const row = by[level] || {};
  const n = Object.values(row).reduce((a, b) => a + b, 0);
  const bits = ["safety", "theory", "component", "systems"].map((d) => `${d} ${row[d] || 0}`).join(", ");
  console.log(`  ${level}: ${n} (${bits})`);
}
