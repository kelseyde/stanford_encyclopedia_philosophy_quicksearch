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

var getEncyclopediaArticles = function(url) {
  var articles = [];
  var filteredArticles = [];
  request(url, function(error, response, html) {
    var $ = cheerio.load(html);
    $("li", "#content").each(function() {
      var data = $(this);
      var url = "https://plato.stanford.edu/" + data.children().first().attr("href");
      var title = url.substring(35).slice(0, -1);
      var article = {title: title, url: url}
      articles.push(article);
    });
    filteredArticles = articles.filter(function(article) {
      return !(article.url.includes("undefined"))
          && !(article.title === "");
    });
  });
}

var articles = getEncyclopediaArticles("https://plato.stanford.edu/contents.html");
console.log(articles);




// var getUrls = function(url) {
//   var json = [];
//   request(url, function(error, response, html) {
//     var $ = cheerio.load(html);
//     $("li", "#content").each(function() {
//       var data = $(this);
//       var url = "https://plato.stanford.edu/" + data.children().first().attr("href");
//       var title;
//       var obj = {title: "", url: url}
//       console.log(obj);
//       json.push(obj);
//     });
//   });
//   console.log(json);
//   return json;
// }
//
// var getTitles = function(json) {
//   for (obj of json) {
//     var url = obj.url;
//     request(url, function(error, response, html) {
//       obj.title = title;
//     });
//   }
//   console.log(json);
// }
//
// var jsonWithUrls = getUrls("https://plato.stanford.edu/contents.html");
// console.log(jsonWithUrls);
// getTitles(jsonWithUrls);


// request(url, function(error, response, html) {
//   $ = cheerio.load(html);
//   title = $("h1", "#aueditable");
//   console.log(title);
// })

app.use(express.static(__dirname + '/../client/build'))
