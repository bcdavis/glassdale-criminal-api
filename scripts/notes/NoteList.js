import { getNotes, useNotes, deleteNote } from "./NoteProvider.js"
import { NoteHTMLConverter } from "./Note.js"
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"
import { NoteForm } from "./NoteForm.js"


const contentTarget = document.querySelector(".allNotesHere")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", event => {
    const newNotes = useNotes()
    //const newSuspects = useCriminals();
    render(newNotes, useCriminals())
})

eventHub.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")
        deleteNote(id)  
        /*.then(() => {
            const updatedNotes = useNotes()
            const criminals = useCriminals()
            render(updatedNotes, criminals)
        }
        )*/
    }
})


export const NoteList = () => {
    getNotes()
    .then(getCriminals)
    .then(() => {
        const notes = useNotes();
        const suspects = useCriminals();
        render(notes, suspects);
    })
}

const render = (notes, suspects) => {
    //const criminals = useCriminals();
    contentTarget.innerHTML = notes.map((noteObj) => {
        // for each note object, find the criminal name corresponding to the suspectId in each note
        // declaring new property on noteObj called suspectObj
        noteObj.suspectObj = suspects.find(suspect => {
            return suspect.id === parseInt(noteObj.suspectId)
        })
        return NoteHTMLConverter(noteObj)
    }).join("");

    NoteForm();
}