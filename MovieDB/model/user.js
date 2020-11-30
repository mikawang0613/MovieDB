var mongoose=require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema= new mongoose.Schema({
	username:String, 
	password:String
});


//add the passportlocalmongoose formula to the UserSchema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);