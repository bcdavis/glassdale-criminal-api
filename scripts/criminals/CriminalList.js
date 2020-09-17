
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

eventHub.addEventListener("associatesClicked", event => {
    // console.log("We received a click event from the Alibis button!");
    // display all associates/alibis for criminal
    const targetCriminal = useCriminals().find(criminal => {
            // find one criminal that has the matching criminalId
        return (criminal.id === parseInt(event.detail.chosenCriminal))
    })
    //console.log("TargetCriminal", targetCriminal);
    const alibiBtnTarget = document.getElementById(`associates--${targetCriminal.id}`);
    const alibiTarget = document.querySelector(`.alibiDialog--${targetCriminal.id}`);


    // console.log("alibiBtnTarget", alibiBtnTarget.innerHTML);
    if (alibiTarget.classList.contains("hidden")){ 
        // if associate and alibi list is not visible, toggle visible
        alibiTarget.classList.remove("hidden");
        // change name of alibi btn to "Hide Alibis"
        alibiBtnTarget.textContent = "Hide Alibis";
    }
    else { 
        // if associate and alibi list is visible, toggle invisible
        alibiTarget.classList.add("hidden");
        // change name of alibi btn to "Show Alibis"
        alibiBtnTarget.textContent = "Show Alibis";
    }
    
})

// creating variables to store value for using multiple filters at once
let crimeSelected = "default"; // default = invalid crime selected
let officerSelected = "default"; // default = invalid officer selected

/**
 * 
 * The refactored code below works perfectly for the two current filters on the Glassdale Criminal API site.
 * However, I feel that it is very "hard-coded" to operate with specifically an officer and crime filter.
 * That means that if another filter were added, the updateFilterState function would need to be altered.
 * I'd like the filtering process to be very generic and autonomous, where it works for any number of 
 * properly formatted filters. 
 * 
 * TO-DO: Revisit this refactored code and attempt to make it generic 
 */

// Filter state consists of two bits - crimeSelected, officerSelected 
// crimeSelected and officerSelected are represented by a single binary bit (1 or 0): 
// ---- if either variable is it's "default" value (no valid crime or officer selected), it is represented as a "0"
// ---- if either variable is not "default" (a valid crime or officer selected), it is represented as a "1"

// state 1: "00" --> crimeSelected invalid, officerSelected invalid
// The unfiltered CriminalList is rendered on the DOM

// state 2: "01" --> crimeSelected invalid, officerSelected valid
// Criminal list is filtered by selected officer only

// state 3: "10" --> crimeSelected valid, officerSelected invalid
// CriminalList is filtered by selected crime only

// state 4: "11" --> both crimeSelected and officerSelected are valid
// CriminalList is filtered by both the selected crime and selected officer


eventHub.addEventListener("crimeChosen", event => {
    crimeSelected = event.detail.crimeThatWasChosen; // update the state of the crimeSelected variable
    updateFilterState(crimeSelected, officerSelected);

})

eventHub.addEventListener("officerChosen", event => {
    officerSelected = event.detail.officerChosen; // update the state of the officerSelected variable
    updateFilterState(crimeSelected, officerSelected);
})

const updateFilterState = (crime, officer) => { // crime = crimeSelected, officer = officerSelected
    // setup binary state representation
    let crimeState, officerState, matchingCriminals; 
    const criminalsToFilter = useCriminals();

    if(crime === "default"){
        crimeState = "0";
    }
    else {
        crimeState = "1";
    }

    if(officer === "default"){
        officerState = "0";
    }
    else { 
        officerState = "1"
    }

    const totalFilterState = crimeState + officerState; // creates a 2-character string "00", "01", etc.
    console.log("totalFilterState: ", totalFilterState);
    // Logic to determine what to render
    switch(totalFilterState) {
        case "00":
            console.log("no valid crime or officer selected -- show unfiltered criminalList")
            CriminalList();
            break;
        case "01":
            console.log("invalid crime selected, valid officer selected -- filter by officer ", officer)
            matchingCriminals = criminalsToFilter.filter(currentCriminal => {
                return currentCriminal.arrestingOfficer === officer;
            })
            addCriminalsToDOM(matchingCriminals);
            break;
        case "10":
            console.log("valid crime selected, invalid officer selected -- filter by crime ", crime)
            matchingCriminals = criminalsToFilter.filter(currentCriminal => {
                return currentCriminal.conviction === crime;
            })
            addCriminalsToDOM(matchingCriminals);
            break;
        case "11": 
            console.log("valid crime selected, valid officer selected -- filter by both ", crime, officer)
            matchingCriminals = criminalsToFilter.filter(currentCriminal => {
                return (currentCriminal.arrestingOfficer === officer && currentCriminal.conviction === crime);
            })
            addCriminalsToDOM(matchingCriminals);
            break;
        
        default:
            console.log("State not recognized -- displaying all criminals");
            CriminalList();
        
    }
}

/**
 * 
 * Below is the previous code which worked for each individual filter and for both filters at the same time.
 * However, when both filers were active and the user removed one of them, the event listener would recognize 
 * a change in the filter back to its default value and call to render the unfiltered list of criminals --
 * -- even though one of the filters was still active. 
 * 
 */


/*
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
*/

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