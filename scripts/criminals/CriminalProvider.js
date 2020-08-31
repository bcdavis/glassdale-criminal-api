

let criminals = []

export const useCriminals = () => criminals.slice()

export const getCriminals = () => {
    // request the data


    /* returns an array [] of criminal objects, each consisting of the following properties:
        - id: int
        - age: int
        - eyeColor: str
        - name: str
        - workHistory: [str, str, ...]
        - phone: str ("xxx-xxx-xxxx")
        - address: str
        - incarceration: obj { start: date-time str, end: date-time str }
        - conviction: str
        - arrestingOfficer: str
        - known_associates: [ obj { name: str, alibi: str}, ...]

    */ 


    return fetch("https://criminals.glassdale.us/criminals")  
        .then(response => response.json()) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
        .then(                                  //
            parsedCriminals => {                //
                //console.table(parsedCriminals)  // Do something with the data
                criminals = parsedCriminals     // store response data in criminals array
            }
        )
}