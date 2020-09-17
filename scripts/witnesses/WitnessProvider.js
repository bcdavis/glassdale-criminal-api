let witnesses = []

export const useWitnesses = () => {
    return witnesses.slice()
}

export const getWitnesses = () => {
    // request the data

    /*  returns an array [] of witness objects with the following properties:
            - id: int
            - name: str
            - statements: str
    */


    return fetch("https://criminals.glassdale.us/witnesses") // promise
        .then(response => response.json()) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
        .then(                                  //
            parsedResponse => {                 //
                //console.table(parsedwitnesses)   // Do something with the data
                witnesses = parsedResponse       // store data in witnesses array
            }
        )
}