import React, { Component } from "react";
import { Button, Card, CardContent } from "@mui/material";
import { io } from "socket.io-client";


let socket = io(`ws://${import.meta.env.VITE_HOST}`)


export default class System extends Component {
  constructor(props) {
    super(props);
  }

  watch_Socket = () => {
    socket.on("connect", () => {
      console.log(`CONNECTED`)
      this.props.is_database_found(true);
    })

    socket.on("admin_pass", (admin_pass) => {
      this.props.set_admin_pass(admin_pass)
      console.log(`Pass: ${admin_pass}`)
    });

    socket.on("database_init", (value) => {
      console.log(`DatabaseInit: ${value}`)
      if (value == "True") {
        this.props.set_admin_created(true);
        this.props.set_component("Dashboard_Login_Signup")
      } else {
        this.props.set_admin_created(false);
      }
    })

  }

  database_init = () => {
    socket.emit("database_init")
  }

  render() {
    return (
      <div className="row-centered" style={{ maxWidth: 500 }} >
        <Card>
          <CardContent>
            {this.watch_Socket()}

            <h4>Wade</h4>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                console.log("Clicked!");
                this.database_init();
              }}
              role="button"
              tabIndex={0}
            >
              Connect
            </Button>
          </CardContent>
        </Card>
      </div >
    );
  }
}
