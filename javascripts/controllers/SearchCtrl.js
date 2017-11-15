'use strict';

app.controller("SearchCtrl", function($scope, tmdbService){
	$scope.movies = [];

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