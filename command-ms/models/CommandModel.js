const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommandSchema = new Schema({
  productId: Number,
  dateCommande: Date,
  quantite: Number,
  commandePayee: Boolean,
});

const Commande = mongoose.model("Command", CommandSchema);

module.exports = Commande;
