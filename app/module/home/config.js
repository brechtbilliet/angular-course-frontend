(function(){
	'use strict';
	var module = angular.module('app.home', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/', {
			controller: 'home_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/home/view/index.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());