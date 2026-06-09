"use strict";
const { CustomError, passwordEncrypt } = require("../helpers/passwordEncrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;

    if (!((username || email) && password))
      throw new CustomError(
        "Username or email and password are required.",
        401,
      );

    const foundedUser = await User.findOne({
      $or: [{ email }, { username }],
    }).select("+password");

    console.log("foundedUser:", foundedUser);
    console.log("gelen şifre hash:", passwordEncrypt(password));

    if (!foundedUser)
      throw new CustomError("Wrong email/username or password", 401);

    if (foundedUser.password !== passwordEncrypt(password))
      throw new CustomError("Wrong email/username or password", 401);

    if (!foundedUser.isActive)
      throw new CustomError("The user status is not active", 401);

    const accessToken = jwt.sign(
      { _id: foundedUser._id, isAdmin: foundedUser.isAdmin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m" },
    );

    const refreshToken = jwt.sign(
      { _id: foundedUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      error: false,
      user: foundedUser,
      accessToken,
      message: "Login successfull.",
    });
  },

  logout: (req, res) => {
    res.clearCookie("jwt");
    res.status(200).send({
      error: false,
      message: "Logout successfull.",
    });
  },

  refresh: async (req, res, next) => {
    const { refresh } = req.body;
    if (!refresh) throw new CustomError("Refresh token is not found");
    jwt.verify(
      refresh,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, refreshData) => {
        if (err) return next(new CustomError(`JWT Error: ${err.message}`, 401));

        const user = await User.findById(refreshData._id);
        if (!user)
          return next(new CustomError("refreshdata is not valid", 401));
        if (!user.isActive)
          return next(new CustomError("refreshdata is banned", 401));

        const accessData = {
          _id: user._id,
          username: user.username,
          isActive: user.isActive,
          isAdmin: user.isAdmin,
        };

        const access = jwt.sign(accessData, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1m",
        });

        //refresh varsa verify nasıl yapılack

        res.status(200).send({
          error: false,
          bearer: { access },
        });
        next()
      },
    );
  },
};
