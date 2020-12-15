var express = require("express");
var router = express.Router();
var Movie=require("../schema/movieSchema");
var ApiComment = require("../schema/apiSchema");
var middleware=require("../middleware/index.js");
const { render } = require("ejs");
var pickedMovieId = "";


//INDEX - show all movies
router.get("/movies",function(req,res){
	Movie.find({},function(err,allCampground){
		if(err){
			console.log(err);
		}else{
			res.render("index", {movie:allCampground});
		}
	});
});

router.post("/movies",middleware.isLoggedIn,function(req,res){
	var name = req.body.name;
	// var genere =req.body.genere;
	var image = req.body.image;
	var description = req.body.description
	var author={
		id:req.user._id,
		username:req.user.username
	}
	var newMovie= {name:name,image:image,description:description,author:author};
	Movie.create(newMovie,function(err,newlyCreated){
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

router.get("/detail",function(req,res){
	res.render("detail.ejs")
})

router.get("/moviepicked/:id",function(req,res){
	console.log("xxxxxxxxxxxxxxxxxxx moviepicked:"+req.params.id);
	pickedMovieId = req.params.id;
	ApiComment.findById(req.params.id).exec(function(err,foundMovie){
		if(err){
			console.log(err);
		}else{
			console.log("xxxxxxxxxxxxxxx foundMovie:");
			console.log(foundMovie);
			if (!foundMovie) {
				res.send([]);
			} else {
				res.send(foundMovie.comments);
			}
	   }
	});
	// comments = ApiComment.findById(movieId);
	// res.send(comments);
	// res.send("weiran");
});

router.get("/search/:id",function(req,res){
	var movie = req.params.id
	// res.render("searchedMovie",{movies:movie})
	res.render("searchedMovie", {query:movie});
})

router.get("/detail/:id",function(req,res){
	res.render("movie.ejs")
})


//SHOW -show more info about one movie
router.get("/movie/:id",function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> get");
	//find the movie with provided ID
	Movie.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
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
	Movie.findById(req.params.id,function(err,findCampground){
		res.render("edit",{movie:findCampground});
	});
	
  });
	

router.put("/movie/:id",middleware.checkCampgroundOwnership,function(req,res){
	console.log(">>>>>>>>>>>>>>>>>>>>> put");
	Movie.findByIdAndUpdate(req.params.id,req.body.movie,function(err,UpdateCampground){
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
	Movie.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/movies");
		}else{
			res.redirect("/movies");
		}
	});
});



module.exports = router;
