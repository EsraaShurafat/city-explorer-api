'use strict'
require('dotenv').config();
const express=require('express');
const cors=require('cors');
const weatherData=require('./data/weather.json');
const { request, response } = require('express');

const server=express();
server.use(cors());

const PORT=process.env.PORT;
// http://localhost:3010/home
server.get('/home',(req,res)=>{
    res.send('route from home')
})

// http://localhost:3010/test
server.get('/test',(request,response)=>{
    response.send('hi from test route')
})
// http://localhost:3010/wetherInfo
server.get('/wetherInfo',(req,res)=>{
let newArr=weatherData.map(item =>{
    return item;
})
res.send(newArr)

})

// http://localhost:3010/city?city_name=Amman
server.get('/city',(req,res)=>{
    const city_name = req.query.city_name;
    const result = weatherData.find( (item) =>{
        if(item.city_name === city_name)
        return item;
    })
// console.log(req.query);
    res.send(result);
})

// http://localhost:3010/city?lat=48.8588897

server.get('/lat',(req,res)=>{
    const lat = req.query.lat;
    const result1 = weatherData.find( (item) =>{
        if(item.lat === lat)
        return item;
    })
// console.log(req.query);
    res.send(result1);
})


// http://localhost:3010/city?lon=-122.3300624

server.get('/lon',(req,res)=>{
    const lon= req.query.lon;
    const result2 = weatherData.find( (item) =>{
        if(item.lon === lon)
        return item;
    })
// console.log(req.query);
    res.send(result2);
})

server.get('*',(req,res)=>{
    res.status(404).send('Sorry, page not found');
})

server.listen(PORT,()=>{
    console.log(`I'm listening at${PORT}`);
})
