/* Placeholder copy for the field desk carousel and the tools page.
   News headlines are not stored here. The home page loads them from
   api/news, then from data/news.json if that request fails.
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
    },
    tools: {
      example: true,
      intro: "Example concepts for new field tools and 3D-printed shop aids. Nothing here is a real product listing.",
      items: [
        {
          title: "CT testing tool",
          text: "A portable fixture for field current-transformer checks. Placeholder concept only.",
          status: "Concept",
          svg: art("Example image: CT testing tool",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="28" y="50" width="150" height="110"/>' +
              '<rect x="40" y="64" width="90" height="54"/>' +
              '<circle cx="200" cy="110" r="48"/>' +
              '<circle cx="200" cy="110" r="28"/>' +
              '<rect x="188" y="58" width="24" height="16"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<polyline points="50,94 62,86 78,100 94,78 112,90"/>' +
              '<rect x="44" y="128" width="28" height="18"/>' +
              '<rect x="80" y="128" width="28" height="18"/>' +
              '<line x1="178" y1="110" x2="148" y2="110"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="200" y1="62" x2="200" y2="82"/>' +
              '<line x1="200" y1="138" x2="200" y2="158"/>' +
            "</g>" +
            '<text x="32" y="40" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">CT TEST SET  (EXAMPLE)</text>')
        },
        {
          title: "3D-printed CT polarity fixture",
          text: "Printed block with window and marked H1 / X1 faces. Placeholder concept only.",
          status: "Concept",
          svg: art("Example image: 3D-printed CT polarity fixture",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="70" y="40" width="180" height="130"/>' +
              '<circle cx="160" cy="108" r="44"/>' +
              '<circle cx="160" cy="108" r="26"/>' +
              '<rect x="70" y="40" width="44" height="24"/>' +
              '<rect x="206" y="40" width="44" height="24"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<line x1="92" y1="52" x2="92" y2="20"/>' +
              '<line x1="228" y1="52" x2="228" y2="20"/>' +
              '<line x1="80" y1="20" x2="104" y2="20"/>' +
              '<line x1="216" y1="20" x2="240" y2="20"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<text x="80" y="56" fill="#00e5ff" stroke="none" font-family="ui-monospace,monospace" font-size="9">H1</text>' +
              '<text x="216" y="56" fill="#00e5ff" stroke="none" font-family="ui-monospace,monospace" font-size="9">X1</text>' +
            "</g>" +
            '<text x="74" y="186" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">CT POLARITY FIXTURE  (EXAMPLE)</text>')
        },
        {
          title: "3D-printed test-lead holder",
          text: "Rack for lead sets on a bench or cart. Placeholder concept only.",
          status: "Concept",
          svg: art("Example image: 3D-printed test-lead holder",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="50" y="70" width="220" height="70"/>' +
              '<rect x="50" y="70" width="220" height="14"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<circle cx="86" cy="118" r="10"/><circle cx="128" cy="118" r="10"/>' +
              '<circle cx="170" cy="118" r="10"/><circle cx="212" cy="118" r="10"/>' +
              '<circle cx="254" cy="118" r="10"/>' +
              '<line x1="86" y1="108" x2="86" y2="48"/>' +
              '<line x1="128" y1="108" x2="128" y2="40"/>' +
              '<line x1="170" y1="108" x2="170" y2="52"/>' +
              '<line x1="212" y1="108" x2="212" y2="36"/>' +
              '<line x1="254" y1="108" x2="254" y2="46"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<rect x="70" y="152" width="40" height="10"/>' +
              '<rect x="120" y="152" width="40" height="10"/>' +
            "</g>" +
            '<text x="50" y="32" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">TEST-LEAD HOLDER  (EXAMPLE)</text>')
        },
        {
          title: "Meter mount",
          text: "Bracket for a handheld meter at a test point. Placeholder concept only.",
          status: "Concept",
          svg: art("Example image: meter mount",
            '<g fill="none" stroke="#c5cdd3" stroke-width="1.2">' +
              '<rect x="110" y="36" width="100" height="140"/>' +
              '<rect x="122" y="50" width="76" height="52"/>' +
              '<rect x="90" y="36" width="20" height="140"/>' +
              '<rect x="210" y="36" width="20" height="140"/>' +
              '<line x1="90" y1="176" x2="50" y2="196"/>' +
              '<line x1="230" y1="176" x2="270" y2="196"/>' +
            "</g>" +
            '<g fill="none" stroke="#8e99a3" stroke-width="0.9">' +
              '<line x1="130" y1="66" x2="190" y2="66"/>' +
              '<line x1="130" y1="78" x2="176" y2="78"/>' +
              '<line x1="130" y1="90" x2="168" y2="90"/>' +
              '<circle cx="148" cy="128" r="10"/>' +
              '<circle cx="172" cy="128" r="10"/>' +
              '<rect x="138" y="148" width="44" height="16"/>' +
            "</g>" +
            '<g fill="none" stroke="#00e5ff" stroke-width="1.2">' +
              '<line x1="100" y1="28" x2="220" y2="28"/>' +
            "</g>" +
            '<text x="90" y="22" fill="#8e99a3" font-family="ui-monospace,monospace" font-size="8" letter-spacing="0.08em">METER MOUNT  (EXAMPLE)</text>')
        }
      ]
    }
  };
})();
