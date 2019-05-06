const request = require('request');
let geocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?limit=2&access_token=pk.eyJ1IjoiYW5tb2w1MDA1IiwiYSI6ImNqdjdtZ2RmaDA3Ynk0M255dW5lenB2NXEifQ.cFO5aydWREN-GHg6PCuvQg`;
    request({url, json:true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather services!');
        } else if(response.body.message) {
            callback('Maybe an authorisation error occured');
        } else if(response.body.features.length === 0) {
            callback('Location Not Found');
        } else {
            callback('', {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode;