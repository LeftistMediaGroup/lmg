import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";
import Calendar from "react-calendar";

import Day from "./Day.jsx";

export default class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateSelected: new Date(),
    };
  }

  onDateChange = (data) => {
    console.log(`Date Data: ${data}`);
    this.setState({ dateSelected: data });
  };

  render() {
    return (
      <Card>
        <CardContent>
          <h1>Journal</h1>

          <Calendar
            onChange={this.onDateChange}
            value={this.state.dateSelected}
          />

          <br />

          <Day day={this.state.dateSelected} username={this.props.username} />
        </CardContent>
      </Card>
    );
  }
}
