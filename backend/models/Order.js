const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: String,
  customerName: String,
  product: String,
  status: String // pending, shipped, delivered
});

module.exports = mongoose.model('Order', orderSchema);
