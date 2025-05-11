const { place } = require("./place");

module.exports.historical = runLookup;

function runLookup(board, clientX, clientY) {
  const pos = board.fromScreen(clientX, clientY);
  $.get("/historical", pos, function (data) {
    const historyBody = $("#history>.panel-body");
    historyBody.empty();

    const history = data.placements.reverse();
    const placements = history.length;
    const lastUpdate = formatTimestamp((history[0] && history[0].time) || "");

    historyBody.append(createStatsArticle(placements, lastUpdate));

    history.forEach((p) => {
      historyBody.append(createPlacementArticle(p));
    });

    $("#history").addClass("open");
  });
}

function createHistoryField(label, value) {
  const field = document.createElement("div");
  field.classList.add("history-field");

  const strong = document.createElement("strong");
  strong.innerText = label;

  const span = document.createElement("span");
  span.innerText = value;

  field.appendChild(strong);
  field.appendChild(span);

  return field;
}

function createStatsArticle(placements, lastUpdate) {
  const article = document.createElement("article");
  const pad = document.createElement("div");
  pad.classList.add("pad-wrapper");

  pad.appendChild(createHistoryField("Placements: ", placements));
  pad.appendChild(createHistoryField("Last Updated: ", lastUpdate));

  article.appendChild(pad);
  return article;
}

function createPlacementArticle(placement) {
  const article = document.createElement("article");
  const pad = document.createElement("div");
  pad.classList.add("pad-wrapper");

  pad.appendChild(createHistoryField("Username: ", placement.username));
  pad.appendChild(createHistoryField("Faction: ", placement.faction));
  pad.appendChild(
    createHistoryField("Time: ", formatTimestamp(placement.time)),
  );
  pad.appendChild(createColorField("Color: ", placement.color));

  article.appendChild(pad);
  return article;
}

function createColorField(label, color) {
  const field = document.createElement("div");
  field.classList.add("history-field", "color-field");

  const strong = document.createElement("strong");
  strong.innerText = label;

  const span = document.createElement("span");
  span.innerText = `${place.palette[color].name} (#${color})`;

  const swatch = document.createElement("div");
  swatch.classList.add("color-swatch");
  swatch.style.backgroundColor = `#${place.palette[color].value}`;

  field.appendChild(strong);
  field.appendChild(span);
  field.appendChild(swatch);

  return field;
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "Unknown";
  const date = new Date(timestamp);
  return date.toLocaleString();
}
