/* Neta Nerd — static drill runner. No build step. */
(function () {
  "use strict";
  var LEVELS = ["ETT", "I", "II", "III", "IV"];
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
    if (level === "ETT") return "NETA ETT";
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

  function saveSession(session) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
    catch (e) {}
  }
  function loadSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || "null"); }
    catch (e) { return null; }
  }
  function clearSession() {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
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
      items: list.map(present),
      index: 0,
      startedAt: Date.now(),
      endsAt: mode === "timed" ? Date.now() + seconds * 1000 : null,
      filters: JSON.parse(JSON.stringify(state.filters))
    };
    saveSession(session);
    location.hash = "#/run";
  }

  function finish(session, reason) {
    var rows = session.items.map(function (item) {
      var q = sourceQuestion(item);
      var choice = pickedOriginal(item);
      var ok = choice === q.answer;
      var answered = choice != null;
      if (!item.recorded) recordAnswer(q.id, ok && answered, choice);
      return { id: q.id, choice: choice, correct: ok && answered, answered: answered };
    });
    var correct = rows.filter(function (r) { return r.correct; }).length;
    var result = {
      mode: session.mode,
      reason: reason || "submitted",
      rows: rows,
      correct: correct,
      total: rows.length,
      seconds: Math.round((Date.now() - session.startedAt) / 1000),
      at: Date.now()
    };
    var p = progress();
    p.sessions = [{ mode: result.mode, correct: correct, total: result.total, at: result.at, seconds: result.seconds }].concat(p.sessions || []).slice(0, 8);
    saveProgress(p);
    try { sessionStorage.setItem("netanerd-result-v1", JSON.stringify(result)); } catch (e) {}
    clearSession();
    location.hash = "#/results";
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

  function renderHome() {
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

    app.append(
      h("p", { class: "kicker" }, "Field drills · Level II first"),
      h("h1", {}, "Practice the test, not a leaked paper."),
      h("p", { class: "lede" }, "Original questions for NETA acceptance and maintenance testing. Level II is selected by default. Instant feedback in practice, a timed 25-question drill, and missed questions saved on this device."),
      h("div", { class: "panel stack" },
        h("h2", {}, "Build a drill"),
        h("p", { class: "meta" }, onlyII
          ? "Level II bank by domain (study-guide targets " + dco.safety + " / " + dco.theory + " / " + dco.component + " / " + dco.systems + "): Safety " + iiCounts.safety + ", Theory " + iiCounts.theory + ", Component " + iiCounts.component + ", Systems " + iiCounts.systems + "."
          : match.length + " questions match the filters."),
        chipRow("Level", LEVELS.map(function (id) { return { id: id, label: id === "ETT" ? "ETT" : "Level " + id }; }), state.filters.levels, function (id) { toggle(state.filters.levels, id); }),
        chipRow("Domain", DOMAINS, state.filters.domains, function (id) { toggle(state.filters.domains, id); }),
        chipRow("Length", [{ id: "10", label: "10" }, { id: "25", label: "25" }, { id: "all", label: "All matching" }], [state.practiceCount], function (id) { state.practiceCount = id; }),
        h("p", { class: "meta" }, match.length + " questions available with these filters. Timed quiz always takes up to 25 and allows 72 seconds each (30:00 at 25)."),
        h("div", { class: "actions" },
          h("button", { class: "btn primary", disabled: match.length ? null : true, onclick: function () { startDrill("practice", match); } }, "Start practice"),
          h("button", { class: "btn ghost", disabled: match.length ? null : true, onclick: function () { startDrill("timed", match); } }, "Timed quiz"),
          h("button", { class: "btn", disabled: missed.length ? null : true, onclick: function () {
            var qs = missed.map(function (id) { return b.byId[id]; }).filter(Boolean);
            startDrill("missed", qs);
          } }, "Review missed (" + missed.length + ")")
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
          return h("a", { class: "topic-card", href: "#/", onclick: function (ev) {
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
          h("a", { class: "btn ghost", href: "#/study/level-2.md/exam-format" }, "Level II exam format"),
          h("a", { class: "btn ghost", href: "#/study/level-3.md/exam-format" }, "Level III exam format")
        )
      )
    );
  }

  function renderRun() {
    var session = loadSession();
    if (!session) { location.hash = "#/"; return; }
    var item = session.items[session.index];
    var q = sourceQuestion(item);
    if (!q) { clearSession(); location.hash = "#/"; return; }
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
        if (left <= 0) finish(loadSession() || session, "time");
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
      app.append(h("h1", {}, "No score yet"), h("p", {}, "Finish a drill to see a summary."), h("a", { class: "btn primary", href: "#/" }, "Home"));
      return;
    }
    var pct = Math.round(100 * result.correct / result.total);
    app.append(
      h("p", { class: "kicker" }, result.mode === "timed" ? "Timed quiz" : "Practice"),
      h("h1", {}, "Score"),
      h("p", { class: "score-num" }, result.correct + " / " + result.total),
      h("p", {}, pct + "% · " + Math.floor(result.seconds / 60) + "m " + (result.seconds % 60) + "s" + (result.reason === "time" ? " · time expired" : "")),
      h("div", { class: "actions" },
        h("a", { class: "btn primary", href: "#/" }, "Home"),
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

  function renderStudyIndex() {
    app.append(
      h("p", { class: "kicker" }, "Knowledge base"),
      h("h1", {}, "Study"),
      h("p", { class: "lede" }, "Written for the people adding questions. Procedures, checked numbers, and worked math. Standards text is not copied here."),
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

  function render() {
    if (state._timer) { clearInterval(state._timer); state._timer = null; }
    if (state._key) { document.removeEventListener("keydown", state._key); state._key = null; }
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
    var path = parseHash();
    var study = /^\/study\/(.+\.md)(?:\/([a-z0-9-]+))?$/.exec(path);
    document.title = "Neta Nerd";
    if (path === "/" || path === "") renderHome();
    else if (path === "/run") renderRun();
    else if (path === "/results") renderResults();
    else if (path === "/study") renderStudyIndex();
    else if (study) renderStudyDoc(study[1], study[2]);
    else renderHome();
  }

  window.addEventListener("hashchange", render);

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
      render();
    });
  }).catch(function (err) {
    state.error = err.message || String(err);
    render();
  });
})();
