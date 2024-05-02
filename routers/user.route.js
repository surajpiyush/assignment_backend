const userController = require("../controllers/user.controller");
const express = require("express");
const { authenticateToken } = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/userLogin", userController.userLogin);

router.post("/createTodo", authenticateToken, userController.createTodo);

router.put("/updateTodo/:todoId",  userController.updateTodo);

router.get("/todoList", userController.getTodoList);

router.delete("/deleteTodo/:todoId", userController.deleteTodo);

module.exports = router;
