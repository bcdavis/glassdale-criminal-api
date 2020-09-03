
import { getCriminals, useCriminals } from "./CriminalProvider.js"
import {CriminalHTML} from "./Criminal.js"






/* --------------------------
---------- TO-DO ------------
- Implement a third event listener
- that listens for events created 
- inside the crimeChosen and officerChosen
- event listeners. The third listener
- will read the page state (2 bits (crime and officer))
- and filter and render the criminal list
- on the DOM.
- 
----------------------------- */


const eventHub = document.querySelector(".container");

// creating variables to store value for using multiple filters at once
let crimeThatWasSelected = "default";
let officerThatWasSelected = "default";


// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", event => {
    // crimeThatWasSelected = event.detail.crimeThatWasChosen;
    //if ("crimeId" in event.detail) { // <----------- this is not really necessary

    const criminalsToFilter = useCriminals()
    let matchingCriminals;


    if (event.detail.crimeThatWasChosen !== "default"){
        crimeThatWasSelected = event.detail.crimeThatWasChosen;
        //const criminalsToFilter = useCriminals()
        console.log("event.detail.crimeThatWasChosen", event.detail.crimeThatWasChosen);
        console.log("officerThatWasSelected", officerThatWasSelected);
        matchingCriminals = criminalsToFilter.filter(currentCriminal => {
            if(officerThatWasSelected !== "default"){ 
                // State 1: Valid crime selected and valid officer selected
                //console.log("officerSelected NOT default");
                // make sure to only display WITH officer select if officer selected not "default"
                return (currentCriminal.conviction === event.detail.crimeThatWasChosen && currentCriminal.arrestingOfficer === officerThatWasSelected);
            }
            else{
                console.log("officerSelected IS default");
                return currentCriminal.conviction === event.detail.crimeThatWasChosen 
                // if selected officer is "default", only display selected convictions
            }
        // you don't need event.detail.crimeThatWasChosen to be an object.name
        // you are just comparing strings. 
        })
        addCriminalsToDOM(matchingCriminals);
    }
    else {
        crimeThatWasSelected = "default";
        console.log("event.detail.crimeThatWasChosen: ", event.detail.crimeThatWasChosen);
        console.log("officerThatWasSelected", officerThatWasSelected);
        // still want to render any criminals selected by arresting officer 
        CriminalList();
    }

    //}
})

// Listen for the custom event you dispatched in OfficerSelect
eventHub.addEventListener("officerSelected", event => {
    //if ("officerId" in event.detail) { // <----------- this is not really necessary
    //console.log("event.detail.officerChosen", event.detail.officerChosen);
    //console.log("event.detail.crimeId", event.detail.officerId);
    const criminalsToFilter = useCriminals()
    let matchingCriminals; 

    if (event.detail.officerChosen !== "default"){
        officerThatWasSelected = event.detail.officerChosen;
        //const criminalsToFilter = useCriminals()
        console.log("event.detail.officerChosen", event.detail.officerChosen);
        console.log("crimeThatWasSelected", crimeThatWasSelected);
        matchingCriminals = criminalsToFilter.filter(currentCriminal => {
            if(crimeThatWasSelected !== "default"){ 
                // State 1: Valid officer chosen, valid crime chosen
                return (currentCriminal.arrestingOfficer === event.detail.officerChosen && currentCriminal.conviciton === crimeThatWasSelected);
            }
            else{
                // State 2: Valid officer chosen, invalid crime chosen
                return currentCriminal.arrestingOfficer === event.detail.officerChosen
                // if selected officer is "default", only display selected convictions
            }
        })
        addCriminalsToDOM(matchingCriminals);
    }
    else {
        officerThatWasSelected = "default";
        console.log("event.detail.officerChosen", event.detail.officerChosen);
        console.log("crimeThatWasSelected", crimeThatWasSelected);
        matchingCriminals = criminalsToFilter.filter(currentCriminal => {
            if(officerSelected !== "default"){ 
                // State 3: Invalid officer chosen, valid crime chosen
                // show the crimes only (the other event listener's job)
                return (currentCriminal.conviction === event.detail.crimeThatWasChosen && currentCriminal.arrestingOfficer === officerThatWasSelected);
            }
            else{
                // State 4: invalid officer chosen, invalid crime chosen
                // show all criminals 
                return currentCriminal.conviction === event.detail.crimeThatWasChosen
                // if selected officer is "default", only display selected convictions
            }
        })
        addCriminalsToDOM(matchingCriminals);
    }

    //}
})

/*
const applyCrimeFilter = (criminalsToFilter, officerSelected, currentEvent) => {
    const filteredCriminals = criminalsToFilter.filter(currentCriminal => {
        if(officerSelected !== "default"){ 
            //console.log("officerSelected NOT default");
            // make sure to only display WITH officer select if officer selected not "default"
            return (currentCriminal.conviction === currentEvent.detail.crimeThatWasChosen && currentCriminal.arrestingOfficer === officerSelected);
        }
        else{
            //console.log("officerSelected IS default");
            return currentCriminal.conviction === currentEvent.detail.crimeThatWasChosen
            // if selected officer is "default", only display selected convictions
        }
    })
    return filteredCriminals
}

const applyOfficerFilter = (criminalsToFilter, crimeSelected, currentEvent) => {
    const filteredCriminals = criminalsToFilter.filter(currentCriminal => {
        if(crimeSelected !== "default"){ 
            //console.log("crimeSelected NOT default");
            // make sure to only display WITH officer select if officer selected not "default"
            return (currentCriminal.arrestingOfficer === currentEvent.detail.officerChosen && currentCriminal.conviciton === crimeSelected);
        }
        else{
            //console.log("crimeSelected IS default");
            return currentCriminal.arrestingOfficer === currentEvent.detail.officerChosen
            // if selected officer is "default", only display selected convictions
        }
    })
    return filteredCriminals
}
*/


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