import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.swapFavoritesBound = this.swapFavorites.bind(this);
    this.getMoviesBound = this.getMovies.bind(this);
    this.saveMovieBound = this.saveMovie.bind(this);
    this.deleteMovieBound = this.deleteMovie.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies("");
    this.updateFavorites();
  }

  getMovies(genreId) {
    axios.get("/movies/search", {
      params: {
        genreId: genreId
      }
    })
      .then((data) => {
        this.setState({
          movies: data.data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateFavorites() {
    axios.get("/movies/favorites")
      .then((data) => {
        this.setState({
          favorites: data.data
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveMovie(movie) {
    axios.post("/movies/save", {
      id: movie.id,
      poster_path: movie.poster_path,
      original_title: movie.original_title,
      release_date: movie.release_date,
      vote_average: movie.vote_average
    })
      .then((response) => {
        this.updateFavorites();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteMovie(movie) {
    axios.delete("/movies/delete", {
      params: {
        id: movie.id
      }
    })
      .then((response) => {
        this.updateFavorites();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavoritesBound} showFaves={this.state.showFaves} getMovies={this.getMoviesBound}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
          handleAdd={this.saveMovieBound} handleDelete={this.deleteMovieBound}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));