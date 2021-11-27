
const request = require("postman-request")

const forecast = (latitude, longitud, callback) => {
    //const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(latitude + "," + longitud) + ".json?access_token=pk.eyJ1Ijoic2FudGlhZ285NTAyIiwiYSI6ImNrdWtyeWcxaDBscDYycG1iNDAydXppOWQifQ.bQtFheSUyB-F-sqhrlOa-w&limit=1"
    const url = "http://api.weatherstack.com/current?access_key=06d1936ce845307ee9e03fb8663da7a5&query=" + longitud + "," + latitude + "&units=m"
    //console.log(url)
    request({ url, json: true }, (error, { body } = {}) => {


        if (error) {
            callback('unable to conect to location services', undefined)
        }
        else if (body.current === undefined) {
            callback('Unable to find location, try another search', undefined)
        }
        else {
            callback(undefined, 
                body.current.weather_descriptions[0] + " It is currently " + body.current.temperature + " degress out, It feels like " + body.current.feelslike + " degress out."
                )
        }

    })

}



module.exports = { forecast }