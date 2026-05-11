"use strict";

const mongoose = require("mongoose");

const dbConnection = function () {
 return mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("db connected"))
    .catch((err) => {
      throw err;
    });
};



module.exports = { dbConnection, mongoose };
