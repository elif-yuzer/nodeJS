const express = require("express");

const router = express.Router();
const { getAllTodos ,postTodo, updateTodo, deleteTodo} = require("../controllers/todoController");

router.get("/", getAllTodos);

/* console.log(router.get("/",getAllTodos));
 */
router.post("/",postTodo)

router.put("/:id",updateTodo)

router.delete("/:id",deleteTodo)






console.log("route calısıyormu");
module.exports = router;

