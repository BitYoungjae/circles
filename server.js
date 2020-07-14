var express = require("express"),
  morgan = require("morgan"),
  cookieParser = require("cookie-parser"),
  session = require("express-session"),
  bodyParser = require("body-parser");
var app = express();
var bodyparser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
var mysql = require("mysql");
const cors = require("cors");
var iconv = require("iconv-lite");
var cookieParser = require("cookie-parser");
const FileStore = require("session-file-store")(session);
const { response } = require("express");
const { turquoise } = require("color-name");
const { urlencoded } = require("body-parser");

var mysqlstore = require("express-mysql-session")(session);
var option = {
  host: "183.111.199.157",
  port: 3306,
  user: "alpacao",
  password: "alpaca16",
  database: "alpacao",
};

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
app.use(cors());
app.set({ "access-control-allow-origin": "*" });
app.get("/login", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});
app.post("/login", function (req, res) {
  var id = req.body.id;
  var pw = req.body.pw;
  console.log("id: " + id + "pw:" + pw);
  var spdata = {};

  var result = {};

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
          res.sendFile(__dirname + "/index.html");
        } else {
          console.log("fail login");
          console.log("----------------------");
          spdata.result = "NO";
        }
      } catch {}
      res.json(spdata);
    }
  );
});

app.get("/reg", function (req, res) {
  res.sendFile(__dirname + "/reg.html");
});

app.get("/sha", function (req, res) {
  res.sendFile(__dirname + "/sha256.html");
});

app.get("/index", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/sha", function (req, res) {
  var str = req.body.str;
  console.log(str);
  var spdata = {};
});

app.post("/regcheck", function (req, res) {
  //회원가입으로 pass 경우
  var id = req.body.id; //넘어온 값들.
  var pw = req.body.pw;
  var nick = req.body.nick;
  var spdata = {};
  console.log(id);
  res.send(id + "," + pw + "," + nick);
  var query = connection.query(
    'select * from nodeuser where id="' + id + '"', //해당 아이디가 존재하는지 조회
    function (err, rows) {
      if (err) throw err;
      if (rows[0]) {
        //값이 있으면 이미 있는 경우이므로 Fail.
        spdata.result = "NO";
        console.log("fail regist");
        console.log("이미 등록된 아이디 입니다.");
        console.log("----------------------");
      } else {
        //없는 경우 Seccess.
        spdata.reslut = "ok";
        console.log("seccess regist for " + spdata.reslut);
        spdata.nick = encodeURI(rows[0]);
        console.log("----------------------");
        spdata.result = "OK";
        var q = connection.query(
          'insert into nodeuser values("' + //값 Insert.
            id +
            '","' +
            pw +
            '","' +
            nick +
            '") '
        );

        var query = connection.query(
          'select * from nodeuser where id="' + id + '"', //해당 아이디가 존재하는지 조회
          function (err, rows) {
            if (err) throw err;
            if (rows[0]) {
              //값이 있으면 이미 있는 경우이므로 Fail.
              spdata.result = "OK";
              console.log("정상적으로 DB등록 완료.");
              console.log("----------------------");
            } else {
              //없는 경우 Seccess.
              spdata.reslut = "NO";
              console.log("DB등록을 시도 했으나 문제가 발생했습니다.");
            }
          }
        );
      }
    }
  );
});
