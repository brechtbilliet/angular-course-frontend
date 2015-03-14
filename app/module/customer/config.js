(function(){
	'use strict';
	var module = angular.module('app.customer', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/customers', {
			controller: 'customer_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/customer/view/index.html'
		})
		.when('/customers/add', {
			controller: 'customer_addControler',
			controllerAs: 'vm',
			templateUrl: 'app/module/customer/view/add.html'
		})
		.when('/customers/:id', {
			controller: 'customer_updateControler',
			controllerAs: 'vm',
			templateUrl: 'app/module/customer/view/update.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());