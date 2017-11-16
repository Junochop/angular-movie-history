'use strict';

app.controller("RatedCtrl", function($rootScope, $scope, MovieService){
	$scope.movies =[];

	const getMovies = () => {
		MovieService.getRatedMovies($rootScope.uid).then((results) => { //load on page loade 
		$scope.movies = results;
		}).catch((err) => {
		console.log("error in the get rated", err);
		});
	};

	getMovies();
	

	$scope.deleteMovie = (movieId) => {
		MovieService.deleteMovie(movieId).then(()=>{
			getMovies();
		}).catch((err) => {
		console.log("error in the get delete", err);
	});
	};

});