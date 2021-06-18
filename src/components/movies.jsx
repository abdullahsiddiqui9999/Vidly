import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 5,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All Movies", _id: "" }, ...getGenres()],
    });
  }

  handleDelete = (movieToBeDeleted) => {
    this.setState({
      movies: this.state.movies.filter(
        (movie) => movie._id !== movieToBeDeleted._id
      ),
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleLike = (movie) => {
    let moviesClone = [...this.state.movies];
    let index = moviesClone.indexOf(movie);

    moviesClone[index] = { ...moviesClone[index] };
    moviesClone[index].liked = !moviesClone[index].liked;

    this.setState({ movies: moviesClone });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    let movies = allMovies;

    if (selectedGenre) {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
    }
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    movies = paginate(sorted, currentPage, pageSize);

    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {!movies.length && <p>There are no movies in the database</p>}

            {movies.length > 0 && (
              <p>Showing {movies.length} movies in the database</p>
            )}

            {movies.length > 0 && (
              <MoviesTable
                movies={movies}
                onDelete={this.handleDelete}
                onLike={this.handleLike}
                onSort={this.handleSort}
                sortColumn={this.state.sortColumn}
              />
            )}

            <Pagination
              itemsCount={filtered.length}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
