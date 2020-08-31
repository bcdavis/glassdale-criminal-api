"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOfficers = exports.useOfficers = void 0;
var officers = [];

var useOfficers = function useOfficers() {
  return officers.slice();
}; // JSON = JavaScript Object Notation


exports.useOfficers = useOfficers;

var getOfficers = function getOfficers() {
  // request the data

  /*  returns an array [] of officer objects with the following properties:
          - name: str
          - id: int
  */
  return fetch("https://criminals.glassdale.us/officers") // promise
  .then(function (response) {
    return response.json();
  }) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
  .then( //
  function (parsedOfficers) {
    //
    //console.table(parsedOfficers)   // Do something with the data
    officers = parsedOfficers; // store data in officers array
  });
};

exports.getOfficers = getOfficers;