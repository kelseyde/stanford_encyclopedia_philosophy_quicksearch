var requestHelper = {

  get: function(url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url);
    request.addEventListener('load', function() {
      var jsonString = request.responseText
      var data = JSON.parse(jsonString)
      callback(data)
    })
    request.setRequestHeader('Access-Control-Allow-Origin');
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
