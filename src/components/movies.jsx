import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  state = { movies: getMovies(), page: 1 };

  handleDelete = (movieToBeDeleted) => {
    this.setState({
      movies: this.state.movies.filter(
        (movie) => movie._id !== movieToBeDeleted._id
      ),
    });
  };

  handleLike = (movie) => {
    let moviesClone = [...this.state.movies];
    let index = moviesClone.indexOf(movie);

    moviesClone[index] = { ...moviesClone[index] };
    moviesClone[index].liked = !moviesClone[index].liked;

    this.setState({ movies: moviesClone });
  };

  handlePageChange = (page) => {
    this.setState({ movies: this.state.movies, page });
  };

  handleSorting = (e) => {
    if (!e.target.getAttribute("data-attr")) return;

    let sortDirection = this.state.sortDirection;
    let sortOnColumn = this.state.sortOnColumn;
    if (this.state.sortOnColumn === e.target.getAttribute("data-attr")) {
      if (this.state.sortDirection === 1) {
        sortDirection = 2;
      } else if (this.state.sortDirection === 2) {
        sortDirection = null;
        sortOnColumn = null;
      }
    } else {
      sortOnColumn = e.target.getAttribute("data-attr");
      sortDirection = 1;
    }
    this.setState({
      movies: this.state.movies,
      page: this.state.page,
      sortOnColumn,
      sortDirection,
    });
  };

  render() {
    const pageLength = 5;
    const startingIndex = (this.state.page - 1) * pageLength;
    const endingIndex = startingIndex + pageLength;
    let movies = this.state.movies;
    if (this.state.sortOnColumn) {
      movies.sort((first, second) => {
        return this.state.sortDirection === 1
          ? second[this.state.sortOnColumn] - first[this.state.sortOnColumn]
          : first[this.state.sortOnColumn] - second[this.state.sortOnColumn];
      });
    }
    movies = movies.slice(startingIndex, endingIndex);

    return (
      <React.Fragment>
        {!movies.length && <p>There are no movies in the database</p>}

        {movies.length > 0 && (
          <p>Showing {movies.length} movies in the database</p>
        )}

        {movies.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th
                  onClick={(e) => this.handleSorting(e)}
                  data-attr="title"
                  style={{ cursor: "pointer" }}>
                  Title
                  {this.state.sortOnColumn === "title" &&
                    this.state.sortDirection === 1 && (
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    )}
                  {this.state.sortOnColumn === "title" &&
                    this.state.sortDirection === 2 && (
                      <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    )}
                </th>
                <th
                  onClick={(e) => this.handleSorting(e)}
                  data-attr="genre.name"
                  style={{ cursor: "pointer" }}>
                  Genre
                  {this.state.sortOnColumn === "genre.name" &&
                    this.state.sortDirection === 1 && (
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    )}
                  {this.state.sortOnColumn === "genre.name" &&
                    this.state.sortDirection === 2 && (
                      <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    )}
                </th>
                <th
                  onClick={(e) => this.handleSorting(e)}
                  data-attr="numberInStock"
                  style={{ cursor: "pointer" }}>
                  Stock
                  {this.state.sortOnColumn === "numberInStock" &&
                    this.state.sortDirection === 1 && (
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    )}
                  {this.state.sortOnColumn === "numberInStock" &&
                    this.state.sortDirection === 2 && (
                      <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    )}
                </th>
                <th
                  onClick={(e) => this.handleSorting(e)}
                  data-attr="dailyRentalRate"
                  style={{ cursor: "pointer" }}>
                  Rate
                  {this.state.sortOnColumn === "dailyRentalRate" &&
                    this.state.sortDirection === 1 && (
                      <i className="fa fa-arrow-down" aria-hidden="true"></i>
                    )}
                  {this.state.sortOnColumn === "dailyRentalRate" &&
                    this.state.sortDirection === 2 && (
                      <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    )}
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      onClick={() => this.handleLike(movie)}
                      liked={movie.liked}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(movie)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Pagination
          pages={Math.ceil(this.state.movies.length / pageLength)}
          page={this.state.page}
          handlePageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
