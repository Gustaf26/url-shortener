const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

// First thing install dependencies running npm install in the terminal
// Once that is done install the config.env file (sent by email) in this folder
// When finnished run the server running "node server.js" in the terminal

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
