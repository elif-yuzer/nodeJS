"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    image: {
      type: String,
      default: null,
    },

    price: {
      type: Number,
      required: true,
    },

    toppingIds: [
      {
        type: mongoose.Schema.types.ObjectId,
      },
    ],
  },
  { collection: "pizzas", timestamps: true },
);

module.exports = mongoose.model("Pizza", pizzaSchema);
