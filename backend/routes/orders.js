const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post('/', async (req, res) => {
  const newOrder = new Order(req.body);
  await newOrder.save();
  res.json(newOrder);
});

router.put('/:id', async (req, res) => {
  const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedOrder);
});

router.delete('/:id', async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
});

module.exports = router;
