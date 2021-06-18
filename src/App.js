import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import Movies from "./components/movies";
import { React } from "react";
import Navbar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";

function App() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <Switch>
          <Route
            path="/movies/:id"
            render={(props) => <MovieForm {...props} />}
          />
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

export default App;
