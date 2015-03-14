(function(){
	'use strict';
	function Constructor(menuService, authenticationService){
		var vm = this;
		vm.logout = logout;

		function logout(){
			authenticationService.logout();
		}

		function initVm(){
			vm.authenticatedModel = authenticationService.authenticatedModel;
			vm.menuItems = menuService.getMenuItems();
		}
		initVm();
	}
	Constructor.$inject =['menuService', 'authenticationService'];
	angular.module('app').controller('shellController', Constructor);
}());