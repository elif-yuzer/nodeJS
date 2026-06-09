"use strict ";
const router = require("express").Router();
const { verifyJWT } = require("../middlewares/authentication");

const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

/* ------------------------------------------------------- */
//* Routes:

router.post("/", createUser);

router.get("/",  getUsers);

router.get("/:id",  getUserById);

router.put("/:id",  updateUserById);

router.delete("/:id", deleteUserById);

module.exports = router;


