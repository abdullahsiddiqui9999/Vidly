import React, { Component } from "react";

class Select extends Component {
  optionValue = (option, valueKey = "_id") => {
    if (!valueKey) {
      return option;
    } else {
      return option[valueKey];
    }
  };

  optionLabel = (option, labelKey = "name") => {
    if (!labelKey) {
      return option;
    } else {
      return option[labelKey];
    }
  };

  render() {
    const { name, label, error, optionsData, ...rest } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>

        <select name={name} className="form-control" {...rest}>
          {(optionsData.options || []).map((option) => (
            <option
              key={this.optionValue(option, optionsData.valueKey)}
              value={this.optionValue(option, optionsData.valueKey)}>
              {this.optionLabel(option, optionsData.labelKey)}
            </option>
          ))}
        </select>

        {error && <div className="alert alert-danger mt-1">{error}</div>}
      </div>
    );
  }
}

export default Select;
