"use strict";
/* -------------------------------------------------------
        EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();

const { category, post } = require("../controllers/blogController");

/* ---------------------------------------------- */
// URL: /blogs ->

// Category
router.route("/categories").get(category.list).post(category.create);

router
  .route("/categories/:id")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);




router.route("/posts").post(post.create)
.get(post.list)


router.route("/posts/:id").get(post.read)
.put(post.updatebyId)
.delete(post.delete)



/* ---------------------------------------------- */
module.exports = router;
