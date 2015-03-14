(function(){
	'use strict';
	var module = angular.module('app.project', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/projects', {
			controller: 'project_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/project/view/index.html'
		})
		.when('/projects/add', {
			controller: 'project_addController',
			controllerAs: 'vm',
			templateUrl: 'app/module/project/view/add.html'
		})
		.when('/projects/:id', {
			controller: 'project_updateController',
			controllerAs: 'vm',
			templateUrl: 'app/module/project/view/update.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());