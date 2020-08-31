"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CriminalHTML = void 0;

var CriminalHTML = function CriminalHTML(crimObj) {
  return "\n    <div class=\"criminalCard\">\n        <h2>".concat(crimObj.name, "<h2>\n        <ul>\n            <li>Age: ").concat(crimObj.age, "</li>\n            <li>Crime: ").concat(crimObj.conviction, "</li>\n            <li>Term start: ").concat(new Date(crimObj.incarceration.start).toLocaleDateString('en-US'), "</li>\n            <li>Term end: ").concat(new Date(crimObj.incarceration.end).toLocaleDateString('en-US'), "</li>\n        </ul>\n    </div>\n    ");
};

exports.CriminalHTML = CriminalHTML;