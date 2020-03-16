const express = require("express");
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

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