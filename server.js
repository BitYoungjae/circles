var express = require("express"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  bodyParser = require("body-parser");
var app = express();
var bodyparser = require("body-parser");
var mysql = require("mysql");
var iconv = require("iconv-lite");
var cookieParser = require("cookie-parser");
const FileStore = require("session-file-store")(session);
const { response } = require("express");
const { turquoise } = require("color-name");
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
  res.sendFile(__dirname + "/login.html");
});
app.post("/login", function (req, res) {
  // console.log(req);
  var id = req.body.id;
  var pw = req.body.pw;
  console.log("id: " + id + "pw:" + pw);
  var spdata = {};
  var query = connection.query(
    'select * from nodeuser where id="' + id + '" && pw="' + pw + '";', //sql insert
    function (err, rows) {
      try {
        if (err) throw err;
        if (rows[0]) {
          spdata.result = "OK";
          spdata.id = encodeURI(rows[0].id);
          spdata.pw = encodeURI(rows[0].pw);
          spdata.nick = encodeURI(rows[0].nick);
          console.log("seccess login for " + spdata.nick);
          console.log("----------------------");
          req.session.save(function () {});
        } else {
          console.log("fail login");
          console.log("--------------------------");
          spdata.result = "NO";
        }
      } catch {}
      res.json(spdata);
    }
  );
});

app.get("/sha", function (req, res) {
  res.sendFile(__dirname + "/sha256.html");
});
app.post("/sha", function (req, res) {
  var str = req.body.str;
  console.log(str);
  var spdata = {};
});
