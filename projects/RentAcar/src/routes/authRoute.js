"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/auth:

const {
  login,
  logout,
  register,
  refresh,
} = require("../controllers/authController");

// URL: /auth

router.post("/login", login); //public
router.post("/register", register);  //public
router.post("/refresh", refresh);  //public
router.get("/logout", logout);  //public

/* ------------------------------------------------------- */
module.exports = router;
