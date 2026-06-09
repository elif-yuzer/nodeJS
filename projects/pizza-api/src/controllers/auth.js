"use strict";

const User = require("../models/userModel");
const { CustomError } = require("../helpers/passwordEncrypt");
const { SignJWT, SignJWT } = require("jose");

module.exports = {
  login: async (username, password) => {
    const { username, password } = req.body;

    const hasIdentify = email || username;

    if (!hasIdentify || !password)
      throw new CustomError("username or email required", 401);

    const foundedUser = await User.findOne({
      $or: [{ username }, { email }],
      password,
    }).lean(); // is the same to toObject()

    if (!foundedUser) throw new CustomError("username or email required", 401);

    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active.", 401);
/* 
    const SignJWT=new SignJWT{
      
    } */


  },
};
