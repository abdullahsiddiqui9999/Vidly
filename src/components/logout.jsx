import React, { Component } from "react";
import { logoutUser } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logoutUser();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;
