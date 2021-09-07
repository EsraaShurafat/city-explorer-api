'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const { request, response } = require('express');

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



let weatherArr = [];
// http://localhost:3010/weather?lat=47.6038321&lon=-122.3300624
server.get('/weather', (req, res) => {
    const lat=req.query.lat;
    const lon=req.query.lon;
    let result = weatherData.find((item) => {
        if (item.lat === lat && item.lon === lon)
         {
            weatherArr = item.data.map((day) => {
                const dayObj = new Forecast(day);
                return dayObj;
            })

        }
    })
        console.log(weatherArr);
        res.send(weatherArr);
    });

 
   


function Forecast (day) {
    this.discription = `Low of ${day.low_temp} , high of ${day.high_temp} with ${day.weather.description}`
    this.date = day.valid_date;
}



server.get('*', (req, res) => {
    res.status(404).send('Sorry, page not found');
})

server.listen(PORT, () => {
    console.log(`I'm listening at${PORT}`);
})
