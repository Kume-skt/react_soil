import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class graph extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    constructor(props) {
        super(props);
        this.state = { posts: [] };

        fetch("http://localhost:4000/posts")
            .then(response => response.json())
            .then(posts => this.setState({ posts }));
    }


    render() {
        return (
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
            
        );
    };
}
