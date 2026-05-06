const router = require("express").Router();

const category = require("../controllers/blogcontroller");

router.route("/blogs/categories").get(category.list).post(category.create);

router
  .route("/blogs/categories/:id")
  .get(category.read)
  .put(category.update)
  .delete(category.delete);

module.exports = router;
