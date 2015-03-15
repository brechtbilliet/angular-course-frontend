(function() {
	'use strict';
	var app = angular.module('app', ['app.home', 'app.about', 'app.customer', 'app.login', 'app.project', 'ngRoute']);
	// register our dependencies
	app.constant('_', _);
	app.constant('toastr', toastr);

	app.constant('CONFIG', {
		restUrl: 'http://nflow-angular-course.azurewebsites.net/',
		toasts: {
			successfullySavedData: 'Successfully saved data',
			failedToSaveData: 'Failed to save data',
			successfullyRemovedData: 'Successfully removed data',
			failedToRemoveData: 'Faeild to remove data',
			failedToLoadData: 'Failed to load data'
		},
		preventReasons:{
			dirty: 'The form you have filled in is dirty, Cancel or save your changes'
		}
	});
	app.config(['$httpProvider',
		function($httpProvider) {
			$httpProvider.defaults.useXDomain = true;
			delete $httpProvider.defaults.headers.common['X-Requested-With'];

			var requestInterceptor = [
				'$q', '$window',
				function($q, $window) {
					return {
						request: function(config) {
							var authenticationObject = $window.localStorage.getItem('authentication');
							if (authenticationObject) {
								config.headers.Authorization = 'Bearer ' + JSON.parse(authenticationObject).token;
							}
							return config;
						},
						responseError: function(response) {
							return $q.reject(response);
						}
					};
				}
			];
			$httpProvider.interceptors.push(requestInterceptor);
		}
	]);
	app.run(['$rootScope', 'authenticationService', '$location', 'preventLeaveService', function($rootScope, authenticationService, $location, preventLeaveService) {
		preventLeaveService.init();
		$rootScope.$on('$locationChangeStart', function() {
			var currentPath = $location.path();
			if (authenticationService.isAuthenticated() === false && currentPath !== '/register') {
				$location.path('/login');
			}
		});
	}]);
}());