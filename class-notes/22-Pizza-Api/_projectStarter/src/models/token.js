"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

("use strict");
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

/* ------------------------------------------------------- */

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
  },
  { collection: "token", timestamps: true },
);

module.exports = mongoose.model("Token", tokenSchema);
