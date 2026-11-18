#!/usr/bin/env node
/**
 * Validate the Neta Nerd question bank.
 * Usage: node scripts/validate.mjs
 */
import { readFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const LEVELS = new Set(["II", "III", "IV"]);
const REMOVED_LEVELS = new Set(["ETT", "I"]);
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
    const levelValues = Array.isArray(q.level) ? q.level : [q.level];
    if (q.level == null || (typeof q.level === "string" && !q.level.trim()) || (Array.isArray(q.level) && !q.level.length)) fail(`${where} missing level`);
    else if (levelValues.some((level) => REMOVED_LEVELS.has(level))) fail(`${where} level ${JSON.stringify(q.level)} is not allowed; ETT and I were removed`);
    else if (levelValues.length !== 1 || !LEVELS.has(levelValues[0])) fail(`${where} bad level ${JSON.stringify(q.level)}; expected II, III, or IV`);
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

const toolsPath = join(root, "data/tools.json");
let toolsDoc;
try { toolsDoc = JSON.parse(await readFile(toolsPath, "utf8")); }
catch (e) { fail(`data/tools.json: ${e.message}`); }
if (toolsDoc) {
  const cats = toolsDoc.categories;
  if (!Array.isArray(cats) || !cats.length || cats.some((c) => typeof c !== "string" || !c.trim())) {
    fail("data/tools.json categories must be non-empty strings");
  }
  const catSet = new Set(Array.isArray(cats) ? cats : []);
  if (!Array.isArray(toolsDoc.items)) fail("data/tools.json items must be an array");
  else {
    const seenTool = new Set();
    const https = /^https:\/\/\S+$/;
    const people = new Set(["Angelo", "Cristian"]);
    for (const item of toolsDoc.items) {
      const where = `data/tools.json:${item && item.id ? item.id : "?"}`;
      if (!item || typeof item !== "object") { fail(`${where} not an object`); continue; }
      if (typeof item.id !== "string" || !item.id.trim()) fail(`${where} missing id`);
      else if (seenTool.has(item.id)) fail(`${where} duplicate id`);
      else seenTool.add(item.id);
      if ("status" in item) fail(`${where} status was removed`);
      for (const key of ["added_by", "qty", "unit_price_paid", "date"]) {
        if (key in item) fail(`${where} ${key} belongs on a buyer, not the item`);
      }
      for (const key of ["maker", "model", "name", "subcategory", "use", "unit", "currency", "rating", "notes", "image_credit"]) {
        if (typeof item[key] !== "string" || !item[key].trim()) fail(`${where} missing ${key}`);
      }
      if (item.material != null && (typeof item.material !== "string" || !item.material.trim())) fail(`${where} material must be a non-empty string`);
      if (!catSet.has(item.category)) fail(`${where} category is not in categories`);
      if (!Array.isArray(item.buyers) || !item.buyers.length) fail(`${where} buyers must be a non-empty array`);
      else {
        const seenBuyer = new Set();
        for (const buyer of item.buyers) {
          const who = `${where} buyer`;
          if (!buyer || typeof buyer !== "object") { fail(`${who} must be an object`); continue; }
          if (!people.has(buyer.name)) fail(`${who} name must be Angelo or Cristian`);
          else if (seenBuyer.has(buyer.name)) fail(`${where} duplicate buyer ${buyer.name}`);
          else seenBuyer.add(buyer.name);
          if (typeof buyer.qty !== "number" || !(buyer.qty > 0)) fail(`${who} qty must be a positive number`);
          if (typeof buyer.unit_price_paid !== "number") fail(`${who} unit_price_paid must be a number`);
          if (buyer.date != null && (typeof buyer.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(buyer.date))) fail(`${who} date must be YYYY-MM-DD`);
        }
      }
      const official = typeof item.official_url === "string" && item.official_url.trim();
      const shopName = typeof item.shop_name === "string" && item.shop_name.trim();
      const shopUrl = typeof item.shop_url === "string" && item.shop_url.trim();
      const shopHome = typeof item.shop_home_url === "string" && item.shop_home_url.trim();
      if (official) {
        if (!https.test(item.official_url)) fail(`${where} official_url must be https`);
        if (typeof item.distributor_name !== "string" || !item.distributor_name.trim()) fail(`${where} missing distributor_name`);
        if (typeof item.distributor_url !== "string" || !https.test(item.distributor_url)) fail(`${where} distributor_url must be https`);
      } else if (shopName && shopUrl && shopHome) {
        if (!https.test(item.shop_url)) fail(`${where} shop_url must be https`);
        if (!https.test(item.shop_home_url)) fail(`${where} shop_home_url must be https`);
      } else {
        fail(`${where} needs official_url plus distributor_name/url, or shop_name, shop_url and shop_home_url`);
      }
      const key = official
        ? `brand\0${item.maker}\0${item.model}`
        : `shop\0${item.shop_name}\0${item.shop_url}`;
      if (seenTool.has(key)) fail(`${where} duplicate product ${official ? item.maker + " " + item.model : item.shop_name}`);
      else seenTool.add(key);
      if (typeof item.image !== "string" || !item.image || item.image.includes("..") || item.image.startsWith("/") || item.image.includes("\\")) {
        fail(`${where} image path is not a repo-relative file`);
      } else {
        try { await readFile(join(root, item.image)); }
        catch { fail(`${where} image missing ${item.image}`); }
      }
      if (!Array.isArray(item.field_notes) || item.field_notes.length < 1 || item.field_notes.length > 3 || item.field_notes.some((n) => typeof n !== "string" || !n.trim())) {
        fail(`${where} field_notes must be 1 to 3 strings`);
      }
    }
  }
}

if (errors.length) {
  console.error(`FAILED ${errors.length} problem(s):`);
  for (const e of errors) console.error(" - " + e);
  process.exit(1);
}

console.log(`OK ${questions.length} questions, ${verified} marked verified.`);
for (const level of ["II", "III", "IV"]) {
  const row = by[level] || {};
  const n = Object.values(row).reduce((a, b) => a + b, 0);
  const bits = ["safety", "theory", "component", "systems"].map((d) => `${d} ${row[d] || 0}`).join(", ");
  console.log(`  ${level}: ${n} (${bits})`);
}
