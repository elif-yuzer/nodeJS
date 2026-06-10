"use strict";

const mongoose = require("mongoose");

const dbConnection = function () {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("couldnt connect", err));
};

module.exports = {
  mongoose,
  dbConnection,
};
