import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* ****** ここから onClick を追加 ****** */}
          <a onClick={this.handleClick()}>天気を表示</a>
          {/* ****** ここまで追加 ****** */}
          {/* ****** ここに天気をだす ****** */}
          <p>{this.state.tenki}</p>
          {/* ****** ここまで追加 ****** */}
          <form>
            <label>
              Name:
              <input type="text" name="name" />
            </label>
            <button  type="submit" value="Submit" />
          </form>
        </header>
      </div>
    );
  }
  // ***** クリック時呼び出される関数を追加 *****
  handleClick() {
    this.setState({ tenki: "晴れ(仮)" });
  }
  // ***** ここまで追加 *****
  // ***** コンストラクタ追加して初期値の設定 *****
  constructor(props) {
    super(props);
    this.state = { tenki: "まだ天気とってません" };
    this.handleClick = this.handleClick.bind(this);
  }
  // ***** ここまで追加 *****
}

export default App;