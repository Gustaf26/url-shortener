const express = require("express");
const shortId = require("short-uuid");
const crypto = require("crypto");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This section will help you insert a new route.
recordRoutes.route("/record").post(function (req, res) {
  let long_url = req.body.url;

  // Logic for empty urls from request body (not allowed)
  if (long_url === "") {
    res.status(400).json({
      error: "Input cannot be empty",
    });
    return;
  }

  // Logic for validating the length of the same url
  if (long_url.length > 1000) {
    res.status(400).json({
      error: "Input is too long",
    });
    return;
  }

  // Logic for checking if url invalid characters are present
  let invalidChars = ["<", ">", "#", "%", '"', "'"];
  let invalidCharPresent = false;
  invalidChars.map((char) => {
    long_url.includes(char) ? (invalidCharPresent = true) : null;
  });

  if (invalidCharPresent) {
    res.status(400).json({
      error:
        "Input must have valid characters. These are not allowed: '<' | '>' | '#' | '%' | '\"' | \"'\"",
    });
    return;
  }

  // If none of the above, move on to register in db a new record

  // These variables will serve for the time limit (1 min) in case that option is active in the request

  let timeLimit = 60000;

  let newRecord = {
    _id: shortId.generate(),
    redirecturl: long_url,
    shortenedurl: "localhost:5000/" + crypto.randomBytes(4).toString("hex"),
    timelimit: req.body.time_limit ? timeLimit : null,
  };

  let db_connect = dbo.getDb();
  let result = db_connect.collection("shortened").insertOne(newRecord);
  if (result) return res.json(newRecord);
});

module.exports = recordRoutes;
