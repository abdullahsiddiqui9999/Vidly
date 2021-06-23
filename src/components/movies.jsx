import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { deleteMovie, getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link, Route, Switch } from "react-router-dom";
import MovieForm from "./movieForm";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 5,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    filterText: "",
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ name: "All Movies", _id: "" }, ...getGenres()],
    });
  }

  handleDelete = (movieToBeDeleted) => {
    deleteMovie(movieToBeDeleted._id);
    this.setState({
      movies: getMovies(),
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, filterText: "" });
  };

  handleAdd = (movie) => {
    this.setState({ movies: getMovies() });
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

  handleSearchEntry = ({ currentTarget: input }) => {
    this.setState({
      filterText: input.value,
      selectedGenre: null,
      currentPage: 1,
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
      filterText,
    } = this.state;

    let movies = allMovies;

    if (selectedGenre) {
      movies = movies.filter((movie) => movie.genre._id === selectedGenre._id);
    }
    let filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    if (filterText) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    movies = paginate(sorted, currentPage, pageSize);

    return (
      <Switch>
        <Route
          path={`${this.props.match.url}/new`}
          render={(props) => <MovieForm doSubmit={this.handleAdd} {...props} />}
        />
        <Route
          path={`${this.props.match.url}/:id`}
          render={(props) => <MovieForm doSubmit={this.handleAdd} {...props} />}
        />
        <Route
          path={this.props.match.url}
          render={(props) => (
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
                  <Link to="/movies/new" className="btn btn-primary mb-3">
                    New Movie
                  </Link>

                  {!movies.length && <p>There are no movies in the database</p>}

                  {movies.length > 0 && (
                    <p>Showing {movies.length} movies in the database</p>
                  )}

                  <div className="form-group">
                    <input
                      name="moviesFilter"
                      id="moviesFilter"
                      className="form-control"
                      placeholder="Search..."
                      onChange={this.handleSearchEntry}
                      value={filterText}
                    />
                  </div>

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
          )}
        />
      </Switch>
    );
  }
}

export default Movies;
