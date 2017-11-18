'use strict';

app.controller("WishlistCtrl", function($rootScope, $scope, MovieService){
  
  const getMovies = () => {
    MovieService.getWishListMovies($rootScope.uid).then((results) =>{
      $scope.movies = results;
    }).catch((err) =>{
      console.log("error in getRatedMovies", err);
    });
  };
  
  getMovies();

  $scope.deleteMovie = (movieId) => {
    MovieService.deleteMovie(movieId).then((result) =>{
      getMovies();
    }).catch((err) =>{
      console.log("error in deleteMovie", err);
    });
  };



$scope.switchWatched = (movie) => {
	movie.isWatched = true;
	let updateMovie = MovieService.createMovieObject(movie);
	MovieService.updateMovie(updateMovie, movie.id).then ((result)=> {
		getMovies();
		console.log("result", result);

	}).catch((err) => {
		console.log("error in updateMovie", err);
	});
};

});