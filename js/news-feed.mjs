/* Headline list for the home page.
   Keeps title, source name, date, and link. Does not keep article text.
   The feeds are public RSS. No API key and no secret. */

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
      href: href
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
  return {
    title: item.title,
    source: item.source,
    date: new Date(item.time).toISOString(),
    href: item.href
  };
}

export async function collectNews(now) {
  const clock = Number.isFinite(now) ? now : Date.now();
  const lists = await Promise.all(FEEDS.map(function (feed) {
    return loadFeed(feed);
  }));
  const items = pick([].concat.apply([], lists), clock);
  return {
    updated: new Date(clock).toISOString(),
    items: items.map(publicItem)
  };
}
