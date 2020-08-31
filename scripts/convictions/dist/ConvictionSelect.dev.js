"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCrimeSelector = void 0;

var _ConvictionProvider = require("./ConvictionProvider.js");

// This module returns an HTML select element with each type of crime as an option. 
var createSelectorOptions = function createSelectorOptions(crimesArray) {
  var innerElement = document.querySelector(".filters__crime > .selector");
  var HTMLCrimeArray = crimesArray.map(function (crime) {
    return "\n            <option value=\"".concat(crime.name, "\">").concat(crime.name, "</option>\n                \n        "); // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
  });
  innerElement.innerHTML += HTMLCrimeArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement
};

var CreateCrimeSelector = function CreateCrimeSelector() {
  (0, _ConvictionProvider.getConvictions)().then(function () {
    var convictionsArray = (0, _ConvictionProvider.useConvictions)(); // create the selector element

    document.querySelector(".filters__crime").innerHTML = "<select class=\"selector\">Please select a crime... </selector>"; // add the dropdown options

    createSelectorOptions(convictionsArray);
  });
};

exports.CreateCrimeSelector = CreateCrimeSelector;