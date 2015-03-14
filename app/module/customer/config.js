(function(){
	'use strict';
	var module = angular.module('app.customer', ['ngRoute']);

	function config($routeProvider){
		$routeProvider.when('/customers', {
			controller: 'customer_indexController',
			controllerAs: 'vm',
			templateUrl: 'app/module/customer/view/index.html'
		});
	
	}
	config.$inject = ['$routeProvider'];
	module.config(config);
}());