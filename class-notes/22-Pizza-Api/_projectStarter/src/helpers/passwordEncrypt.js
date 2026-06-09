"use strict";

const crypto = require("node:crypto")

const { pbkdf2Sync } = require("node:crypto");
  
const passwordEncrypt=function(password){
 const salt = process.env.SECRET_KEY;
 const iteration = parseInt(process.env.PASS_ITERATION, 10);
  const keylen = parseInt(process.env.PASS_KEYLEN, 10);
    const digest = process.env.PASS_DIGEST;
  module.exports=function(password) {
     return pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex");ring('hex')
  }
}

  class CustomError extends Error {
    name='Custom Error'

    constructor(message,statusCode) {
        super(message)
        this.statusCode=statusCode
    }
  }

  module.exports={passwordEncrypt,CustomError}