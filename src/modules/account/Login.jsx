import React, { Component } from "react";
import { Form } from "react-bootstrap";

import { Button, Card, CardContent } from "@mui/material";

import { socket } from "../system/System";


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      login_fail: false,
    };
  }

  submit = () => {
    console.log(`Submit`);
  };

  usernameChange(event) {
    let username = event.target.value;
    if (username !== this.state.username) {
      this.setState({
        username: username,
      });
    }
  }

  passwordChange(event) {
    let password = event.target.value;

    if (password !== this.state.password) {
      this.setState({
        password: password,
      });
    }
  }


  log_in = () => {
    console.log(`Data out`);

    let data_out = {
      username: this.state.username,
      password: this.state.password
    }

    socket.emit("log_in", data_out);

    socket.on("log_in", (data) => {
      if (data) {
        console.log("LOGGED IN")
      } else {
        this.setState({ login_fail: true })
      }
    })
  }

  login_fail = () => {
    if (this.state.login_fail == true) {
      return (
        <>
          <Card variant="outlined">
            <CardContent>
              <h4>Login Failed</h4>
              <p>Please try again</p>
            </CardContent>
          </Card>
          <br />
        </>
      )
    }
  }

  render() {
    return (
      <div className="row-centered" style={{ maxWidth: 500, margin: "auto" }}>

        <Card variant="outlined">
          <CardContent>

            <form className="row-centered">
              <p> Log in existing user</p>

              {this.login_fail()}

              <Form.Group>
                <Form.Control
                  id="Inputusername"
                  placeholder="Username"
                  onChange={this.usernameChange.bind(this)}
                />
              </Form.Group>
              <br />

              <Form.Group>
                <Form.Control
                  type="password"
                  id="InputPassword"
                  placeholder="Password"
                  onChange={this.passwordChange.bind(this)}
                />
              </Form.Group>
              <br />

              <div className="row-centered">
                <Button
                  color="primary"
                  variant="outlined"
                  onClick={() => {
                    console.log("Clicked!");
                    this.log_in();
                  }}
                  type="button"
                >
                  Submit
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }
}