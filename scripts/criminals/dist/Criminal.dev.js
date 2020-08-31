"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CriminalHTML = void 0;

var CriminalHTML = function CriminalHTML(crimObj) {
  return "\n    <div class=\"criminalCard\">\n        <h2>".concat(crimObj.name, "</h2>\n        <div class=\"crim-card-info\">\n            <p><b>Age:</b> ").concat(crimObj.age, "</p>\n            <p><b>Crime:</b> ").concat(crimObj.conviction, "</p>\n            <p><b>Term start:</b> ").concat(new Date(crimObj.incarceration.start).toLocaleDateString('en-US'), "</p>\n            <p><b>Term end:</b> ").concat(new Date(crimObj.incarceration.end).toLocaleDateString('en-US'), "</p>\n        </div>\n    </div>\n    ");
};

exports.CriminalHTML = CriminalHTML;