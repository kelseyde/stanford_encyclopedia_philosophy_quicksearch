var express     = require('express');
var app         = express();
var queryHelper = require("./db/query_helper");

app.use(express.static(__dirname + '/../client/build'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.get("/articles", function(req, res) {
  queryHelper.all(function(docs) {
    res.json(docs);
  })
});
