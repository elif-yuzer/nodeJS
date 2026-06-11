"use strict";

const jwt = require("jsonwebtoken");


const generateAccesstoken = (user) => {
  const accessData = {
    _id: user._id,
    username: user.username,
    isActive: user.isActive,
    isAdmin: user.isAdmin,
  };
  return jwt.sign(accessData, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  });
};

const generateRefreshtoken = (user) => {
  return jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};


module.exports = { generateAccesstoken, generateRefreshtoken };
