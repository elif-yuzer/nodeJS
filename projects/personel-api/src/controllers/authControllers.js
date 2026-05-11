"use strict";

const Personnel = require("../models/personelModel");
const { CustomError } = require("../utils/index");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    if (!password || (!username && !email)) {
      throw new CustomError(
        "username or email and password are required.",
        401,
      );
    }

    // findOne makes set method works
    const user = await Personnel.findOne({
      $or: [{ username }, { email }],
      password,
    }); // returns plain js

    if (!user) throw new CustomError("Wrong email/username or password.", 404);

    if (!user.isActive)
      throw new CustomError("The user status is not active.", 401);

    const {
      salary,
      description,
      phone,
      password: userPass,
      ...sessionData
    } = user;

    req.session = sessionData;

    if (req.body.rememberMe)
      req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
    res.status(200).send({
      error: false,
      message: "Login is successfull",
    });
  },


  logout: (req, res) => {
    
    req.session = null;

    res.status(200).send({
        error:false,
        message: 'Logout is successfull.'
    })
  }
};
