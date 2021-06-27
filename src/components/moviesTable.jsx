import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie) => (
        <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    if (!(getCurrentUser() && getCurrentUser().isAdmin)) {
      this.columns = this.columns.filter((c) => c.key !== "delete");
    }

    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        movies={movies}
      />
    );
  }
}

export default MoviesTable;
