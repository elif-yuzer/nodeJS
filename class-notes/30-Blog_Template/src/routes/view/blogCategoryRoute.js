"use strict";

const BlogCategory = require("../../controllers/view/blogCategoryController");

/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

// ------------------------------------------
// BlogCategory
// ------------------------------------------
// URL: /views/blog

router.all("/category", BlogCategory.list);
router.all("/category/create", BlogCategory.create);
router.all("/category/:categoryId", BlogCategory.read);
router.all("/category/:categoryId/update", BlogCategory.update);
router.all("/category/:categoryId/delete", BlogCategory.delete);

module.exports = router;
