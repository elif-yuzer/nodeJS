"use strict";

const Personel = require("../models/personelModel");
const Token = require("../models/tokenmodel");
const { CustomError, passwordEncrypte } = require("../utils");

module.exports = {
  login: async (req, res) => {
    const { userName, email, password } = req.body;
    console.log(req.body);

    console.log("userName:", userName);
    console.log("email:", email);
    console.log("password:", password);

    if (!userName && !email) {
      throw new CustomError("userName or email required", 401);
    }

    if (!password) {
      throw new CustomError("username or email and password are required", 401);
    }

    const foundedUser = await Personel.findOne({
      $or: [{ userName }, { email }],
    }).select("+password");

    /*   const foundedUser = await Personel.findOne({ userName: "elif" });
console.log("foundedUser:", foundedUser); */

    console.log(foundedUser);

    if (!foundedUser) {
      throw new CustomError("email/userName wrong", 401);
    }
    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active.", 401);

    if (passwordEncrypte(password) !== foundedUser.password) {
      throw new CustomError("something went wrong", 401);
    }
    const {
      salary,
      description,
      phone,
      password: UserPass,
      startedAt,
      createdAt,
      updatedAt,
      ...sessionData
    } = foundedUser.toObject();

    let token = await Token.findOne({ userId: foundedUser?._id });

    if (!token) {
      token = await Token.create({
        userId: foundedUser._id,
        token: passwordEncrypte(
          Math.random().toString() + foundedUser._id + Date.now(),
        ),
      });
    }
    res.status(200).send({
      error: false,
      message: "Login is successfull",
      token: token.token,
      user: sessionData,
    });
  },
  logout: async(req, res) => {


    req.session=null

    const data=req.user ? await Token.deleteOne({userId:req.user._id}) : null

    res.status(data?.deletedCount ? 200 : 400).send({
      error: !!!data?.deletedCount,
      message: data?.deletedCount
        ? "Logout is successfull."
        : "Logout not successfull.",
    });
   
  },

};
