import Joi from "joi-browser";
import React, { Component } from "react";
import { getGenres } from "../services/genreService";
import { getMovie } from "../services/movieService";
import Form from "./common/form";
import { toast } from "react-toastify";
import { saveMovie } from "../services/movieService";

class MovieForm extends Form {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        _id: "",
        title: "",
        genreId: "",
        dailyRentalRate: "",
        numberInStock: "",
      },
      errors: {},
    };
  }

  async componentDidMount() {
    const { match, history } = this.props;

    let movie;
    if (match.params.id) {
      try {
        const response = await getMovie(match.params.id);
        movie = response.data;
      } catch (ex) {
        if (ex.response && ex.response.status === 404) {
          return history.replace("/not-found");
        }
      }
    }

    this.genres = (await getGenres()).data;
    this.genres = [{ name: "", _id: "" }, ...this.genres];

    this.setState({
      data: {
        _id: movie ? movie._id : "",
        title: movie ? movie.title : "",
        genreId: movie ? movie.genre._id : "",
        dailyRentalRate: movie ? movie.dailyRentalRate : "",
        numberInStock: movie ? movie.numberInStock : "",
      },
      errors: {},
    });
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

  doSubmit = async () => {
    try {
      const response = await saveMovie(this.state.data);
      this.props.handleAdd(response.data);
      this.props.history.push("/movies");
    } catch (ex) {
      throw ex;
    }
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>

        {this.renderInput("title", "Title")}

        {this.renderSelect("genreId", "Genre", {
          options: this.genres,
        })}

        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}

        {this.renderButton("Save")}
      </div>
    );
  }
}

export default MovieForm;
