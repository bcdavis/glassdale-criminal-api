"use strict";

var _OfficerProvider = require("./officers/OfficerProvider.js");

var _CriminalList = require("./criminals/CriminalList.js");

var _OfficerList = require("./officers/OfficerList.js");

var _ConvictionSelect = require("./convictions/ConvictionSelect.js");

console.log("It's Monday...");
var getOfficersBtn = document.getElementById("getOfficersBtn");
(0, _ConvictionSelect.CreateCrimeSelector)();
getOfficersBtn.addEventListener("click", function (e) {
  (0, _OfficerList.OfficerList)();
});
(0, _CriminalList.CriminalList)();