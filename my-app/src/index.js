import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import date from './time'
import Dselect from './datalist'

ReactDOM.render(<App />, document.getElementById('root'));

// 時刻表時
setInterval(date, 1000);
// データセレクトを作る
ReactDOM.render(<Dselect />, document.getElementById('dataSelectList'));

serviceWorker.unregister();
