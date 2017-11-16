'use strict';

app.controller("WishlistCtrl", function($rootScope, $scope, MovieService){
	
	MovieService.getWishListMovies($rootScope.uid).then((results) => { //load on page loade 
		$scope.movies = results;
	}).catch((err) => {
		console.log("error in the get rated", err);
	});

});