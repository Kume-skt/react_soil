import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import date from './time'
import Example from './graph'

ReactDOM.render(<App />, document.getElementById('root'));

// 時刻表時
setInterval(date, 1000);

// グラフ表示
ReactDOM.render(<Example />, document.getElementById('gura'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
