var express = require('express');
var app     = express();
var request = require("request");
var cheerio = require("cheerio");


app.use(express.static(__dirname + '/../client/build'));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

var url = "https://plato.stanford.edu/contents.html"


request(url, function(error, response, html) {
  const $ = cheerio.load(html);
  var json = []
  $("li", "#content").each(function() {
    var data = $(this);
    var url = "https://plato.stanford.edu/" + data.children().first().attr("href");
    var title = data.children().first().children().first().text();
    var obj = {title: title, url: url}
    json.push(obj);
  });
  console.log(json);
})

app.use(express.static(__dirname + '/../client/build'))
