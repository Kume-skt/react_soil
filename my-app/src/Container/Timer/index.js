import React from "react";
import "./App.css";

function Date_time() {
  var d = new Date();

  var year = d.getFullYear();
  var mo = d.getMonth() + 1;
  var day = d.getDate();
  var hour = d.getHours();
  var minutes = d.getMinutes();
  var socond = d.getSeconds();

  return (
    year +
    "年" +
    mo +
    "月" +
    day +
    "日" +
    hour +
    "時" +
    minutes +
    "分" +
    socond +
    "秒"
  );
}
function time_render() {
  return (
    <div>
      <h2>{Date_time()}</h2>
    </div>
  );
}

export default time_render;
