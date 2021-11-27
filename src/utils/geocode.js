
const request = require("postman-request")



const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURI(address) + ".json?access_token=pk.eyJ1Ijoic2FudGlhZ285NTAyIiwiYSI6ImNrdWtyeWcxaDBscDYycG1iNDAydXppOWQifQ.bQtFheSUyB-F-sqhrlOa-w&limit=1"

    //console.log(url)

    request({ url, json: true }, (error, {body} = {}) => {

        // console.log(response.body)

        if (error) {
            callback('unable to conect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location, try another search', undefined)
        }
        else
        {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode