"use strict";
const mongoose = require("mongoose");
const error = require("../middlewares/errorHandler");


//?mongoose.connect() bir söz (promise) veriyor — "bağlanmaya çalışacağım, bitince haber veririm"
//?await ancak önüne promise dönen bir şey gelirse bekler. return olmazsa promise yok olur gider.
//?

const dbConnection = () => {
   return mongoose
    .connect(
      process.env?.MONGODB_URI ||
        "MONGODB_URI=mongodb://localhost:27017/blog_app",
    )
    .then(() => console.log("dbye connect olundu"))
    .catch((err) => {
      throw err;
      console.log("hata oldu ", err);
    });
  
};

module.exports = dbConnection;
