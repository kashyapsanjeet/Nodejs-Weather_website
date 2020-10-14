const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8c1bdd91e4717618f0389114ae632dfe&query=' + latitude + ',' + longitude +'&units=f'
    request({url, json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find any place at given co-ordinates',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] + " : It's " +  body.current.temperature + " degree fahrenheit, however it feels like " + body.current.feelslike )
        }
    })
}


module.exports = forecast