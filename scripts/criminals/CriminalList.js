
import { getCriminals, useCriminals } from "./CriminalProvider.js"
import {CriminalHTML} from "./Criminal.js"


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