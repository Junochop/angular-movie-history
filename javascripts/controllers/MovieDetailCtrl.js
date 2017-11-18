'use strict';
app.controller("MovieDetailCtrl", function($routeParams, $scope, MovieService){
	$scope.movie = {};
	console.log("MovieID",$routeParams.id);

	const getMovie = () => {
     MovieService.getSingleMovie($routeParams.id).then((results)=> {
		$scope.movie = results.data;
	}).catch((err)=> {
		console.log("error in get signle", err);

	});

	};

	getMovie();
	

	$scope.switchWatched = (movie) => {
	movie.isWatched = true;
	let updateMovie = MovieService.createMovieObject(movie);
	
	MovieService.updateMovie(updateMovie, $routeParams.id).then ((result)=> {
		//getMovies();
		console.log("result", result);

	}).catch((err) => {
		console.log("error in updateMovie", err);
	});
};

 $scope.starChange = (event, movie) => {
    if(event.rating){
      movie.rating = event.rating;
      let updatedMovie = MovieService.createMovieObject(movie);
      MovieService.updateMovie(updatedMovie, $routeParams.id).then(() =>{
       // getMovies();
      }).catch((err) =>{
        console.log("error in updateMovie", err);
      });
    }
  };
});