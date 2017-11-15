'use strict';

app.controller("SearchCtrl", function($scope, tmdbService){

	$scope.enterPush = (event) => {
		if(event.keyCode === 13) {
			tmdbService.searchMovies(event.target.value).then((results) => {
		console.log("movies?", results.data.results);
	}).catch((err) => {
		console.log("err in searchMovies", err);
	});
		
		console.log("event", event.target.value);
		}
	};

	
});