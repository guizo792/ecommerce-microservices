const express = require("express");
const bodyParser = require("body-parser");
const db = require("./Config/db");
const routes = require("./Controllers/PaymentController");
var cors = require("cors");
const port = process.env.PORT | 8082;
const app = express();

app.listen(port, function () {
  console.log("Server (payment service) is listening at port:" + port);
});

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
// Parses the text as json
app.use(bodyParser.json());

app.use("/", routes);
