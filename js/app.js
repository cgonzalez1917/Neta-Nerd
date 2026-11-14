/* Neta Nerd — static drill runner. No build step. */
(function () {
  "use strict";
  var LEVELS = ["II", "III", "IV"];
  var DOMAINS = [
    { id: "safety", label: "Safety" },
    { id: "theory", label: "Theory" },
    { id: "component", label: "Component" },
    { id: "systems", label: "Systems" }
  ];
  var DCO = {
    II: { safety: "15%", theory: "25%", component: "55%", systems: "5%" },
    III: { safety: "13%", theory: "23%", component: "47%", systems: "17%" }
  };
  var PROGRESS_KEY = "netanerd-progress-v1";
  var SESSION_KEY = "netanerd-session-v1";
  var LIVE_KEY = "netanerd-live-v1";
  var ACTIVE_KEY = "netanerd-live-active-v1";
  var app = document.getElementById("app");
  var state = {
    bank: null,
    docs: [],
    error: "",
    filters: { levels: ["II"], domains: DOMAINS.map(function (d) { return d.id; }), topics: [] },
    practiceCount: "25"
  };

  function h(tag, props) {
    var el = document.createElement(tag);
    var kids = Array.prototype.slice.call(arguments, 2);
    Object.keys(props || {}).forEach(function (k) {
      var v = props[k];
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (v === false || v == null) return;
      else el.setAttribute(k, v);
    });
    kids.flat().forEach(function (kid) {
      if (kid == null || kid === false) return;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    });
    return el;
  }

  function loadJSON(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error(url + " (" + r.status + ")");
      return r.json();
    });
  }

  function storageGet(key) {
    try { return JSON.parse(localStorage.getItem(key) || "null"); }
    catch (e) { return null; }
  }
  function storageSet(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); }
    catch (e) { /* private mode */ }
  }
  function progress() {
    return storageGet(PROGRESS_KEY) || { seen: {}, sessions: [] };
  }
  function saveProgress(p) { storageSet(PROGRESS_KEY, p); }
  function recordAnswer(id, correct, choice) {
    var p = progress();
    p.seen[id] = { correct: !!correct, choice: choice, at: Date.now() };
    saveProgress(p);
  }
  function missedIds() {
    var seen = progress().seen;
    return Object.keys(seen).filter(function (id) { return seen[id] && !seen[id].correct; });
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pool() {
    var f = state.filters;
    return state.bank.questions.filter(function (q) {
      return f.levels.indexOf(q.level) >= 0 && f.domains.indexOf(q.domain) >= 0 && f.topics.indexOf(q.topic) >= 0;
    });
  }

  function levelLabel(level) {
    if (!level) return "NETA level missing";
    return "NETA Level " + level;
  }

  function domainLabel(id) {
    var d = DOMAINS.find(function (x) { return x.id === id; });
    return d ? d.label : id;
  }

  function questionTags(q) {
    return h("div", { class: "tags" },
      h("span", { class: "tag level" }, levelLabel(q.level)),
      h("span", { class: "tag domain" }, domainLabel(q.domain)),
      h("span", { class: "tag topic" }, topicTitle(q.topic)),
      h("span", { class: "meta id" }, q.id)
    );
  }

  function topicTitle(id) {
    var t = state.bank.topics.find(function (x) { return x.id === id; });
    return t ? t.title : id;
  }

  function safeHttps(url) {
    try {
      var u = new URL(url);
      return u.protocol === "https:" ? u.href : "";
    } catch (e) { return ""; }
  }

  function issueLink(q) {
    var base = state.bank.issuesUrl;
    var body = [
      "Question ID: " + q.id,
      "Level: " + q.level,
      "Domain: " + q.domain,
      "Topic: " + q.topic,
      "",
      "Question:",
      q.question,
      "",
      "Choices:",
      q.choices.map(function (c, i) { return i + ". " + c; }).join("\n"),
      "",
      "What looks wrong:",
      ""
    ].join("\n");
    return base + "?title=" + encodeURIComponent("Question " + q.id) + "&body=" + encodeURIComponent(body);
  }

  function studyHref(kb) {
    if (!kb) return "";
    var parts = String(kb).split("#");
    return "#/study/" + parts[0] + (parts[1] ? "/" + parts[1] : "");
  }

  function present(q) {
    var order = shuffle(q.choices.map(function (_, i) { return i; }));
    return { id: q.id, order: order, picked: null, revealed: false, recorded: false };
  }

  function sourceQuestion(item) {
    return state.bank.byId[item.id];
  }
  function shownChoices(item) {
    var q = sourceQuestion(item);
    return item.order.map(function (i) { return q.choices[i]; });
  }
  function pickedOriginal(item) {
    if (item.picked == null) return null;
    return item.order[item.picked];
  }
  function isCorrect(item) {
    var q = sourceQuestion(item);
    return pickedOriginal(item) === q.answer;
  }

  function liveMap() {
    var map = storageGet(LIVE_KEY);
    if (!map || typeof map !== "object" || Array.isArray(map)) return {};
    return map;
  }
  function itemFits(item) {
    if (!item || !state.bank) return false;
    var q = state.bank.byId[item.id];
    if (!q || !Array.isArray(item.order) || item.order.length !== q.choices.length) return false;
    for (var i = 0; i < item.order.length; i++) {
      if (!Number.isInteger(item.order[i]) || item.order[i] < 0 || item.order[i] >= q.choices.length) return false;
    }
    return true;
  }
  function sessionUsable(session) {
    if (!session || !session.mode || !Array.isArray(session.items) || !session.items.length) return false;
    if (!Number.isInteger(session.index) || session.index < 0 || session.index >= session.items.length) return false;
    if (!state.bank) return true;
    for (var i = 0; i < session.items.length; i++) {
      if (!itemFits(session.items[i])) return false;
    }
    return true;
  }
  function saveLive(session) {
    if (!session || !session.mode) return;
    var map = liveMap();
    map[session.mode] = session;
    storageSet(LIVE_KEY, map);
  }
  function clearLive(mode) {
    if (!mode) return;
    var map = liveMap();
    if (map[mode]) {
      delete map[mode];
      storageSet(LIVE_KEY, map);
    }
    if (storageGet(ACTIVE_KEY) === mode) {
      try { localStorage.removeItem(ACTIVE_KEY); } catch (e) {}
    }
  }
  function loadLive(mode) {
    var session = liveMap()[mode];
    if (!session) return null;
    if (session.mode !== mode || !sessionUsable(session)) {
      clearLive(mode);
      return null;
    }
    return session;
  }
  function rememberActive(mode) {
    if (mode && mode !== "mock") storageSet(ACTIVE_KEY, mode);
  }
  function saveSession(session) {
    saveLive(session);
    if (session && session.mode) rememberActive(session.mode);
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }
  function loadSession() {
    var mode = storageGet(ACTIVE_KEY);
    if (!mode || mode === "mock") return null;
    return loadLive(mode);
  }
  function clearSession(session) {
    var mode = session && session.mode;
    if (!mode) mode = storageGet(ACTIVE_KEY);
    clearLive(mode);
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  }
  function clockText(ms) {
    var s = Math.ceil(Math.max(0, ms) / 1000);
    var h = Math.floor(s / 3600);
    var m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    var sec = String(s % 60).padStart(2, "0");
    return h + ":" + m + ":" + sec;
  }
  function answeredCount(session) {
    return session.items.filter(function (item) { return item.picked != null; }).length;
  }
  function resumeTitle(mode) {
    if (mode === "timed") return "Timed exam";
    if (mode === "mock") return "Mock exam";
    if (mode === "missed") return "Missed review";
    return "Practice";
  }
  function resumeButton(mode) {
    if (mode === "timed" || mode === "mock") return "Resume exam";
    if (mode === "missed") return "Resume review";
    return "Resume practice";
  }
  function resumeSession(mode) {
    if (mode === "mock") {
      location.hash = "#/mock/run";
      return;
    }
    rememberActive(mode);
    if ((location.hash || "#/") === "#/run") render();
    else location.hash = "#/run";
  }
  function resumeBanner(session) {
    var title = resumeTitle(session.mode);
    var low = session.mode === "mock" ? "300" : "60";
    return h("div", { class: "resume-banner panel" },
      h("p", { class: "resume-copy" },
        h("b", {}, title + " in progress"),
        " · " + answeredCount(session) + " of " + session.items.length + " answered",
        session.endsAt ? " · " : null,
        session.endsAt ? h("span", {
          class: "timer",
          "data-ends": String(session.endsAt),
          "data-mode": session.mode,
          "data-low": low
        }, clockText(session.endsAt - Date.now())) : null,
        session.endsAt ? " left" : null
      ),
      h("div", { class: "actions" },
        h("button", {
          type: "button",
          class: "btn ghost small",
          onclick: function () { clearLive(session.mode); render(); }
        }, "Discard"),
        h("button", {
          type: "button",
          class: "btn primary small",
          onclick: function () { resumeSession(session.mode); }
        }, resumeButton(session.mode))
      )
    );
  }
  function appendResumeBanners(modes) {
    modes.forEach(function (mode) {
      var session = loadLive(mode);
      if (!session || (session.endsAt && session.endsAt <= Date.now())) return;
      app.append(resumeBanner(session));
    });
  }
  function armBannerClocks() {
    var nodes = [].slice.call(app.querySelectorAll("[data-ends]"));
    if (!nodes.length) return;
    var tick = function () {
      var expired = null;
      nodes.forEach(function (el) {
        if (expired) return;
        var left = Number(el.getAttribute("data-ends")) - Date.now();
        var lowAt = Number(el.getAttribute("data-low")) || 60;
        if (left <= 0) {
          el.textContent = "0:00:00";
          el.className = "timer low";
          expired = el.getAttribute("data-mode");
          return;
        }
        el.textContent = clockText(left);
        el.className = "timer" + (Math.ceil(left / 1000) < lowAt ? " low" : "");
      });
      if (!expired) return;
      if (state._timer) { clearInterval(state._timer); state._timer = null; }
      var session = loadLive(expired);
      if (!session) return;
      if (expired === "mock") finishMock(session, "time");
      else finish(session, "time");
    };
    tick();
    state._timer = setInterval(tick, 250);
  }
  function claimExpired(mode) {
    var session = loadLive(mode);
    if (!session || !session.endsAt || session.endsAt > Date.now()) return false;
    if (mode === "mock") finishMock(session, "time");
    else finish(session, "time");
    return !loadLive(mode);
  }
  function migrateSessions() {
    var old = null;
    var oldMock = null;
    try { old = JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); } catch (e) {}
    try { oldMock = JSON.parse(sessionStorage.getItem(MOCK_SESSION) || "null"); } catch (e) {}
    if (old && old.mode && old.mode !== "mock" && !liveMap()[old.mode] && sessionUsable(old)) {
      saveLive(old);
      if (!storageGet(ACTIVE_KEY)) rememberActive(old.mode);
    }
    if (oldMock && oldMock.mode === "mock" && !liveMap().mock && sessionUsable(oldMock)) saveLive(oldMock);
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    try { sessionStorage.removeItem(MOCK_SESSION); } catch (e) {}
  }

  var MOCK_FRACTIONS = {
    II: { safety: 0.15, theory: 0.25, component: 0.55, systems: 0.05 },
    III: { safety: 0.13, theory: 0.23, component: 0.47, systems: 0.17 }
  };
  var MOCK_FORMATS = [
    { id: "full", label: "Full", count: 100, minutes: 120 },
    { id: "half", label: "Half", count: 50, minutes: 60 }
  ];
  var MOCK_PASS = 0.7;
  var MOCK_KEY = "netanerd-mock-v1";
  var MOCK_SESSION = "netanerd-mock-session-v1";
  var MOCK_RESULT = "netanerd-mock-result-v1";

  function mockQuotas(level, total) {
    var weights = MOCK_FRACTIONS[level];
    var parts = DOMAINS.map(function (d) {
      var exact = weights[d.id] * total;
      return { id: d.id, n: Math.floor(exact), frac: exact - Math.floor(exact) };
    });
    var used = parts.reduce(function (sum, p) { return sum + p.n; }, 0);
    var order = parts.slice().sort(function (a, b) { return b.frac - a.frac || b.n - a.n; });
    var i = 0;
    while (used < total) {
      order[i].n += 1;
      used += 1;
      i += 1;
    }
    var out = {};
    parts.forEach(function (p) { out[p.id] = p.n; });
    return out;
  }

  function domainPool(level, domain) {
    return state.bank.questions.filter(function (q) { return q.level === level && q.domain === domain; });
  }

  function canFillMock(level, total) {
    var quotas = mockQuotas(level, total);
    return DOMAINS.every(function (d) { return domainPool(level, d.id).length >= quotas[d.id]; });
  }

  function drawMock(level, total) {
    var quotas = mockQuotas(level, total);
    var picked = [];
    var short = false;
    DOMAINS.forEach(function (d) {
      var all = domainPool(level, d.id);
      var verified = shuffle(all.filter(function (q) { return q.verified; }));
      var rest = shuffle(all.filter(function (q) { return !q.verified; }));
      var take = verified.slice(0, quotas[d.id]);
      if (take.length < quotas[d.id]) take = take.concat(rest.slice(0, quotas[d.id] - take.length));
      if (take.length < quotas[d.id]) short = true;
      picked = picked.concat(take);
    });
    if (short || picked.length !== total) return null;
    return shuffle(picked);
  }

  function loadMockSession() { return loadLive("mock"); }
  function saveMockSession(session) {
    saveLive(session);
    try { sessionStorage.removeItem(MOCK_SESSION); } catch (e) {}
  }
  function clearMockSession() {
    clearLive("mock");
    try { sessionStorage.removeItem(MOCK_SESSION); } catch (e) {}
  }
  function mockHistory() {
    return storageGet(MOCK_KEY) || [];
  }
  function saveMockHistory(list) { storageSet(MOCK_KEY, list); }

  function startMock(level, formatId) {
    var format = MOCK_FORMATS.filter(function (f) { return f.id === formatId; })[0];
    if (!format || !canFillMock(level, format.count)) return;
    var list = drawMock(level, format.count);
    if (!list) return;
    var session = {
      mode: "mock",
      level: level,
      format: format.id,
      minutes: format.minutes,
      settings: {
        level: level,
        domains: DOMAINS.map(function (d) { return d.id; }),
        topics: state.bank.topics.map(function (t) { return t.id; }),
        length: format.count,
        format: format.id
      },
      items: list.map(function (q) {
        var item = present(q);
        item.flagged = false;
        return item;
      }),
      index: 0,
      startedAt: Date.now(),
      endsAt: Date.now() + format.minutes * 60 * 1000
    };
    saveMockSession(session);
    location.hash = "#/mock/run";
  }

  function domainTallies(rows) {
    var out = {};
    DOMAINS.forEach(function (d) { out[d.id] = { correct: 0, total: 0 }; });
    rows.forEach(function (row) {
      var q = state.bank.byId[row.id];
      if (!q || !out[q.domain]) return;
      out[q.domain].total += 1;
      if (row.correct) out[q.domain].correct += 1;
    });
    return out;
  }

  function finishMock(session, reason) {
    if (!session || session._done || state._finishing) return;
    state._finishing = true;
    session._done = true;
    if (!sessionUsable(session)) {
      clearMockSession();
      location.hash = "#/mock";
      state._finishing = false;
      return;
    }
    var rows = session.items.map(function (item) {
      var q = sourceQuestion(item);
      var choice = pickedOriginal(item);
      var ok = choice === q.answer;
      return { id: q.id, choice: choice, correct: !!ok && choice != null };
    });
    var correct = rows.filter(function (r) { return r.correct; }).length;
    var allotted = session.minutes * 60;
    var elapsed = Math.max(0, Math.round((Date.now() - session.startedAt) / 1000));
    var result = {
      mode: "mock",
      reason: reason || "submitted",
      level: session.level,
      format: session.format,
      minutes: session.minutes,
      rows: rows,
      correct: correct,
      total: rows.length,
      seconds: Math.min(allotted, elapsed),
      pct: rows.length ? Math.round(100 * correct / rows.length) : 0,
      domains: domainTallies(rows),
      at: Date.now()
    };
    result.passed = result.pct >= MOCK_PASS * 100;
    var history = [result].concat(mockHistory()).slice(0, 8);
    saveMockHistory(history);
    try { sessionStorage.setItem(MOCK_RESULT, JSON.stringify(result)); } catch (e) {}
    clearMockSession();
    location.hash = "#/mock/results";
    state._finishing = false;
  }

  function startDrill(mode, questions) {
    var list = questions.slice();
    var count = list.length;
    if (mode === "timed") {
      var n = Math.min(25, list.length);
      list = shuffle(list).slice(0, n);
      count = list.length;
    } else if (mode === "practice") {
      list = shuffle(list);
      if (state.practiceCount !== "all") {
        list = list.slice(0, Math.min(Number(state.practiceCount) || list.length, list.length));
      }
      count = list.length;
    }
    if (!count) return;
    var seconds = count * 72;
    var session = {
      mode: mode,
      items: list.map(function (q) {
        var item = present(q);
        item.flagged = false;
        return item;
      }),
      index: 0,
      startedAt: Date.now(),
      endsAt: mode === "timed" ? Date.now() + seconds * 1000 : null,
      filters: JSON.parse(JSON.stringify(state.filters)),
      settings: {
        levels: state.filters.levels.slice(),
        domains: state.filters.domains.slice(),
        topics: state.filters.topics.slice(),
        length: mode === "practice" ? state.practiceCount : (mode === "timed" ? String(count) : "missed")
      }
    };
    saveSession(session);
    if ((location.hash || "#/") === "#/run") render();
    else location.hash = "#/run";
  }

  function finish(session, reason) {
    if (!session || session._done || state._finishing) return;
    state._finishing = true;
    session._done = true;
    if (!sessionUsable(session)) {
      clearSession(session);
      location.hash = "#/drills";
      state._finishing = false;
      return;
    }
    var rows = session.items.map(function (item) {
      var q = sourceQuestion(item);
      var choice = pickedOriginal(item);
      var ok = choice === q.answer;
      var answered = choice != null;
      if (!item.recorded) recordAnswer(q.id, ok && answered, choice);
      return { id: q.id, choice: choice, correct: ok && answered, answered: answered };
    });
    var correct = rows.filter(function (r) { return r.correct; }).length;
    var elapsed = Math.max(0, Math.round((Date.now() - session.startedAt) / 1000));
    if (session.endsAt) {
      var allotted = Math.max(0, Math.round((session.endsAt - session.startedAt) / 1000));
      elapsed = Math.min(elapsed, allotted);
    }
    var result = {
      mode: session.mode,
      reason: reason || "submitted",
      rows: rows,
      correct: correct,
      total: rows.length,
      seconds: elapsed,
      at: Date.now()
    };
    var p = progress();
    p.sessions = [{ mode: result.mode, correct: correct, total: result.total, at: result.at, seconds: result.seconds }].concat(p.sessions || []).slice(0, 8);
    saveProgress(p);
    try { sessionStorage.setItem("netanerd-result-v1", JSON.stringify(result)); } catch (e) {}
    clearSession(session);
    location.hash = "#/results";
    state._finishing = false;
  }

  function parseHash() {
    var raw = (location.hash || "#/").replace(/^#/, "") || "/";
    var path = raw.split("?")[0];
    return path.charAt(0) === "/" ? path : "/" + path;
  }

  function toggle(list, id) {
    var i = list.indexOf(id);
    if (i >= 0) list.splice(i, 1);
    else list.push(id);
  }

  function chipRow(label, items, selected, onToggle) {
    return h("div", { class: "row", style: "margin: 8px 0" },
      h("div", { class: "filter-label" }, label),
      items.map(function (item) {
        var id = item.id || item;
        var on = selected.indexOf(id) >= 0;
        return h("button", {
          type: "button", class: "chip" + (label === "Domain" ? " domain" : ""),
          "aria-pressed": on ? "true" : "false",
          onclick: function () { onToggle(id); render(); }
        }, item.label || item);
      })
    );
  }

  function placeholderData() {
    return window.NETA_PLACEHOLDERS || null;
  }

  function exampleTag(on) {
    return on ? h("span", { class: "tag" }, "EXAMPLE") : null;
  }

  function safeArt(svg) {
    return typeof svg === "string" && svg.indexOf("<svg") === 0 ? svg : "";
  }

  var newsToken = 0;
  var NEWS_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function formatNewsDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return NEWS_MONTHS[d.getUTCMonth()] + " " + d.getUTCDate() + ", " + d.getUTCFullYear();
  }

  function newsItemOk(item) {
    if (!item) return false;
    if (typeof item.title !== "string" || !item.title.trim()) return false;
    if (typeof item.href !== "string" || item.href.indexOf("https://") !== 0 || /\s/.test(item.href)) return false;
    if (typeof item.source !== "string" || !item.source.trim()) return false;
    if (typeof item.date !== "string" || isNaN(new Date(item.date).getTime())) return false;
    return true;
  }

  function newsList(items) {
    return h("ul", { class: "news-list" }, items.map(function (item) {
      var when = formatNewsDate(item.date);
      var meta = item.source;
      if (when) meta = meta + " · " + when;
      return h("li", {},
        h("p", { class: "news-title" },
          h("a", { href: item.href, target: "_blank", rel: "noopener noreferrer" }, item.title)
        ),
        h("p", { class: "news-src" }, meta)
      );
    }));
  }

  function fillNews(slot, token) {
    function paint(payload, saved) {
      if (token !== newsToken) return;
      var items = ((payload && payload.items) || []).filter(newsItemOk).slice(0, 8);
      slot.replaceChildren();
      if (!items.length) {
        slot.append(h("p", { class: "news-empty" }, "Headlines are not available right now. Check back later."));
        return;
      }
      slot.append(newsList(items));
      if (saved) slot.append(h("p", { class: "news-empty" }, "Showing saved headlines."));
    }
    function saved() {
      return fetch("data/news.json").then(function (r) {
        if (!r.ok) throw new Error("saved");
        return r.json();
      }).then(function (data) {
        paint(data, true);
      }).catch(function () {
        paint(null, false);
      });
    }
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
    fetch("api/news", ctrl ? { signal: ctrl.signal } : undefined).then(function (r) {
      if (!r.ok) throw new Error("news");
      return r.json();
    }).then(function (data) {
      if (!((data && data.items) || []).some(newsItemOk)) throw new Error("empty");
      clearTimeout(timer);
      paint(data, false);
    }).catch(function () {
      clearTimeout(timer);
      return saved();
    });
  }

  function newsPanel() {
    var token = ++newsToken;
    var slot = h("div", { "aria-live": "polite" },
      h("p", { class: "news-empty" }, "Loading headlines…")
    );
    fillNews(slot, token);
    return h("section", { class: "panel news", "aria-labelledby": "news-h" },
      h("header", { class: "panel-h" },
        h("h2", { id: "news-h" }, "NETA News")
      ),
      slot
    );
  }

  function renderFieldDesk() {
    document.title = "Home · Neta Nerd";
    appendResumeBanners(["timed", "mock", "practice", "missed"]);
    var data = placeholderData();
    if (!data || !data.deck) {
      app.append(h("h1", {}, "Field desk"), h("p", {}, "The placeholder file did not load."));
      return;
    }
    var slides = data.deck.slides || [];
    var index = 0;
    var figs = slides.map(function (slide, idx) {
      return h("figure", {
        class: "slide" + (idx === 0 ? " is-on" : ""),
        "aria-hidden": idx === 0 ? "false" : "true"
      },
        h("div", { class: "art-frame", html: safeArt(slide.svg) }),
        h("figcaption", {}, slide.caption || "")
      );
    });
    var dots = slides.map(function (slide, idx) {
      return h("button", {
        type: "button",
        class: "deck-dot" + (idx === 0 ? " is-on" : ""),
        role: "tab",
        "aria-label": slide.caption || ("Example image " + (idx + 1)),
        "aria-selected": idx === 0 ? "true" : "false"
      });
    });
    function show(next) {
      if (!slides.length) return;
      index = (next % slides.length + slides.length) % slides.length;
      figs.forEach(function (fig, idx) {
        var on = idx === index;
        fig.classList.toggle("is-on", on);
        fig.setAttribute("aria-hidden", on ? "false" : "true");
      });
      dots.forEach(function (dot, idx) {
        var on = idx === index;
        dot.classList.toggle("is-on", on);
        dot.setAttribute("aria-selected", on ? "true" : "false");
      });
    }
    dots.forEach(function (dot, idx) {
      dot.addEventListener("click", function () { show(idx); });
    });
    var deck = h("section", { class: "panel deck", "aria-labelledby": "deck-h" },
      h("header", { class: "panel-h" },
        h("h2", { id: "deck-h" }, data.deck.heading || "Electrical construction"),
        exampleTag(data.deck.example)
      ),
      h("div", { class: "slides" }, figs),
      h("div", { class: "deck-bar" },
        h("div", { class: "deck-dots", role: "tablist", "aria-label": "Example images" }, dots),
        h("div", { class: "deck-btns" },
          h("button", {
            type: "button", class: "btn ghost small",
            "aria-label": "Previous example image",
            onclick: function () { show(index - 1); }
          }, "Prev"),
          h("button", {
            type: "button", class: "btn ghost small",
            "aria-label": "Next example image",
            onclick: function () { show(index + 1); }
          }, "Next")
        )
      )
    );
    deck.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowLeft") { show(index - 1); ev.preventDefault(); }
      if (ev.key === "ArrowRight") { show(index + 1); ev.preventDefault(); }
    });
    app.append(
      h("p", { class: "kicker" }, "Home"),
      h("div", { class: "title-row" },
        h("h1", {}, "Field desk")
      ),
      h("a", { class: "study-entry panel", href: "#/study" },
        h("span", { class: "study-copy" },
          h("strong", {}, "Studying"),
          h("span", {}, "Open the current study pages and practice drills.")
        ),
        h("span", { class: "btn primary" }, "Open Studying")
      ),
      h("div", { class: "desk" },
        newsPanel(),
        deck
      )
    );
  }

  function renderTools() {
    document.title = "Tools · Neta Nerd";
    var tools = placeholderData() && placeholderData().tools;
    if (!tools) {
      app.append(h("h1", {}, "Field tools"), h("p", {}, "The placeholder file did not load."));
      return;
    }
    app.append(
      h("p", { class: "kicker" }, "Tools"),
      h("h1", {}, "Field tools"),
      h("p", { class: "lede accent" }, tools.intro || ""),
      h("div", { class: "tool-grid" }, (tools.items || []).map(function (tool) {
        return h("article", { class: "panel tool-card" },
          h("div", { class: "tool-art", html: safeArt(tool.svg) }),
          h("div", { class: "tool-body" },
            h("header", { class: "panel-h" },
              h("h2", {}, tool.title || ""),
              exampleTag(tools.example)
            ),
            h("p", {}, tool.text || ""),
            h("p", { class: "status" }, "Status: " + (tool.status || "Concept"))
          )
        );
      }))
    );
  }

  function renderManuals() {
    document.title = "Manuals · Neta Nerd";
    app.append(
      h("p", { class: "kicker" }, "Manuals"),
      h("h1", {}, "Coming soon"),
      h("div", { class: "panel soon" },
        h("div", {
          class: "soon-lock",
          html: '<svg class="lock-lg" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
        }),
        h("p", {}, "This will be a members-only area filed by job number.")
      )
    );
  }

  function renderDrills() {
    document.title = "Drills · Neta Nerd";
    var b = state.bank;
    var match = pool();
    var byLevel = {};
    LEVELS.forEach(function (l) { byLevel[l] = b.questions.filter(function (q) { return q.level === l; }).length; });
    var seen = progress().seen;
    var seenN = Object.keys(seen).length;
    var correctN = Object.keys(seen).filter(function (id) { return seen[id].correct; }).length;
    var missed = missedIds().filter(function (id) { return b.byId[id]; });
    var onlyII = state.filters.levels.length === 1 && state.filters.levels[0] === "II";
    var dco = DCO.II;
    var iiCounts = { safety: 0, theory: 0, component: 0, systems: 0 };
    b.questions.forEach(function (q) { if (q.level === "II") iiCounts[q.domain] = (iiCounts[q.domain] || 0) + 1; });

    appendResumeBanners(["timed", "mock", "practice", "missed"]);
    app.append(
      h("p", { class: "kicker" }, "Field drills · Level II first"),
      h("h1", {}, "Practice the test, not a leaked paper."),
      h("p", { class: "lede" }, "Original questions for NETA acceptance and maintenance testing. Level II is selected by default. Instant feedback in practice, a timed 25-question drill, and missed questions saved on this device."),
      h("div", { class: "panel stack" },
        h("h2", {}, "Build a drill"),
        h("p", { class: "meta" }, onlyII
          ? "Level II bank by domain (study-guide targets " + dco.safety + " / " + dco.theory + " / " + dco.component + " / " + dco.systems + "): Safety " + iiCounts.safety + ", Theory " + iiCounts.theory + ", Component " + iiCounts.component + ", Systems " + iiCounts.systems + "."
          : match.length + " questions match the filters."),
        chipRow("Level", LEVELS.map(function (id) { return { id: id, label: "Level " + id }; }), state.filters.levels, function (id) { toggle(state.filters.levels, id); }),
        chipRow("Domain", DOMAINS, state.filters.domains, function (id) { toggle(state.filters.domains, id); }),
        chipRow("Length", [{ id: "10", label: "10" }, { id: "25", label: "25" }, { id: "50", label: "50" }, { id: "all", label: "All matching" }], [state.practiceCount], function (id) { state.practiceCount = id; }),
        h("p", { class: "meta" }, match.length + " questions available with these filters. Practice lengths (10, 25, 50, or all) are untimed and show the explanation after each answer. Timed quiz always takes up to 25 and allows 72 seconds each (30:00 at 25)."),
        h("div", { class: "actions" },
          h("button", { class: "btn primary", disabled: match.length ? null : true, onclick: function () { startDrill("practice", match); } }, "Start practice"),
          h("button", { class: "btn ghost", disabled: match.length ? null : true, onclick: function () { startDrill("timed", match); } }, "Timed quiz"),
          h("button", { class: "btn", disabled: missed.length ? null : true, onclick: function () {
            var qs = missed.map(function (id) { return b.byId[id]; }).filter(Boolean);
            startDrill("missed", qs);
          } }, "Review missed (" + missed.length + ")"),
          h("a", { class: "btn ghost", href: "#/mock" }, "Mock exam")
        )
      ),
      h("div", { class: "stats", style: "margin-top:14px" },
        h("div", { class: "stat" }, h("b", {}, String(b.questions.length)), h("span", {}, "Questions in the bank")),
        h("div", { class: "stat" }, h("b", {}, seenN ? Math.round(100 * correctN / seenN) + "%" : "—"), h("span", {}, seenN + " answered on this device")),
        h("div", { class: "stat" }, h("b", {}, String(missed.length)), h("span", {}, "Missed, waiting for review"))
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Topics"),
        h("div", { class: "topics" }, b.topics.map(function (t) {
          var n = b.questions.filter(function (q) { return q.topic === t.id; }).length;
          return h("a", { class: "topic-card", href: "#/drills", onclick: function (ev) {
            ev.preventDefault();
            state.filters.topics = [t.id];
            render();
            window.scrollTo(0, 0);
          } }, h("strong", {}, t.title), h("span", {}, n + " questions"));
        })),
        h("p", { class: "meta", style: "margin-top:8px" }, "Choosing a topic clears the others. "),
        h("button", { class: "btn small", onclick: function () {
          state.filters.topics = b.topics.map(function (t) { return t.id; });
          render();
        } }, "All topics")
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Study"),
        h("p", {}, "The knowledge base is the source for these drills: procedures, the checked ATS-2025 / MTS-2023 / 70E-2024 numbers, and the math that is not on the NETA formula sheet."),
        h("div", { class: "actions" },
          h("a", { class: "btn primary", href: "#/study" }, "Open study pages"),
          h("a", { class: "btn ghost", href: "#/math" }, "Math Cheat Sheet"),
          h("a", { class: "btn ghost", href: "#/study/level-2.md/exam-format" }, "Level II exam format"),
          h("a", { class: "btn ghost", href: "#/study/level-3.md/exam-format" }, "Level III exam format"),
          h("a", { class: "btn", href: "#/mock" }, "Mock exam")
        )
      )
    );
  }

  function renderMockSetup() {
    var levels = ["II", "III"].map(function (level) {
      return {
        id: level,
        label: "Level " + level,
        half: canFillMock(level, 50),
        full: canFillMock(level, 100)
      };
    }).filter(function (level) { return level.half || level.full; });
    if (!state.mockLevel || !levels.some(function (level) { return level.id === state.mockLevel; })) {
      state.mockLevel = levels.length ? levels[0].id : "II";
    }
    var current = levels.filter(function (level) { return level.id === state.mockLevel; })[0];
    if (!state.mockFormat) state.mockFormat = "full";
    if (current && state.mockFormat === "full" && !current.full) state.mockFormat = "half";
    if (current && state.mockFormat === "half" && !current.half) state.mockFormat = "full";
    var history = mockHistory();
    var quotas = current ? mockQuotas(current.id, state.mockFormat === "half" ? 50 : 100) : null;
    appendResumeBanners(["mock"]);
    app.append(
      h("p", { class: "kicker" }, "Separate from practice"),
      h("h1", {}, "Mock exam"),
      h("p", { class: "lede" }, "A closed-book sitting for Level II or Level III. Questions are drawn to the domain weights for that level. Answers and explanations stay hidden until you submit or the clock hits 0:00."),
      h("div", { class: "panel stack" },
        levels.length ? null : h("p", {}, "Neither Level II nor Level III has enough questions for a mock exam yet."),
        h("div", { class: "filter-label" }, "Level"),
        h("div", { class: "row" }, levels.map(function (level) {
          return h("button", {
            type: "button",
            class: "chip" + (state.mockLevel === level.id ? " on" : ""),
            "aria-pressed": state.mockLevel === level.id ? "true" : "false",
            onclick: function () { state.mockLevel = level.id; render(); }
          }, level.label);
        })),
        h("div", { class: "filter-label" }, "Format"),
        h("div", { class: "row" }, MOCK_FORMATS.map(function (format) {
          var ok = current && (format.id === "full" ? current.full : current.half);
          return h("button", {
            type: "button",
            class: "chip" + (state.mockFormat === format.id ? " on" : ""),
            "aria-pressed": state.mockFormat === format.id ? "true" : "false",
            disabled: ok ? null : true,
            onclick: function () { if (!ok) return; state.mockFormat = format.id; render(); }
          }, format.label + " · " + format.count + " questions · " + format.minutes + " min");
        })),
        quotas ? h("p", { class: "meta" }, "Draw for this sitting: Safety " + quotas.safety + ", Theory " + quotas.theory + ", Component " + quotas.component + ", Systems " + quotas.systems + ". Verified questions are used first.") : null,
        h("p", {}, "The score at the end is a practice estimate. NETA scales exams to 410 on a 200–500 scale and has not published a raw percent cutoff. This drill uses 70% as the practice target."),
        h("div", { class: "actions" },
          h("button", {
            class: "btn primary",
            disabled: current ? null : true,
            onclick: function () { startMock(state.mockLevel, state.mockFormat); }
          }, "Start mock exam"),
          h("a", { class: "btn", href: "#/drills" }, "Back to practice")
        )
      )
    );
    if (history.length) app.append(
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Saved on this device"),
        h("ul", { class: "miss-list" }, history.map(function (item) {
          return h("li", {},
            h("button", { class: "btn small", onclick: function () {
              try { sessionStorage.setItem(MOCK_RESULT, JSON.stringify(item)); } catch (e) {}
              location.hash = "#/mock/results";
            } }, "Open"),
            " ",
            h("span", { class: "tag level" }, levelLabel(item.level)),
            h("span", { class: "tag" }, item.format === "half" ? "Half" : "Full"),
            h("span", { class: "tag " + (item.passed ? "ok" : "bad") }, item.pct + "%"),
            h("span", { class: "meta" }, new Date(item.at).toLocaleString())
          );
        }))
      )
    );
  }

  function renderMockRun() {
    var session = loadMockSession();
    if (!session || session.mode !== "mock") { location.hash = "#/mock"; return; }
    if (session.endsAt <= Date.now()) { finishMock(session, "time"); return; }
    var item = session.items[session.index];
    var q = sourceQuestion(item);
    if (!q) { clearMockSession(); location.hash = "#/mock"; return; }
    var choices = shownChoices(item);
    var total = session.items.length;
    var unanswered = session.items.filter(function (entry) { return entry.picked == null; }).length;

    function persist() { saveMockSession(session); render(); }
    function pick(i) {
      item.picked = i;
      persist();
    }
    function go(delta) {
      var next = session.index + delta;
      if (next < 0 || next >= total) return;
      session.index = next;
      persist();
    }
    function jumpUnanswered() {
      for (var n = 1; n <= total; n++) {
        var idx = (session.index + n) % total;
        if (session.items[idx].picked == null) {
          session.index = idx;
          persist();
          return;
        }
      }
    }
    function submit() {
      if (unanswered && !window.confirm("Submit with " + unanswered + " unanswered? Unanswered questions are marked wrong.")) return;
      finishMock(session, "submitted");
    }

    var head = h("div", { class: "q-top" },
      h("div", { class: "row", style: "justify-content:space-between" },
        h("span", { class: "meta" }, "Mock · " + levelLabel(session.level) + " · " + (session.format === "half" ? "Half" : "Full") + " · " + (session.index + 1) + " / " + total),
        h("span", { class: "timer mock", id: "timer" }, "—")
      ),
      h("div", { class: "progress" }, h("i", { style: "width:" + Math.round(100 * (total - unanswered) / total) + "%" })),
      h("div", { class: "dots", "aria-label": "Question navigation" }, session.items.map(function (entry, idx) {
        var cls = "dot";
        if (entry.picked != null) cls += " on";
        if (entry.flagged) cls += " flag";
        if (idx === session.index) cls += " here";
        return h("button", {
          type: "button",
          class: cls,
          "aria-label": "Question " + (idx + 1) + (entry.picked == null ? ", unanswered" : ", answered") + (entry.flagged ? ", flagged" : ""),
          onclick: function () { session.index = idx; persist(); }
        }, String(idx + 1));
      })),
      h("div", { class: "actions mock-nav" },
        h("button", { class: "btn small", onclick: jumpUnanswered }, "Next unanswered (" + unanswered + ")"),
        h("button", {
          class: "btn small" + (item.flagged ? " ghost" : ""),
          "aria-pressed": item.flagged ? "true" : "false",
          onclick: function () { item.flagged = !item.flagged; persist(); }
        }, item.flagged ? "Flagged for review" : "Flag for review")
      )
    );

    app.append(
      head,
      h("div", { class: "panel" },
        questionTags(q),
        h("h2", { class: "stem" }, q.question),
        h("div", { role: "radiogroup", "aria-label": "Answer choices" }, choices.map(function (text, i) {
          var checked = item.picked === i;
          return h("button", {
            type: "button",
            class: "choice",
            role: "radio",
            "aria-checked": checked ? "true" : "false",
            onclick: function () { pick(i); }
          }, h("span", { class: "key" }, String.fromCharCode(65 + i)), h("span", {}, text));
        })),
        h("div", { class: "actions" },
          h("button", { class: "btn", onclick: function () { go(-1); } }, "Back"),
          h("button", { class: "btn", onclick: function () { go(1); } }, "Next"),
          h("button", { class: "btn primary", onclick: submit }, "Submit exam")
        )
      )
    );

    var timerEl = document.getElementById("timer");
    var tick = function () {
      var left = Math.max(0, session.endsAt - Date.now());
      var s = Math.ceil(left / 1000);
      var hh = Math.floor(s / 3600);
      var mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      var ss = String(s % 60).padStart(2, "0");
      if (timerEl) {
        timerEl.textContent = (hh ? hh + ":" : "") + mm + ":" + ss;
        timerEl.className = "timer mock" + (s < 300 ? " low" : "");
      }
      if (left <= 0) {
        if (state._timer) { clearInterval(state._timer); state._timer = null; }
        finishMock(loadMockSession() || session, "time");
      }
    };
    tick();
    state._timer = setInterval(tick, 250);
  }

  function renderMockResults() {
    var result = null;
    try { result = JSON.parse(sessionStorage.getItem(MOCK_RESULT) || "null"); }
    catch (e) {}
    if (!result || result.mode !== "mock") {
      app.append(h("h1", {}, "No mock result"), h("p", {}, "Finish a mock exam to see the review."), h("a", { class: "btn primary", href: "#/mock" }, "Mock exam"));
      return;
    }
    var mm = Math.floor(result.seconds / 60);
    var ss = String(result.seconds % 60).padStart(2, "0");
    app.append(
      h("p", { class: "kicker" }, "Mock exam · " + levelLabel(result.level) + " · " + (result.format === "half" ? "Half" : "Full")),
      h("h1", {}, result.passed ? "Practice target met" : "Under the practice target"),
      h("p", { class: "score-num" }, result.pct + "%"),
      h("p", {}, result.correct + " / " + result.total + " · " + mm + "m " + ss + "s" + (result.reason === "time" ? " · time expired" : "")),
      h("div", { class: "panel estimate" + (result.passed ? " pass" : " fail") },
        h("h2", {}, "Estimate only"),
        h("p", {}, (result.passed ? "At or above" : "Below") + " the 70% practice target."),
        h("p", {}, "This is not a NETA score. NETA scales exams to 410 on a 200–500 scale and has not published a raw percent cutoff. This drill uses 70% only as a practice target.")
      ),
      h("div", { class: "stats", style: "margin-top:14px" }, DOMAINS.map(function (d) {
        var cell = (result.domains && result.domains[d.id]) || { correct: 0, total: 0 };
        var pct = cell.total ? Math.round(100 * cell.correct / cell.total) : 0;
        return h("div", { class: "stat" },
          h("b", {}, cell.total ? pct + "%" : "—"),
          h("span", {}, d.label + " · " + cell.correct + "/" + cell.total)
        );
      })),
      h("div", { class: "actions" },
        h("a", { class: "btn primary", href: "#/mock" }, "New mock exam"),
        h("a", { class: "btn", href: "#/drills" }, "Practice")
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Review"),
        h("ul", { class: "miss-list" }, result.rows.map(function (row, idx) {
          var q = state.bank.byId[row.id];
          if (!q) return null;
          var yours = row.choice == null ? "No answer" : q.choices[row.choice];
          return h("li", {},
            h("p", { class: "meta" }, "Question " + (idx + 1)),
            h("span", { class: "tag " + (row.correct ? "ok" : "bad") }, row.correct ? "Correct" : "Missed"),
            questionTags(q),
            h("p", {}, q.question),
            h("p", {}, "Your answer: " + yours),
            h("p", {}, "Correct answer: " + q.choices[q.answer]),
            h("p", {}, q.explanation),
            h("p", { class: "ref" }, q.reference)
          );
        }))
      )
    );
  }

  function renderRun() {
    var session = loadSession();
    if (!session) { location.hash = "#/drills"; return; }
    var item = session.items[session.index];
    var q = sourceQuestion(item);
    if (!q) { clearSession(session); location.hash = "#/drills"; return; }
    var choices = shownChoices(item);
    var revealed = session.mode !== "timed" && item.revealed;
    var total = session.items.length;

    function persist() { saveSession(session); render(); }
    function pick(i) {
      if (revealed) return;
      item.picked = i;
      persist();
    }
    function check() {
      if (item.picked == null) return;
      item.revealed = true;
      if (!item.recorded) {
        recordAnswer(q.id, isCorrect(item), pickedOriginal(item));
        item.recorded = true;
      }
      persist();
    }
    function go(delta) {
      var next = session.index + delta;
      if (next < 0 || next >= total) return;
      session.index = next;
      persist();
    }
    function next() {
      if (session.index >= total - 1) finish(session, "complete");
      else go(1);
    }

    var bar = h("div", { class: "progress" }, h("i", { style: "width:" + Math.round((session.index + (revealed ? 1 : 0)) / total * 100) + "%" }));
    var head = h("div", { class: "q-top" },
      h("div", { class: "row", style: "justify-content:space-between" },
        h("span", { class: "meta" }, (session.mode === "timed" ? "Timed" : session.mode === "missed" ? "Missed review" : "Practice") + " · " + (session.index + 1) + " / " + total),
        session.endsAt ? h("span", { class: "timer", id: "timer" }, "—") : null
      ),
      bar,
      h("div", { class: "dots" }, session.items.map(function (it, idx) {
        return h("button", {
          type: "button", class: "dot" + (it.picked != null ? " on" : "") + (idx === session.index ? " here" : ""),
          onclick: function () { session.index = idx; persist(); }
        }, String(idx + 1));
      }))
    );

    var choiceEls = choices.map(function (text, i) {
      var cls = "choice";
      var checked = item.picked === i;
      if (revealed) {
        if (item.order[i] === q.answer) cls += " good";
        else if (checked) cls += " bad";
      }
      return h("button", {
        type: "button", class: cls, role: "radio",
        "aria-checked": checked ? "true" : "false",
        onclick: function () { pick(i); }
      }, h("span", { class: "key" }, String.fromCharCode(65 + i)), h("span", {}, text));
    });

    var feedback = null;
    if (revealed) {
      var ok = isCorrect(item);
      var link = safeHttps(q.link || "");
      feedback = h("div", { class: "feedback " + (ok ? "good" : "bad"), role: "status" },
        h("div", { class: "tags" },
          h("span", { class: "tag level" }, levelLabel(q.level)),
          h("span", { class: "tag domain" }, domainLabel(q.domain)),
          h("span", { class: "tag topic" }, topicTitle(q.topic))
        ),
        h("h3", {}, ok ? "Correct" : "Not quite"),
        h("p", {}, q.explanation),
        h("p", { class: "ref" }, "Reference: " + q.reference),
        q.kb ? h("p", {}, h("a", { href: studyHref(q.kb) }, "Study this section")) : null,
        link ? h("p", {}, h("a", { href: link, target: "_blank", rel: "noopener noreferrer" }, "Learn more")) : null,
        h("p", {}, h("a", { href: issueLink(q), target: "_blank", rel: "noopener noreferrer" }, "Report a problem"))
      );
    }

    app.append(
      head,
      h("div", { class: "panel" },
        questionTags(q),
        h("h2", { class: "stem" }, q.question),
        h("div", { role: "radiogroup", "aria-label": "Answer choices" }, choiceEls),
        feedback,
        h("div", { class: "actions" },
          session.mode === "timed"
            ? [
              h("button", { class: "btn", onclick: function () { go(-1); } }, "Back"),
              h("button", { class: "btn primary", onclick: function () { next(); } }, session.index === total - 1 ? "Submit quiz" : "Next"),
              h("button", { class: "btn ghost", onclick: function () { finish(session, "submitted"); } }, "Submit now")
            ]
            : [
              !revealed ? h("button", { class: "btn primary", disabled: item.picked == null, onclick: check }, "Check answer") : null,
              revealed ? h("button", { class: "btn primary", onclick: next }, session.index === total - 1 ? "See results" : "Next") : null,
              h("a", { class: "btn", href: issueLink(q), target: "_blank", rel: "noopener noreferrer" }, "Report a problem")
            ]
        )
      )
    );

    if (session.endsAt) {
      var timerEl = document.getElementById("timer");
      var tick = function () {
        var left = Math.max(0, session.endsAt - Date.now());
        var s = Math.ceil(left / 1000);
        var mm = String(Math.floor(s / 60)).padStart(2, "0");
        var ss = String(s % 60).padStart(2, "0");
        if (timerEl) {
          timerEl.textContent = mm + ":" + ss;
          timerEl.className = "timer" + (s < 60 ? " low" : "");
        }
        if (left <= 0) {
          if (state._timer) { clearInterval(state._timer); state._timer = null; }
          finish(loadSession() || session, "time");
        }
      };
      tick();
      state._timer = setInterval(tick, 250);
    }

    function onKey(ev) {
      if (ev.target && (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA")) return;
      var n = Number(ev.key);
      if (n >= 1 && n <= choices.length) pick(n - 1);
      if (ev.key === "Enter") {
        if (session.mode === "timed") next();
        else if (!item.revealed) check();
        else next();
      }
    }
    state._key = onKey;
    document.addEventListener("keydown", onKey);
  }

  function renderResults() {
    var result = null;
    try { result = JSON.parse(sessionStorage.getItem("netanerd-result-v1") || "null"); }
    catch (e) {}
    if (!result) {
      app.append(h("h1", {}, "No score yet"), h("p", {}, "Finish a drill to see a summary."), h("a", { class: "btn primary", href: "#/drills" }, "Drills"));
      return;
    }
    var pct = Math.round(100 * result.correct / result.total);
    app.append(
      h("p", { class: "kicker" }, result.mode === "timed" ? "Timed quiz" : "Practice"),
      h("h1", {}, "Score"),
      h("p", { class: "score-num" }, result.correct + " / " + result.total),
      h("p", {}, pct + "% · " + Math.floor(result.seconds / 60) + "m " + (result.seconds % 60) + "s" + (result.reason === "time" ? " · time expired" : "")),
      h("div", { class: "actions" },
        h("a", { class: "btn primary", href: "#/drills" }, "Drills"),
        h("button", { class: "btn ghost", onclick: function () {
          var ids = result.rows.filter(function (r) { return !r.correct; }).map(function (r) { return r.id; });
          var qs = ids.map(function (id) { return state.bank.byId[id]; }).filter(Boolean);
          if (qs.length) startDrill("missed", qs);
        } }, "Review missed")
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Question review"),
        h("ul", { class: "miss-list" }, result.rows.map(function (row) {
          var q = state.bank.byId[row.id];
          if (!q) return null;
          var yours = row.choice == null ? "No answer" : q.choices[row.choice];
          return h("li", {},
            h("span", { class: "tag " + (row.correct ? "ok" : "bad") }, row.correct ? "Correct" : "Missed"),
            h("span", { class: "tag level" }, levelLabel(q.level)),
            h("span", { class: "tag domain" }, domainLabel(q.domain)),
            h("span", { class: "tag topic" }, topicTitle(q.topic)),
            h("span", { class: "meta" }, q.id),
            h("p", {}, q.question),
            h("p", {}, "Your answer: " + yours),
            h("p", {}, "Answer: " + q.choices[q.answer]),
            h("p", {}, q.explanation),
            h("p", { class: "ref" }, q.reference),
            q.kb ? h("p", {}, h("a", { href: studyHref(q.kb) }, "Study")) : null
          );
        }))
      )
    );
  }

  function renderAbout() {
    document.title = "About · Neta Nerd";
    app.append(
      h("p", { class: "kicker" }, "How the exams are run"),
      h("h1", {}, "About these drills"),
      h("p", { class: "lede" }, "Neta Nerd is an independent practice site. It is not a NETA exam and it is not affiliated with NETA. The questions are original. Nothing here is a recalled exam item."),
      h("div", { class: "panel" },
        h("h2", {}, "Exam format"),
        h("p", {}, "NETA’s published description of the administered certification exams: closed book, proctored at Pearson VUE, with an on-screen calculator and a formula sheet. You do not bring your own. The pass mark is a scaled 410 or higher on a 200 to 500 scale. The on-screen sheet is the official NETA Electrical Formulae Sheet updated June 29, 2017. An older PDF from a previous exam-preparation page is an incomplete excerpt."),
        h("ul", {},
          h("li", {}, "Level II and Level III: 100 questions, 2 hours."),
          h("li", {}, "Level IV: 65 questions, 2 hours.")
        ),
        h("p", {}, "Confirm the current rules on NETA’s own pages before test day."),
        h("p", {},
          h("a", { href: "https://www.netaworld.org/certification-exam/technician-certification671", target: "_blank", rel: "noopener noreferrer" }, "NETA technician certification"),
          " · ",
          h("a", { href: "https://www.netaworld.org/certification-exam/exam-preparation686", target: "_blank", rel: "noopener noreferrer" }, "NETA exam preparation")
        ),
        h("p", { class: "meta" }, "Format and the 410 scaled score are from those NETA pages, as checked against the association’s public exam-preparation material. Domain weights in this bank follow the December 2022 detailed content outline as summarized in the study notes.")
      ),
      h("p", { style: "margin-top:14px" }, h("a", { href: "#/study/level-2.md/exam-format" }, "Level II study note"), " · ", h("a", { href: "#/study/level-3.md/exam-format" }, "Level III study note"))
    );
  }

  function renderStudyIndex() {
    app.append(
      h("p", { class: "kicker" }, "Knowledge base"),
      h("h1", {}, "Study"),
      h("p", { class: "lede" }, "Written for the people adding questions. Procedures, checked numbers, and worked math. Standards text is not copied here."),
      h("p", {}, "These notes are split by exam level. The exams build on each other and come back to the same equipment with more depth at the higher levels, so a Level III candidate should also study the Level II sections, and a Level IV candidate should study the Level II and Level III sections as well."),
      h("p", {}, h("a", { href: "#/math" }, "Math Cheat Sheet")),
      h("div", { class: "topics" }, state.docs.map(function (d) {
        return h("a", { class: "topic-card", href: "#/study/" + d.file },
          h("strong", {}, d.title),
          h("span", {}, d.level ? "Level " + d.level : "Reference"));
      }))
    );
  }

  function renderStudyDoc(file, anchor) {
    var doc = state.docs.find(function (d) { return d.file === file; });
    app.append(h("p", {}, h("a", { href: "#/study" }, "All study pages"), doc ? " · " + doc.title : ""));
    app.append(h("p", { class: "meta" }, "These notes are split by exam level. The exams build on each other and come back to the same equipment with more depth at the higher levels, so a Level III candidate should also study the Level II sections, and a Level IV candidate should study the Level II and Level III sections as well."));
    fetch("knowledge/" + file).then(function (r) {
      if (!r.ok) throw new Error("missing");
      return r.text();
    }).then(function (text) {
      var article = h("article", { class: "study panel" });
      article.innerHTML = window.NetaMd.render(text);
      app.append(article);
      if (anchor) {
        var node = document.getElementById(anchor);
        if (node) node.scrollIntoView();
      }
    }).catch(function () {
      app.append(h("p", {}, "That study page is not in the knowledge folder."));
    });
  }

  function renderMath() {
    document.title = "Math Cheat Sheet · Neta Nerd";
    window.scrollTo(0, 0);
    if (window.NetaMath && typeof window.NetaMath.mount === "function") {
      window.NetaMath.mount(app, h);
      return;
    }
    app.append(
      h("h1", {}, "Math cheat sheet"),
      h("p", {}, "The cheat sheet script did not load.")
    );
  }

  function markNav(path) {
    var key = "";
    var study = path === "/study" || path.indexOf("/study/") === 0;
    if (path === "/" || path === "") key = "home";
    else if (path === "/drills" || path.indexOf("/drills/") === 0) key = "drills";
    else if (study) key = "study";
    else if (path === "/manuals") key = "manuals";
    else if (path === "/tools") key = "tools";
    var links = document.querySelectorAll(".site-nav a");
    for (var i = 0; i < links.length; i++) {
      var on = links[i].getAttribute("data-nav") === key;
      links[i].classList.toggle("is-on", on);
      if (on) links[i].setAttribute("aria-current", "page");
      else links[i].removeAttribute("aria-current");
    }
    document.body.classList.toggle("is-study", study);
    var nav = document.querySelector(".nav-bar");
    var shift = study && nav ? nav.offsetHeight : 0;
    document.documentElement.style.setProperty("--study-shift", shift + "px");
  }

  function render() {
    if (state._timer) { clearInterval(state._timer); state._timer = null; }
    if (state._key) { document.removeEventListener("keydown", state._key); state._key = null; }
    var path = parseHash();
    markNav(path);
    app.innerHTML = "";
    if (state.error) {
      app.append(h("h1", {}, "Question bank did not load"), h("p", {}, state.error),
        h("p", {}, "Serve this folder over HTTP. Opening the file directly blocks fetch. From the repo root: python3 -m http.server 8080"));
      return;
    }
    if (!state.bank) {
      app.append(h("p", {}, "Loading the question bank…"));
      return;
    }
    if (path === "/" || path === "" || path === "/drills") {
      if (claimExpired("timed") || claimExpired("mock")) return;
    } else if (path === "/run" && storageGet(ACTIVE_KEY) === "timed") {
      if (claimExpired("timed")) return;
    } else if (path === "/mock" || path === "/mock/run") {
      if (claimExpired("mock")) return;
    }
    var study = /^\/study\/(.+\.md)(?:\/([a-z0-9-]+))?$/.exec(path);
    document.title = "Neta Nerd";
    if (path === "/" || path === "") renderFieldDesk();
    else if (path === "/drills") renderDrills();
    else if (path === "/tools") renderTools();
    else if (path === "/manuals") renderManuals();
    else if (path === "/run") renderRun();
    else if (path === "/results") renderResults();
    else if (path === "/mock") renderMockSetup();
    else if (path === "/mock/run") renderMockRun();
    else if (path === "/mock/results") renderMockResults();
    else if (path === "/about") renderAbout();
    else if (path === "/math") renderMath();
    else if (path === "/study") renderStudyIndex();
    else if (study) renderStudyDoc(study[1], study[2]);
    else renderFieldDesk();
    armBannerClocks();
  }

  window.addEventListener("hashchange", render);
  window.addEventListener("resize", function () { markNav(parseHash()); });
  markNav(parseHash());

  Promise.all([
    loadJSON("questions/index.json"),
    loadJSON("knowledge/index.json")
  ]).then(function (pair) {
    var index = pair[0];
    state.docs = pair[1].docs || [];
    return Promise.all(index.topics.map(function (t) {
      return loadJSON("questions/" + t.file).then(function (rows) {
        return rows.map(function (q) { q.topic = q.topic || t.id; return q; });
      });
    })).then(function (groups) {
      var questions = groups.flat();
      var byId = {};
      questions.forEach(function (q) { byId[q.id] = q; });
      state.bank = { topics: index.topics, questions: questions, byId: byId, issuesUrl: index.issuesUrl };
      if (!state.filters.topics.length) state.filters.topics = index.topics.map(function (t) { return t.id; });
      migrateSessions();
      render();
    });
  }).catch(function (err) {
    state.error = err.message || String(err);
    render();
  });
})();
