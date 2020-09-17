

import {useOfficers, getOfficers} from "./OfficerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerChosen", {
            detail: {
                officerChosen: selectedOfficer,
                // officerId: changeEvent.target.id // returns 'officerSelect'
                // // ^ This actually tells me nothing????
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})




const createSelectorOptions = (officersArray) => {

// Terra's crime name alphabetical sorter -------------- 
    const crimeNames = officersArray.map((crimeObj) => {
        let crimeName = crimeObj.name;
        return crimeName;
    });

    const sortedArray = crimeNames.sort();

    // This works because, in the end, we are only comparing strings:
    // e.g. criminal.conviction (string) === event.detail.crimeThatWasChosen (event.target.value (crimeObj.name (string)))

// -----------------------------------------------------


    contentTarget.innerHTML = `
    <select id="officerSelect" class="selector-filter">
        <option value="default">Please select an officer...</option>
        ${
            /*officersArray.map(officer => { `
            <option value="${officer.name}">${officer.name}</option>
            `).join("")})*/
            sortedArray.map(officer => `
            <option value="${officer}">${officer}</option>
            `).join("")
        }
        
    </select>`
    //innerElement.innerHTML = `<option value="none">Please select a crime...</option>`
    //innerElement.innerHTML += HTMLCrimeArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement
}


export const CreateOfficerSelector = () => {
    getOfficers()
    .then(() => {
        const officersArray = useOfficers();
        // create the selector element and add the dropdown options
        createSelectorOptions(officersArray);
    })
}