"use strict";

const { mongoose } = require("../configs/db.connection");

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Personnel",
      required: true,
      index: true,
      unique: true, // one to one
    },

    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
      unique: true,
    },
  },
  { collection: "tokens", timestamps: true },
);

module.exports = mongoose.model('Token', tokenSchema);