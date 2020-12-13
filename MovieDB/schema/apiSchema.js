var mongoose = require("mongoose");
 
var apiSchema = mongoose.Schema({
    _id: Number,
    comments: [],
},{collection:"apiComment"});
 
module.exports = mongoose.model("apiComment", apiSchema);