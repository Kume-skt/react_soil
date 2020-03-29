import React, { PureComponent } from 'react';
import Calendar from 'react-calendar';
import calen from "./calendar.css"
import datalist from './datalist';

export default class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            //月のデータ
            month_days: {}
        };
        this.saveMaonth = { day: {} }
        this.calendarURL = 'http://localhost:4000/calendar'
        this.getTileClass = this.getTileClass.bind(this);
        this.getTileContent = this.getTileContent.bind(this);
    }
    componentWillMount() {
        // this.GetMonth_days()
        console.log("syori");
        this.GetMonth_days()
        this.setState({...this.state,month_days:this.saveMaonth.day})
        // this.getTileClass = this.getTileClass.bind(this);
        // this.getTileContent = this.getTileContent.bind(this);
        // this.setState({ date: new Date(), month_days: this.state.month_days})
       
    }

    // state の日付と同じ表記に変換
    getFormatDate(date) {
        return `${date.getFullYear() + "-"}${('0' + (date.getMonth() + 1)).slice(-2) + "-"}${('0' + date.getDate()).slice(-2)}`;
        // return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    }

    //日付のクラスを付与 (祝日用)
    getTileClass({ date, view }) {
        // 月表示のときのみ
        if (view !== 'month') {
            return '';
        }

        const day = this.getFormatDate(date);
        return (this.state.month_days[day] && this.state.month_days[day].is_holiday) ?
            'holiday' : '';
    }

    //日付の内容を出力
    getTileContent({ date, view }) {
        // 月表示のときのみ
        if (view !== 'month') {
            return null;
        }
        const day = this.getFormatDate(date);


        return (
            <p>
                <br />
                {(this.state.month_days[day] && this.state.month_days[day].text) ?
                    this.state.month_days[day].text : ' '
                }
            </p>
        );
    }
    onclic(e) {
        var date = this.getFormatDate(e);
        var savem = this.state.month_days
        // 要素が入っていた場合削除する
        if (this.state.month_days[date]) {
            delete savem[date];
            this.post(date, 0);
        }
        else {
            savem[date] = {
                text: 'test'
            }
            this.post(date, 1);
        }
        this.getTileClass = this.getTileClass.bind(this);
        this.getTileContent = this.getTileContent.bind(this);
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        // なんかセットしなくても変わった要相談
        this.setState({
            date: new Date(), month_days: this.state.month_days
        })
        // console.log(this.state.month_days);
        
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    }
    /////////////////////////////////////////////////////
    // API処理
    post(date, io) {
        fetch(this.calendarURL,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    date: date,
                    frg: io
                })
            }
        )
            .then(res => res.json())
    }
    GetMonth_days() {
        var dataAdd = this.saveMaonth.day;
        // fetch('http://localhost:4000/calendarData')
        //     .then(res => res.json())
        //     .then(function a(params) {
        //         console.log(params);
        //         for (const key in params) {
        //             if (params.hasOwnProperty(key)) {
        //                 dataAdd[params[key]['Date'].slice(0, 10)] = { text: "adf" }
        //             console.log(dataAdd);
                    
        //             }
        //         }
        //     }
        // )
        for (let index = 1; index < 10; index++) {
            dataAdd["2020-03-0"+index]={text:"seikou"}
        }
        console.log(this.saveMaonth);
        
    }
    /////////////////////////////////////////////////////
    render() {
        return (
            <Calendar
                locale="ja-JP"
                value={this.state.date}
                calendarType="US"
                classname={calen}
                tileClassName={this.getTileClass}
                tileContent={this.getTileContent}
                onClickDay={(e) => this.onclic(e)}
            />
        );
    }
}