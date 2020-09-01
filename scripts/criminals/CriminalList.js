
import { getCriminals, useCriminals } from "./CriminalProvider.js"
import {CriminalHTML} from "./Criminal.js"



const eventHub = document.querySelector(".container");


// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeId" in event.detail) {
        console.log("event.detail.crimeThatWasChosen", event.detail.crimeThatWasChosen);
        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const criminalsToFilter = useCriminals()
        const matchingCriminals = criminalsToFilter.filter(currentCriminal => {
            return currentCriminal.conviction === event.detail.crimeThatWasChosen
        })

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */
        addCriminalsToDOM(matchingCriminals);

    }
})

const addCriminalsToDOM = (criminalsArray) => {
    const contentElement = document.querySelector(".criminalsContainer");
    let HTMLArray = criminalsArray.map(criminal => {
        return CriminalHTML(criminal); 
        // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
    })

    contentElement.innerHTML = HTMLArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement

}

export const CriminalList = () => {
    console.log("creating CriminalList");
    getCriminals()
    .then(() => {
        const criminals = useCriminals();
        addCriminalsToDOM(criminals)
    })
    
}