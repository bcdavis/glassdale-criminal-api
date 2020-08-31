"use strict";

var _OfficerProvider = require("./officers/OfficerProvider.js");

var _CriminalList = require("./criminals/CriminalList.js");

var _OfficerList = require("./officers/OfficerList.js");

console.log("It's Monday...");
// let officerData = [];
// document.querySelector("#getOfficersBtn").addEventListener("click", () => {
//     getOfficers() // use a .then here because we are calling data that may not be ready by the time we go to the next line
//     .then((responseData) => {  // implicit return of 'response' in OfficerProvider.js is moved into 'officerData' here
//         officerData = responseData;
//         console.log(officerData);
//     })
// })
//CriminalList();
var getOfficersBtn = document.getElementById("getOfficersBtn");
var contentElement = document.querySelector(".officersContainer");
getOfficersBtn.addEventListener("click", function (e) {
  (0, _OfficerList.ClearOfficerList)();
  (0, _OfficerList.OfficerList)();
});