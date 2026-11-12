/* Three-phase phasor on the right, sine trails scrolling left.
   Counter-clockwise, about one turn every 19 seconds.
   Holds a still frame when the user prefers reduced motion. */
(function () {
  "use strict";
  var canvas = document.getElementById("phase-bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  /* Brown, orange, yellow stand in for the reference red, blue, and gold. */
  var phases = [
    { color: "#c08040", phi: Math.PI / 2 },
    { color: "#ff7a1a", phi: Math.PI / 2 - (2 * Math.PI / 3) },
    { color: "#ffc93c", phi: Math.PI / 2 + (2 * Math.PI / 3) }
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
    var narrow = W < 800;
    var amp = narrow
      ? Math.max(48, Math.min(W * 0.155, 86))
      : Math.max(72, Math.min(W * 0.072, 118));
    var outer = amp * 1.28;
    var cx = narrow ? W * 0.73 : Math.min(W * 0.78, W - outer - 20);
    cx = Math.max(outer + 12, Math.min(cx, W - outer - 6));
    var cy = narrow ? H * 0.40 : Math.min(H * 0.36, 300);
    var nowX = cx - outer - Math.max(8, amp * 0.12);
    if (nowX < 24) nowX = 24;
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
    glow(color, 0.62, 8);
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

    ctx.fillStyle = "#0f0c09";
    ctx.fillRect(0, 0, W, H);
    ctx.shadowBlur = 0;

    phases.forEach(function (p) {
      ctx.save();
      glow(p.color, 0.5, 7);
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
    ctx.strokeStyle = "#6a6258";
    ctx.globalAlpha = 0.45;
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
      glow(p.color, 0.55, 6);
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(nowX, tipY);
      ctx.stroke();
      ctx.restore();
      arrow(cx, cy, tipX, tipY, p.color);
      ctx.save();
      glow(p.color, 0.85, 8);
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
