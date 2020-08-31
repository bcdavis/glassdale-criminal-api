

export const CriminalHTML = (crimObj) => {
    return `
    <div class="criminalCard">
        <h2>${crimObj.name}<h2>
        <ul>
            <li>Age: ${crimObj.age}</li>
            <li>Crime: ${crimObj.conviction}</li>
            <li>Term start: ${new Date(crimObj.incarceration.start).toLocaleDateString('en-US')}</li>
            <li>Term end: ${new Date(crimObj.incarceration.end).toLocaleDateString('en-US')}</li>
        </ul>
    </div>
    `
}