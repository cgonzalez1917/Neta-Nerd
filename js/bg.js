/* Three-phase phasor and drifting sine waves. Original drawing; pauses offscreen
   and holds one frame when the user prefers reduced motion. */
(function () {
  "use strict";
  var canvas = document.getElementById("phase-bg");
  if (!canvas) return;
  var ctx = canvas.getContext("2d", { alpha: false });
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var phases = [
    { color: "#ffb000", phi: 0, name: "A" },
    { color: "#00e5ff", phi: -2 * Math.PI / 3, name: "B" },
    { color: "#ff4fd8", phi: 2 * Math.PI / 3, name: "C" }
  ];
  var PERIOD = 22;
  var dpr = 1, W = 0, H = 0, raf = 0, t0 = 0;

  function reduced() { return mq.matches; }

  function resize() {
    var next = Math.min(window.devicePixelRatio || 1, 2);
    var w = window.innerWidth, h = window.innerHeight;
    if (next === dpr && w === W && h === H) return;
    dpr = next; W = w; H = h;
    canvas.width = Math.max(1, Math.round(w * dpr));
    canvas.height = Math.max(1, Math.round(h * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function layout() {
    var narrow = W < 800;
    var amp = narrow ? Math.min(72, W * 0.2) : Math.min(112, Math.max(84, W * 0.075));
    return {
      amp: amp,
      cx: narrow ? W - amp * 0.15 : W - amp - 28,
      cy: narrow ? Math.min(H * 0.22, 150) : Math.min(188, H * 0.26),
      waveY: narrow ? H * 0.55 : H * 0.62,
      waveAmp: narrow ? 16 : 28
    };
  }

  function stroke(color, width, alpha, draw) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineCap = "butt";
    ctx.lineJoin = "miter";
    ctx.globalAlpha = alpha * 0.18;
    ctx.lineWidth = width * 3.2;
    draw();
    ctx.stroke();
    ctx.globalAlpha = alpha;
    ctx.lineWidth = width;
    draw();
    ctx.stroke();
    ctx.restore();
  }

  function frame(seconds) {
    var theta = (seconds / PERIOD) * Math.PI * 2;
    var L = layout();
    ctx.fillStyle = "#0b0d0f";
    ctx.fillRect(0, 0, W, H);

    var nowX = Math.min(L.cx - L.amp * 1.35, W * 0.62);
    var px = (nowX - 8) / (Math.PI * 2 * 1.35);

    phases.forEach(function (p) {
      stroke(p.color, 1.4, 0.28, function () {
        ctx.beginPath();
        var first = true;
        for (var x = 0; x <= nowX; x += 4) {
          var y = L.waveY - L.waveAmp * Math.sin(theta + p.phi - (nowX - x) / px);
          if (first) { ctx.moveTo(x, y); first = false; }
          else ctx.lineTo(x, y);
        }
      });
    });

    ctx.save();
    ctx.strokeStyle = "#2a3238";
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(L.cx, L.cy, L.amp, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(L.cx, L.cy, L.amp * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    phases.forEach(function (p) {
      var ang = theta + p.phi;
      var tipX = L.cx + L.amp * Math.cos(ang);
      var tipY = L.cy - L.amp * Math.sin(ang);
      stroke(p.color, 1.6, 0.55, function () {
        ctx.beginPath();
        ctx.moveTo(L.cx, L.cy);
        ctx.lineTo(tipX, tipY);
      });
      var head = 9;
      var a = Math.atan2(tipY - L.cy, tipX - L.cx);
      ctx.save();
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(tipX - head * Math.cos(a - 0.45), tipY - head * Math.sin(a - 0.45));
      ctx.lineTo(tipX - head * Math.cos(a + 0.45), tipY - head * Math.sin(a + 0.45));
      ctx.closePath();
      ctx.fill();
      if (L.amp > 70) {
        ctx.globalAlpha = 0.55;
        ctx.font = "12px system-ui, sans-serif";
        ctx.fillText(p.name, tipX + 6 * Math.cos(a), tipY + 6 * Math.sin(a));
      }
      ctx.restore();
    });

    ctx.save();
    ctx.fillStyle = "#c5ccd4";
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(L.cx, L.cy, 2.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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
    if (reduced()) { frame(PERIOD * 0.18); return; }
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
