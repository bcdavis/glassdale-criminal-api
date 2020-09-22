

// Take notes made and prepare to display on website

const eventHub = document.querySelector(".container")

export const NoteHTMLConverter = (noteObj) => {
    return `
        <section class="note">
            <div class="note-content-left">
                <div class="note--timeStamp">Timestamp: ${new Date(noteObj.date).toLocaleDateString('en-US')}</div>
                <div class="note--title">Criminal: ${ noteObj.suspectObj.name }</div>
                <div class="note--content">${ noteObj.noteText }</div>
            </div>
            <div class="note-actions-right">
                <button type="button" class="deleteNoteBtn" id="deleteNote--${noteObj.id}"><i class="fa fa-trash"></i></button>
            </div>
        </section>
    `
}




