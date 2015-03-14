(function(){
	'use strict';
	var app = angular.module('app', ['app.home', 'app.about', 'app.customer', 'app.login', 'app.project', 'ngRoute']);
	// register our dependencies
	app.constant('_', _);
	app.constant('toastr', toastr);

	app.constant('CONFIG', {
		toasts:{
			successfullySavedData: 'Successfully saved data',
			failedToSaveData: 'Failed to save data',
			successfullyRemovedData: 'Successfully removed data',
			failedToRemoveData: 'Faeild to remove data',
			failedToLoadData: 'Failed to load data'
		}
	});

	app.run(function(){
	});
}());