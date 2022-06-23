const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Please add a restaurant"],
    },
    food: {
      type: String,
      required: [true, "Please add some text"],
    },
    drink: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
