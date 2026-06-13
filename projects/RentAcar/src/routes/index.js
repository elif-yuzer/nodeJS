"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// ROUTER INDEX:

// URL: /

// auth:
router.use("/auth", require("./authRoute"));
router.use("/users", require("./userRoute"));
router.use("/cars", require("./carRoute"));

/* ------------------------------------------------------- */
module.exports = router;
