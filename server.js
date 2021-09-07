'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./data/weather.json');
const { request, response } = require('express');
const axios=require('axios');

const server = express();
server.use(cors());

const PORT = process.env.PORT;
// http://localhost:3010/home
server.get('/home',(req,res)=>{
    res.send('route from home')
})

// http://localhost:3010/test
server.get('/test', (request, response) => {
    response.send('hi from test route')
})



// let weatherArr = [];
//http://localhost:3010/weather?&lat=38.123&lon=-78.543&key=5b8f444232ce467b8b2318c49f348f2d
server.get('/weather', (req, res) => {
    const lat=req.query.lat;
    const lon=req.query.lon;
    let url=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`

axios.get(url).then(result => {
    console.log(result);
})

    });


function Forecast (day) {
    this.discription = `Low of ${day.low_temp} , high of ${day.high_temp} with ${day.weather.description}`
    this.date = day.datetime;
}




server.listen(PORT, () => {
    console.log(`I'm listening at${PORT}`);
})


server.get('*', (req, res) => {
    res.status(404).send('Sorry, page not found');
})