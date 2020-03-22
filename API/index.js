const express = require("express");
var bodyParser = require('body-parser')
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.get("/", function (req, res) {
  res.send("go to /posts to see posts");
});

app.listen(4000, function () {
  console.log("Example app listening on port 4000!");
});

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "192.168.1.9",
  user: "root",
  password: "password",
  database: "kumeta"
});

app.get("/posts", function (req, res) {
  connection.query("select * from (select * from soil order by Date desc LIMIT 60) as A order by Date", function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});

app.get("/soil_day", function (req, res) {
  connection.query("SELECT DATE_FORMAT(Date, '%h') AS DAY FROM soil  GROUP BY DAY", function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.send(results);
  });
});
String.prototype.format = function () {
  var i = 0, args = arguments;
  return this.replace(/{}/g, function () {
    return typeof args[i] != 'undefined' ? args[i++] : '';
  });
};
app.post("/post", function (req, res) {
  // リクエストボディを出力
  console.log(req.body);

  connection.query("SELECT DATE_FORMAT(Date, '{}') AS {} FROM soil  GROUP BY {}".format(req.body.key, req.body.dataword, req.body.dataword), function (
    error,
    results,
    fields
  ) {
    if (error) throw error;
    console.log(results)
    res.send(results);
  });
});

app.post("/graph", function (req, res) {
  // リクエストボディを出力
  console.log(req.body);

  connection.query("SELECT * FROM soil WHERE DATE BETWEEN '2020-1-1' AND '{}-{}-{}'".format(req.body.Year,req.body.Month,req.body.Day),
    function (
      error,
      results,
      fields
    ) {
      if (error) throw error;
      console.log(results)
      res.send(results);
    });
});