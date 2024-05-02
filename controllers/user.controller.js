const User = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const Todo =require("../models/todo.model")
const jwt = require("jsonwebtoken");
const {  hashPassword, verifyPassword } = require("../utils/helper");
const todoModel = require("../models/todo.model");
module.exports.registerUser = asyncHandler(async (req, res) => {
	const { email, password, username } = req.body;
	if (!email || !password || !username) {
		return res.status(400).json({
			status: false,
			message: "email,password and username required",
			response: "",
		});
	}
	try {
		const hashedPassword = await hashPassword (password);
		const createdUser = await User.create({ email,password: hashedPassword, username });
		const token = jwt.sign({ userId: createdUser.id }, process.env.SECRET_KEY, {
			expiresIn: "1h",
		});
		createdUser.token = token;
		await createdUser.save();
		const responseUser = await User.findById(createdUser.id).select('-password');
		return res.status(201).json({
			status: true,
			message: "User created successfully",
			response: responseUser,
			
		});
	} catch (error) {
		return res.status(500).json({
			status: false,
			message: error.message,
			response: "",
		});
	}
});
module.exports.userLogin = asyncHandler(async (req, res) => {
	const {username, email, password } = req.body;
console.log('efwe',req.body)
	if (!(email || username) || !password) {
		return res.status(404).json({
			status: false,
			message: "email or username and password required",
			response: "",
		});
	}
	const findUser = await User.findOne({email})
	console.log("this is user",findUser)
	if (!findUser) {
		return res.status(400).json({
			status: true,
			message: "Invalid email",
			response: "",
		});
	}

	const token = jwt.sign({ userId: findUser.id }, process.env.SECRET_KEY, {expiresIn: "1h"});
	console.log('qehfwhfr',password,findUser.password)
	let verify =await verifyPassword(password,findUser.password);
	findUser.token = token;
	await findUser.save();
	if (!verify) {
		return res.status(400).json({
			status: false,
			message: "Invalid password",
		});
	}
	return res.status(200).json({
		status: true,
		message: "User logged in successfully",
		token,
	});
});

module.exports.createTodo=asyncHandler(async(req,res)=>{
  const{task,priority,status}=req.body
  const userId=req.userId
  console.log("this is userId",userId,req.body)
let createdTodo=await Todo.create({
	task,priority,status,user:userId
})
return res.status(201).json({
	status:true,
	message:"Todo created successfully",
	response:createdTodo
})

})

module.exports.updateTodo = asyncHandler(async (req, res) => {
	const {todoId}=req.params
	console.log("jwdgwudg",todoId,req.body)
		const {  task,priority,status } = req.body;
			const updatedTodo = await Todo.findByIdAndUpdate(
	  todoId,
	  { task,priority,status },
	  { new: true } 
	);  
	if (updatedTodo) {
	  return res.status(200).json({
		status: true,
		message: "Task updated successfully",
		response: updatedTodo
	  });
	} else {
	  return res.status(404).json({
		status: false,
		message: "Task not found"
	  });
	}
  });


  module.exports.getTodoList=asyncHandler(async(req,res)=>{
	const {userId}=req.userId
	const todoList=await Todo.find({user:userId})
  return res.status(200).json({
	status:true,
	message:"Todo list",
	response:todoList
  })
  })

  module.exports.deleteTodo = asyncHandler(async (req, res) => {
	const { todoId } = req.params;
	const deletedTodo = await Todo.findByIdAndDelete(todoId);
  	if (deletedTodo) {
	  return res.status(200).json({
		status: true,
		message: "Task deleted successfully",
		response: deletedTodo
	  });
	} else {
	  return res.status(404).json({
		status: false,
		message: "Task not found"
	  });
	}
  });