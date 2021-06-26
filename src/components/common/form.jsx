import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const errors = {};

    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });

    if (!error) return {};

    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const { error } = Joi.validate(
      { [name]: value },
      { [name]: this.schema[name] }
    );

    if (error) return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });

    if (Object.keys(errors).length) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderButton = (label) => {
    return (
      <button
        className="btn btn-primary"
        disabled={Object.keys(this.validate()).length}
        onClick={this.handleSubmit}>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;

    return (
      <Input
        name={name}
        label={label}
        error={errors[name]}
        type={type}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (name, label, optionsData = {}) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        error={errors[name]}
        optionsData={optionsData}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  };
}

export default Form;
