const credentials = require('./credentials.js')
const request = require('request')

const cityName = 'Monterrey'
getCoordinates(cityName);

//Function to get weather data of a city (given a geolocation)
function getWeather(latitude, longitude, units, lang){
    const url = 'https://api.darksky.net/forecast/'+ credentials.DARK_SKY_SECRET_KEY +'/'+latitude+','+longitude+'/?units='+units+'&lang='+lang
    request({url, json: true}, function(error, response){
        const info = response.body
        const temperature = Math.round(info.currently.temperature)
        const probability = info.currently.precipProbability*100
        console.log('******** Clima *******\n'+
            info.currently.summary+'. Actualmente esta a '+temperature+'ºC. Hay '+probability+'% de posibilidad de lluvia.')
    })
}

//Function to get the geolocation of a city
function getCoordinates(city){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='+credentials.MAPBOX_TOKEN
    request({url, json: true}, function(error, response){
        const data = response.body
        //The API returns coordinates of the feature’s center in form : [longitude,latitude]
        const coordinates = data.features[0].center
        const long = coordinates[0]
        const lat = coordinates[1]
        //Get weather data after determining the latitude and longitude.
        //As we don't have input, here we specify units and language desired hard coded.
        getWeather(lat,long,'si','es');
    })
}



