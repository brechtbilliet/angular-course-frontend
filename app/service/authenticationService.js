(function() {
	'use strict';

	function Service($http, $window, $location, CONFIG, $q) {
		var authenticationObj = getAuthenticationObject();
		if(!authenticationObj){
			authenticationObj = {
				firstName: null,
				lastName: null
			};
		}
		var authenticatedModel = {
			authenticated: isAuthenticated(),
			firstName: authenticationObj.firstName || '',
			lastName: authenticationObj.lastName || ''
		};
		return {
			authenticatedModel: authenticatedModel,
			authenticate: authenticate,
			register: register,
			isAuthenticated: isAuthenticated,
			getAuthenticationObject: getAuthenticationObject,
			logout: logout
		};

		function logout() {
			authenticatedModel.authenticated = false;
			$window.localStorage.removeItem('authentication');
			$location.path('/login');
		}

		function authenticate(model) {
			function onSuccess(response) {
				var authenticationObj = response.data;
				$window.localStorage.setItem('authentication', JSON.stringify(authenticationObj));
				authenticatedModel.authenticated = true;
				authenticatedModel.lastName = authenticationObj.lastName;
				authenticatedModel.firstName = authenticationObj.firstName;
				$location.path('/');
			}

			function onFail(response) {

			}
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: CONFIG.restUrl + 'authentication/login',
				data: model
			}).then(onSuccess, onFail);
			return deferred.promise;
		}

		function isAuthenticated() {
			return getAuthenticationObject() !== null;
		}

		function register(model) {
			function onSuccess(response) {
				var authenticationObj = response.data;
				$window.localStorage.setItem('authentication', JSON.stringify(authenticationObj));
				authenticatedModel.authenticated = true;
				authenticatedModel.lastName = authenticationObj.lastName;
				authenticatedModel.firstName = authenticationObj.firstName;
				$location.path('/');
			}

			function onFail(response) {

			}
			var deferred = $q.defer();
			$http({
				method: 'POST',
				url: CONFIG.restUrl + 'authentication/register',
				data: model
			}).then(onSuccess, onFail);
			return deferred.promise;
		}

		function getAuthenticationObject() {
			var authentication = $window.localStorage.getItem('authentication');
			return JSON.parse(authentication) || null;
		}

	}
	Service.$inject = ['$http', '$window', '$location', 'CONFIG', '$q'];
	angular.module('app').factory('authenticationService', Service);
}());