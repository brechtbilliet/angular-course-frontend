(function() {
	'use strict';

	function Directive(CONFIG) {
		function link(scope, element, attr) {
			scope.showSpinner = false;

			function onPageIsBusyRequest() {
				scope.showSpinner = true;
			}

			function onPageIsNotBusyRequest() {
				scope.showSpinner = false;
			}
			scope.$on(CONFIG.messages.pageIsBusyRequest, onPageIsBusyRequest);
			scope.$on(CONFIG.messages.pageIsNotBusyRequest, onPageIsNotBusyRequest);
		}
		return {
			restrict: 'E',
			templateUrl: 'app/directive/nfSpinner/nfSpinner.html',
			link: link
		};
	}
	Directive.$inject = ['CONFIG'];
	angular.module('app').directive('nfSpinner', Directive);
}());