const request = require('request');
const forecast = (latitude, longitude, callback) => {

const url = 'https://api.darksky.net/forecast/9336d2dc7313c85517dad6b2acedd0d6/' +latitude+ ',' +longitude;
// console.log(url);
// let currentTemp = response.body.currently.temperature;
// let celcius = (currentTemp - 32) * (5 / 9);
    setTimeout(() => {
        request({url, json:true}, (error, response) => {
            
            if(error) {
                callback('Something went wrong while connecting to weather api!');
            } else if(response.body.error) {
                callback('Unable to find the location');
            } else {
                let currentTemp = response.body.currently.temperature || 0;
                let celcius = Math.floor((currentTemp - 32) * (5 / 9));
                callback('',`${response.body.daily.data[0].summary} It is currently ${celcius} F out. There is a ${response.body.currently.precipProbability}% chance of rain.`);
            }

        })
    }, 2000);
}
module.exports = forecast;