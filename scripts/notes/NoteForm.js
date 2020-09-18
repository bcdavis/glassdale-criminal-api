import {useCriminals, getCriminals} from "../criminals/CriminalProvider.js"
import { saveNote } from "./NoteProvider.js"


const contentTarget = document.querySelector("#noteFormContainer");
const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", clickEvent => {
    // saves the selected data form the form and posts it to the API as a note object
    if (clickEvent.target.id === "saveNote"){
        const noteContent = document.querySelector("#noteForm--text")
        const noteSuspect = document.querySelector("#noteForm--criminal")

        if( noteSuspect.value !== "default"){
            console.log("Created a new note!");
            const newNote = {
                noteText: noteContent.value,
                suspectId: parseInt(noteSuspect.value), 
                date: Date.now()
            }

            saveNote(newNote);

            // no longer need previous note informaiton
            noteContent.value = "";
            noteSuspect.value = "";


        } else {
            window.alert("Choose a Suspect");
        }


    }
})


// <input> gives on line to input text
// <textarea> gives multiple lines to input text

const render = (criminalArray) => {
    contentTarget.innerHTML = `
        <h3 class="formTitle">New Note Details</h3>
        <div class="actualFormContainer">
            <select class="dropdown" id="noteForm--criminal">
                <option value="default">Please select a criminal...</option>
                ${
                    criminalArray.map(crimeObj => `
                        <option value="${crimeObj.id}">${crimeObj.name}</option>
                        `).join("")
                }
                
            </select>
            <textarea id="noteForm--text" placeholder="Put a note here"></textarea>
            <button type="button" id="saveNote">Save Note</button>
        </div>
    `
}

export const NoteForm = () => {
    getCriminals()
    .then(() => {
        render(useCriminals()); // useCriminals() returns an array

    })
}