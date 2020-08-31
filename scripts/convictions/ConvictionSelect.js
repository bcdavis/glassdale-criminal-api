
// This module returns an HTML select element with each type of crime as an option. 

import { useConvictions, getConvictions} from "./ConvictionProvider.js"

const createSelectorOptions = (crimesArray) => {
    const innerElement = document.querySelector(".filters__crime > .selector");
    let HTMLCrimeArray = crimesArray.map(crime => {
        return `
            <option value="${crime.name}">${crime.name}</option>
                
        ` 
        // create HTML for an individual officer for each officer in officersArray, and return it in a new array (HTMLArray)
    })

    innerElement.innerHTML += HTMLCrimeArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement
}


export const CreateCrimeSelector = () => {
    getConvictions()
    .then(() => {
        const convictionsArray = useConvictions();
        // create the selector element
        document.querySelector(".filters__crime").innerHTML = `<select class="selector">Please select a crime... </selector>`;
        // add the dropdown options
        createSelectorOptions(convictionsArray);
    })
}