
const eventHub = document.querySelector(".container")

export const WitnessHTML = (witnessObj) => {
    return `
        <section class="card witnessCard">
            <div id="witness-${witnessObj.id}>
                <p><strong>Name:</strong> ${witnessObj.name}</p>
                <p><strong>Statement:</strong> ${witnessObj.statements}</p>
            </div>
        </section>
    `
}