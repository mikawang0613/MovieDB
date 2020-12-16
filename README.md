# This is the group project of Team#15 for CS5610.
## Heroku Link:  
https://arcane-tor-97561.herokuapp.com/

## Getting Started:
* Clone or download this repository
* Navigate to MovieDB, store dependencies using **npm install**
* **node app.js** to start, listen at **http://localhost:3000/**

## Highlight Features:
  ### Authentication:
    * User login with username and password
    * User can choose MovieLover or Admin when registering
    * User must log in when making comments or posting movies
  ### Authorization:
    * One cannot manage posts without being authenticated
    * Admins can manage all the movie posts in Movie Lover Community
    * MovieLovers cannot edit or delete posts and comments created by other users
  ### Manage Movie posts with basic functionalities:
    * MovieLovers can create, edit and delete their own posts and comments in Movie Lover Community
    * Admins can can create, edit and delete all the posts in Movie Lover Community
    * MovieLovers and Admins can also comment on the movies(Ex: search, top-favoritate movie in home page) rethrieved from third party API
    * Provide links to related data(related comments) and users(user profiles).
    * Search Movies with third-party API
  ### Manage Profile pages
    * Users can change their personal information after logging in. 
    * Anonymous users can see other users' profile page without sensitive info
    * One's profile page will render all the posted movies 

   
## Built with:
* RESTful routing using express and mongoose
* Passport, passport-local, and passport-local-mongoose for authentication and authorization
* EJS to template and display pages
* Database hosted with MongoDB Atlas
* Bootstrap used to implement responsive web design
* Connect-flash for better error display to users
* Heroku to deploy the website remotely
