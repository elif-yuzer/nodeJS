"use strict";
/* -------------------------------------------------------
            EXPRESSJS - TODO ROUTER
------------------------------------------------------- */
// ROUTES:

const router = require("express").Router();
const todo = require("../controllers/todoController.view");

router.route("/").get(todo.list).post(todo.create);

router.get("/:id/edit", todo.edit);
router.route("/:id").get(todo.read).post(todo.update).put(todo.update);
router.route("/:id/delete").post(todo.delete).get(todo.delete);

router.patch("/:id/toggle", todo.toggle);

module.exports = router;
