/* GET /api/news
   Fresh public headlines for the home page. The fresh copy expires at the
   next 2:00 AM America/Los_Angeles, so a visit after that refreshes the list.
   The cache key is versioned so an older copy is not reused. No API key.
   A failed fetch returns the last good list from this cache when one exists. */

import { collectNews } from "../../js/news-feed.mjs";

const FRESH_URL = "https://neta-nerd.internal/api/news-v2";
const STALE_URL = "https://neta-nerd.internal/api/news-last-v2";
const STALE_TTL = 60 * 60 * 24 * 7;
const ZONE = "America/Los_Angeles";
const DAY_MS = 24 * 60 * 60 * 1000;

function json(payload, cacheControl) {
  return new Response(JSON.stringify(payload), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": cacheControl,
      "x-content-type-options": "nosniff"
    }
  });
}

async function remember(cache, key, response) {
  try { await cache.put(key, response); }
  catch (e) { /* cache is best-effort */ }
}

function wallParts(date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  });
  const out = {};
  const parts = fmt.formatToParts(date);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type !== "literal") out[parts[i].type] = parts[i].value;
  }
  if (out.hour === "24") out.hour = "00";
  return out;
}

function offsetMs(date) {
  const p = wallParts(date);
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return asUtc - date.getTime();
}

function atLocal(year, month, day, hour, minute) {
  const guess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let instant = guess - offsetMs(new Date(guess));
  const again = guess - offsetMs(new Date(instant));
  if (again !== instant) instant = again;
  return instant;
}

/* Next 2:00 in America/Los_Angeles strictly after nowMs.
   A skipped 2:00 (spring forward) moves to the following day. */
function nextNewsRefresh(nowMs) {
  const p = wallParts(new Date(nowMs));
  let year = +p.year;
  let month = +p.month;
  let day = +p.day;
  for (let i = 0; i < 3; i++) {
    const instant = atLocal(year, month, day, 2, 0);
    const shown = wallParts(new Date(instant));
    const isTwo = shown.hour === "02" && shown.minute === "00" &&
      +shown.year === year && +shown.month === month && +shown.day === day;
    if (isTwo && instant > nowMs) return instant;
    const ahead = wallParts(new Date(Date.UTC(year, month - 1, day) + 36 * 60 * 60 * 1000));
    year = +ahead.year;
    month = +ahead.month;
    day = +ahead.day;
  }
  return nowMs + DAY_MS;
}

function freshSeconds(nowMs) {
  const secs = Math.ceil((nextNewsRefresh(nowMs) - nowMs) / 1000);
  return secs > 0 ? secs : 24 * 60 * 60;
}

function selfCheck() {
  const cases = [
    ["2026-01-15T12:00:00Z", "2026-01-16T10:00:00.000Z"],
    ["2026-01-16T09:59:00Z", "2026-01-16T10:00:00.000Z"],
    ["2026-01-16T10:00:00Z", "2026-01-17T10:00:00.000Z"],
    ["2026-07-15T12:00:00Z", "2026-07-16T09:00:00.000Z"],
    ["2026-07-16T08:59:00Z", "2026-07-16T09:00:00.000Z"],
    ["2026-07-16T09:00:00Z", "2026-07-17T09:00:00.000Z"],
    ["2026-03-08T09:30:00Z", "2026-03-09T09:00:00.000Z"],
    ["2026-11-01T08:30:00Z", "2026-11-01T10:00:00.000Z"]
  ];
  for (let i = 0; i < cases.length; i++) {
    const got = new Date(nextNewsRefresh(Date.parse(cases[i][0]))).toISOString();
    if (got !== cases[i][1]) throw new Error("news refresh " + cases[i][0] + " -> " + got);
  }
}
selfCheck();

export async function onRequestGet(context) {
  const cache = typeof caches !== "undefined" ? caches.default : null;
  const freshKey = new Request(FRESH_URL);
  const staleKey = new Request(STALE_URL);
  if (cache) {
    try {
      const hit = await cache.match(freshKey);
      if (hit) return hit;
    } catch (e) { /* fetch the feeds anyway */ }
  }

  let payload = null;
  try { payload = await collectNews(); }
  catch (e) { payload = null; }

  if (payload && payload.items && payload.items.length) {
    const freshTtl = freshSeconds(Date.now());
    const fresh = json(payload, "public, max-age=" + freshTtl + ", s-maxage=" + freshTtl);
    const stale = json(payload, "public, max-age=600, s-maxage=" + STALE_TTL);
    if (cache) {
      try {
        context.waitUntil(Promise.all([
          remember(cache, freshKey, fresh.clone()),
          remember(cache, staleKey, stale)
        ]));
      } catch (e) { /* response is still returned */ }
    }
    return fresh;
  }

  if (cache) {
    try {
      const saved = await cache.match(staleKey);
      if (saved) return saved;
    } catch (e) { /* fall through to an empty list */ }
  }
  return json({ updated: null, items: [] }, "public, max-age=60");
}
