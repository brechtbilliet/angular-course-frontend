(function(){
	'use strict';
	function Constructor(menuService){
		var vm = this;

		function initVm(){
			vm.menuItems = menuService.getMenuItems();
		}
		initVm();
	}
	Constructor.$inject =['menuService'];
	angular.module('app').controller('shellController', Constructor);
}());