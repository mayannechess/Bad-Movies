const movieModel = require('../models/movieModel.js');
const {fetchGenres, fetchMoviesByGenre} = require('../helpers/apiHelpers.js');
const db = require('../../db/sql');
const Promise = require('bluebird');

const queryAsync = Promise.promisify(db.query.bind(db));

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // use this endpoint to search for movies by genres, you will need an API key
    fetchMoviesByGenre(req.query.genreId)
      .then((data) => {
        res.status(200);
        const movies = data.data.results;
        res.json(movies);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
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
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getFavorites: (req, res) => {
    queryAsync("SELECT * FROM favorites")
      .then((rows) => {
        console.log("rows are", rows);
        res.status(200);
        res.json(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  saveMovie: (req, res) => {
    console.log("in controller, req is", req);
    queryAsync("INSERT INTO favorites (id, poster_path, original_title, release_date, vote_average) VALUES (?, ?, ?, ?, ?)", [req.body.id, req.body.poster_path, req.body.original_title, req.body.release_date, req.body.vote_average])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      })
  },
  deleteMovie: (req, res) => {
    queryAsync("DELETE FROM favorites WHERE id = ?", [req.query.id])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
}