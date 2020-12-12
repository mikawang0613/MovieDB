var express = require("express");
var app = express();
var bodyParser = require("body-parser");
// var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var movie=require("./schema/movieSchema");
var seedDB=require("./seeds");
var Comment=require("./schema/commentSchema");
var User=require("./schema/userSchema")

seedDB();
// mongoose.connect("mongodb://localhost/Yelp_camp",{ useUnifiedTopology: true,  useNewUrlParser: true });



const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://amanda:woaics5610@cluster0.cage7.mongodb.net/moviedb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var commentRoutes = require("./controller/comments"),
	movieRoutes = require("./controller/movies"),
	userRoute = require("./controller/user"),
	indexRoutes = require("./controller/index")

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret:"What's our team number",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success=req.flash("success");
	next();
});

app.use(indexRoutes);
app.use(commentRoutes);
app.use(movieRoutes);
app.use(userRoute);

app.listen(3000, function(){
 console.log("App listening on port 3000!");
});

