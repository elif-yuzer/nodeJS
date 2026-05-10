// Password Encryption:
// https://nodejs.org/docs/latest/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
const { pbkdf2Sync } = require("node:crypto");

const passwordEncrypte = function (password) {
  // require('crypto').randomBytes(32).toString('hex')
  const salt =
    "d4dfe25b5e9fcf40a9ca446d0341ba442dd85f79d05d6852c7ed8c05114b777a";
  const iteration = 100000;
  const keylen = 32; // write for 64
  const digest = "sha512";

  // pbkdf2Sync returns buffer string.
  return pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex");
};

module.exports = { passwordEncrypte };
