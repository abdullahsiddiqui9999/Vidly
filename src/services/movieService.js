import * as genresAPI from "./genreService";
import http from "./httpService";
import { toast } from "react-toastify";

const endPoint = "http://localhost:3900/api/movies";

export function getMovies() {
  return http.get(endPoint);
}

export function getMovie(id) {
  return http.get(`${endPoint}/${id}`);
}

export async function saveMovie(movie) {
  let currentMovie;

  if (movie._id) {
    try {
      let response = await http.get(`${endPoint}/${movie._id}`);
      currentMovie = response.data;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("Movie doesn't exist in the database");
      }

      throw ex;
    }
  } else {
    currentMovie = {};
  }

  currentMovie.title = movie.title;

  // genreId check
  if (
    (await genresAPI.getGenres()).data.map((g) => g._id).includes(movie.genreId)
  ) {
    currentMovie.genreId = movie.genreId;

    if (currentMovie["genre"]) delete currentMovie["genre"];
  } else {
    throw new Error("Bad genreId");
  }

  currentMovie.numberInStock = movie.numberInStock;
  currentMovie.dailyRentalRate = movie.dailyRentalRate;

  if (currentMovie._id) {
    const movieId = currentMovie["_id"];
    delete currentMovie["_id"];

    return http.put(`${endPoint}/${movieId}`, currentMovie);
  } else {
    return http.post(endPoint, currentMovie);
  }
}

export function deleteMovie(id) {
  return http.delete(`${endPoint}/${id}`);
}
