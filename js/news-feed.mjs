/* Headline list for the home page.
   Keeps title, source name, date, link, and an image URL when one is public.
   Does not keep article text. The feeds are public RSS. No API key and no secret.
   Image URL order: media:content, media:thumbnail, enclosure, then og:image.
   Imgix hosts are asked for a 128×96 crop so Home does not pull the full file. */

const UA = "NetaNerdNews/1.0 (+https://neta-nerd.pages.dev)";
const MAX_ITEMS = 6;
const MAX_PER_SOURCE = 4;
const PREFERRED_AGE_MS = 120 * 24 * 60 * 60 * 1000;
const WIDE_AGE_MS = 365 * 24 * 60 * 60 * 1000;
const FEED_TIMEOUT_MS = 8000;

const FEEDS = [
  {
    source: "NETA World Journal",
    url: "https://netaworldjournal.org/feed/",
    keepAll: true
  },
  {
    source: "EC&M",
    url: "https://www.ecmweb.com/__rss/website-scheduled-content.xml?input=" +
      encodeURIComponent('{"sectionAlias":"home"}'),
    keepAll: false
  },
  {
    source: "T&D World",
    url: "https://www.tdworld.com/__rss/website-scheduled-content.xml?input=" +
      encodeURIComponent('{"sectionAlias":"home"}'),
    keepAll: false
  },
  {
    source: "Safety+Health",
    url: "https://www.safetyandhealthmagazine.com/feed/",
    keepAll: false
  }
];

const RELEVANT = /\b(neta|netaworld|nfpa\s*70\s*[eb]|arc[\s-]?flash|testing|maintenance|incident energy|hipot|vlf|commissioning|protective relays?|insulation resistance|switchgear|electrical injur\w*|circuit breakers?)\b/i;
const SPAM = /\b(market to \d{4}|market size|\bcagr\b|indexbox|forecast report)\b/i;

const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };

function decode(text) {
  return String(text || "")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, function (all, ent) {
      const key = ent.toLowerCase();
      if (NAMED[key]) return NAMED[key];
      if (ent.charAt(0) !== "#") return all;
      const hex = ent.charAt(1) === "x" || ent.charAt(1) === "X";
      const cp = parseInt(hex ? ent.slice(2) : ent.slice(1), hex ? 16 : 10);
      if (!Number.isFinite(cp) || cp <= 0 || cp > 0x10ffff) return all;
      return String.fromCodePoint(cp);
    })
    .replace(/\s+/g, " ")
    .trim();
}

function tagText(block, tag) {
  const re = new RegExp("<" + tag + "\\b[^>]*>([\\s\\S]*?)</" + tag + ">", "i");
  const match = block.match(re);
  return match ? decode(match[1]) : "";
}

function cleanHref(raw) {
  if (!raw || /\s/.test(raw)) return "";
  let url;
  try { url = new URL(raw); }
  catch (e) { return ""; }
  if (url.protocol !== "https:") return "";
  const drop = [];
  url.searchParams.forEach(function (_value, key) {
    if (key.toLowerCase().indexOf("utm_") === 0) drop.push(key);
  });
  drop.forEach(function (key) { url.searchParams.delete(key); });
  const href = url.toString();
  if (href.length > 2000) return "";
  return href;
}

function attr(tag, name) {
  const re = new RegExp("\\b" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i");
  const match = tag.match(re);
  return match ? decode(match[2]) : "";
}

function imageUrl(raw, base) {
  if (!raw || /\s/.test(String(raw))) return "";
  let url;
  try { url = new URL(String(raw).trim(), base || undefined); }
  catch (e) { return ""; }
  if (url.protocol !== "https:") return "";
  const drop = [];
  url.searchParams.forEach(function (_value, key) {
    if (key.toLowerCase().indexOf("utm_") === 0) drop.push(key);
  });
  drop.forEach(function (key) { url.searchParams.delete(key); });
  if (url.hostname === "img.ecmweb.com" || url.hostname === "img.tdworld.com") {
    url.searchParams.set("auto", "format,compress");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("w", "128");
    url.searchParams.set("h", "96");
  }
  const href = url.toString();
  if (href.length > 2000 || /\s/.test(href)) return "";
  return href;
}

function imageLike(tag) {
  const medium = attr(tag, "medium").toLowerCase();
  const type = attr(tag, "type").toLowerCase();
  if (!medium && !type) return true;
  if (medium === "image") return true;
  return type.indexOf("image/") === 0;
}

function imageFromBlock(block) {
  const tags = block.match(/<media:(?:content|thumbnail)\b[^>]*>/gi) || [];
  let content = "";
  let thumb = "";
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const url = attr(tag, "url");
    if (!url || !imageLike(tag)) continue;
    if (/media:thumbnail/i.test(tag)) {
      if (!thumb) thumb = url;
    } else if (!content) content = url;
  }
  if (content) return content;
  if (thumb) return thumb;
  const enc = block.match(/<enclosure\b[^>]*>/gi) || [];
  for (let i = 0; i < enc.length; i++) {
    const type = attr(enc[i], "type").toLowerCase();
    const url = attr(enc[i], "url");
    if (url && type.indexOf("image/") === 0) return url;
  }
  return "";
}

function ogImageFromHtml(html, pageUrl) {
  const metas = html.match(/<meta\b[^>]*>/gi) || [];
  let secure = "";
  for (let i = 0; i < metas.length; i++) {
    const prop = (attr(metas[i], "property") || attr(metas[i], "name") || "").toLowerCase();
    if (prop !== "og:image" && prop !== "og:image:url" && prop !== "og:image:secure_url") continue;
    const href = imageUrl(attr(metas[i], "content"), pageUrl);
    if (!href) continue;
    if (prop === "og:image" || prop === "og:image:url") return href;
    if (!secure) secure = href;
  }
  return secure;
}

async function readHead(res) {
  if (!res.body || typeof res.body.getReader !== "function") {
    const text = await res.text();
    return text.slice(0, 150000);
  }
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let html = "";
  try {
    while (html.length < 150000) {
      const step = await reader.read();
      if (step.done) break;
      html += decoder.decode(step.value, { stream: true });
      if (/<\/head>/i.test(html)) break;
    }
  } finally {
    try { await reader.cancel(); }
    catch (e) { /* body already closed */ }
  }
  return html;
}

async function pageImage(href) {
  const timer = withTimeout(FEED_TIMEOUT_MS);
  try {
    const res = await fetch(href, {
      headers: { "user-agent": UA, accept: "text/html" },
      redirect: "follow",
      signal: timer.signal
    });
    if (!res.ok) return "";
    const html = await readHead(res);
    return ogImageFromHtml(html, res.url || href);
  } catch (e) {
    return "";
  } finally {
    timer.done();
  }
}

function normTitle(title) {
  return title.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
}

function parseDate(raw) {
  if (!raw) return null;
  const time = Date.parse(raw);
  if (!Number.isFinite(time)) return null;
  return time;
}

function blocks(xml) {
  const chunks = [];
  const parts = xml.split(/<item\b[^>]*>/i).slice(1);
  for (let i = 0; i < parts.length && chunks.length < 40; i++) {
    chunks.push(parts[i].split(/<\/item>/i)[0]);
  }
  if (chunks.length) return chunks;
  const entries = xml.split(/<entry\b[^>]*>/i).slice(1);
  for (let i = 0; i < entries.length && chunks.length < 40; i++) {
    chunks.push(entries[i].split(/<\/entry>/i)[0]);
  }
  return chunks;
}

function atomLink(block) {
  const tags = block.match(/<link\b[^>]*>/gi) || [];
  let fallback = "";
  for (let i = 0; i < tags.length; i++) {
    const href = /href\s*=\s*["']([^"']+)["']/i.exec(tags[i]);
    if (!href) continue;
    const rel = /rel\s*=\s*["']([^"']+)["']/i.exec(tags[i]);
    if (!rel || rel[1] === "alternate") return decode(href[1]);
    if (!fallback) fallback = decode(href[1]);
  }
  return fallback;
}

function parseFeed(xml, feed) {
  const items = [];
  const chunks = blocks(xml);
  for (let i = 0; i < chunks.length; i++) {
    const block = chunks[i];
    const title = tagText(block, "title");
    const href = cleanHref(tagText(block, "link") || atomLink(block));
    const time = parseDate(tagText(block, "pubDate") || tagText(block, "updated") || tagText(block, "dc:date"));
    if (!title || title.length < 12 || title.length > 240) continue;
    if (!href || !time) continue;
    if (SPAM.test(title)) continue;
    if (!feed.keepAll && !RELEVANT.test(title)) continue;
    items.push({
      title: title,
      source: feed.source,
      time: time,
      href: href,
      image: imageUrl(imageFromBlock(block))
    });
  }
  return items;
}

function withTimeout(ms) {
  const ctrl = new AbortController();
  const timer = setTimeout(function () { ctrl.abort(); }, ms);
  return {
    signal: ctrl.signal,
    done: function () { clearTimeout(timer); }
  };
}

async function loadFeed(feed) {
  const timer = withTimeout(FEED_TIMEOUT_MS);
  try {
    const res = await fetch(feed.url, {
      headers: {
        "user-agent": UA,
        accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1"
      },
      redirect: "follow",
      signal: timer.signal
    });
    if (!res.ok) return [];
    const xml = await res.text();
    if (!xml || xml.length > 1500000) return [];
    return parseFeed(xml, feed);
  } catch (e) {
    return [];
  } finally {
    timer.done();
  }
}

function pick(items, now) {
  function aged(maxAge) {
    return items.filter(function (item) {
      const age = now - item.time;
      return age >= -36 * 60 * 60 * 1000 && age <= maxAge;
    });
  }
  let pool = aged(PREFERRED_AGE_MS);
  if (pool.length < 4) pool = aged(WIDE_AGE_MS);
  pool.sort(function (a, b) {
    return b.time - a.time || a.title.localeCompare(b.title);
  });
  const seen = new Set();
  const unique = [];
  for (let i = 0; i < pool.length; i++) {
    const item = pool[i];
    const key = normTitle(item.title);
    if (!key || seen.has(key) || seen.has(item.href)) continue;
    seen.add(key);
    seen.add(item.href);
    unique.push(item);
  }
  const counts = {};
  unique.forEach(function (item) {
    counts[item.source] = (counts[item.source] || 0) + 1;
  });
  let top = 0;
  Object.keys(counts).forEach(function (source) {
    if (counts[source] > top) top = counts[source];
  });
  const cap = unique.length - top >= 2 ? MAX_PER_SOURCE : MAX_ITEMS;
  const per = {};
  const chosen = [];
  for (let i = 0; i < unique.length; i++) {
    const item = unique[i];
    if ((per[item.source] || 0) >= cap) continue;
    per[item.source] = (per[item.source] || 0) + 1;
    chosen.push(item);
    if (chosen.length === MAX_ITEMS) break;
  }
  chosen.sort(function (a, b) {
    return b.time - a.time || a.title.localeCompare(b.title);
  });
  return chosen;
}

function publicItem(item) {
  const out = {
    title: item.title,
    source: item.source,
    date: new Date(item.time).toISOString(),
    href: item.href
  };
  if (item.image) out.image = item.image;
  return out;
}

export async function collectNews(now) {
  const clock = Number.isFinite(now) ? now : Date.now();
  const lists = await Promise.all(FEEDS.map(function (feed) {
    return loadFeed(feed);
  }));
  const items = pick([].concat.apply([], lists), clock);
  await Promise.all(items.map(function (item) {
    if (item.image) return null;
    return pageImage(item.href).then(function (image) { item.image = image; });
  }));
  return {
    updated: new Date(clock).toISOString(),
    items: items.map(publicItem)
  };
}
