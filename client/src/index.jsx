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
      favorites: [{deway: "favorites"}],
      showFaves: false,
    };
    this.swapFavoritesBound = this.swapFavorites.bind(this);
    this.getMoviesBound = this.getMovies.bind(this);
    // you might have to do something important here!
  }

  componentDidMount() {
    this.getMovies("");
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

  getFavorites() {
    // ?
  }

  saveMovie() {
    // same as above but do something diff
  }

  deleteMovie() {
    // same as above but do something diff
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
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));