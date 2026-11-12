/* Small markdown renderer for the study pages. Escapes HTML first. */
(function (global) {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[\s(])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\[([^\]]+)\]\(#\/([^)]+)\)/g, '<a href="#/$2">$1</a>');
  }
  function slugOf(text, explicit) {
    if (explicit) return explicit;
    return text.toLowerCase().replace(/[`*_]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function renderMarkdown(src) {
    var lines = String(src).replace(/\r\n/g, "\n").split("\n");
    var out = [];
    var i = 0;
    while (i < lines.length) {
      var line = lines[i];
      if (line.trim().startsWith("```")) {
        var buf = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith("```")) { buf.push(esc(lines[i])); i++; }
        out.push("<pre><code>" + buf.join("\n") + "</code></pre>");
        i++;
        continue;
      }
      var h = /^(#{1,3})\s+(.+)$/.exec(line);
      if (h) {
        var raw = h[2];
        var idm = /\{#([a-z0-9-]+)\}\s*$/.exec(raw);
        var explicit = idm ? idm[1] : "";
        var text = idm ? raw.slice(0, idm.index).trim() : raw;
        var tag = "h" + h[1].length;
        out.push("<" + tag + ' id="' + slugOf(text, explicit) + '">' + inline(text) + "</" + tag + ">");
        i++;
        continue;
      }
      if (/^\s*---\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
      if (/^\s*>\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
          q.push(lines[i].replace(/^\s*>\s?/, ""));
          i++;
        }
        out.push("<blockquote><p>" + inline(q.join(" ")) + "</p></blockquote>");
        continue;
      }
      if (/^\s*[-*]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push("<li>" + inline(lines[i].replace(/^\s*[-*]\s+/, "")) + "</li>");
          i++;
        }
        out.push("<ul>" + items.join("") + "</ul>");
        continue;
      }
      if (/^\s*\d+\.\s+/.test(line)) {
        var ol = [];
        while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
          ol.push("<li>" + inline(lines[i].replace(/^\s*\d+\.\s+/, "")) + "</li>");
          i++;
        }
        out.push("<ol>" + ol.join("") + "</ol>");
        continue;
      }
      if (line.trim() === "") { i++; continue; }
      var para = [line];
      i++;
      while (i < lines.length && lines[i].trim() && !/^(#{1,3}\s|```|\s*[-*]\s|\s*\d+\.\s|\s*>|\s*---)/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      out.push("<p>" + inline(para.join(" ")) + "</p>");
    }
    return out.join("\n");
  }
  global.NetaMd = { render: renderMarkdown };
})(window);
