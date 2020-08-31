console.log("It's Monday...");

import {getOfficers} from "./officers/OfficerProvider.js"
import {CriminalList} from "./criminals/CriminalList.js"
import { OfficerList, ClearOfficerList } from "./officers/OfficerList.js";

// let officerData = [];

// document.querySelector("#getOfficersBtn").addEventListener("click", () => {
//     getOfficers() // use a .then here because we are calling data that may not be ready by the time we go to the next line
//     .then((responseData) => {  // implicit return of 'response' in OfficerProvider.js is moved into 'officerData' here
//         officerData = responseData;
//         console.log(officerData);
//     })
// })

//CriminalList();

let getOfficersBtn = document.getElementById("getOfficersBtn");
const contentElement = document.querySelector(".officersContainer");

getOfficersBtn.addEventListener("click", (e) => {
    ClearOfficerList();
    OfficerList();
})


