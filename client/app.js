var requestHelper       = require("./helpers/request_helper");
var SearchBox           = require("./helpers/search_box");
var populateArticleList = require('./helpers/article_list');

window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.getElementById("search-input");
  var resultsElement = document.getElementById("autocomplete-results");
  var searchBox = new SearchBox(inputElement, resultsElement, 1, 8);
  searchBox.initialiseSearch();
  searchBox.handleOptionNavigation();
  populateArticleList();
});
