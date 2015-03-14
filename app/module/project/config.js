(function(){
	'use strict';
	var module = angular.module('app.project', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/projects', {
			controller: 'project_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/project/view/index.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());