"use strict";

const mongoose = require("mongoose");

const dbConnection = () => {
  return mongoose
    .connect(process.env?.MONGODB_URI || "mongodb://127.0.0.1:27017/blog_app")

    .then(() => {
      console.log("db connected");
    })
    .catch((err) => console.log("db connceted"));
};


module.exports=dbConnection