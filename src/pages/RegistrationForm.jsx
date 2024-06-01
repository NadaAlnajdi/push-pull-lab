import React from "react";
import $ from "jquery";

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      registrationMessage: "",
      registrationSuccess: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:5000/users",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: (response) => {
        this.setState({
          registrationMessage: `Registration successful: ${JSON.stringify(
            response
          )}`,
          registrationSuccess: true,
        });
      },
      error: (xhr, status, error) => {
        this.setState({
          registrationMessage: `Registration failed: ${error}`,
          registrationSuccess: false,
        });
      },
    });
  };

  render() {
    return (
      <div className="container">
        <h2>User Registration</h2>
        <form onSubmit={this.handleSubmit} className="row g-3">
          <div className="col">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col ">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="col-12 text-center ">
            <button type="submit" className="btn btn-dark p-2 w-25">
              Register
            </button>
          </div>
        </form>
        {this.state.registrationSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            {this.state.registrationMessage}
          </div>
        )}
        {!this.state.registrationSuccess && this.state.registrationMessage && (
          <div className="alert alert-danger mt-3" role="alert">
            {this.state.registrationMessage}
          </div>
        )}
      </div>
    );
  }
}

export default RegistrationForm;
