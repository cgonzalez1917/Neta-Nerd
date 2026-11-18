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
  var MOCK_KEY = "netanerd-mock-v1";
  var MOCK_SESSION = "netanerd-mock-session-v1";
  var MOCK_RESULT = "netanerd-mock-result-v1";
  var LEVEL2_SCORE_NOTE = "The real NETA Level 2 exam requires a scaled score of 410 (200–500 scale). NETA does not publish how raw scores convert, so this practice score is not a scaled score or a pass/fail result.";
  var CERT_URL = "https://www.netaworld.org/technician-certification";
  var SCORE_FAQ_URL = "https://www.netaworld.org/accreditation/exam-score-faqs";

  function examDomainName(id) {
    if (id === "component") return "Component Testing";
    if (id === "systems") return "Systems and Commissioning";
    return domainLabel(id);
  }
  function officialWeightText(level) {
    var w = DCO[level] || DCO.II;
    return DOMAINS.map(function (d) { return examDomainName(d.id) + " " + w[d.id]; }).join(", ") + ".";
  }
  function practiceScoreNote(level) {
    if (level === "III") {
      return "The real NETA Level 3 exam requires a scaled score of 410 (200–500 scale). NETA does not publish how raw scores convert, so this practice score is not a scaled score or a pass/fail result.";
    }
    return LEVEL2_SCORE_NOTE;
  }
  function scoreSourceLine() {
    return h("p", { class: "meta" },
      "Sources: ",
      h("a", { href: CERT_URL, target: "_blank", rel: "noopener noreferrer" }, "NETA technician certification"),
      " (item count, time, scaled 410 on a 200–500 scale, and domain weights). ",
      h("a", { href: SCORE_FAQ_URL, target: "_blank", rel: "noopener noreferrer" }, "NETA exam score FAQs"),
      " (no published conversion from a raw score to the scaled score)."
    );
  }
  function practiceExamTitle(level) {
    if (level === "III") return "Level 3 Practice Exam";
    return "Level 2 Practice Exam";
  }
  /* Test hook only. Set window.__netaMockDevSeconds to a positive number
     before Next on Welcome to shorten that attempt. Not a user setting. */
  function mockAllottedMs(minutes) {
    var dev = window.__netaMockDevSeconds;
    if (typeof dev === "number" && isFinite(dev) && dev > 0 && dev <= 7200) return Math.round(dev * 1000);
    return minutes * 60 * 1000;
  }
  function examClock(ms) {
    var s = Math.ceil(Math.max(0, ms) / 1000);
    var m = Math.floor(s / 60);
    return m + ":" + String(s % 60).padStart(2, "0");
  }
  function mockScreen(session) {
    if (session.screen === "welcome" || session.screen === "item" || session.screen === "review" || session.screen === "thanks") return session.screen;
    return session.endsAt ? "item" : "welcome";
  }
  function usedText(seconds) {
    var s = Math.max(0, seconds | 0);
    return Math.floor(s / 60) + " min " + (s % 60) + " sec";
  }
  function clockSvg() {
    return '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
  }
  function flagSvg(filled) {
    var fill = filled ? "#FFE14A" : "none";
    var stroke = filled ? "#8A6500" : "currentColor";
    return '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 3v18" fill="none" stroke="' + stroke + '" stroke-width="2"/><path d="M6 4h11l-2.2 4 2.2 4H6z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.8"/></svg>';
  }

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
    var existing = loadMockSession();
    if (existing && !window.confirm("A practice exam is already in progress on this device. Start a new one and discard it?")) return;
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
      startedAt: null,
      endsAt: null,
      screen: "welcome",
      fromReview: false,
      reviewFilter: "all",
      sectionOpen: true,
      hideClock: false,
      hideCount: false
    };
    state.examDialog = null;
    saveMockSession(session);
    location.hash = "#/mock/run";
  }

  function beginMockExam(session) {
    session.screen = "item";
    session.index = 0;
    session.fromReview = false;
    session.startedAt = Date.now();
    session.endsAt = session.startedAt + mockAllottedMs(session.minutes);
    state.examDialog = null;
    saveMockSession(session);
    render();
  }

  function discardMockAttempt() {
    state.examDialog = null;
    clearMockSession();
    location.hash = "#/mock";
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
    rows.forEach(function (row) { recordAnswer(row.id, row.correct, row.choice); });
    var allotted = session.minutes * 60;
    var elapsed = session.startedAt ? Math.max(0, Math.round((Date.now() - session.startedAt) / 1000)) : 0;
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
    var history = [result].concat(mockHistory()).slice(0, 8);
    saveMockHistory(history);
    try { sessionStorage.setItem(MOCK_RESULT, JSON.stringify(result)); } catch (e) {}
    state.examDialog = null;
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
  var toolsState = { person: "all", data: null, error: "", token: 0 };
  var TOOL_DISTRIBUTORS = [
    { name: "Newark", href: "https://www.newark.com/" },
    { name: "Digi-Key", href: "https://www.digikey.com/" },
    { name: "Mouser", href: "https://www.mouser.com/" },
    { name: "Allied Electronics", href: "https://us.rs-online.com/" },
    { name: "Grainger", href: "https://www.grainger.com/" },
    { name: "Pomona (where to buy)", href: "https://www.pomonaelectronics.com/where-to-buy/distributors" },
    { name: "Fluke", href: "https://www.fluke.com/" },
    { name: "Project 96 Workwear", href: "https://www.project96workwear.com/" }
  ];
  /* Publisher photos on the home news list. Set false to show the blue
     wave on every headline instead. One switch, in this file. */
  var NEWS_THUMBS = true;
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

  function newsImageUrl(item) {
    if (!NEWS_THUMBS) return "";
    var url = item && item.image;
    if (typeof url !== "string") return "";
    if (url.indexOf("https://") !== 0 || /\s/.test(url) || url.length > 2000) return "";
    return url;
  }

  function newsWave() {
    return '<svg viewBox="0 0 64 48" width="64" height="48" aria-hidden="true">' +
      '<rect width="64" height="48" fill="#0b0d0f"/>' +
      '<path d="M4 26 C12 26 12 12 20 12 S28 40 36 40 44 26 52 26 60 26 60 26" fill="none" stroke="#00e5ff" stroke-width="1.6"/>' +
      "</svg>";
  }

  function newsThumb(item) {
    var wave = newsWave();
    var box = h("span", { class: "news-thumb" });
    var url = newsImageUrl(item);
    if (!url) {
      box.innerHTML = wave;
      return box;
    }
    var img = h("img", {
      src: url,
      alt: "",
      width: "64",
      height: "48",
      loading: "lazy",
      decoding: "async",
      referrerpolicy: "no-referrer"
    });
    img.addEventListener("error", function () {
      if (img.parentNode) img.parentNode.innerHTML = wave;
    });
    box.append(img);
    return box;
  }

  function newsList(items) {
    return h("ul", { class: "news-list" }, items.map(function (item) {
      var when = formatNewsDate(item.date);
      var meta = item.source;
      if (when) meta = meta + " · " + when;
      return h("li", {},
        h("a", {
          class: "news-hit",
          href: item.href,
          target: "_blank",
          rel: "noopener noreferrer"
        },
          newsThumb(item),
          h("span", { class: "news-copy" },
            h("span", { class: "news-title" }, item.title),
            h("span", { class: "news-src" }, meta)
          )
        )
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

  function httpsUrl(url) {
    return typeof url === "string" && url.indexOf("https://") === 0 && !/\s/.test(url) ? url : "";
  }

  function toolAnchor(name) {
    return "tools-" + String(name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function toolSubId(name) {
    return toolAnchor("sub-" + name);
  }

  function toolScrollTo(id) {
    var node = document.getElementById(id);
    if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toolTopButton() {
    return h("button", {
      type: "button",
      class: "btn ghost back-top",
      onclick: function () { window.scrollTo({ top: 0, behavior: "smooth" }); }
    }, "Back to top");
  }

  function toolMoney(n) {
    return "$" + Number(n).toFixed(2);
  }

  function toolPriceLine(item) {
    var qty = "Qty " + item.qty + (item.unit ? " " + item.unit : "");
    if (item.unit_price_paid == null || item.unit_price_paid === "") return qty;
    var per = String(item.unit || "").toUpperCase() === "PK" ? "per pack" : "each";
    return toolMoney(item.unit_price_paid) + " " + per + " · " + qty;
  }

  function toolPersonRow() {
    var choices = [
      { id: "all", label: "All" },
      { id: "Angelo", label: "Angelo" },
      { id: "Cristian", label: "Cristian" }
    ];
    return h("div", { class: "row gear-filters", role: "group", "aria-label": "Added by" },
      h("div", { class: "filter-label" }, "Added by"),
      choices.map(function (choice) {
        var on = toolsState.person === choice.id;
        return h("button", {
          type: "button",
          class: "chip",
          "aria-pressed": on ? "true" : "false",
          onclick: function () {
            toolsState.person = choice.id;
            render();
          }
        }, choice.label);
      })
    );
  }

  function toolJumpLink(id, label) {
    return h("a", {
      class: "jump",
      href: "#/tools",
      onclick: function (ev) {
        ev.preventDefault();
        toolScrollTo(id);
      }
    }, label);
  }

  function toolJump(groups) {
    if (!groups.length) return null;
    return h("nav", { class: "jump-row", "aria-label": "Gear categories" },
      h("div", { class: "filter-label" }, "Jump to"),
      groups.map(function (group) {
        return toolJumpLink(toolAnchor(group.category), group.category);
      })
    );
  }

  function toolSubJump(groups) {
    var names = [];
    groups.forEach(function (group) {
      group.groups.forEach(function (sub) {
        if (names.indexOf(sub.name) < 0) names.push(sub.name);
      });
    });
    if (!names.length) return null;
    return h("nav", { class: "jump-row", "aria-label": "Gear subcategories" },
      h("div", { class: "filter-label" }, "Subcategory"),
      names.map(function (name) { return toolJumpLink(toolSubId(name), name); })
    );
  }

  function toolGroups(data, items) {
    var cats = ((data && data.categories) || []).slice();
    items.forEach(function (item) {
      if (item.category && cats.indexOf(item.category) < 0) cats.push(item.category);
    });
    return cats.map(function (cat) {
      var inCat = items.filter(function (item) { return item.category === cat; });
      var order = [];
      var map = {};
      inCat.forEach(function (item) {
        var sub = item.subcategory || "Other";
        if (!map[sub]) { map[sub] = []; order.push(sub); }
        map[sub].push(item);
      });
      return {
        category: cat,
        groups: order.map(function (sub) { return { name: sub, items: map[sub] }; })
      };
    }).filter(function (group) { return group.groups.length; });
  }

  function toolCard(item) {
    var official = httpsUrl(item.official_url);
    var distributor = httpsUrl(item.distributor_url);
    var shop = httpsUrl(item.shop_url);
    var notes = Array.isArray(item.field_notes) ? item.field_notes.filter(function (note) {
      return typeof note === "string" && note.trim();
    }) : [];
    var src = typeof item.image === "string" && item.image.indexOf("..") < 0 && item.image.indexOf("://") < 0 ? item.image : "";
    return h("article", { class: "panel tool-card" },
      src ? h("div", { class: "tool-photo" },
        h("img", {
          src: src,
          alt: item.name || "",
          width: "600",
          loading: "lazy",
          decoding: "async"
        })
      ) : null,
      (item.image_credit || item.image_note) ? h("p", { class: "tool-credit" },
        item.image_credit || null,
        item.image_note ? h("span", { class: "tool-image-note" }, item.image_note) : null
      ) : null,
      h("h3", {}, item.name || ""),
      h("p", { class: "tool-maker" }, [item.maker, item.model].filter(Boolean).join(" ")),
      h("p", { class: "tool-added" }, "Added by " + (item.added_by || "")),
      h("p", { class: "tool-price" }, toolPriceLine(item)),
      h("p", { class: "tool-k" }, "Use"),
      h("p", { class: "tool-use" }, item.use || ""),
      h("p", { class: "tool-k" }, "Rating"),
      h("p", { class: "tool-rating" }, item.rating || ""),
      h("div", { class: "tool-links" },
        official ? [
          h("a", {
            class: "btn ghost small",
            href: official,
            target: "_blank",
            rel: "noopener"
          }, "Official page"),
          distributor ? h("a", {
            class: "btn ghost small",
            href: distributor,
            target: "_blank",
            rel: "noopener"
          }, item.distributor_name || "Distributor") : null
        ] : (shop ? h("a", {
          class: "btn ghost small",
          href: shop,
          target: "_blank",
          rel: "noopener"
        }, item.shop_name || "Shop") : null)
      ),
      item.notes ? h("p", { class: "tool-note" }, item.notes) : null,
      notes.length ? h("details", { class: "tool-field" },
        h("summary", {}, "Field notes"),
        h("ul", {}, notes.map(function (note) { return h("li", {}, note); }))
      ) : null
    );
  }

  function paintTools(data) {
    var items = ((data && data.items) || []).filter(function (item) {
      if (toolsState.person === "all") return true;
      return item && item.added_by === toolsState.person;
    });
    var groups = toolGroups(data, items);
    var jumps = toolJump(groups);
    if (jumps) app.append(jumps);
    var subJumps = toolSubJump(groups);
    if (subJumps) app.append(subJumps);
    if (!items.length) {
      var empty = toolsState.person === "all"
        ? "No items yet."
        : "No items from " + toolsState.person + " yet.";
      app.append(h("p", { class: "gear-empty" }, empty));
      return;
    }
    groups.forEach(function (group) {
      app.append(h("section", { class: "gear-section", id: toolAnchor(group.category) },
        h("h2", { class: "gear-cat" }, group.category),
        group.groups.map(function (sub) {
          return h("div", { class: "gear-sub", id: toolSubId(sub.name) },
            h("h3", {}, sub.name),
            h("div", { class: "tool-grid" }, sub.items.map(toolCard)),
            toolTopButton()
          );
        }),
        toolTopButton()
      ));
    });
  }

  function renderTools() {
    document.title = "Tools · Neta Nerd";
    app.append(
      h("p", { class: "kicker" }, "Tools"),
      h("h1", {}, "Field tools"),
      h("p", { class: "lede" }, "Tools and materials Angelo and Cristian have bought, in one place. Tap a category to jump to it."),
      h("nav", { class: "dist-strip", "aria-label": "Distributors" },
        h("div", { class: "filter-label" }, "Distributors"),
        TOOL_DISTRIBUTORS.map(function (link) {
          return h("a", { href: link.href, target: "_blank", rel: "noopener" }, link.name);
        })
      ),
      toolPersonRow()
    );
    if (toolsState.error) {
      app.append(h("p", { class: "gear-empty" }, toolsState.error));
      return;
    }
    if (!toolsState.data) {
      var token = ++toolsState.token;
      app.append(h("p", { class: "gear-empty" }, "Loading the gear list…"));
      loadJSON("data/tools.json").then(function (data) {
        if (token !== toolsState.token) return;
        toolsState.data = data;
        if (parseHash() === "/tools") render();
      }).catch(function () {
        if (token !== toolsState.token) return;
        toolsState.error = "The gear list did not load.";
        if (parseHash() === "/tools") render();
      });
      return;
    }
    paintTools(toolsState.data);
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
    document.title = "Mock exam · Neta Nerd";
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
    var weightName = current && current.id === "III" ? "Level III" : "Level II";
    appendResumeBanners(["mock"]);
    app.append(
      h("p", { class: "kicker" }, "Practice simulation"),
      h("h1", {}, "Mock exam"),
      h("p", { class: "lede" }, "A closed-book practice exam. A full exam is 100 questions and 2 hours. A half exam is 50 questions and 60 minutes. You can change answers until you end the exam. Calculator, formulae sheet, and scratch pad are not in this build. This is not an official NETA exam."),
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
        quotas ? h("h2", {}, "This practice draw") : null,
        quotas ? h("p", {}, "Questions asked this sitting: " + DOMAINS.map(function (d) {
          return examDomainName(d.id) + " " + quotas[d.id];
        }).join(", ") + ". Verified questions are used first.") : null,
        current ? h("h2", {}, "Official " + weightName + " exam domain weights") : null,
        current ? h("p", {}, "These percentages are the official exam's mix of questions. They are not your percent correct on this practice exam.") : null,
        current ? h("p", { class: "meta" }, officialWeightText(current.id)) : null,
        h("h2", {}, "Scoring"),
        h("p", {}, practiceScoreNote(current ? current.id : "II")),
        scoreSourceLine(),
        h("div", { class: "actions" },
          h("button", {
            class: "btn primary",
            disabled: current ? null : true,
            onclick: function () { startMock(state.mockLevel, state.mockFormat); }
          }, "Start practice exam"),
          h("a", { class: "btn", href: "#/drills" }, "Back to practice")
        )
      )
    );
    if (history.length) app.append(
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Saved on this device"),
        h("ul", { class: "miss-list" }, history.map(function (item) {
          var score = item.pct + "%";
          if (item.correct != null && item.total != null) score = item.correct + "/" + item.total + " · " + score;
          return h("li", {},
            h("button", { class: "btn small", onclick: function () {
              try { sessionStorage.setItem(MOCK_RESULT, JSON.stringify(item)); } catch (e) {}
              location.hash = "#/mock/results";
            } }, "Open"),
            " ",
            h("span", { class: "tag level" }, levelLabel(item.level)),
            h("span", { class: "tag" }, item.format === "half" ? "Half" : "Full"),
            h("span", { class: "tag" }, score),
            h("span", { class: "meta" }, new Date(item.at).toLocaleString())
          );
        }))
      )
    );
  }

  function ico(name) {
    var paths = {
      clock: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 7.2V12l3 2" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      list: '<path d="M8 7h12M8 12h12M8 17h12" stroke="currentColor" stroke-width="1.6"/><circle cx="4.2" cy="7" r="1.15" fill="currentColor"/><circle cx="4.2" cy="12" r="1.15" fill="currentColor"/><circle cx="4.2" cy="17" r="1.15" fill="currentColor"/>',
      help: '<circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.4 9.6a2.6 2.6 0 1 1 3.3 2.5c-.8.4-1.2.9-1.2 1.7V15" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="17.2" r="0.9" fill="currentColor"/>',
      gear: '<circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3.2v2.3M12 18.5v2.3M3.2 12h2.3M18.5 12h2.3M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M18.2 5.8l-1.6 1.6M7.4 16.6 5.8 18.2" stroke="currentColor" stroke-width="1.5"/>',
      next: '<path d="M5 12h12M13 6.5 18.5 12 13 17.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
      prev: '<path d="M19 12H7M11 6.5 5.5 12 11 17.5" fill="none" stroke="currentColor" stroke-width="1.8"/>',
      pencil: '<path d="M14 4l4 4-9 9H5v-4z" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M12.5 5.5l4 4" stroke="currentColor" stroke-width="1.4"/>',
      calc: '<rect x="5" y="3" width="14" height="18" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 7h8M8 11h2M12 11h2M8 15h2M12 15h2M8 18h2" stroke="currentColor" stroke-width="1.4"/>',
      pad: '<path d="M7 3h8l3 3v15H7z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M10 10h6M10 13h6M10 16h4" stroke="currentColor" stroke-width="1.3"/>',
      flag: '<path d="M7 3v18" stroke="currentColor" stroke-width="1.7"/><path d="M7 4.2h10l-2.2 3.4L17 11H7z" fill="currentColor" stroke="currentColor" stroke-width="1"/>',
      marker: '<path d="M4.2 15.2 9.4 10l4.3 4.3-5.2 5.2H4.2v-4.3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.4 10 13.6 5.8l4.3 4.3-4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      markerOn: '<path d="M4.2 15.2 9.4 10l4.3 4.3-5.2 5.2H4.2v-4.3z" fill="currentColor" stroke="currentColor" stroke-width="1.2"/><path d="M9.4 10 13.6 5.8l4.3 4.3-4.2 4.2" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>',
      flagblue: '<path d="M7 3v18" stroke="#2b6d8c" stroke-width="1.7"/><path d="M7 4.2h10l-2.2 3.4L17 11H7z" fill="#5aa4c4" stroke="#2b6d8c" stroke-width="1"/>',
      exit: '<path d="M10 4H5v16h5M10 12h9M15.5 8 20 12l-4.5 4" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      info: '<circle cx="12" cy="12" r="9" fill="#2f7de1"/><path d="M12 10.2V17" stroke="#fff" stroke-width="2"/><circle cx="12" cy="7.4" r="1.15" fill="#fff"/>',
      warn: '<path d="M12 3.2 21.5 20H2.5z" fill="#f5c400" stroke="#222" stroke-width="1"/><path d="M12 9v5.2" stroke="#222" stroke-width="1.8"/><circle cx="12" cy="16.8" r="1" fill="#222"/>',
      caret: '<path d="M3 6.5 8 12 3 17.5" fill="none" stroke="currentColor" stroke-width="1.6"/>',
      book: '<path d="M4 5h7a3 3 0 0 1 3 3v12H7a3 3 0 0 0-3 3V5zm16 0h-7a3 3 0 0 0-3 3v12h7a3 3 0 0 1 3 3V5z" fill="none" stroke="currentColor" stroke-width="1.3"/>',
      x: '<path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.7"/>',
      into: '<path d="M5 7h8v10H5M13 12h6M16 9l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.6"/>'
    };
    return h("span", { class: "td-ico", html: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">' + (paths[name] || "") + "</svg>" });
  }

  function k(ch) {
    return h("span", { class: "td-key" }, ch);
  }

  function markerIcon(on) {
    var fill = on ? "currentColor" : "none";
    return h("span", { class: "td-ico td-marker", html: '<svg viewBox="0 0 25 20" width="38" height="20" aria-hidden="true"><path d="M1.6 13.2 11.2 3.6l5.2 5.2L6.8 18.4H1.6v-5.2z" fill="' + fill + '" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/><path d="M11.2 3.6 14.2 1.4 21.6 8.6 18.2 11.2" fill="' + fill + '" stroke="currentColor" stroke-width="1.35" stroke-linejoin="round"/></svg>' });
  }

  function closeExamDialog() {
    state.examDialog = null;
    render();
  }

  function examOverlay(dialog) {
    return h("div", {
      class: "td-overlay",
      onclick: function (ev) { if (ev.target === ev.currentTarget) closeExamDialog(); }
    }, dialog);
  }

  function footBtn(label, icon, onclick, split) {
    return h("button", {
      type: "button",
      class: "td-foot" + (split ? " td-split" : ""),
      onclick: onclick
    }, icon ? ico(icon) : null, label);
  }

  function soonTool(name, iconName, swatch, label) {
    return h("button", {
      type: "button",
      class: "td-tool",
      onclick: function () { state.soonTool = name; state.examDialog = "soon"; render(); }
    }, swatch ? h("span", { class: "td-swatch", "aria-hidden": "true" }) : null, iconName ? ico(iconName) : null, label, swatch ? h("span", { class: "td-caret", "aria-hidden": "true" }) : null);
  }

  function renderMockDialog(session) {
    var kind = state.examDialog;
    if (kind === "soon") {
      return examOverlay(h("div", { class: "td-endbox", role: "dialog", "aria-modal": "true", "aria-label": "Coming soon" },
        h("h2", {}, "Coming soon"),
        h("p", {}, (state.soonTool || "This tool") + " is not in this practice build yet."),
        h("div", { class: "td-yesno" },
          h("button", { type: "button", "data-dialog-focus": "true", onclick: closeExamDialog }, "Close")
        )
      ));
    }
    if (kind === "ready") {
      return examOverlay(h("div", { class: "td-endbox is-ready", role: "dialog", "aria-modal": "true", "aria-label": "Ready to Begin Exam" },
        h("h2", {}, "Ready to Begin Exam"),
        h("p", {}, "If you are ready to begin this practice exam, select Yes. The timer starts when you select Yes. Select No to return to the welcome screen."),
        h("div", { class: "td-yesno" },
          h("button", { type: "button", onclick: function () { beginMockExam(session); } }, "Yes"),
          h("button", { type: "button", "data-dialog-focus": "true", onclick: closeExamDialog }, "No")
        )
      ));
    }
    if (kind === "help") {
      return examOverlay(h("div", { class: "td-help", role: "dialog", "aria-modal": "true", "aria-label": "Help" },
        h("div", { class: "td-help-bar" },
          h("span", {}, ico("help"), " Help"),
          h("button", { type: "button", "aria-label": "Close", onclick: closeExamDialog }, ico("x"))
        ),
        h("div", { class: "td-help-body" },
          h("h3", {}, "Introduction"),
          h("p", {}, "This practice item is one multiple-choice question. Select one answer."),
          h("p", {}, "The question and the answers are text."),
          h("h3", {}, "Answering the Item"),
          h("p", {}, "Select one answer by doing one of the following:"),
          h("ul", {},
            h("li", {}, "Selecting the choice with the mouse."),
            h("li", {}, "Pressing A, B, C, or D on the keyboard.")
          ),
          h("p", {}, "You can change the answer until you end the practice exam."),
          h("p", {}, "Highlight, Strikethrough, Calculator, and Scratch Pad are not in this practice build yet.")
        )
      ));
    }
    if (kind === "instructions") {
      return examOverlay(h("div", { class: "td-note", role: "dialog", "aria-modal": "true", "aria-label": "Instructions" },
        h("h2", {}, "Instructions"),
        h("p", {}, "This practice review is a summary of your answers. You can review your questions using the tabs."),
        h("ol", {},
          h("li", {}, "Review all your questions."),
          h("li", {}, "Review questions that are incomplete."),
          h("li", {}, "Review questions that are flagged for review.")
        ),
        h("p", {}, "Select a row’s Review link to open that question."),
        h("p", {}, "This is a NETA Nerd practice screen, not an official exam."),
        h("div", { class: "td-note-actions" },
          h("button", { type: "button", class: "td-teal", "data-dialog-focus": "true", onclick: closeExamDialog }, "Close")
        )
      ));
    }
    var title = "End practice exam";
    var body = [];
    var yes = closeExamDialog;
    if (kind === "leave") {
      body = [h("p", {}, "The timed section has not started. Leave and discard this attempt? Nothing will be scored.")];
      yes = function () { discardMockAttempt(); };
    } else if (kind === "end1") {
      title = "End Section";
      body = [
        h("p", {}, "You have chosen to end this practice exam. If you continue, you will not be able to change your answers."),
        h("p", {}, "Are you sure you want to end this practice exam?")
      ];
      yes = function () { state.examDialog = "end2"; render(); };
    } else if (kind === "end2") {
      title = "End Section Confirmation";
      body = [
        h("div", { class: "td-end-row" },
          ico("warn"),
          h("p", {}, "Please confirm that you want to end this practice exam. If you continue, your answers will be scored on NETA Nerd. This is not an official exam.")
        ),
        h("p", {}, "Are you sure you want to end this practice exam?")
      ];
      yes = function () {
        session.screen = "thanks";
        state.examDialog = null;
        saveMockSession(session);
        render();
      };
    } else if (kind === "endfinal") {
      title = "End Exam";
      body = [
        h("div", { class: "td-end-row" },
          ico("info"),
          h("p", {}, "You have chosen to end this practice exam.")
        ),
        h("p", {}, "Are you sure you want to end this practice exam?")
      ];
      yes = function () { finishMock(loadMockSession() || session, "submitted"); };
    } else {
      body = [h("p", {}, "End this practice exam?")];
      yes = function () { finishMock(loadMockSession() || session, "submitted"); };
    }
    return examOverlay(h("div", {
      class: "td-endbox",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": title
    },
      h("h2", {}, title),
      body,
      h("div", { class: "td-yesno" },
        h("button", { type: "button", onclick: yes }, "Yes"),
        h("button", { type: "button", "data-dialog-focus": "true", onclick: closeExamDialog }, "No")
      )
    ));
  }

  function mockStatus(session, showCount) {
    var clockBtn = h("button", {
      type: "button",
      class: "td-clock",
      onclick: function () {
        session.hideClock = !session.hideClock;
        saveMockSession(session);
        render();
      }
    },
      ico("clock"),
      session.hideClock
        ? "Show time"
        : h("span", {}, "Time Remaining ", h("span", { id: "td-clock-value" }, examClock(session.endsAt - Date.now())))
    );
    var countBtn = null;
    if (showCount) {
      countBtn = h("button", {
        type: "button",
        class: "td-count",
        onclick: function () {
          session.hideCount = !session.hideCount;
          saveMockSession(session);
          render();
        }
      }, ico("list"), session.hideCount ? "Show count" : ((session.index + 1) + " of " + session.items.length));
    }
    return h("div", { class: "td-status" }, clockBtn, countBtn);
  }

  function openMockEnd(session) {
    if (!session.endsAt) state.examDialog = "leave";
    else if (mockScreen(session) === "thanks") state.examDialog = "endfinal";
    else state.examDialog = "end1";
    render();
  }

  function goMockReview(session) {
    session.screen = "review";
    session.fromReview = false;
    state.examDialog = null;
    saveMockSession(session);
    render();
  }

  function examNext(session) {
    state.examDialog = null;
    if (session.index >= session.items.length - 1) {
      goMockReview(session);
      return;
    }
    session.index += 1;
    saveMockSession(session);
    render();
  }

  function examPrev(session) {
    if (session.index <= 0) return;
    state.examDialog = null;
    session.index -= 1;
    saveMockSession(session);
    render();
  }

  function renderMockWelcome(session) {
    app.append(h("div", { class: "td" },
      h("header", { class: "td-title" }, h("span", { class: "td-title-text" }, "NETA Nerd Practice Exam")),
      h("div", { class: "td-tools" }),
      h("div", { class: "td-main" },
        h("div", { class: "td-welcome" },
          h("div", { class: "td-wordmark" }, "Practice Exam"),
          h("h1", {}, "Welcome!"),
          h("p", {}, "This is a practice exam in a test-driver layout. It is not an official NETA exam."),
          h("p", {}, "Press ", h("span", { class: "td-ulink" }, "Next"), " to continue.")
        )
      ),
      h("footer", { class: "td-nav" },
        h("div", { class: "td-nav-left" },
          footBtn("End Exam", "exit", function () { openMockEnd(session); }, false)
        ),
        h("div", { class: "td-nav-right" },
          footBtn(h("span", { class: "td-label" }, k("N"), "ext"), "next", function () { state.examDialog = "ready"; render(); }, true)
        )
      )
    ));
  }

  function renderMockThanks(session) {
    app.append(h("div", { class: "td" },
      h("header", { class: "td-title" }, h("span", { class: "td-title-text" }, "NETA Nerd Practice Exam")),
      h("div", { class: "td-tools" }),
      h("div", { class: "td-main" },
        h("div", { class: "td-thanks" },
          h("div", { class: "td-logo-bar" }, "Practice Exam"),
          h("h1", {}, "Thank you!")
        )
      ),
      h("footer", { class: "td-nav" },
        h("div", { class: "td-nav-left" },
          footBtn("End Exam", "exit", function () { openMockEnd(session); }, false)
        ),
        h("div", { class: "td-nav-right" })
      )
    ));
  }

  function itemTools(session, item) {
    return h("div", { class: "td-tools" },
      soonTool("Highlight (J)", null, true, h("span", { class: "td-label" }, "Highlight (", k("J"), ")")),
      soonTool("Strikethrough (W)", "pencil", false, h("span", { class: "td-label" }, "Strikethrough (", k("W"), ")")),
      soonTool("Calculator", "calc", false, h("span", { class: "td-label" }, k("C"), "alculator")),
      soonTool("Scratch Pad", "pad", false, h("span", { class: "td-label" }, "Scratch Pa", k("d"))),
      h("button", {
        type: "button",
        class: "td-tool td-mark" + (item.flagged ? " is-marked" : ""),
        "aria-pressed": item.flagged ? "true" : "false",
        onclick: function () {
          item.flagged = !item.flagged;
          saveMockSession(session);
          render();
        }
      }, markerIcon(item.flagged), h("span", { class: "td-label" }, k("M"), "ark for Review"))
    );
  }

  function renderMockItem(session) {
    var item = session.items[session.index];
    var q = sourceQuestion(item);
    if (!q) { clearMockSession(); location.hash = "#/mock"; return false; }
    var choices = shownChoices(item);
    var left = [
      footBtn("Help", "help", function () { state.examDialog = "help"; render(); }, false)
    ];
    if (session.fromReview) {
      left.push(footBtn("Review Screen", "into", function () { goMockReview(session); }, true));
    }
    var right = [];
    if (session.index > 0) right.push(footBtn("Previous", "prev", function () { examPrev(session); }, true));
    if (!session.fromReview) right.push(footBtn(h("span", { class: "td-label" }, "Na", k("v"), "igator"), "gear", function () { goMockReview(session); }, true));
    right.push(footBtn(h("span", { class: "td-label" }, k("N"), "ext"), "next", function () { examNext(session); }, true));
    app.append(h("div", { class: "td" },
      h("header", { class: "td-title" },
        h("span", { class: "td-title-text" }, "NETA Nerd Practice Exam"),
        mockStatus(session, true)
      ),
      itemTools(session, item),
      h("div", { class: "td-strip" }, "Multiple Choice Item - Single Select"),
      h("div", { class: "td-main" },
        h("div", { class: "td-item" },
          h("p", { class: "td-stem" }, q.question),
          h("div", { class: "td-choices", role: "radiogroup", "aria-label": "Answer choices" }, choices.map(function (text, i) {
            var on = item.picked === i;
            return h("button", {
              type: "button",
              class: "td-choice",
              role: "radio",
              "aria-checked": on ? "true" : "false",
              onclick: function () {
                item.picked = i;
                saveMockSession(session);
                render();
              }
            },
              h("span", { class: "td-radio", "aria-hidden": "true" }),
              h("span", { class: "td-letter" }, String.fromCharCode(65 + i) + "."),
              h("span", { class: "td-choice-text" }, text)
            );
          }))
        )
      ),
      h("footer", { class: "td-nav" },
        h("div", { class: "td-nav-left" }, left),
        h("div", { class: "td-nav-right" }, right)
      )
    ));
    state._key = function (ev) {
      if (state.examDialog) {
        if (ev.key === "Escape") closeExamDialog();
        return;
      }
      if (ev.metaKey || ev.ctrlKey || ev.altKey) return;
      var idx = ev.key.toUpperCase().charCodeAt(0) - 65;
      if (idx < 0 || idx >= choices.length) return;
      item.picked = idx;
      saveMockSession(session);
      render();
    };
    document.addEventListener("keydown", state._key);
    return true;
  }

  function renderMockReview(session) {
    var filter = session.reviewFilter || "all";
    var incompleteN = session.items.filter(function (item) { return item.picked == null; }).length;
    var flaggedN = session.items.filter(function (item) { return !!item.flagged; }).length;
    var total = session.items.length;
    var rows = session.items.map(function (item, idx) {
      return { item: item, idx: idx };
    }).filter(function (row) {
      if (filter === "incomplete") return row.item.picked == null;
      if (filter === "flagged") return !!row.item.flagged;
      return true;
    });
    var action = filter === "incomplete" ? "Review Incomplete" : filter === "flagged" ? "Review Flagged" : "Review All";
    function tab(id, label, tip) {
      return h("button", {
        type: "button",
        class: "td-tab" + (filter === id ? " is-on" : ""),
        "aria-pressed": filter === id ? "true" : "false",
        onclick: function () {
          session.reviewFilter = id;
          saveMockSession(session);
          render();
        }
      }, label, tip ? h("i", { class: "td-info", title: tip }, "i") : null);
    }
    app.append(h("div", { class: "td is-review" },
      h("header", { class: "td-title" },
        h("span", { class: "td-title-text" }, "NETA Nerd Practice Exam"),
        mockStatus(session, false)
      ),
      h("div", { class: "td-tools" },
        h("button", {
          type: "button",
          class: "td-tool",
          onclick: function () { state.examDialog = "instructions"; render(); }
        }, ico("book"), h("span", { class: "td-label" }, k("I"), "nstructions"))
      ),
      h("div", { class: "td-main" },
        h("div", { class: "td-review" },
          h("div", { class: "td-rev-head" },
            h("h1", {}, "Item Review Screen"),
            h("button", { type: "button", class: "td-teal", onclick: function () { session.reviewFilter = filter; saveMockSession(session); render(); } }, action)
          ),
          h("div", { class: "td-tabs" },
            tab("all", "All (" + total + ")", ""),
            tab("incomplete", "Incomplete (" + incompleteN + ")", "Review questions that are incomplete"),
            tab("flagged", "Flagged (" + flaggedN + ")", "Review questions that are flagged for review")
          ),
          h("div", { class: "td-table-wrap" },
            h("table", { class: "td-table" },
              h("thead", {},
                h("tr", {},
                  h("th", {}, "QUESTION"),
                  h("th", {}, "TITLE"),
                  h("th", {}, "STATUS"),
                  h("th", {}, "FLAGGED"),
                  h("th", {})
                )
              ),
              h("tbody", {},
                rows.length ? rows.map(function (row) {
                  var done = row.item.picked != null;
                  return h("tr", {},
                    h("td", {}, String(row.idx + 1)),
                    h("td", {}, "Multiple Choice"),
                    h("td", {}, h("span", { class: "td-pill " + (done ? "ok" : "no") }, done ? "Complete" : "Incomplete")),
                    h("td", {}, h("span", { class: "td-flagcell" },
                      row.item.flagged ? "Yes" : "No",
                      row.item.flagged ? ico("flagblue") : null
                    )),
                    h("td", {}, h("button", {
                      type: "button",
                      class: "td-review-link",
                      onclick: function () {
                        session.index = row.idx;
                        session.screen = "item";
                        session.fromReview = true;
                        state.examDialog = null;
                        saveMockSession(session);
                        render();
                      }
                    }, "Review"))
                  );
                }) : h("tr", {}, h("td", { colspan: "5" }, "No questions in this list."))
              )
            )
          )
        )
      ),
      h("footer", { class: "td-nav" },
        h("div", { class: "td-nav-left" },
          footBtn("End Section", "exit", function () { openMockEnd(session); }, false)
        ),
        h("div", { class: "td-nav-right" })
      )
    ));
  }

  function armMockClock(session) {
    if (!session.endsAt || mockScreen(session) === "welcome") return;
    var tick = function () {
      var live = loadMockSession();
      if (!live || !live.endsAt) return;
      var left = live.endsAt - Date.now();
      var el = document.getElementById("td-clock-value");
      if (el) el.textContent = examClock(left);
      if (left <= 0) {
        if (state._timer) { clearInterval(state._timer); state._timer = null; }
        finishMock(live, "time");
      }
    };
    tick();
    state._timer = setInterval(tick, 250);
  }

  function renderMockRun() {
    var session = loadMockSession();
    if (!session || session.mode !== "mock") { location.hash = "#/mock"; return; }
    if (session.endsAt && session.endsAt <= Date.now()) { finishMock(session, "time"); return; }
    document.title = "NETA Nerd Practice Exam";
    var screen = mockScreen(session);
    var ok = true;
    if (screen === "welcome") renderMockWelcome(session);
    else if (screen === "review") renderMockReview(session);
    else if (screen === "thanks") renderMockThanks(session);
    else ok = renderMockItem(session);
    if (ok === false) return;
    if (state.examDialog) app.append(renderMockDialog(session));
    if (!state._key) {
      state._key = function (ev) {
        if (state.examDialog && ev.key === "Escape") closeExamDialog();
      };
      document.addEventListener("keydown", state._key);
    }
    var focus = app.querySelector("[data-dialog-focus]");
    if (focus) focus.focus();
    armMockClock(session);
  }

  function renderMockResults() {
    document.title = "Practice results · Neta Nerd";
    var result = null;
    try { result = JSON.parse(sessionStorage.getItem(MOCK_RESULT) || "null"); }
    catch (e) {}
    if (!result || result.mode !== "mock") {
      app.append(h("h1", {}, "No mock result"), h("p", {}, "Finish a mock exam to see the review."), h("a", { class: "btn primary", href: "#/mock" }, "Mock exam"));
      return;
    }
    var ranOut = result.reason === "time";
    var weightName = result.level === "III" ? "Level III" : "Level II";
    var missed = (result.rows || []).map(function (row, idx) {
      return { row: row, n: idx + 1 };
    }).filter(function (entry) { return !entry.row.correct; });
    app.append(
      h("p", { class: "kicker" }, "Mock exam · " + levelLabel(result.level) + " · " + (result.format === "half" ? "Half" : "Full") + " · Standard"),
      h("h1", {}, "Practice results"),
      h("p", { class: "score-num" }, result.correct + " / " + result.total),
      h("p", {}, "Raw percent: " + result.pct + "%"),
      h("p", {}, "Time used: " + usedText(result.seconds) + "."),
      h("p", {}, ranOut ? "Time ran out. Unanswered questions were scored as not correct." : "Time did not run out."),
      h("div", { class: "actions" },
        h("a", { class: "btn primary", href: "#/mock" }, "New mock exam"),
        h("a", { class: "btn", href: "#/" }, "Home"),
        h("a", { class: "btn", href: "#/drills" }, "Drills")
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Your percent correct by domain"),
        h("p", { class: "meta" }, "Correct answers divided by the questions this practice exam asked. This is not the official domain weight."),
        h("ul", { class: "miss-list" }, DOMAINS.map(function (d) {
          var cell = (result.domains && result.domains[d.id]) || { correct: 0, total: 0 };
          var pct = cell.total ? Math.round(100 * cell.correct / cell.total) : 0;
          return h("li", {},
            h("b", {}, examDomainName(d.id)),
            " — " + cell.correct + " / " + cell.total + " correct — " + (cell.total ? pct + "%" : "—")
          );
        }))
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Official " + weightName + " exam domain weights"),
        h("p", {}, "These percentages are the official exam's mix of questions. They are not your percent correct."),
        h("p", { class: "meta" }, officialWeightText(result.level))
      ),
      h("div", { class: "panel estimate", style: "margin-top:14px" },
        h("p", {}, practiceScoreNote(result.level)),
        scoreSourceLine()
      ),
      h("div", { class: "panel", style: "margin-top:14px" },
        h("h2", {}, "Review the questions you missed"),
        h("p", {}, missed.length
          ? "These are the questions you missed on this practice exam."
          : "You answered every question correctly."),
        missed.length ? h("div", { class: "actions" },
          h("button", {
            class: "btn ghost",
            onclick: function () {
              var qs = missed.map(function (entry) { return state.bank.byId[entry.row.id]; }).filter(Boolean);
              if (qs.length) startDrill("missed", qs);
            }
          }, "Drill these in practice")
        ) : null,
        missed.length ? h("ul", { class: "miss-list" }, missed.map(function (entry) {
          var row = entry.row;
          var q = state.bank.byId[row.id];
          if (!q) return null;
          var yours = row.choice == null ? "No answer" : q.choices[row.choice];
          var link = safeHttps(q.link || "");
          return h("li", {},
            h("p", { class: "meta" }, "Question " + entry.n),
            h("span", { class: "tag bad" }, "Missed"),
            questionTags(q),
            h("p", {}, q.question),
            h("p", {}, "Your answer: " + yours),
            h("p", {}, "Correct answer: " + q.choices[q.answer]),
            h("p", {}, q.explanation),
            h("p", { class: "ref" }, q.reference),
            q.kb ? h("p", {}, h("a", { href: studyHref(q.kb) }, "Study this section")) : null,
            link ? h("p", {}, h("a", { href: link, target: "_blank", rel: "noopener noreferrer" }, "Learn more")) : null
          );
        })) : null
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
    document.body.classList.toggle("exam-driver", path === "/mock/run" && !state.error);
    if (path !== "/mock/run") state.examDialog = null;
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
  document.body.classList.toggle("exam-driver", parseHash() === "/mock/run");
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
