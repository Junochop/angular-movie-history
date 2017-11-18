'use strict';

app.controller("SearchCtrl", function($rootScope, $scope, $location, MovieService, tmdbService){
	$scope.movies = [];

	

		$scope.saveRated = (tmdbMovie) => {
		console.log("tmdbMovie", tmdbMovie);
		
		tmdbMovie.uid = $rootScope.uid;
		tmdbMovie.isWatched = true;
		tmdbMovie.rating = 0;
		let newMovie = MovieService.createMovieObject(tmdbMovie);
		MovieService.postNewMovie(newMovie).then(() => {
			$location.path('/rated');
		}).catch((err) => {
			console.log("error in postNewMovie", err);
		});
	};
			$scope.saveWishlist = (tmdbMovie) => {
		tmdbMovie.uid = $rootScope.uid;
		tmdbMovie.isWatched = false;
		tmdbMovie.rating = 0;
		let newMovie = MovieService.createMovieObject(tmdbMovie);
		console.log("tmdbMovie", tmdbMovie);
		//
		
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