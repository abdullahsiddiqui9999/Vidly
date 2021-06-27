import http from "./httpService";
import jwtDecode from "jwt-decode";

http.setJwt(getJwt());

export async function loginUser(email, password) {
  const { data: jwt } = await http.post(`http://localhost:3900/api/auth/`, {
    email,
    password,
  });
  localStorage.setItem("token", jwt);
}

export function logoutUser() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token");
}

export function getJwt() {
  return localStorage.getItem("token");
}
