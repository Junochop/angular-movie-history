'use strict';

app.controller("SearchCtrl", function($rootScope, $scope, $location, MovieService, tmdbService){
	$scope.movies = [];

	const createMovie = (movie) => {
		return{
			"title": movie.title,
			"overview": movie.overview,
			"poster_path": movie.poster_path,
			"rating": 0,
			"isWatched": true,
			"uid": $rootScope.uid
		};
	};

		$scope.saveRated = (tmdbMovie) => {
		console.log("tmdbMovie", tmdbMovie);
		let newMovie = createMovie(tmdbMovie);
		MovieService.postNewMovie(newMovie).then(() => {
			$location.path('/rated');
		}).catch((err) => {
			console.log("error in postNewMovie", err);
		});
	};
			$scope.saveWishlist = (tmdbMovie) => {
		console.log("tmdbMovie", tmdbMovie);
		let newMovie = createMovie(tmdbMovie);
		newMovie.isWatched = false;
		MovieService.postNewMovie(newMovie).then(() => {
			$location.path('/wishlist');
		}).catch((err) => {
			console.log("error in postNewMovie", err);
		});
	};


	$scope.enterPush = (event) => {
		if(event.keyCode === 13) {
		tmdbService.searchMovies(event.target.value).then((results) => {
		$scope.movies = results.data.results;
	}).catch((err) => {
		console.log("err in searchMovies", err);
	});
		
		console.log("event", event.target.value);
		}
	};


	
});