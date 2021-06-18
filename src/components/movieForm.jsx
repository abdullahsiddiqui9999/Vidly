import React, { Component } from "react";

class MovieForm extends Component {
  handleSave = () => {
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;

    return (
      <div>
        <h1>Movie Form {match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
