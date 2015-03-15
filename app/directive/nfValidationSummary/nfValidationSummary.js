(function() {
	'use strict';

	function Directive(CONFIG) {
		function link(scope, element, attr) {
			
		}
		return {
			restrict: 'E',
			templateUrl: 'app/directive/nfValidationSummary/nfValidationSummary.html',
			link: link,
			scope: {
				validationErrors: '='
			}
		};
	}
	Directive.$inject = ['CONFIG'];
	angular.module('app').directive('nfValidationSummary', Directive);
}());