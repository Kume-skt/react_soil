import React, { PureComponent } from 'react';

export default class datalist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { day: [], name: [] };
        this.daylist = [];

        // fetch("http://localhost:4000/soil_day")
        //     .then(response => response.json())
        //     .then(day => this.setState({ day }));
    }
    post(url, Dataselect, keyword) {
        return fetch(url,
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
            .then(function (response) {  // レスポンス結果 
                return response;
            }, function (error) {  // エラー内容 
                console.log("error: " + error);
                return error;
            });
    }
    render() {
        // 日付問い合わせ
        var date_key = ["%Y", "%m", "%d"];
        var date_keyword = ["Year", "Month", "Day"];
        var data=[]
        for (let index = 0; index < date_key.length; index++) {
            data.push(this.post("http://localhost:4000/post", date_key[index], date_keyword[index]));
            data[index].then(function (response) {  // レスポンス結果 
                console.log(response);
            });
        }
        return (
            
            // <select>
            //     {this.state.day.map(d => <option value={d.DAY}>{d.DAY}日</option>)}
            // </select>

            <p></p>
        )
    }

}