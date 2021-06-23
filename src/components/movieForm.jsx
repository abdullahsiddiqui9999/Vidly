import Joi from "joi-browser";
import React, { Component } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, getMovies, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";
class MovieForm extends Form {
  constructor(props) {
    super(props);

    const { match, history } = this.props;

    let movie;
    if (match.params.id) {
      movie = getMovie(match.params.id);

      if (!movie) {
        history.replace("/not-found");

        return;
      }
    }

    this.state = {
      data: {
        _id: movie ? movie._id : "",
        title: movie ? movie.title : "",
        genreId: movie ? movie.genre._id : "",
        dailyRentalRate: movie ? movie.dailyRentalRate : "",
        numberInStock: movie ? movie.numberInStock : "",
      },
      errors: {},
    };
  }

  schema = {
    _id: Joi.allow("").label("ID"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .required()
      .min(0)
      .max(1000)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().greater(0).max(5).label("Rate"),
  };

  doSubmit = () => {
    this.props.doSubmit(saveMovie(this.state.data));

    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>

        {this.renderInput("title", "Title")}

        {this.renderSelect("genreId", "Genre", {
          options: [{ name: "", _id: "" }, ...getGenres()],
        })}

        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}

        {this.renderButton("Save")}
      </div>
    );
  }
}

export default MovieForm;
