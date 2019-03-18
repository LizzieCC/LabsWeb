const credentials = require('./credentials.js')
const request = require('request')

const cityName = 'Monterrey'

//Test for "change of input"
//const cityName = 'asdfgh'

getCoordinates(cityName, function(error, response){
    if(error){
        console.log(error)
    }else{
        //Get weather data after determining the latitude and longitude.
        //As we don't have input, here we specify units and language desired, hard coded.
        getWeather(response.lat, response.long, 'si','es',function(error, response){
            if(error){
                console.log(error)
            }else{
              console.log('******** Clima *******\n'+response.summary+'. Actualmente esta a '+response.temperature+'ºC. Hay '+ response.probability+'% de posibilidad de lluvia.')
            }
        })
    }
})

//Function to get the geolocation of a city
function getCoordinates(city, callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+city+'.json?access_token='+credentials.MAPBOX_TOKEN
    //Test for "change of input" 
    //const url = 'https://api.mapbox.com/geocoding2222/v5/mapbox.places/'+city+'.json?access_token='+credentials.MAPBOX_TOKEN
    request({url, json: true}, function(error, response){
        if(error){
            callback('Servicio no disponible',undefined)
        }else if (response.body.message == 'Not Found' || response.body.message == 'Not Authorized - Invalid Token'){
            callback(response.body.message, undefined)
        }else if(response.body.features.length == 0){
            callback('Lugar no encontrado',undefined)
        }else {
            const data = response.body
            //The API returns coordinates of the feature’s center in form : [longitude,latitude]
            const coordinates = data.features[0].center
            const coords = {
                lat: coordinates[1],
                long: coordinates[0]
                }
            callback(undefined,coords)
        }
    })
}

//Function to get weather data of a city (given a geolocation)
function getWeather(latitude, longitude, units, lang, callback){
    const url = 'https://api.darksky.net/forecast/'+ credentials.DARK_SKY_SECRET_KEY +'/'+latitude+','+longitude+'/?units='+units+'&lang='+lang
    //Test for "change of input" 
    //const url = 'https://api.darksky.net/forecast/'+ credentials.DARK_SKY_SECRET_KEY +'/'+latitude+','+longitude+'/?units='+units+'&lang='+lang
    request({url, json: true}, function(error, response){
        if(error){
            callback('Servicio no disponible',undefined)
        }else if (response.body.code == 400){
             //test: cambiar orden de las coordenadas (primero long, luego lat)
            callback(response.body.error, undefined)
        }else if (response.body == 'Forbidden\n'){
            callback('API incorrecta',undefined)
        }else if(response.body == 'Not Found\n'){
            //test: cambiar forecast por forecast2
            callback('Not Found',undefined)
        } else {
            const info = response.body
            const data = {
                summary: info.currently.summary,
                temperature:  Math.round(info.currently.temperature),
                probability: info.currently.precipProbability*100
            }
            callback(undefined, data)
        }
    })
}



