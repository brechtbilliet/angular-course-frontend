(function() {
	'use strict';

	function Service() {
		return {
			getMenuItems: getMenuItems
		};

		function getMenuItems() {
			return [{
				label: 'Home',
				url: '/'
			}, {
				label: 'Customers',
				url: '/customers'
			}, {
				label: 'Projects',
				url: '/projects'
			}, {
				label: 'About',
				url: '/about'
			}];
		}
	}
	angular.module('app').factory('menuService', Service);
}());