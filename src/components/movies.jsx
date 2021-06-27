import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { deleteMovie, getMovies } from "../services/movieService";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _, { times } from "lodash";
import { Link, Route, Switch } from "react-router-dom";
import MovieForm from "./movieForm";
import { toast } from "react-toastify";
import ProtectedRoute from "./common/protectedRoute";

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 5,
    genres: [],
    sortColumn: { path: "title", order: "asc" },
    filterText: "",
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    const { data: movies } = await getMovies();
    this.setState({
      movies,
      genres: [{ name: "All Movies", _id: "" }, ...genres],
    });
  }

  handleDelete = async (movieToBeDeleted) => {
    const { movies } = this.state;

    this.setState({
      movies: movies.filter((m) => m._id !== movieToBeDeleted._id),
    });

    try {
      await deleteMovie(movieToBeDeleted._id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("Movie doesnt exixt");
      }

      this.setState({
        movies,
      });
    }
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, filterText: "" });
  };

  handleAdd = async (movie) => {
    let existingMovie;

    if ((existingMovie = this.state.movies.find((m) => m._id === movie._id))) {
      const updatedMovies = [...this.state.movies];
      updatedMovies[updatedMovies.indexOf(existingMovie)] = movie;
      this.setState({ movies: updatedMovies });
    } else {
      const updatedMovies = [...this.state.movies, movie];
      this.setState({ movies: updatedMovies });
    }
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
        <ProtectedRoute
          path={`${this.props.match.url}/new`}
          render={(props) => (
            <MovieForm {...props} handleAdd={this.handleAdd} />
          )}
        />
        <ProtectedRoute
          path={`${this.props.match.url}/:id`}
          render={(props) => (
            <MovieForm {...props} handleAdd={this.handleAdd} />
          )}
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
