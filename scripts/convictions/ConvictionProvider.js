

let crimes = [];

export const useConvictions = () => crimes.slice()

export const getConvictions = () => {

    // request data in this form: 

   /*
   - array of conviction objects
    [
        - conviction object
        {
            "name": str,
            "id": int
        },
        {
            "name": str,
            "id": int
        },
        etc...
    ]
   */

  return fetch("https://criminals.glassdale.us/crimes")  
  .then(response => response.json()) // convert JSON response to JavaScript data structure (.then WAITS FOR FETCH TO FINISH grabbing the data)
  .then(                                  //
      parsedCrimes => {                //
          console.table(parsedCrimes)  // Do something with the data
          crimes = parsedCrimes     // store response data in criminals array
      }
  )

}