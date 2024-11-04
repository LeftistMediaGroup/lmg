import React, { Component } from "react";
import { Button, Card, CardContent } from "@mui/material";
import { io } from "socket.io-client";


export const socket = io(`ws://${import.meta.env.VITE_HOST}`)


export default class System extends Component {
  constructor(props) {
    super(props);
  }

  watch_Socket = () => {
    socket.on("connect", () => {
      console.log(`CONNECTED`)
    })

    socket.on("admin_pass", (admin_pass) => {
      this.props.set_admin_pass(admin_pass)
      console.log(`Pass: ${admin_pass}`)
    });

    socket.on("wade_init", (value) => {

      if (value) {
        console.log(value)
        this.props.is_database_found(true)

      } else {
        console.log(value)
        this.props.is_database_found(false)
      }
    })

  }

  wade_init = () => {
    socket.emit("wade_init")
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
                this.wade_init();
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
