const movieModel = require('../models/movieModel.js');
const {fetchGenres, fetchMoviesByGenre} = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    console.log("INSIDE MOVIE CONTROLLER GET SEARCH>>>>>");
    // use this endpoint to search for movies by genres, you will need an API key
    fetchMoviesByGenre(req.params.genre_id, (err, response) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(200);
        const movies = response.data.results;
        res.json(movies);
      }
    });
  },
  getGenres: (req, res) => {
    // make an axios request to get the list of official genres
    fetchGenres((err, response) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.status(200);
        const genres = response.data.genres;
        res.json(genres);
      }
    });
  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}