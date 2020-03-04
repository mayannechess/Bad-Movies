import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
    this.handleGenreChangeBound = this.handleGenreChange.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    axios.get("/movies/genres")
      .then((data) => {
        this.setState({
          genres: data.data
        });
      })
      .catch((err) => {
        console.log("Genre request failed");
      });
  }

  handleGenreChange(event) {
    const genreId = event.target.value;
    console.log("genre id in search is", genreId);
    this.props.getMovies(genreId);
  }

  render() {
    const options = this.state.genres.map((genre) => {
      return <option key={genre.id} value={genre.id}>{genre.name}</option>
    });

    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select onChange={this.handleGenreChangeBound}>
          {options}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;