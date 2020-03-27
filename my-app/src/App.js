import React from 'react';
import './App.css';
import icon from "./img/icon.png"


export default class App extends React.Component {
  render() {
    return (
      <div id="App">
        
        <div className="App-header">
          <img src={icon} /><h1>Gplants</h1>
          <div id="time" className="time"></div>
        </div>
        <div id="dataSelectList" className ="graph"></div>
      </div>
    );
  }
}
