const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routes = require("./controllers/CommandController");
const port = process.env.PORT | 8081;
const app = express();
var cors = require("cors");

app.listen(port, function () {
  console.log("Server is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Parses the text as json
app.use(bodyParser.json());

app.use(cors());

app.use("/", routes);
