import React, { PureComponent } from "react";
import Graph from "./graph";
import Calendar from "./calendar";
import * as day from "./setDate";
export default class datalist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: [],
      selectYear: "",
      selectMonth: "",
      selectDay: "",

      oldDate: new Date(),
      nowDate: new Date(),
    };
    this.daylist = ["Year", "Month", "Day"];
    this.dateMap = {
      Year: [],
      Month: [],
      Day: [],
    };
  }
  // 初期処理
  componentWillMount() {
    this.post("http://localhost:4000/post", "%Y", "Year");
    this.post("http://localhost:4000/post", "%m", "Month");
    this.post("http://localhost:4000/post", "%d", "Day");
  }
  post(url, Dataselect, keyword) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        key: Dataselect,
        dataword: keyword,
      }),
    })
      .then((res) => res.json())
      .then((data) => this.setState({ day: this.state.day.concat(data) }));
  }
  onClickDay() {
    this.setState({ ...this.state, oldDate: day.oneDay });
  }
  onClickWeek() {
    this.setState({ ...this.state, oldDate: day.oneWeek });
  }
  onClickMonth() {
    this.setState({ ...this.state, oldDate: day.oneMonth });
  }

  render() {
    // dataリストのkeyで回す

    for (const key in this.daylist) {
      if (this.daylist.hasOwnProperty(key)) {
        // APIの問い合わせ結果で回す
        for (const dataNumber in this.state.day) {
          if (this.state.day.hasOwnProperty(dataNumber)) {
            // キーワードが同一判定
            if (
              Object.keys(this.state.day[dataNumber])[0] == this.daylist[key]
            ) {
              // キーワードが一致したものを指定の位置に再配置
              this.dateMap[this.daylist[key]].push(
                this.state.day[dataNumber][this.daylist[key]]
              );
              // 追加データ元を削除
              delete this.state.day[dataNumber];
            }
          }
        }
      }
    }

    return (
      <div>
        <button
          onClick={() => {
            this.onClickDay();
          }}
        >
          １日
        </button>
        <button
          onClick={() => {
            this.onClickWeek();
          }}
        >
          １週間
        </button>
        <button
          onClick={() => {
            this.onClickMonth();
          }}
        >
          １ヶ月
        </button>

        <select onChange={(e) => this.ChangeYearEvent(e)}>
          <option value="何年選択" selected>
            何年
          </option>
          {this.dateMap.Year.map((d) => (
            <option value={d} onChange={(e) => this.ChangeYearEvent(e)}>
              {d}年
            </option>
          ))}
        </select>
        <select onChange={(e) => this.ChangeMonthEvent(e)}>
          <option value="何年選択" selected>
            何月
          </option>
          {this.dateMap.Month.map((d) => (
            <option value={d}>{d}月</option>
          ))}
        </select>
        <select onChange={(e) => this.ChangeDayEvent(e)}>
          <option value="何年選択" selected>
            何日
          </option>
          {this.dateMap.Day.map((d) => (
            <option value={d}>{d}日</option>
          ))}
        </select>
        <button
          onClick={() => {
            this.ChangeDatehEvent();
          }}
        >
          クリック
        </button>

        <div>
          <Graph nowDate={this.state.nowDate} oldDate={this.state.oldDate} />
        </div>

        <div>
          <Calendar />
        </div>
      </div>
    );
  }
}
