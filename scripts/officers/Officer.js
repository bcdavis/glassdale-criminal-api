
export const OfficerHTML = (officerObj) => {
    return `
        <div id="officer-${officerObj.id} class="officerCard">
            <h2>${officerObj.name}</h2>
        </div>
    `
}