const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  idCommand: String,
  montant: Number,
  numeroCarte: Number,
});

const Paiement = mongoose.model("Payment", PaymentSchema);

module.exports = Paiement;
