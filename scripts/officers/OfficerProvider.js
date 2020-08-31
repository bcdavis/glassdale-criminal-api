
let officers = []

export const useOfficers = () => {
    return officers.slice()
}


// JSON = JavaScript Object Notation

export const getOfficers = () => {
    // request the data

    /*  returns an array [] of officer objects with the following properties:
            - name: str
            - id: int
    */


    return fetch("https://criminals.glassdale.us/officers") // promise
        .then(response => response.json()) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
        .then(                                  //
            parsedOfficers => {                 //
                //console.table(parsedOfficers)   // Do something with the data
                officers = parsedOfficers       // store data in officers array
            }
        )
}