import React, { PureComponent } from 'react';

export default class datalist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: [],
            name: []
        };
        this.daylist = ["Year", "Month", "Day"];
        this.dateMap = {
            Year: [],
            Month: [],
            Day: []
        }
        this.post("http://localhost:4000/post", "%Y", "Year");
        this.post("http://localhost:4000/post", "%m", "Month");
        this.post("http://localhost:4000/post", "%d", "Day");
    }

    post(url, Dataselect, keyword) {
        var key = Object.keys(this.state)
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
    onClick() {
        console.log("adaf");
    }
    render() {
        // dataリストのkeyで回す
        for (const key in this.daylist) {
            if (this.daylist.hasOwnProperty(key)) {

                // APIの問い合わせ結果で回す
                for (const dataNumber in this.state.day) {
                    if (this.state.day.hasOwnProperty(dataNumber)) {

                        // キーワードが同一判定
                        if (Object.keys(this.state.day[dataNumber])[0] ==
                            this.daylist[key]) {

                            // キーワードが一致したものを指定の位置に再配置
                            this.dateMap[this.daylist[key]].push(this.state.day[dataNumber][this.daylist[key]]);
                            // 追加データ元を削除
                            delete this.state.day[dataNumber]
                        }

                    }
                }

            }
        }

        return (
            <div>
                <select>
                    {this.dateMap.Year.map(d => <option value={d}>{d}年</option>)}
                </select>
                <select>
                    {this.dateMap.Month.map(d => <option value={d}>{d}月</option>)}
                </select>
                <select>
                    {this.dateMap.Day.map(d => <option value={d}>{d}日</option>)}
                </select>
                <button onClick={() => { this.onClick() }}>
                    クリック
                </button>
            </div>
        )
    }

}