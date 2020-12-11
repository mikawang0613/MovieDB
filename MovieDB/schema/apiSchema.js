var mongoose = require("mongoose");
 
var apiSchema = mongoose.Schema({
    text: String,
    _id: Number,
});
 
module.exports = mongoose.model("apiComment", apiSchema);