(function() {
	'use strict';

	function Directive() {
		function link(scope, element, attr) {
			element.focus();
		
		}
		return {
			restrict: 'A',
			link: link
		};
	}
	Directive.$inject = [];
	angular.module('app').directive('nfAutoFocus', Directive);
}());