(function(){
	'use strict';
	var app = angular.module('app', ['app.home', 'app.about', 'app.customer', 'app.login', 'app.project', 'ngRoute']);
	// register our dependencies
	app.constant('_', _);
	app.constant('toastr', toastr);

	app.constant('CONFIG', {
		restUrl: 'http://nflow-angular-course.azurewebsites.net/',
		toasts:{
			successfullySavedData: 'Successfully saved data',
			failedToSaveData: 'Failed to save data',
			successfullyRemovedData: 'Successfully removed data',
			failedToRemoveData: 'Faeild to remove data',
			failedToLoadData: 'Failed to load data'
		}
	});

	app.run(['$rootScope', 'authenticationService', '$location', function($rootScope, authenticationService, $location){
		$rootScope.$on('$locationChangeStart', function(){
			var currentPath = $location.path();
			if(authenticationService.isAuthenticated() === false && currentPath !== '/register'){
				$location.path('/login');
			}
		});
	}]);
}());