

export const CriminalHTML = (crimObj) => {
    return `
    <div class="criminalCard">
        <h2>${crimObj.name}</h2>
        <div class="crim-card-info">
            <p><b>Age:</b> ${crimObj.age}</p>
            <p><b>Crime:</b> ${crimObj.conviction}</p>
            <p><b>Term start:</b> ${new Date(crimObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p><b>Term end:</b> ${new Date(crimObj.incarceration.end).toLocaleDateString('en-US')}</p>
        </div>
    </div>
    `
}