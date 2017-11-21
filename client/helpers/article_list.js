var requestHelper = require("./request_helper");
var shuffle = require("shuffle-array");
var data = require("../../server/db/articles.js")

var populateArticleList = function() {
  var container = document.getElementById("article-list");
  var articles = shuffle(data[0].articles);
  articles.forEach(function(article) {
    var link = document.createElement("a");
    link.id = "article-list-item";
    link.innerText = article.title.toLowerCase();
    link.href = article.url;
    container.appendChild(link);
  });
}

module.exports = populateArticleList;
