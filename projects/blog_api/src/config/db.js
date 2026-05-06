"use strict";

const mongoose = require("mongoose");



const dbConnection = () => {
  mongoose

    .connect(process.env?.MONGO_URI || "mongodb://localhost:27017/blog-app")
    .then(() => console.log("db conncected"))
    .catch((err) => console.log("couldnt connect", err));
};

module.exports = dbConnection;
