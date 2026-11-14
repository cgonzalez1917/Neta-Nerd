/* GET /api/news
   Fresh public headlines for the home page. Cached at the edge for 12 hours,
   so a visit refreshes the list at least daily. No API key.
   A failed fetch returns the last good list from this cache when one exists. */

import { collectNews } from "../../js/news-feed.mjs";

const FRESH_URL = "https://neta-nerd.internal/api/news";
const STALE_URL = "https://neta-nerd.internal/api/news-last";
const FRESH_TTL = 60 * 60 * 12;
const STALE_TTL = 60 * 60 * 24 * 7;

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
    const fresh = json(payload, "public, max-age=3600, s-maxage=" + FRESH_TTL);
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
