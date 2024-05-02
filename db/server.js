const mongoose = require("mongoose");
mongoose
	.connect("mongodb://0.0.0.0:27017/mydatabase", {
		useNewUrlParser: true,
		
	})
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((error) => {
		console.error("MongoDB connection error:", error);
	});
