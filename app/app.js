(function(){
	'use strict';
	var app = angular.module('app', ['app.home', 'app.about', 'app.customer', 'app.login', 'app.project', 'ngRoute']);
	// register our dependencies
	app.constant('_', _);
	app.constant('toastr', toastr);

	app.run(function(){
	});
}());