const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			isCompleted: { type: Boolean, default: false },
					},
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref:'User',
                    },
                    status:{
                        type:String
                    },
                    priority:{
                        type:String
                    }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
