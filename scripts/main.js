console.log("Good Morning, Main.js!");

//import {getOfficers} from "./officers/OfficerProvider.js"
import {CriminalList} from "./criminals/CriminalList.js"
import { OfficerList } from "./officers/OfficerList.js";
import { CreateCrimeSelector } from "./convictions/ConvictionSelect.js"
import { CreateOfficerSelector } from "./officers/OfficerSelect.js"
import { NoteForm } from "./notes/NoteForm.js";
import { NoteList } from "./notes/NoteList.js";
import { WitnessList } from "./witnesses/WitnessList.js"

// let officerData = [];

// document.querySelector("#getOfficersBtn").addEventListener("click", () => {
//     getOfficers() // use a .then here because we are calling data that may not be ready by the time we go to the next line
//     .then((responseData) => {  // implicit return of 'response' in OfficerProvider.js is moved into 'officerData' here
//         officerData = responseData;
//         console.log(officerData);
//     })
// })

//CriminalList();

// let getOfficersBtn = document.getElementById("getOfficersBtn");
// getOfficersBtn.addEventListener("click", (e) => {
//     OfficerList();
// })

CreateCrimeSelector();
CreateOfficerSelector();
CriminalList();
NoteForm();
NoteList();

let getWitnessesBtn = document.getElementById("getWitnessesBtn");

getWitnessesBtn.addEventListener("click", (e) => {
    WitnessList();
})


