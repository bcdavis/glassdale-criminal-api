
// This module returns an HTML select element with each type of crime as an option. 

import { useConvictions, getConvictions} from "./ConvictionProvider.js"

/*
    Which element in your HTML contains all components?
    That's your Event Hub. Get a reference to it here.
*/
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", event => {

    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value,
                crimeId: event.target.id
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
    contentTarget.innerHTML = `
    <select id="crimeSelect">
        <option value="none">Please select a crime...</option>
        ${
            crimesArray.map(crime => `
            <option value="${crime.name}">${crime.name}</option>
            `).join("")
        }
        
    </selector>`
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