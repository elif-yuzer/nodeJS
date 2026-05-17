"use strict";

// Authenctication Control Middleware:
const Token = require("../models/token.model");

module.exports = async (req, res, next) => {
  req.user = null;

  // Authorization: Token ...tokenKey...
  // Authorization: ApiKey ...tokenKey...
  // Authorization: Bearer ...tokenKey...
  // Authorization: Auth ...tokenKey...
  // Authorization: X-API-KEY ...tokenKey...
  // Authorization: x-auth-token ...tokenKey...

  // Get token from headers
  const auth = req.headers?.authorization || null; // 'Token ...tokenKey...'
  const tokenArr = auth ? auth.split(" ") : null; // ['Token', '...tokenArr...']

  if (tokenArr && tokenArr[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenArr[1] })
      .populate("userId")
      .lean();

    if (tokenData) req.user = tokenData.userId;
  }

  next();
};
