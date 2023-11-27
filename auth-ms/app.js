const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");

// SERVER
const server = http.createServer(app);

// SOCKET (allow cors to our frontend app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

// ROUTES
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = server;
