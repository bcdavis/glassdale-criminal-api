"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfficerHTML = void 0;

var OfficerHTML = function OfficerHTML(officerObj) {
  return "\n        <div id=\"officer-".concat(officerObj.id, " class=\"officerCard\">\n            <h2>").concat(officerObj.name, "</h2>\n        </div>\n    ");
};

exports.OfficerHTML = OfficerHTML;