'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const weatherData = require('./data/weather.json');
const { request, response } = require('express');
const axios = require('axios');

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


// functions handlers

//**************** weather *********************
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=5b8f444232ce467b8b2318c49f348f2d
// http://localhost:3010/weather?name=Raleigh
function getWeatherData(req, res) {
    let city = req.query.name;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;

    axios
        .get(url)
        .then(result =>{
                // console.log(result.data);
                let newDay=result.data.data.map((item)=>{
                    return new Forecast(item);
            
                });
                res.send(newDay)
            })
            .catch(err =>{
                console.log(err);
            });
        
    };

function Forecast (day) {
                this.discription = `Low of ${day.low_temp} , high of ${day.high_temp} with ${day.weather.description}`
                this.date = day.datetime
        };





//*********** movies ***********



//https://api.themoviedb.org/3/search/movie?query=name&api_key=d8267ae22650e0d58d2c15651f5229ce
// http://localhost:3010/movies?name=''
let memoryMovie={};
 function getMovieData (req, res){
let query=req.query.name;
if (memoryMovie[query]!==undefined) {
    
    res.send(memoryMovie[query]);
    
}
else{
let url=`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.MOVIES_API_KEY}`;

axios
.get(url)
.then(result => {
    // console.log(result.data.results);
    let newDay=result.data.results.map((item)=>{
        return new  Region(item);
       

    });
    memoryMovie[query]=newDay;
    res.send(newDay)

})

.catch(err =>{
    console.log(err); 
});
}
// console.log(memoryMovie)
function Region (day) {
    (this.title=day.original_title),
    (this.overview=day.overview),
    (this.average_votes=day.vote_average),
    (this.total_votes=day.vote_count),
    // this.image_url=movie./csE4ldFMH415Irm22kJCXd04wNL.jpg,
    (this.popularity=day.popularity),
    (this.released_on=day.release_date)};

    };
   
  



server.listen(PORT, () => {
                console.log(`I'm listening at${PORT}`);
            });


    server.get('*', (req, res) => {
        res.status(404).send('Sorry, page not found');
    });