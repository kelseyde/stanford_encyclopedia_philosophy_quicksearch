var autocomplete = require("./autocomplete");
var requestHelper = require("./request_helper");

function SearchBox(inputElement, resultsElement, minChars, maxResults) {
  _this = this;
  this.inputElement = inputElement;
  this.resultsElement = resultsElement;
  this.minChars = minChars;
  this.maxResults = maxResults;
  requestHelper.get("/articles", function(options) {
    _this.options = options[0].articles;
  });
}

SearchBox.prototype.initialiseSearch = function() {
  _this.inputElement.addEventListener("keyup", function(event) {
    while (_this.resultsElement.firstChild) {
      _this.resultsElement.removeChild(_this.resultsElement.firstChild);
    }
    var inputValue = this.value;
    if (inputValue.length >= _this.minChars) {
      var allResults = autocomplete(inputValue, _this.options);
      var resultsToShow = [];
      while (resultsToShow.length < _this.maxResults) {
        if (allResults.length > 0) {
          resultsToShow.push(allResults[0]);
          allResults.shift();
        } else { break }
      }
      resultsToShow.forEach(function(article) {
        var li = document.createElement("li");
        li.classList += "result-item";
        var a = document.createElement("a");
        a.href = article.url;
        a.innerText = article.title;
        li.appendChild(a);
        _this.resultsElement.appendChild(li);
      });
    }
  });
}

SearchBox.prototype.getOptions = function() {
  return Array.from(document.getElementsByClassName("result-item"));
}

SearchBox.prototype.getSelectedIndex = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;
  var selectedIndex = options.find(function(option, index) {
    if (option.classList.contains("selected")) return index;
  });
  return selectedIndex;
}

SearchBox.prototype.handleOptionNavigation = function() {
  _this.inputElement.addEventListener("keydown", function(event) {
    var options = _this.getOptions();
    if (event.key === "ArrowUp") moveSelectedUp();
    if (event.key === "ArrowDown") moveSelectedDown();
  });
}

SearchBox.prototype.moveSelectedDown = function () {
 var options = _this.getOptions();
};

module.exports = SearchBox;
