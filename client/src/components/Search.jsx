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
    this.props.getMovies(genreId);
  }

  render() {
    const options = this.state.genres.map((genre) => {
      return <option key={genre.id} value={genre.id}>{genre.name}</option>
    });

    return (
      <div className="search">

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
      Genre:
        <select onChange={this.handleGenreChangeBound}>
          <option value={""}>All</option>
          {options}
        </select>
        <br /><br />

        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

      </div>
    );
  }
}

export default Search;