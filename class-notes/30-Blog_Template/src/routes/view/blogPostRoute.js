"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();

const BlogPost = require("../../controllers/view/blogPostController");

// ------------------------------------------
// BlogPost
// ------------------------------------------
// URL: /blog/post

router.all("/", BlogPost.list);
router.all("/create", BlogPost.create);
router.all("/:postId", BlogPost.read);
router.all("/:postId/update", BlogPost.update);
router.all("/:postId/delete", BlogPost.delete);
// router.all("/category/:categoryId/posts", BlogPost.listCategoryPosts);


module.exports = router;
