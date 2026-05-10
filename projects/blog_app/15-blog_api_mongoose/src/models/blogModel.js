"use strict";

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true },
  },
  { timestamps: true },
  { collection: "blogCategories" },
);

//*set model

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };
