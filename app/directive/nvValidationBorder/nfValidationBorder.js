(function() {
	'use strict';

	function Directive(CONFIG) {
		function link(scope, element, attr) {
			scope.$watch(attr.validationErrors, function(newValue, oldValue){
				element.removeClass('nf-invalid');
				for(var key in newValue){
					if(key === attr.nfValidationBorder){
						element.addClass('nf-invalid');
					}
				}
			});
		}
		return {
			restrict: 'A',
			link: link,
			scope: true
		};
	}
	Directive.$inject = ['CONFIG'];
	angular.module('app').directive('nfValidationBorder', Directive);
}());