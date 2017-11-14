'use strict';

app.controller("AuthCtrl", function($location, $scope,  $rootScope, AuthService){
	$scope.authenticate = () => {

		AuthService.authenticateGoogle().then((result) => {
		$rootScope.uid = result.user.uid;
		$scope.$apply(()=> {
			$location.url("/search");
		});
		
			console.log(result);
		}).catch( (err) =>{
			console.log("error in authencticateGoogle", err);
		});
	};
});