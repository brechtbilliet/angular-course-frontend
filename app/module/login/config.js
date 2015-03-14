(function(){
	'use strict';
	var module = angular.module('app.login', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/login', {
			controller: 'login_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/login/view/index.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());