'use strict';


//**************** weather *********************
//https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=5b8f444232ce467b8b2318c49f348f2d
// http://localhost:3010/weather?name=Raleigh 


function getWeatherData(req, res) {
    let city = req.query.name;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${process.env.WEATHER_API_KEY}`;

    axios
        .get(url)
        .then(result => {
            // console.log(result.data);
            let newDay = result.data.data.map((item) => {
                return new Forecast(item);

            });
            res.send(newDay)
        })
        .catch(err => {
            console.log(err);
        });

};

function Forecast(day) {
    this.discription = `Low of ${day.low_temp} , high of ${day.high_temp} with ${day.weather.description}`
    this.date = day.datetime
};

module.exports = getWeatherData;