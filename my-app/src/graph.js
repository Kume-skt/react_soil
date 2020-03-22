import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class graph extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            Year: "",
            Month: "",
            Day: ""
        };
        console.log(this.props);


    }

    getGraphData(Year, Month, Day) {
        fetch("http://localhost:4000/graph",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Year: Year,
                    Month: Month,
                    Day: Day
                })
            })
            .then(response => response.json())
            .then(posts => this.setState({ posts }));
    }
    componentWillReceiveProps(nextpro) {
        this.SetSelectYear(nextpro.Gy);
        this.SetSelectMonth(nextpro.Gm);
        this.SetSelectDay(nextpro.Gd);
        console.log(nextpro);
        
        this.getGraphData(
            nextpro.Gy,
            nextpro.Gm,
            nextpro.Gd)
    }
    SetSelectYear(item) {
        this.setState({ ...this.state, Year: item })
    }
    SetSelectMonth(item) {
        this.setState({ ...this.state, Month: item })
    }
    SetSelectDay(item) {
        this.setState({ ...this.state, Day: item })
    }
    render() {
        return (
            <div>

                <LineChart
                    width={700}
                    height={300}
                    data={this.state.posts}
                    margin={{

                        top: 5, right: 30, left: 20, bottom: 5,
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
    };
}
