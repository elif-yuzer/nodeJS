"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const PIZZA_SIZES = {
  SMALL: "Small",
  MEDIUM: "Medium",
  LARGE: "large",
  XLARGE: "XLarge",
};

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pizza",
      required: true,
      index: true,
      unique: true,
    },
    size: {
      type: String,
      default: "Medium",
      //   enum: ['Small', "Medium", ...],
      enum: Object.values(PIZZA_SIZES),
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: function () {
        return this.quantity * this.price;
      }, // create
      transform: function () {
        return this.quantity * this.price;
      }, // update
    },
  },
  { collection: "orders", timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
