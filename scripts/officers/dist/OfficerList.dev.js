"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfficerList = void 0;

var _Officer = require("./Officer.js");

var _OfficerProvider = require("./OfficerProvider.js");

var addOfficersToDOM = function addOfficersToDOM(officersArray) {
  var contentElement = document.querySelector(".officersContainer");
  var HTMLArray = officersArray.map(function (singleOfficer) {
    return (0, _Officer.OfficerHTML)(singleOfficer); // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
  });
  contentElement.innerHTML = HTMLArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement
};

var OfficerList = function OfficerList() {
  console.log("creating OfficerList");
  (0, _OfficerProvider.getOfficers)().then(function () {
    var officers = (0, _OfficerProvider.useOfficers)();
    addOfficersToDOM(officers);
  });
};

exports.OfficerList = OfficerList;