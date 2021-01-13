import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default class graph extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  getGraphData(now, old) {
    fetch("http://localhost:4000/graph", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nowYear: now.getFullYear(),
        nowMonth: now.getMonth() + 1,
        nowDay: now.getDate() + 1,

        oldYear: old.getFullYear(),
        oldMonth: old.getMonth() + 1,
        oldDay: old.getDate(),
      }),
    })
      .then((response) => response.json())
      .then((posts) => this.setState({ posts }));
  }
  componentWillReceiveProps(nextpro) {
    this.getGraphData(nextpro.nowDate, nextpro.oldDate);
  }
  render() {
    return (
      <div>
        <LineChart
          width={700}
          height={300}
          data={this.state.posts}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="soil_value" stroke="#82ca9d" />
        </LineChart>
      </div>
    );
  }
}
