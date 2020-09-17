import {WitnessHTML} from "./Witness.js";
import {getWitnesses, useWitnesses} from "./WitnessProvider.js";

//const eventHub = document.querySelector(".container");

const addWitnessesToDOM = (witnessesArray) => {
    const contentElement = document.querySelector(".criminalsContainer"); // want to replace criminals on page with witnesses
    let HTMLArray = witnessesArray.map(singleWitness => {
        return WitnessHTML(singleWitness); 
        // create HTML for an individual witness for each witness in witnessesArray, and return it in a new array (HTMLArray)
    })

    contentElement.innerHTML = HTMLArray.join(" "); // this line REPLACES whatever is currently in the inner HTML of contentElement

}

export const WitnessList = () => {
    console.log("creating WitnessList");
    getWitnesses()
    .then(() => {
        const witnesses = useWitnesses();
        addWitnessesToDOM(witnesses)
    })
    
}