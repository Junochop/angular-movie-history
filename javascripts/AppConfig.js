'use strict';
let isAuth = (AuthService) => new Promise ((resolve, reject) => {
  if(AuthService.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
});//fancy way to send true or false back from auth service


//app config runs one time. no fat arrow
app.run(function(FIREBASE_CONFIG, tmdbService, AuthService, $rootScope, $location ) {
	firebase.initializeApp(FIREBASE_CONFIG);

	tmdbService.tmdbConfiguration().then((result) => {
		$rootScope.image_url = result.data.images.base_url;
	}).catch((err) => {
		console.log("error in tmdbConfiguration", err);
	});
	//watch method that fires on change of a route.  3 inputs. 
  //event is a change event
  //currRoute is information about your current route
  //prevRoute is information about the route you came from
  $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute ) {
    // checks to see if there is a current user
    var logged = AuthService.isAuthenticated();

    var appTo;

    // to keep error from being thrown on page refresh
    if (currRoute.originalPath) {
      // check if the user is going to the auth page = currRoute.originalPath
      // if user is on auth page then appTo is true
      // if it finds something other than /auth it return a -1 and -1!==-1 so resolves to false

      //currRoute.originalpath ="/search" -1 !== -1. appto = false
      //currRoute.orgiinalPath = "/auth" 0 !== -1. appTo = True
      appTo = currRoute.originalPath.indexOf('/auth') !== -1;
    }

    //if not on /auth page AND not logged in redirect to /auth
    if (!appTo && !logged) {
      event.preventDefault();
      $location.path('/auth');
    }
  });

});

app.config(function($routeProvider){
	$routeProvider
		.when("/auth", {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
			
		})
		.when("/search", {
			templateUrl: 'partials/search.html',
			controller: 'SearchCtrl',
			resolve: {isAuth}//part of ng router resolve isAuth is true
		})
		.when("/wishlist", {
			templateUrl: 'partials/wishlist.html',
			controller: 'WishlistCtrl',
			resolve: {isAuth}
		})
		.when("/rated", {
			templateUrl: 'partials/rated.html',
			controller: 'RatedCtrl',
			resolve: {isAuth}
		})
		.otherwise('/auth');
});