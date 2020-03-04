const movieModel = require('../models/movieModel.js');
const {fetchGenres, fetchMoviesByGenre} = require('../helpers/apiHelpers.js');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // use this endpoint to search for movies by genres, you will need an API key
    fetchMoviesByGenre(req.query.genreId, (err, response) => {
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
    fetchGenres()
      .then((data) => {
        const genres = data.data.genres;
        res.status(200);
        res.json(genres);
      })
    // fetchGenres((err, response) => {
    //   if (err) {
    //     console.error(err);
    //     res.sendStatus(500);
    //   } else {
    //     res.status(200);
    //     const genres = response.data.genres;
    //     res.json(genres);
    //   }
    // });
  },
  saveMovie: (req, res) => {

  },
  deleteMovie: (req, res) => {

  }
}