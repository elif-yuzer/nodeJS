"use strict";

const Token = require("../models/tokenmodel");
const { CustomError } = require("../utils");
const Personel = require("../models/personelModel");

const authMiddleware = async (req, res, next) => {
  req.user = null;

  const gelenToken = req.headers?.authorization || null;

  const tokentoArr = gelenToken ? gelenToken.split(" ") : null;

  if (tokentoArr && tokentoArr[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokentoArr[1] })
      .populate("userId")
      .lean();
    if (tokenData) req.user = tokenData.userId;
  }

  next();
};

module.exports = authMiddleware;
