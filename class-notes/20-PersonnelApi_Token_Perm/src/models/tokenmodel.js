"use strict";

const { default: mongoose } = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personel",
      required: true,
      index: true,
      unique: true, // one to one ilişkisi
    },
    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  { collection: "Token", timestamps: true },
);

module.exports = mongoose.model("Token", tokenSchema);
