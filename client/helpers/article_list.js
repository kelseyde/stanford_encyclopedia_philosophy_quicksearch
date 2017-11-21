var requestHelper = require("./request_helper");
var shuffle = require("shuffle-array")

var populateArticleList = function() {
  var container = document.getElementById("article-list");
  requestHelper.get("/articles", function(result) {
    var articles = shuffle(result[0].articles);
    console.log(articles);
    articles.forEach(function(article) {
      var link = document.createElement("a");
      link.id = "article-list-item";
      link.innerText = article.title.toLowerCase();
      link.href = article.url;
      container.appendChild(link);
    });
  });
}

module.exports = populateArticleList;
