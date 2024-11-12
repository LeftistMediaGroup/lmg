import React, { Component } from "react";

import { Card, CardContent } from "@mui/material";

export default class MoodChart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  componentDidMount() {
    this.props.getMoodChart();
  }
  render() {
    return (
      <>
        <Card>
          <CardContent>
            {" "}
            <div>
              
            </div>
          </CardContent>
        </Card>
      </>
    );
  }
}
