var express = require("express");
var app = express();
var path = require("path");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function(req, res, next){
  if (req.is("text/*")) {
    req.text = "";
    req.setEncoding("utf8");
    req.on("data", function(chunk){ req.text += chunk });
    req.on("end", next);
  } else {
    next();
  }
});

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/", function(req, res) {
  if (req.body.text) {
      res.send(req.body.text);
  }
  else {
      res.send(req.text);
  }
});

var server = app.listen(5000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Listening at http://%s:%s", host, port);
});
