/*eslint-disable no-undef */
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    fullName: String,
    email: String,
    phone: String,
    city: String,
    addressOne: String,
    addressTwo: String,
    state: String,
    pincode: String,
    notes: String
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);