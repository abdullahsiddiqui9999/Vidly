import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string()
      .required()
      .email({ minDomainSegments: 2 })
      .label("Username"),
    password: Joi.string().required().label("Password"),
    name: Joi.string().required().min(5).label("Name"),
  };

  doSubmit = () => {
    console.log("Register form submitted");
  };

  render() {
    return (
      <div className="container">
        <h1>Register</h1>

        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}

        {this.renderButton("Register")}
      </div>
    );
  }
}

export default RegisterForm;
