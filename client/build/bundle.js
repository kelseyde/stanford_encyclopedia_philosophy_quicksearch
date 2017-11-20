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

var requestHelper = __webpack_require__(1);
var SearchBox = __webpack_require__(2);

window.addEventListener("DOMContentLoaded", function() {
  var inputElement = document.getElementById("search-input");
  var resultsElement = document.getElementById("autocomplete-results");
  var searchBox = new SearchBox(inputElement, resultsElement, 1, 8);
  searchBox.initialiseSearch();
})


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
        li.id = "result-item";
        li.innerText = article.title;
        li.article = article;
        _this.resultsElement.appendChild(li);
      });
    }
  });
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map