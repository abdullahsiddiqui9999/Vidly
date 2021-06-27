import http from "./httpService";
import { toast } from "react-toastify";

const endPoint = "http://localhost:3900/api/users";

export function getUsers() {
  return http.get(endPoint);
}

export function getUser(id) {
  return http.get(`${endPoint}/${id}`);
}

export async function register(user) {
  return http.post(endPoint, {
    email: user.username,
    name: user.name,
    password: user.password,
  });
}

export function deleteUser(id) {
  return http.delete(`${endPoint}/${id}`);
}
