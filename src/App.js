import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";
import React, { Component } from "react";
import Movies from "./components/movies";
import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    this.setState({ user: getCurrentUser() });
  }

  render() {
    return (
      <div>
        <ToastContainer />
        <Navbar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />

            <Redirect from="/" exact to="/movies" />

            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
