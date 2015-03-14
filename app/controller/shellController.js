(function(){
	'use strict';
	function Constructor(){
		var vm = this;

		function initVm(){
			vm.menuItems = [
				{
					label: 'Home',
					url: '/'
				},
				{
					label: 'Customers',
					url: '/customers'
				},
				{
					label: 'Projects',
					url: '/projects'
				},
				{
					label: 'About',
					url: '/about'
				}
			];
		}
		initVm();
	}
	angular.module('app').controller('shellController', Constructor);
}());