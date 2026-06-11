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

router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);
router.get("/logout", logout);

/* ------------------------------------------------------- */
module.exports = router;
