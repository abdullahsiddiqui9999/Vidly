import http from "./httpService";

const endPoint = "http://localhost:3900/api/genres";

export function getGenres() {
  return http.get(endPoint);
}
