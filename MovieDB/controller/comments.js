var express = require("express");
var router = express.Router();
var Movie = require("../schema/movieSchema");
var Comment = require("../schema/commentSchema");
var middleware=require("../middleware/index.js");



router.get("/movie/:id/comments/new",middleware.isLoggedIn,function(req,res){
	Movie.findById(req.params.id,function(err,movie){
		if(err){
			console.log(err);
		}else{
			res.render("addComment",{movie:movie});
		}
	});
});


router.post("/movie/:id/comments",middleware.isLoggedIn, function(req, res){
   //lookup movie using ID
   Movie.findById(req.params.id, function(err, movie){
       if(err){
           console.log(err);
           res.redirect("/movies");
       } else {
		 //create new comment
         Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
			   //add username and id to comment
			   //comment.author = req.user
			   comment.author.id = req.user._id;
			   comment.author.username = req.user.username;
			   //save comment
			   comment.save();
               movie.comments.push(comment);
               movie.save();
			   req.flash("success","Successfully added comment");
               res.redirect('/movie/' + movie._id);
           }
        });
       }
   });
});

//comment for api 

// router.get("/movie/:id/api/comment",function(req,res){
// 	res.send("hello")
// })


//Comment edit route
router.get("/movie/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundcomment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit",{movie_id:req.params.id, comment:foundcomment});
		}
	})
});

//Comment Update
router.put("/movie/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/movie/" + req.params.id);
		}
	});
});


//Comment destroy route
router.delete("/movie/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			req.flash("success","Comment deleted");
			res.redirect("/movie/" + req.params.id)
		}
	});
});



module.exports = router;