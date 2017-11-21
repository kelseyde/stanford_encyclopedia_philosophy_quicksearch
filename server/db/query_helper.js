var MongoClient = require("mongodb").MongoClient;
var ObjectID = require("mongodb").ObjectID;

var queryHelper = {

  url: process.env.MONGOLAB_URI,

  all: function (result) {
    MongoClient.connect(this.url, function(err, db) {
      var articleCollection = db.collection("articles");
      articleCollection.find().toArray(function (err, docs) {
        result(docs);
      });
    });
  },

  insert: function(object, result) {
    MongoClient.connect(this.url, function(err, db) {
      var articleCollection = db.collection("articles");
      articleCollection.insertOne(object, function(err, docs) {
        if (err) console.log("error: ", err);
        result(docs);
      });
    });
  }

}

module.exports = queryHelper;
