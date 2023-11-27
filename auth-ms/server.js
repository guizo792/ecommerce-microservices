const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Configure env variables file
dotenv.config({ path: "config/config.env" });

const server = require("./app");

// Database connection
mongoose
  .connect(process.env.lOCAL_DATABASE, {
    useNewUrlParse: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("DB connection successful ✅"));

const port = process.env.PORT || 4000;

const HTTPserver = server.listen(port, () => {
  console.log(`🟢 App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
