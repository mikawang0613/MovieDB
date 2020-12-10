var express = require("express");
var router = express.Router();
var Campground=require("../model/movie");
var middleware=require("../middleware/index.js");
const { render } = require("ejs");


//INDEX - show all movies
router.get("/movies",function(req,res){
	Campground.find({},function(err,allCampground){
		if(err){
			console.log(err);
		}else{
			res.render("index", {movie:allCampground});
		}
	});
});

router.post("/movies",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	var genere =req.body.genere;
	var image = req.body.image;
	var description = req.body.description
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newCampground = {name:name,image:image,description:description,author:author};
	Campground.create(newCampground,function(err,newlyCreated){
		if(err){
		   console.log(err);
		   }else{
			   console.log(newlyCreated);
			   res.redirect("/movies");
		   }
	});
});

router.get("/movie/new",middleware.isLoggedIn,function(req,res){
	res.render("new.ejs")
})

router.get("/movie",function(req,res){
	res.render("movie.ejs")
})


//SHOW -show more info about one campround
router.get("/movie/:id",function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> get");
	//find the movie with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			console.log(foundCampground);
			res.render("show",{movie:foundCampground});
	   }
	});
});

//EDIT
router.get("/movie/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> edit");
	Campground.findById(req.params.id,function(err,findCampground){
		res.render("edit",{movie:findCampground});
	});
	
  });
	

router.put("/movie/:id",middleware.checkCampgroundOwnership,function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> put");
	Campground.findByIdAndUpdate(req.params.id,req.body.movie,function(err,UpdateCampground){
		if(err){
			res.redirect("/movies");
		}else{
			res.redirect("/movie/" + req.params.id);
		}
	});
});


//Destroy Campground
router.delete("/movie/:id",middleware.checkCampgroundOwnership,function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> delete");
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/movies");
		}else{
			res.redirect("/movies");
		}
	});
});



module.exports = router;
