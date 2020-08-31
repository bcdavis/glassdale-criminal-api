
import {OfficerHTML} from "./Officer.js";
import {getOfficers, useOfficers} from "./OfficerProvider.js";


const addOfficersToDOM = (officersArray) => {
    const contentElement = document.querySelector(".officersContainer");
    let HTMLArray = officersArray.map(singleOfficer => {
        return OfficerHTML(singleOfficer); 
        // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
    })

    contentElement.innerHTML = HTMLArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement

}

export const OfficerList = () => {
    console.log("creating OfficerList");
    getOfficers()
    .then(() => {
        const officers = useOfficers();
        addOfficersToDOM(officers)
    })
    
}