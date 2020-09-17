import { useCriminals } from "./CriminalProvider.js";


const eventHub = document.querySelector(".container");

        // clicking the "alibis" button should SHOW the list of alibis if it is NOT ALREADY SHOWN
        // clicking the "alibis" button should HIDE the list of alibis if it is ALREADY SHOWN 
        // --> maybe create a state variable to track which state the alibi list is in (shown or hidden (1 or 0))
        // --> use a conditional statement (if/else) to check the state and perform the respective action


eventHub.addEventListener("associatesClicked", event => {
    console.log("We received a click event from the Alibis button!");
    //console.log("hTarget", hTarget);
    // display all associates/alibis for criminal
    const targetCriminal = useCriminals().find(criminal => {
            // find one criminal that has the matching criminalId
        return (criminal.id === parseInt(event.detail.chosenCriminal))
    })

    const alibiTarget = document.querySelector(`.alibiDialog--${targetCriminal.id}`);
    //console.log("alibiTarget", alibiTarget);
    const hTarget = document.querySelector("h4"); // look for an h4 element
    //console.log("hTarget", hTarget);

    if (alibiTarget.contains(hTarget)){
        // if h4 element is already present in alibiTarget, want to clear alibiTarget.innerHTML
        alibiTarget.innerHTML = "";
    }
    else {
            // known_associates is an array of objects, each with a "name" and "alibi" key
        alibiTarget.innerHTML = `${
            targetCriminal.known_associates.map(associate => {
                return `
                <h4>Name: ${associate.name}</h4>
                <div>Alibi: ${associate.alibi}</div>
                `
            }).join("") 
        }`
    }
    
})

export const AlibiDialog = (criminalId) => {
    return `
        <span class="alibiDialogBox alibiDialog--${criminalId}"></span>
    `
}