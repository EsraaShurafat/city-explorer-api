'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./data/weather.json');
const { request, response } = require('express');
const axios = require('axios');
const weather=require('./weather');
const movies=require('./movies');

const server = express();
server.use(cors());

const PORT = process.env.PORT;
// http://localhost:3010/home
server.get('/home', (req, res) => {
    res.send('route from home')
});

// http://localhost:3010/test
server.get('/test', (request, response) => {
    response.send('hi from test route')
});

// Routes 
server.get('/weather', getWeatherData);
server.get('/movies',  getMovieData);


server.listen(PORT, () => {
                console.log(`I'm listening at${PORT}`);
            });


    server.get('*', (req, res) => {
        res.status(404).send('Sorry, page not found');
    });