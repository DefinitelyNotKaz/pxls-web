module.exports.historical = runLookup;

function runLookup(board, clientX, clientY) {
  const pos = board.fromScreen(clientX, clientY);
  $.get("/historical", pos, function (data) {
    console.log(data);
  });
}

// $.get("/lookup", pos, function (data) {
//   data = data || { x: pos.x, y: pos.y, bg: true };
//   if (data && data.username && chat.typeahead.helper) {
//     chat.typeahead.helper
//       .getDatabase("users")
//       .addEntry(data.username, data.username);
//   }
//   if (self.handle) {
//     self.handle(data);
//   } else {
//     self.create(data);
//   }
// }).fail(function () {
//   self
//     ._makeShell({ x: pos.x, y: pos.y })
//     .find(".content")
//     .first()
//     .append(
//       $("<p>")
//         .css("color", "#c00")
//         .text(
//           __(
//             "An error occurred, either you aren't logged in or you may be attempting to look up users too fast. Please try again in 60 seconds",
//           ),
//         ),
//     );
//   self.elements.lookup.fadeIn(200);
// });
