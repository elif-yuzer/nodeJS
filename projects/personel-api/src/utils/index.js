const { pbkdf2Sync } = require("node:crypto");

// Password Encryption:
const passwordEncrypte = function (password) {
  // require('crypto').randomBytes(32).toString('hex')
  const salt = process.env.SECRET_KEY;
  const iteration = parseInt(process.env.PASS_ITERATION, 10);
  const keylen = parseInt(process.env.PASS_KEYLEN, 10);
  const digest = process.env.PASS_DIGEST;

  return pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex");
};


class CustomError extends Error {
  name = "CustomError";
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}




module.exports = { passwordEncrypte,CustomError };
