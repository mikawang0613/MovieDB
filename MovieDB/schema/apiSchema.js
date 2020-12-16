var mongoose = require("mongoose");
 
var apiSchema = mongoose.Schema({
    _id: Number,
    comments: [],
    author: {
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
    }
},{collection:"apiComment"});
 
module.exports = mongoose.model("apiComment", apiSchema);