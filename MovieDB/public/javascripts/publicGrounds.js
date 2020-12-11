const api_key =  "838cc1c9e302f1b74485c014c60dd197"
const baseUrl = 'https://api.themoviedb.org/3/';

$(document).ready(() => {
	$('#searchForm').on('submit',(e) => {
		let searchText = $('#searchText').val();
		getMovies(searchText);
		e.preventDefault();
	});
});

function getMovies(searchText){
	axios.get('https://api.themoviedb.org/3/search/movie?api_key=838cc1c9e302f1b74485c014c60dd197&language=en-US&query=' + searchText)
	.then((response)=>{
		console.log(response);
		let movies = response.data.results;
		let output = '';
		$.each(movies,(index,movie) => {
			output+=`
			<div class="col-sm-3">
			<div class = "well text-center">
			<img src = 'https://image.tmdb.org/t/p/w200/${movie.poster_path}' class="thumbnail">
			<h5>${movie.title} </h5>
			<a onClick="movieSelected('${movie.id}')" class = "btn btn-primary" href = "#"> Movie details </a>
			</div>
			</div>
			`;
		});
		$('#movies').html(output);
	})
	.catch((err) => {
		console.log(err);
	});
}

function movieSelected(id){
	sessionStorage.setItem('movieId',id)
	window.location.assign("movie");
	return false;
}

function getMovie(){
	let movieId = sessionStorage.getItem("movieId");

	axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=838cc1c9e302f1b74485c014c60dd197')
	.then((response)=>{
		console.log(response);
		let movie = response.data;

		let output = `
		 <h2>${movie.title} </h2>
		<div class = "container movie-page">
			<div class = "row">
			<div class = "col-md-4">
			<img src = 'https://image.tmdb.org/t/p/w200/${movie.poster_path}' class="thumbnail">
			</div>
			<div class = "col-md-8">
			<ul class="list-group bg-dark text-white">
			<li class = "list-group-item bg-dark">
			<strong>Genre:</strong>
		`

			for(var i = 0; i < 2; i++){
				output += `
				${movie.genres[i].name} , 
				`
				output+=`${movie.genres[2].name}`
			};

		output += `
		</li>
		<li class="list-group-item bg-dark"><strong>Released:</strong> ${movie.release_date}</li>
		<li class="list-group-item  bg-dark"><strong>Rating:</strong> ${movie.vote_average} / 10</li>
		</ul>
		<hr class = "bg-dark">

		<a href = ${movie.homepage} class = "btn btn-secondary"> View movie </a>
		<a href="/search" class="btn btn-primary">Back to search</a>
		</div>
		<p>${movie.overview} </p>
		</div>

		<a onClick="commentSelected('${movie.title}')" class = "btn btn-primary" href = "#"> Add comment </a>
		`;

		$('#movie').html(output)
	})
	.catch((err) => {
		console.log(err);
		});
	}


	function commentSelected(title){
		sessionStorage.setItem('commentTitle',title)
		window.location.assign("apicomment");
		return false;
	}

	function createCommentForApi(){
		let movieTitle = sessionStorage.getItem("commentTitle");
		let movieId = sessionStorage.getItem("movieId");

		let output = `
		<div class = "container">
		<h2 style="text-align:center">Add Comment for ${movieTitle}</h2>
		<div style ="width:50%; margin:25px auto;">
		<form action="/apicomment/${movieId}" method="post">
		<div class="form-group">
		<div class="form-group">
			<input class="form-control" type="text" name="comment[text]" placeholder = "text" autocomplete="off" required />
		</div>
		<div class="form-group">
		<a href = "/movie/${movieId}" class = "btn btn-primary">
			Submit!
		</a>
		</div>
		</div>
		</form>
		<a href="/movie"> Back </a>
		</div>
		</div>
		`
		$('#comments').html(output);

	}


	// function commentForMovie(){
	// 	// sessionStorage.setItem('movieId',id)
	// 	window.location.assign("apicomment");
	// 	return false;
	// }

