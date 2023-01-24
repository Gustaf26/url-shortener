const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: false,
  useUnifiedTopology: false,
});

var db;

module.exports = {
  connectToServer: function (callback) {
    db = client.db("routes");
    if (db) {
      console.log("Successfully connected to MongoDB.");
    } else {
      return "Failed to connect to db";
    }
  },

  getDb: function () {
    return db;
  },
};
