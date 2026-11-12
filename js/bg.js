/* Three-phase phasor on the right, sine trails scrolling left.
   Counter-clockwise, about one turn every 19 seconds.
   Holds a still frame when the user prefers reduced motion. */
(function () {
  "use strict";
  var canvas = document.getElementById("phase-bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  /* Amber, cyan, and a distinct coral so all three phases stay separate. */
  var phases = [
    { color: "#ffb000", phi: Math.PI / 2 },
    { color: "#00e5ff", phi: Math.PI / 2 - (2 * Math.PI / 3) },
    { color: "#ff5a36", phi: Math.PI / 2 + (2 * Math.PI / 3) }
  ];
  var PERIOD = 19;
  var dpr = 1, W = 0, H = 0, raf = 0, t0 = 0;

  function reduced() { return mq.matches; }

  function resize() {
    var next = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (next === dpr && w === W && h === H) return;
    dpr = next;
    W = w;
    H = h;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function layout() {
    var column = Math.min(820, Math.max(0, W - 28));
    var contentRight = (W + column) / 2;
    var gutter = W - contentRight;
    var roomy = gutter >= 150;
    var outer, amp, cx, cy;
    if (roomy) {
      /* Sit the whole outer circle in the empty margin beside the column. */
      outer = Math.max(78, Math.min(132, (gutter - 28) / 2));
      amp = outer / 1.28;
      cx = W - outer - 16;
      cy = 72 + outer;
    } else {
      outer = Math.max(62, Math.min(W * 0.24, 100));
      amp = outer / 1.28;
      cx = W - Math.min(outer + 6, W * 0.28);
      cy = 64 + outer;
    }
    var nowX = Math.max(20, cx - outer - Math.max(10, amp * 0.18));
    return { amp: amp, outer: outer, cx: cx, cy: cy, nowX: nowX };
  }

  function glow(color, alpha, blur) {
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = blur;
  }

  function arrow(x0, y0, x1, y1, color) {
    var ang = Math.atan2(y1 - y0, x1 - x0);
    var head = 11;
    var sx = x1 - Math.cos(ang) * head * 0.72;
    var sy = y1 - Math.sin(ang) * head * 0.72;
    ctx.save();
    glow(color, 0.92, 9);
    ctx.lineWidth = 2.4;
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(sx, sy);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x1 - head * Math.cos(ang - 0.42), y1 - head * Math.sin(ang - 0.42));
    ctx.lineTo(x1 - head * Math.cos(ang + 0.42), y1 - head * Math.sin(ang + 0.42));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function frame(seconds) {
    var theta = (seconds / PERIOD) * Math.PI * 2;
    var L = layout();
    var amp = L.amp;
    var cx = L.cx;
    var cy = L.cy;
    var nowX = L.nowX;
    var cycles = W < 800 ? 1.15 : 1.45;
    var pxPerRad = Math.max(8, (nowX - 4) / (Math.PI * 2 * cycles));

    ctx.fillStyle = "#0b0d0f";
    ctx.fillRect(0, 0, W, H);
    ctx.shadowBlur = 0;

    phases.forEach(function (p) {
      ctx.save();
      glow(p.color, 0.42, 7);
      ctx.lineWidth = 1.6;
      ctx.lineJoin = "round";
      ctx.beginPath();
      var started = false;
      var step = W < 800 ? 3 : 2.5;
      for (var x = 0; x <= nowX; x += step) {
        var t = theta + p.phi - (nowX - x) / pxPerRad;
        var y = cy - amp * Math.sin(t);
        if (!started) { ctx.moveTo(x, y); started = true; }
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    });

    ctx.save();
    ctx.strokeStyle = "#8a9098";
    ctx.globalAlpha = 0.7;
    ctx.lineWidth = 1;
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(cx, cy, amp, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx, cy, L.outer, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - L.outer, cy);
    ctx.lineTo(cx + L.outer, cy);
    ctx.moveTo(cx, cy - L.outer);
    ctx.lineTo(cx, cy + L.outer);
    ctx.stroke();
    ctx.restore();

    phases.forEach(function (p) {
      var ang = theta + p.phi;
      var tipX = cx + amp * Math.cos(ang);
      var tipY = cy - amp * Math.sin(ang);
      ctx.save();
      glow(p.color, 0.72, 6);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(nowX, tipY);
      ctx.stroke();
      ctx.restore();
      arrow(cx, cy, tipX, tipY, p.color);
      ctx.save();
      glow(p.color, 0.95, 9);
      ctx.beginPath();
      ctx.arc(nowX, tipY, 3.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function loop(now) {
    if (!t0) t0 = now;
    resize();
    frame((now - t0) / 1000);
    if (!reduced()) raf = requestAnimationFrame(loop);
  }

  function start() {
    resize();
    cancelAnimationFrame(raf);
    t0 = 0;
    if (reduced()) {
      frame(PERIOD * 0.04);
      return;
    }
    raf = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", start, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelAnimationFrame(raf);
    else start();
  });
  if (mq.addEventListener) mq.addEventListener("change", start);
  start();
})();
