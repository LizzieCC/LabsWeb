const path = require('path')
const express = require('express')
const weather = require('./weather.js')
const app = express()

const publicDir = path.join(__dirname,'public')
console.log(publicDir)
app.use(express.static(publicDir))


app.get('/', function(req, res){
    res.send('<h1> Best Weather App Ever </h1>')
})

app.get('/about', function(req, res){
    res.send(' *** Lab 6 by LizzieCC :D *** ')
})

app.get('/weather',function(req,res){
    res.setHeader('Access-Control-Allow-Origin','*');
    if(!req.query.search){
        return res.send({
            error:'Tienes que dar una ubicación (país o ciudad) a buscar'
        })
    }

    weather.getCoordinates(req.query.search, function(error, response){
        if(error){
            return res.send({
                error: error
            })
        }else{
            //Get weather data after determining the latitude and longitude.
            //As we don't have input, here we specify units and language desired, hard coded.
            weather.getWeather(response.lat, response.long, 'si','es',function(error, response){
                if(error){
                    return res.send({
                        error: error
                    })
                }else{
                  res.send({
                      location:req.query.search,
                      weather: response.summary+'. Actualmente esta a '+response.temperature+'ºC. Hay '+ response.probability+'% de posibilidad de lluvia.'
                  })
                }
            })
        }
    })
})

app.get('*', function(req,res){
    res.send({
        error: 'Esta ruta no existeeee'
    })
})

app.listen(3000, function(){
    console.log('Up and running')
})
