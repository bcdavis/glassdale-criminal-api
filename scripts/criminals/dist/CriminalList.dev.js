"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CriminalList = void 0;

var _CriminalProvider = require("./CriminalProvider.js");

var _Criminal = require("./Criminal.js");

var addCriminalsToDOM = function addCriminalsToDOM(criminalsArray) {
  var contentElement = document.querySelector(".criminalsContainer");
  var HTMLArray = criminalsArray.map(function (criminal) {
    return (0, _Criminal.CriminalHTML)(criminal); // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
  });
  contentElement.innerHTML = HTMLArray.join(" ");
};

var CriminalList = function CriminalList() {
  console.log("creating CriminalList");
  (0, _CriminalProvider.getCriminals)().then(function () {
    var criminals = (0, _CriminalProvider.useCriminals)();
    addCriminalsToDOM(criminals);
  });
};

exports.CriminalList = CriminalList;