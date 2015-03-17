(function() {
	'use strict';
	var app = angular.module('app', ['app.home', 'app.about', 'app.customer', 'app.login', 'app.project', 'ngRoute', 'angularSpinner', 'snap']);
	// register our dependencies
	app.constant('_', _);
	app.constant('toastr', toastr);
	app.constant('$', $);

	app.constant('CONFIG', {
		restUrl: 'http://nflow-angular-course.azurewebsites.net/',
		messages: {
			pageIsBusyRequest: 'pageIsBusyRequest',
			pageIsNotBusyRequest: 'pageIsNotBusyRequest'
		},
		toasts: {
			successfullySavedData: 'Successfully saved data',
			failedToSaveData: 'Failed to save data',
			successfullyRemovedData: 'Successfully removed data',
			failedToRemoveData: 'Faeild to remove data',
			failedToLoadData: 'Failed to load data'
		},
		preventReasons: {
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
	app.config(['usSpinnerConfigProvider', function(usSpinnerConfigProvider) {
		usSpinnerConfigProvider.setDefaults({
			lines: 11, // The number of lines to draw
			length: 0, // The length of each line
			width: 9, // The line thickness
			radius: 19, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 7, // The rotation offset
			direction: 1, // 1: clockwise, -1: counterclockwise
			color: '#000', // #rgb or #rrggbb or array of colors
			speed: 1.7, // Rounds per second
			trail: 10, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: '50%', // Top position relative to parent
			left: '50%' // Left position relative to parent
		});
	}]);
	app.config(['snapRemoteProvider', function(snapRemoteProvider) {
		snapRemoteProvider.globalOptions.disable = 'right';
	}]);
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