"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getConvictions = exports.useConvictions = void 0;
var crimes = [];

var useConvictions = function useConvictions() {
  return crimes.slice();
};

exports.useConvictions = useConvictions;

var getConvictions = function getConvictions() {
  // request data in this form: 

  /*
  - array of conviction objects
   [
       - conviction object
       {
           "name": str,
           "id": int
       },
       {
           "name": str,
           "id": int
       },
       etc...
   ]
  */
  return fetch("https://criminals.glassdale.us/crimes").then(function (response) {
    return response.json();
  }) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
  .then( //
  function (parsedCrimes) {
    //
    console.table(parsedCrimes); // Do something with the data

    crimes = parsedCrimes; // store response data in criminals array
  });
};

exports.getConvictions = getConvictions;