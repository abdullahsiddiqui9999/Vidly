import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
import { loginWithJwt } from "../services/authService";
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

  doSubmit = async () => {
    try {
      const response = await register(this.state.data);

      loginWithJwt(response.headers["x-auth-token"]);

      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
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
