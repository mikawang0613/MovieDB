const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema");
const Campground = require("../schema/movieSchema");
const middleware = require("../middleware");


var localUser = "";
// User profile
router.get("/profile", middleware.isLoggedIn, (req, res) => {
    Campground.find().where("author.id").equals(req.user).exec((err, movies) => {
        if (err) {
            req.flash("error", "Something went wrong...");
            res.redirect("/movies");
        } else { res.render("profile",{user: req.user, movies: movies})}
    });

});


// show edit form
router.get("/profile/edit", middleware.isLoggedIn, (req, res) => {
    this.localUser = req.user;
    res.render("editProfile", { user: req.user});
});


// update profile
router.put("/profile/edit", middleware.isLoggedIn, (req, res) => {
    console.log(req.body)
    User.findByIdAndUpdate(this.localUser._id, req.body.user, (err, updatedUser) => {
        res.redirect("/profile");
    });
});



// User profile
router.get("/profile/:id", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err || !foundUser) {
            req.flash("error", "Something went wrong...");
            res.redirect("/movies");
        }
        else{
            if (!req.user) {
                Campground.find().where("author.id").equals(foundUser._id).exec((err, movies) => {
                    if (err) {
                        req.flash("error", "Something went wrong...");
                        res.redirect("/movies");
                    } else { res.render("profileForOthers",{user: foundUser, movies: movies})}
                });
            }
            else if (req.params.id !== req.user._id) {
                Campground.find().where("author.id").equals(foundUser._id).exec((err, movies) => {
                    if (err) {
                        req.flash("error", "Something went wrong...");
                        res.redirect("/movies");
                    } else { res.render("profileForOthers",{user: foundUser, movies: movies})}
                });
            }
            else {
                Campground.find().where("author.id").equals(foundUser._id).exec((err, movies) => {
                    if (err) {
                        req.flash("error", "Something went wrong...");
                        res.redirect("/movies");
                    } else { res.render("profile",{user: foundUser, movies: movies})}
                });
            }
        }
    });
});

// show edit form
router.get("/profile/:id/edit", (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err || !foundUser) { return res.redirect("back"); }
        if (foundUser._id.equals(req.user._id)) {
            res.render("editProfile", { user: foundUser });
        } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("back");
        }
    });
});


// update profile
router.put("/profile/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body.user, (err, updatedUser) => {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate email
                req.flash("error", "That email has already been registered.");
                return res.redirect("/users" + req.params.id);
            }
            // Some other error
            req.flash("error", "Something went wrong...");
            return res.redirect("/users" + req.params.id);
        }
        if (updatedUser._id.equals(req.user._id)) {
            res.redirect("/users/" + req.params.id);
        } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("/movies");
        }
    });
});

module.exports = router;
