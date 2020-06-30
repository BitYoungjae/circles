var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require("mysql");
var iconv = require("iconv-lite");
const { response } = require("express");
var connection = mysql.createConnection({
  host: "183.111.199.157",
  port: 3306,
  user: "alpacao",
  password: "alpaca16",
  database: "alpacao",
});

connection.connect();

app.listen(3000, function () {
  console.log("서버 실행");
});

app.use(bodyparser.json());

app.get("/login", function (req, res) {
  res.sendfile(__dirname + "/login.html");
});

app.post("/login", function (req, res) {
  // console.log(req);
  var serial = req.body.search;
  console.log("serial: " + serial);
  var spdata = {};
  var query = connection.query(
    'select * from cuser where serial="' + serial + '"',
    function (err, rows) {
      try {
        if (err) throw err;
        if (rows[0]) {
          console.log(query);
          console.log(encodeURI(rows[0].serial));
          console.log(encodeURI(rows[0].name));
          spdata.result = "OK";
          spdata.serial = encodeURI(rows[0].serial);
          spdata.name = encodeURI(rows[0].name);
        } else {
          console.log("No result");
          spdata.result = "NO";
        }
      } catch {}
      res.json(spdata);
    }
  );
});
