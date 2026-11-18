/* Placeholder copy for the field desk carousel.
   News headlines are not stored here. The home page loads them from
   api/news, then from data/news.json if that request fails.
   The tools page loads data/tools.json.
   The manuals page is not in this file. It is a coming-soon notice. */
(function () {
  "use strict";

  function art(label, body) {
    return '<svg class="art" viewBox="0 0 320 200" role="img" aria-label="' + label + '">' +
      '<rect width="320" height="200" fill="#0b0d0f"/>' + body + "</svg>";
  }

  window.NETA_PLACEHOLDERS = {
    deck: {
      example: true,
      heading: "Electrical construction",
      slides: [
        {
          caption: "Example image: medium-voltage switchgear lineup",
          svg: art("Example image: medium-voltage switchgear lineup",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="36" y="28" width="248" height="150"/>' +
              '<line x1="36" y1="52" x2="284" y2="52"/>' +
              '<rect x="48" y="64" width="64" height="98"/>' +
              '<rect x="124" y="64" width="64" height="98"/>' +
              '<rect x="200" y="64" width="64" height="98"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<line x1="58" y1="78" x2="102" y2="78"/><line x1="58" y1="90" x2="102" y2="90"/>' +
              '<rect x="66" y="102" width="28" height="22"/><circle cx="80" cy="146" r="8"/>' +
              '<line x1="134" y1="78" x2="178" y2="78"/><line x1="134" y1="90" x2="178" y2="90"/>' +
              '<rect x="142" y="102" width="28" height="22"/><circle cx="156" cy="146" r="8"/>' +
              '<line x1="210" y1="78" x2="254" y2="78"/><line x1="210" y1="90" x2="254" y2="90"/>' +
              '<rect x="218" y="102" width="28" height="22"/><circle cx="232" cy="146" r="8"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="80" y1="16" x2="80" y2="28"/>' +
              '<line x1="156" y1="16" x2="156" y2="28"/>' +
              '<line x1="232" y1="16" x2="232" y2="28"/>' +
              '<line x1="80" y1="16" x2="232" y2="16"/>' +
            "</g>" +
            '<text x="44" y="44" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">SWGR BAY  (EXAMPLE)</text>')
        },
        {
          caption: "Example image: conduit and junction box run",
          svg: art("Example image: conduit and junction box run",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="28" y="36" width="14" height="140"/>' +
              '<rect x="28" y="36" width="70" height="14"/>' +
              '<path d="M98 36h40v14H98"/>' +
              '<path d="M138 36c28 0 40 18 40 40v100"/>' +
              '<path d="M152 36c16 0 26 12 26 28v112"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<line x1="42" y1="70" x2="138" y2="70"/>' +
              '<line x1="42" y1="100" x2="138" y2="100"/>' +
              '<line x1="42" y1="130" x2="138" y2="130"/>' +
              '<rect x="200" y="70" width="80" height="90"/>' +
              '<line x1="200" y1="92" x2="280" y2="92"/>' +
              '<circle cx="240" cy="124" r="16"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="178" y1="76" x2="200" y2="76"/>' +
              '<line x1="178" y1="88" x2="200" y2="88"/>' +
              '<line x1="178" y1="100" x2="200" y2="100"/>' +
            "</g>" +
            '<text x="48" y="28" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">CONDUIT / J-BOX  (EXAMPLE)</text>')
        },
        {
          caption: "Example image: pad-mounted transformer",
          svg: art("Example image: pad-mounted transformer",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="80" y="48" width="160" height="120"/>' +
              '<line x1="80" y1="68" x2="240" y2="68"/>' +
              '<polygon points="160,20 148,48 172,48"/>' +
              '<rect x="92" y="80" width="56" height="72"/>' +
              '<rect x="172" y="80" width="56" height="72"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<ellipse cx="120" cy="116" rx="16" ry="26"/>' +
              '<ellipse cx="120" cy="116" rx="8" ry="18"/>' +
              '<ellipse cx="200" cy="116" rx="16" ry="26"/>' +
              '<ellipse cx="200" cy="116" rx="8" ry="18"/>' +
              '<line x1="120" y1="20" x2="120" y2="48"/>' +
              '<line x1="200" y1="20" x2="200" y2="48"/>' +
              '<line x1="108" y1="20" x2="132" y2="20"/>' +
              '<line x1="188" y1="20" x2="212" y2="20"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="148" y1="116" x2="172" y2="116"/>' +
            "</g>" +
            '<text x="88" y="64" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">PAD XFMR  (EXAMPLE)</text>')
        },
        {
          caption: "Example image: field test set",
          svg: art("Example image: field test set",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="40" y="44" width="240" height="128"/>' +
              '<rect x="52" y="58" width="120" height="72"/>' +
              '<rect x="184" y="58" width="84" height="28"/>' +
              '<rect x="184" y="94" width="36" height="36"/>' +
              '<rect x="236" y="94" width="32" height="36"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<polyline points="62,92 78,84 94,100 110,70 126,88 148,76"/>' +
              '<line x1="52" y1="148" x2="268" y2="148"/>' +
              '<circle cx="72" cy="160" r="6"/>' +
              '<circle cx="96" cy="160" r="6"/>' +
              '<circle cx="120" cy="160" r="6"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="184" y1="148" x2="184" y2="176"/>' +
              '<line x1="268" y1="148" x2="268" y2="176"/>' +
              '<line x1="184" y1="176" x2="268" y2="176"/>' +
            "</g>" +
            '<text x="52" y="36" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">TEST SET  (EXAMPLE)</text>')
        }
      ]
    }
  };
})();
