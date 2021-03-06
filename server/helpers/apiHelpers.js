const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file


const fetchGenres = (callback) => {
  return axios({
    method: "get",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    params: {
      api_key: API_KEY
    }
  });
};

const fetchMoviesByGenre = (genreId, callback) => {
  // sorted by rating ascending with at least 100 votes
  return axios({
    method: "get",
    url: "https://api.themoviedb.org/3/discover/movie",
    params: {
      api_key: API_KEY,
      with_genres: genreId,
      "vote_count.gte": 70,
      sort_by: "vote_average.asc",
      total_results: 20
    }
  });
    // .then((data) => {
    //   callback(null, data);
    // })
    // .catch((err) => {
    //   callback(err);
    // });
};

module.exports.fetchGenres = fetchGenres;
module.exports.fetchMoviesByGenre = fetchMoviesByGenre;