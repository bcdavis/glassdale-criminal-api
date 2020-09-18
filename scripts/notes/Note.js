

// Take notes made and prepare to display on website

const eventHub = document.querySelector(".container")

export const NoteHTMLConverter = (noteObj) => {
    return `
        <section class="note">
            <div class="note--timeStamp">Timestamp: ${new Date(noteObj.date).toLocaleDateString('en-US')}</div>
            <div class="note--title">Criminal: ${ noteObj.suspectId.name }</div>
            <div class="note--content">${ noteObj.noteText }</div>
            <button type="button" id="deleteNote--${noteObj.id}">Delete</button>
        </section>
    `
}




