"use strict";
/* -------------------------------------------------------
| FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const { CustomError } = require("../helpers/passwordEncrypt");
const User = require("../models/user");

const jwt = require("jsonwebtoken");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) throw new CustomError("Unauthorized", 401);
  const refreshToken = cookies.jwt;
  console.log(cookies.jwt);

  console.log(refreshToken)

  jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err )
      throw new CustomError("Forbidden", 403);
  });
  const user= await User.findOne('refreshToken._id')

  if(!user) throw new CustomError('hata', 401)
};
