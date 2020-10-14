const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
const request =require('request')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectorypath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setting handlebar engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve
app.use(express.static(publicDirectorypath))

app.get('' , (req,res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Sanjeet Kashyap'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        name: "Sanjeet Kashyap",
        title: 'About me'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        text: "For Help Contact Sanjeet Kashyap",
        title: 'Help',
        name: "Sanjeet Kashyap"
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error , {latitude,longitude,location} = {}) => {

        if(error)
        {
        return res.send({
            error
        })
        }
          forecast(latitude,longitude , (error, forecastdata) => {
            if(error)
            {
              return res.send({
                  error
              })
            }
            return res.send({
                location,
                forecastdata: forecastdata
            })
          })
      })
    
})


app.get('/help/*' , (req,res)=> {
    res.render('404',{
        text : "Help Article Not found"
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        text : "Page not found"
    })
})


app.listen(port, () => {
    console.log('Serve is up on port '+ port)
})