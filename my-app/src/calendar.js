import React, { PureComponent } from 'react';
import Calendar from 'react-calendar';

export default class MyApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            //月のデータ
            month_days: {
            },
            test: "僕は、消えません"
        };
        this.getTileClass = this.getTileClass.bind(this);
        this.getTileContent = this.getTileContent.bind(this);
    }

    // state の日付と同じ表記に変換
    getFormatDate(date) {
        return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
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
        savem[date] = { text: 'test' }
        console.log(this.state.month_days);
        this.getTileClass = this.getTileClass.bind(this);
        this.getTileContent = this.getTileContent.bind(this);
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
        // なんかセットしなくても変わった要相談
        this.setState({
            ...this.state, month_days: this.state.month_days
        })
        // ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
    }
    render() {
        return (
            <Calendar
                locale="ja-JP"
                value={this.state.date}
                calendarType="Hebrew"
                tileClassName={this.getTileClass}
                tileContent={this.getTileContent}
                onClickDay={(e) => this.onclic(e)}
            />
        );
    }
}