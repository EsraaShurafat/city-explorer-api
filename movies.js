'use strict';

//*********** movies ***********
//https://api.themoviedb.org/3/search/movie?query=name&api_key=d8267ae22650e0d58d2c15651f5229ce
// http://localhost:3010/movies?name='' 
function getMovieData(req, res) {
    let query = req.query.name;
    let url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${process.env.MOVIES_API_KEY}`;

    axios
        .get(url)
        .then(result => {
            // console.log(result.data.results);
            let newDay = result.data.results.map((item) => {
                return new Region(item);

            });

            res.send(newDay)

        })

        .catch(err => {
            console.log(err);
        });

    function Region(day) {
        (this.title = day.original_title),
            (this.overview = day.overview),
            (this.average_votes = day.vote_average),
            (this.total_votes = day.vote_count),
            // this.image_url=movie./csE4ldFMH415Irm22kJCXd04wNL.jpg,
            (this.popularity = day.popularity),
            (this.released_on = day.release_date)
    };

};

module.exports = getMovieData;