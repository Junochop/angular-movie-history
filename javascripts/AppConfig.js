'use strict'
//app config runs one time. no fat arrow
app.config(function($routeProvider){
	$routeProvider
		.when("/auth", {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when("/search", {
			templateUrl: 'partials/search.html',
			controller: 'SearchCtrl'
		})
		.when("/wishlist", {
			templateUrl: 'partials/WishlistCtrl.html',
			controller: 'WishlistCtrl'
		})
		.when("/rated", {
			templateUrl: 'partials/rated.html',
			controller: 'RatedCtrl'
		})
		.otherwise('/auth')
});