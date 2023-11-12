const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/db");
const routes = require("./controllers/ProductController");
var cors = require("cors");

const port = process.env.PORT | 8080;
const app = express();

app.listen(port, function () {
  console.log("Server (product service) listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

// Parses the text as json
app.use(bodyParser.json());

app.use(cors());
app.use("/", routes);
