var express = require("express");
var app = express();
var bodyparser = require("body-parser");
var mysql = require("mysql");
var iconv = require("iconv-lite");
const session = require("express-session");
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
  var serial = req.body.serial;
  console.log("serial: " + serial);
  var spdata = {};
  var query = connection.query(
    'select * from cuser where serial="' + serial + '"', //sql insert
    function (err, rows) {
      try {
        if (err) throw err;
        if (rows[0]) {
          spdata.result = "OK";
          spdata.serial = encodeURI(rows[0].serial);
          spdata.name = encodeURI(rows[0].name);
          console.log(req.session);
          req.session.id = rows[0].serial;
          req.session.login = true;
          req.session.save(function () {
            req.redirect("/");
          });
        } else {
          console.log("No result");
          spdata.result = "NO";
        }
      } catch {}
      res.json(spdata);
    }
  );
});
