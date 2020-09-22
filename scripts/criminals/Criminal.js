
//import { AlibiDialog } from "./AlibiDialog.js";

const eventHub = document.querySelector(".container");

eventHub.addEventListener("click", event => {
    if(event.target.id.startsWith("associates--")){ // specify an alibi button click
        const [prefix, criminalId] = event.target.id.split("--") // destructuring (an array)
        // creates a two-element array: ["associates", "criminalId"], split by the "--"

        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalId
            }
        })
        eventHub.dispatchEvent(alibiEvent); 
        
    } 
})


export const CriminalHTML = (crimObj, facilities) => { // use plural facilities here bc some criminals were held in multiple facilities
    return `
    <section class="card criminalCard">
        <h2>${crimObj.name}</h2>
        <div class="crim-card-info">
            <p><b>Age:</b> ${crimObj.age}</p>
            <p><b>Crime:</b> ${crimObj.conviction}</p>
            <p><b>Arrested by:</b> ${crimObj.arrestingOfficer}</p>
            <p><b>Incarcerated between:</b>
                ${new Date(crimObj.incarceration.start).toLocaleDateString('en-US')} and
                ${new Date(crimObj.incarceration.end).toLocaleDateString('en-US')}
            </p>
        </div>
        <div class="crim-card-facilities">
            <h3>Facilities</h3>
            <ul>
                ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
            </ul>
        </div>
        <div class="alibi-btn-holder">
            <button id="associates--${crimObj.id}">Show Alibis</button>
            <span class="hidden alibiDialogBox alibiDialog--${crimObj.id}">
            ${
                crimObj.known_associates.map(associate => {
                    return `
                    <h4>Name: ${associate.name}</h4>
                    <div>Alibi: ${associate.alibi}</div>
                    `
                }).join("") 
            }
            </span>
        </div>
    </section>
    `
}