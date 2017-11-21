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
  });
}

SearchBox.prototype.getOptions = function() {
  return Array.from(document.getElementsByClassName("result-item"));
}

SearchBox.prototype.getSelectedIndex = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;

  console.log(options[2]);

  console.log("ID: ", options[2].id);

  var selected = document.getElementById("selected");
  console.log(selected);
  
  return 1;
}

SearchBox.prototype.moveSelectedDown = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;
  var selectedIndex = _this.getSelectedIndex();
  if (selectedIndex === -1) {
    options[0].id = "selected";
  } else if (selectedIndex === (_this.maxResults - 1)) {
    options[0].id = "selected";
    options[options.length - 1].removeAttribute("id");
  } else {
    options[selectedIndex + 1].id = "selected";
    options[selectedIndex].removeAttribute("id");
  }
}

SearchBox.prototype.moveSelectedUp = function() {
  var options = _this.getOptions();
  if (options.length === 0) return;
  var selectedIndex = _this.getSelectedIndex();
    console.log(selectedIndex);
  if (selectedIndex === -1) {
    options[options.length - 1].id = "selected";
  } else if (selectedIndex === 0) {
    options[0].removeAttribute("id");
  } else {
    options[selectedIndex - 1].id = "selected";
    options[selectedIndex].removeAttribute("id");
  }
}

module.exports = SearchBox;
