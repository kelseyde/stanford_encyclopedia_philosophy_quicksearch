var autocomplete = require("./autocomplete");
var requestHelper = require("./request_helper");

function SearchBox(inputElement, resultsElement, minChars, maxResults) {
  _this = this;
  this.inputElement = inputElement;
  this.resultsElement = resultsElement;
  this.minChars = minChars;
  this.maxResults = maxResults;
  this.selectedIndex = null;
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
        li.classList.add("result-item");
        var a = document.createElement("a");
        a.href = article.url;
        a.innerText = article.title;
        li.appendChild(a);
        _this.resultsElement.appendChild(li);
      });
    }
  });
}

SearchBox.prototype.handleOptionNavigation = function() {
  _this.inputElement.addEventListener("keyup", function(event) {
    var options = _this.getOptions();
    if (event.key === "ArrowUp") _this.moveSelectedUp();
    if (event.key === "ArrowDown") _this.moveSelectedDown();
    if (event.key === "Enter") {
      event.preventDefault();
      _this.visitLink();
    }
  });
}

SearchBox.prototype.getOptions = function() {
  return Array.from(document.getElementsByClassName("result-item"));
}

SearchBox.prototype.moveSelectedDown = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;
  if (_this.selectedIndex > options.length - 1) {
    _this.selectedIndex = null;
  }
  if (_this.selectedIndex === null) {
    options[0].id = "selected";
    _this.selectedIndex = 0;
  } else if (_this.selectedIndex === (options.length - 1)) {
    options[0].id = "selected";
    options[options.length - 1].removeAttribute("id");
    _this.selectedIndex = 0;
  } else {
    if (options.length > 1) {
      options[_this.selectedIndex + 1].id = "selected";
      options[_this.selectedIndex].removeAttribute("id");
      _this.selectedIndex += 1;
    }
  }
}

SearchBox.prototype.moveSelectedUp = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;
  if (_this.selectedIndex > options.length - 1) {
    _this.selectedIndex = null;
  }
  if (_this.selectedIndex === null) {
    options[options.length - 1].id = "selected";
    _this.selectedIndex = (options.length - 1);
  } else if (_this.selectedIndex === 0) {
    options[0].removeAttribute("id");
    options[options.length - 1].id = "selected";
    _this.selectedIndex = (options.length - 1);
  } else {
    options[_this.selectedIndex - 1].id = "selected";
    options[_this.selectedIndex].removeAttribute("id");
    _this.selectedIndex -= 1;
  }
}

SearchBox.prototype.visitLink = function() {
  if (_this.selectedIndex === null) return;
  var options = _this.getOptions();
  var selected = options[_this.selectedIndex];
  var link = selected.firstChild;
  console.log(link);
  (function(element) {
    var event = new MouseEvent('click');
    var canceled = !element.dispatchEvent(event);
  })(link);
}

module.exports = SearchBox;
