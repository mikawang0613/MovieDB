var mongoose = require("mongoose");
var Campground = require("./model/movie");
var Comment   = require("./model/comment");
 
var data = [
    {
        name: "Unbelievable", 
        image: "https://mr.comingsoon.it/rsz/serietv/serie/3027/3027.jpg?preset=pstr300",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff76",
            username: "Jack"
        }
    },
    {
        name: "Queen's Gambit ", 
        image: "https://habituallychic.luxury/wp-content/uploads/2020/11/the-queens-gambit-netflix-habituallychic-001-1024x1024.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff71",
            username: "Jill"
        }
    },
    {
        name: "The Undoing", 
        image: "https://m.media-amazon.com/images/M/MV5BNzY5YTcxMWYtYjFkZi00ZmI3LThmYjgtMzY0YjQzZWFkNzQ4XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        author:{
            id : "588c2e092403d111454fff77",
            username: "Jane"
        }
    }
]
 
function seedDB(){
   //Remove all movies
   Campground.deleteMany({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed movies!");
        Comment.deleteMany({}, function(err) {
            if (err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few movies
            data.forEach(function(seed){
                Campground.create(seed, function(err, movie){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a movie");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author:{
                                    id : "588c2e092403d111454fff76",
                                    username: "Jack"
                                }
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    movie.comments.push(comment);
                                    movie.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        })
    }); 
    //add a few comments
}

module.exports = seedDB;