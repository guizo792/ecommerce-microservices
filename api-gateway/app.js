const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3007;

const {
  COMMANDS_API_URL,
  PRODUCTS_API_URL,
  PAYMENTS_API_URL,
} = require("./URLs");

const optionsProducts = {
  target: PRODUCTS_API_URL,
  changeOrigin: true,
  logger: console,
};

const optionsCommands = {
  target: COMMANDS_API_URL,
  changeOrigin: true,
  logger: console,
};
const optionsPayments = {
  target: PAYMENTS_API_URL,
  changeOrigin: true,
  logger: console,
};

const productsProxy = createProxyMiddleware(optionsProducts);
const commandsProxy = createProxyMiddleware(optionsCommands);
const paymentsProxy = createProxyMiddleware(optionsPayments);

app.get("/", (req, res) => res.send("Hello Gateway API"));
app.all("/Commands", commandsProxy);
app.all("/Products", productsProxy);
app.all("/Payments", paymentsProxy);
app.get("/Products/:id", productsProxy);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
