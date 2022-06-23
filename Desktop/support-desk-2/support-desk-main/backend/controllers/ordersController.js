const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Order = require("../models/orderModel");
// const Menu = require('../models/menuModel')

// @desc    Get order for a menu
// @route   GET /api/menus/:menuId/notes
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const order = Order.find({ user: user });

  res.status(200).json(order);
});

// @desc    Create menu note
// @route   POST /api/menus/:menuId/order
// @access  Private
const addOrder = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const order = new Order({
    ...req.body,
    user: req.user.user,
  });

  order.save();
  res.status(201).json({ order });
});

const deleteOrder = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Menu not found");
  }

  await order.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  getOrders,
  addOrder,
  deleteOrder,
};
