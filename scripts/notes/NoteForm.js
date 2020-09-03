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
            const newNote = {
                noteText: noteContent.value,
                suspect: noteSuspect.value, 
                date: Date.now()
            }

            saveNote(newNote);


        } else {
            window.alert("Choose a Suspect");
        }


    }
})


// <input> gives on line to input text
// <textarea> gives multiple lines to input text

const render = (criminalArray) => {
    contentTarget.innerHTML = `
        <h3>New Note Details</h3>
            <textarea id="noteForm--text" placeholder="Put a note here"></textarea>

            <select class="dropdown" id="noteForm--criminal">
                <option value="default">Please select a criminal...</option>
                ${
                    criminalArray.map(crimeObj => `
                        <option value="${crimeObj.name}">${crimeObj.name}</option>
                        `).join("")
                }
                
            </select>
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    getCriminals()
    .then(() => {
        render(useCriminals()); // useCriminals() returns an array

    })
}