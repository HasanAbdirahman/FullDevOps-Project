const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/todosController");

router.get("/", ctrl.listTodos);
router.post("/", ctrl.createTodo);
router.get("/:id", ctrl.getTodo);
router.put("/:id", ctrl.updateTodo);
router.delete("/:id", ctrl.deleteTodo);

module.exports = router;
