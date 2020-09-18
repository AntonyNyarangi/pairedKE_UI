import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  FormInput
} from "shards-react";
import api from "../../utils/api";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  componentDidMount() {
    localStorage.clear();
  }
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("here");
    api.auth().login(this.state);
  };
  render() {
    console.log(this.state);
    return (
      <Card
        style={{
          //   width: "500px",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        <CardBody>
          <h4>Paired Kidney Exchange</h4>
          <br />
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <label>Username or Email</label>
              <FormInput
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <label>Password</label>
              <FormInput
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br />
              <Button
                type="submit"
                style={{ width: "100%", fontSize: "16px" }}
                theme="primary"
              >
                Log in
              </Button>
              <a href="#" style={{ fontSize: "13px" }}>
                Forgot password?
              </a>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    );
  }
}

export default Login;
