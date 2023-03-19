const mongoose = require("mongoose");

//Invoice Schema
const invoiceSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  name: { type: String, required: true },
  status: { type: String, required: true },
  payment_id: { type: String, required: false }
});

// create a model for invoices
const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice