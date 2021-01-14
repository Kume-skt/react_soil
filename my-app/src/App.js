import React from "react";
// import date from './Container/Timer'
import MainPage from "./Container/mainPage";
import { css } from "emotion";

const cssstyle = css({
  textAlign: "center",
  width: "90%",
  margin: "auto",
});

export default class App extends React.Component {
  render() {
    return (
      <div className={cssstyle}>
        <MainPage />
      </div>
    );
  }
}
