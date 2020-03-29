import React, { PureComponent } from 'react';
import Graph from './graph';
import Calendar from './calendar'
export default class datalist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: [],
            selectYear: "",
            selectMonth: "",
            selectDay: "",

            oldDate : new Date(),
            nowDate : new Date()
        };
    }
    // 初期処理
    post(url, Dataselect, keyword) {
        fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    key: Dataselect,
                    dataword: keyword
                })
            }
        )
            .then(res => res.json())
            .then(data => this.setState({ day: this.state.day.concat(data) })
            );
    }

    onClickDay() {
        // 一日前
        var date = new Date();
        date.setDate(date.getDate() - 1);
        this.setState({ ...this.state, oldDate: date })
        console.log(date.getDate());
    }

    onClickWeek() {
        // 一週間前
        var date = new Date();
        date.setDate(date.getDate() - 7);
        
        this.setState({ ...this.state, oldDate: date });
        console.log(date.getDate());
    }
    onClickMonth() {
        // 一ヶ月前
        var date = new Date();
        date.setMonth(date.getMonth()-1)
        
        this.setState({ ...this.state, oldDate: date });
        console.log(date.getMonth());
    }
    selectDate() {

    }

    render() {
        return (

            <div className = "test">
                <button onClick={() => { this.onClickDay() }}>
                    １日
                </button><button onClick={() => { this.onClickWeek() }}>
                    １週間
                </button><button onClick={() => { this.onClickMonth() }}>
                    １ヶ月
                </button>

                <div><Graph nowDate={this.state.nowDate} oldDate={this.state.oldDate} /></div>
                
                <div><Calendar /></div>

            </div>
        )
    }

}