const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  price: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
