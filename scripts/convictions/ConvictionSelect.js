
// This module returns an HTML select element with each type of crime as an option. 

import { useConvictions, getConvictions} from "./ConvictionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value, // this is a string
                // crimeId: event.target.id // == "crimeSelect" Not the actual ID of the crime selected
                // // ^ this actually tells me nothing????
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})


// const render = convictionsCollection => {
//     contentTarget.innerHTML = `
//         <select class="dropdown" id="crimeSelect">
//             <option value="0">Please select a crime...</option>
//             ... you wrote awesome code here ...
//         </select>
//     `
// }


// const ConvictionSelect = () => {
//     getConvictions()
//         .then(() => {
//             const convictions = useConvictions()
//             render(convictions)
//         })
// }


const createSelectorOptions = (crimesArray) => {

// Terra's crime name alphabetical sorter -------------- 
    const crimeNames = crimesArray.map((crimeObj) => {
        let crimeName = crimeObj.name;
        return crimeName;
    });

    const sortedArray = crimeNames.sort();

    // This works because, in the end, we are only comparing strings:
    // e.g. criminal.conviction (string) === event.detail.crimeThatWasChosen (crimeObj.name (string))

// -----------------------------------------------------

    contentTarget.innerHTML = `
    <select id="crimeSelect" class="selector-filter">
        <option value="default">Please select a crime...</option>
        ${
            sortedArray.map(crime => `
            <option value="${crime}">${crime}</option>
            `).join("")
        }
        
    </select>`
    //innerElement.innerHTML = `<option value="none">Please select a crime...</option>`
    //innerElement.innerHTML += HTMLCrimeArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement
}


export const CreateCrimeSelector = () => {
    getConvictions()
    .then(() => {
        const convictionsArray = useConvictions();
        // create the selector element and add the dropdown options
        createSelectorOptions(convictionsArray);
    })
}