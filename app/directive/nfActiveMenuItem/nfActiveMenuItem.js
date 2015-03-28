(function() {
	'use strict';

	function Directive(CONFIG, $rootScope) {
		function link(scope, element, attr) {

			scope.$on('$destroy', onDestroy);
			var unsubscribeEvent = $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);

			function onDestroy(){
				unsubscribeEvent();
			}

			function onRouteChangeSuccess(event,next){
				if('#' + next.$$route.originalPath === scope.href){
					element.parent().addClass('active');
				}
				else{
					element.parent().removeClass('active');
				}

			}
		}
		return {
			restrict: 'A',
			scope:{
				href: '@'
			},
			link: link
		};
	}
	Directive.$inject = ['CONFIG', '$rootScope'];
	angular.module('app').directive('nfActiveMenuItem', Directive);
}());