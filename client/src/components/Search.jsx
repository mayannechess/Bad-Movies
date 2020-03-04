import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: []
    };
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

  render() {
    const options = this.state.genres.map((genre) => {
      return <option key={genre.id} value={genre.name}>{genre.name}</option>
    });

    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select>
          {options}
        </select>
        <br/><br/>

        <button>Search</button>

      </div>
    );
  }
}

export default Search;