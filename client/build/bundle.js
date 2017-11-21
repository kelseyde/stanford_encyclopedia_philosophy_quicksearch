/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper       = __webpack_require__(1);
var SearchBox           = __webpack_require__(2);
var populateArticleList = __webpack_require__(4);

window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.getElementById("search-input");
  var resultsElement = document.getElementById("autocomplete-results");
  var searchBox = new SearchBox(inputElement, resultsElement, 1, 8);
  searchBox.initialiseSearch();
  searchBox.handleOptionNavigation();
  populateArticleList();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var requestHelper = {

  get: function(url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url);
    request.addEventListener('load', function() {
      var jsonString = request.responseText;
      var data = JSON.parse(jsonString);
      callback(data)
    })
    request.send()
  },

  post: function(url, objectToInsert, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.addEventListener("load", function() {
      callback();
    });
    request.setRequestHeader("Content-type", "application/json");
    request.body = objectToInsert;
    request.send(objectToInsert);
  },

  put: function(url, updatedObject, callback) {
    console.log("we are in the put request");
    var request = new XMLHttpRequest();
    request.open("PUT", url);
    request.addEventListener("load", function() {
      callback();
    });
    request.setRequestHeader("Content-type", "application/json");
    request.body = updatedObject;
    request.send(updatedObject);
  }

}

module.exports = requestHelper


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var autocomplete = __webpack_require__(3);
var requestHelper = __webpack_require__(1);

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
        a.id = "autocomplete-link"
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var autocomplete = function(input, options) {
  var inputFoundAtStart = [];
  var inputFoundInMiddle = [];
  for (var i = 0; i < options.length; i++) {
    if (options[i].title.toLowerCase().startsWith(input.toLowerCase())) {
      inputFoundAtStart.push(options[i]);
    } else if (options[i].title.toLowerCase().includes(input.toLowerCase())) {
      inputFoundInMiddle.push(options[i]);
    }
  }
  var results = inputFoundAtStart.concat(inputFoundInMiddle);
  return results;
}

module.exports = autocomplete;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var requestHelper = __webpack_require__(1);
var shuffle = __webpack_require__(5)

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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Randomize the order of the elements in a given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Boolean} [options.copy] - Sets if should return a shuffled copy of the given array. By default it's a falsy value.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Array}
 */
function shuffle(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle expect an array as parameter.');
  }

  options = options || {};

  var collection = arr,
      len = arr.length,
      rng = options.rng || Math.random,
      random,
      temp;

  if (options.copy === true) {
    collection = arr.slice();
  }

  while (len) {
    random = Math.floor(rng() * len);
    len -= 1;
    temp = collection[len];
    collection[len] = collection[random];
    collection[random] = temp;
  }

  return collection;
};

/**
 * Pick one or more random elements from the given array.
 * @param {Array} arr - The given array.
 * @param {Object} [options] - Optional configuration options.
 * @param {Number} [options.picks] - Specifies how many random elements you want to pick. By default it picks 1.
 * @param {Function} [options.rng] - Specifies a custom random number generator.
 * @returns {Object}
 */
shuffle.pick = function(arr, options) {

  if (!Array.isArray(arr)) {
    throw new Error('shuffle.pick() expect an array as parameter.');
  }

  options = options || {};

  var rng = options.rng || Math.random,
      picks = options.picks || 1;

  if (typeof picks === 'number' && picks !== 1) {
    var len = arr.length,
        collection = arr.slice(),
        random = [],
        index;

    while (picks && len) {
      index = Math.floor(rng() * len);
      random.push(collection[index]);
      collection.splice(index, 1);
      len -= 1;
      picks -= 1;
    }

    return random;
  }

  return arr[Math.floor(rng() * arr.length)];
};

/**
 * Expose
 */
module.exports = shuffle;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map