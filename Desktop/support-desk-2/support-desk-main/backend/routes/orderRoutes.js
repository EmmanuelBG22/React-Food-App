const express = require("express");
const router = express.Router({ mergeParams: true });
const { getOrders, addOrder } = require("../controllers/ordersController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getOrders).post(protect, addOrder);

module.exports = router;
