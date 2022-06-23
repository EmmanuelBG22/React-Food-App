const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    restaurant: {
      type: String,
      required: [true, "Please select a restaurant"],
    },
    food: {
      type: String,
      required: [true, "Please enter food"],
    },
    drink: {
      type: String,
      required: [true, "please enter drink"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
