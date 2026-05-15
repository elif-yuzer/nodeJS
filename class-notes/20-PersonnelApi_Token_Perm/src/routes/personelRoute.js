"use strict";

const router = require("express").Router();
const {
  list,
  read,
  create,
  update,
  delete: Deleted,
} = require("../controllers/personelController");
const { isOwnerorAdmin, isAdmin, isLeadorAdmin, isLeadwithDeleteRoles } = require("../middlewares/permission");


/* router.use(isAdmin) */
router.route("/").get(list).post(create);

router.route("/:id").get(read).put(isOwnerorAdmin,update).delete(isLeadwithDeleteRoles,Deleted);

router.route("/:userName").get(read)

module.exports = router;
