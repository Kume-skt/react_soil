import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class graph extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
        console.log(this.props);


    }

    getGraphData(now, old) {
        fetch("http://192.168.0.3:4000/graph",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nowYear: now.getFullYear(),
                    //月は0～11で帰ってくる
                    nowMonth: now.getMonth() + 1,
                    /*下記の+1は、現時点での日付が帰ってくる
                    しかし、今日のも併せてみたいので翌日の日付を送る*/
                    nowDay: now.getDate() + 1,

                    oldYear: old.getFullYear(),
                    oldMonth: old.getMonth() + 1,
                    oldDay: old.getDate()
                })
            })
            .then(response => response.json())
            .then(posts => this.setState({ posts }));
    }
    //親からの情報取得
    componentWillReceiveProps(nextpro) {
        this.getGraphData(nextpro.nowDate, nextpro.oldDate)
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
            <div className="graph">

                <LineChart
                    width={700}
                    height={300}
                    data={this.state.posts}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 20,
                        bottom: 15
                    }

                    }
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="DATE"
                    />
                    <YAxis
                        orientation="left"
                        yAxisId="leftYAxis"
                        domain={['dataMin', 'dataMax']}
                        ticks={[0, 10, 25, 50, 75, 100]} // Y軸に表示する温度
                        unit="%" // Y軸の単位
                    />
                    <YAxis
                        orientation="right"
                        yAxisId="rightYAxis"
                        domain={['dataMin', 'dataMax']}
                        ticks={[0, 10, 20, 30, 40, 50]} // Y軸に表示する温度
                        unit="°C" // Y軸の単位
                    />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="soil_value" stroke="#82ca9d" />
                </LineChart>
            </div>
        );
    };
}
