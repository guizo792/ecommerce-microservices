const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limiter");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

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

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      "duration",
      "ratingsQuantity",
      "ratingsAverage",
      "maxGroupSize",
      "difficulty",
      "price",
    ],
  })
);

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", rateLimiter);

app.get("/", (req, res) => res.send("Hello Gateway API"));
app.all("/Commands", commandsProxy);
app.all("/Products", productsProxy);
app.all("/Payments", paymentsProxy);
app.get("/Products/:id", productsProxy);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

setupLogging = (app) => {
  app.use(morgan("combined"));
};
