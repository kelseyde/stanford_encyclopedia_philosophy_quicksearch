var request     = require("request");
var cheerio     = require("cheerio");
var async       = require("async");

var webScraper = {

  getEncyclopediaArticles: function(url) {
    var articles = [];

    // get all article URLs
    request(url, function(error, response, html) {
      var $ = cheerio.load(html);
      $("li", "#content").each(function() {
        var data = $(this);
        var url = "https://plato.stanford.edu/" + data.children().first().attr("href");
        var article = {url: url}
        articles.push(article);
      });

      // filter out broken URLs
      var filteredArticles = articles.filter(function(article) {
        return !(article.url.includes("undefined"));
      });

      // get all article titles
      (function getTitles(i) {
        if (i < filteredArticles.length) {
          var article = filteredArticles[i]
          var url = article.url;
          request(url, function(error, response, html) {
            var $ = cheerio.load(html);
            var title = $("h1", "#aueditable").text();
            article.title = title;
            console.log(article.title + "  " + article.url.substring(35).slice(0, -1));
            getTitles(i + 1);
          });
        } else { // when finished, store articles in database
          queryHelper.insert({
            articles: filteredArticles
          }, function() {
            console.log(filteredArticles.length +
              " articles inserted into database!");
          });
        }
      })(0);
    });
  }

}

module.exports = webScraper;
