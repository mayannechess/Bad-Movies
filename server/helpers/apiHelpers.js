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
  axios({
    method: "get",
    url: "https://api.themoviedb.org/3/genre/movie/list",
    params: {
      api_key: API_KEY
    }
  })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
}

module.exports.fetchGenres = fetchGenres;