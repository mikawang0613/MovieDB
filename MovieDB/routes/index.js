
var express = require("express");
var router = express.Router();
var flash=require("connect-flash");
var passport=require("passport");
var User = require("../model/user");


router.get("/", function(req,res){
	res.render("landing");
});



//AUTH ROUTES

// show register formmon
router.get("/register", function(req, res){
   res.render("register"); 
});
//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to YelpCamp" + user.username);
           res.redirect("/movies"); 
        });
    });
});

// show login form
router.get("/login", function(req, res){
   res.render("login"); 
});

// handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/movies",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success","you logged out");
   res.redirect("/movies");
});

// search movie
router.get("/search", function(req, res){
    res.render("search"); 
});


module.exports = router;
