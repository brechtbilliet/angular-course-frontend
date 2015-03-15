(function() {
	'use strict';

	function Service($rootScope, CONFIG) {
		var activePromises = 0,
			isBusy =false;
		return {
			handle: handle
		};

		function handle(promise) {
			activePromises ++;
			if(activePromises > 0 && !isBusy){
				startBusy();
			}
			promise.then(promiseHandled, promiseHandled);
		}

		function promiseHandled(){
			activePromises--;
			if(activePromises === 0){
				stopBusy();
			}
		}

		function startBusy(){
			isBusy = true;
			$rootScope.$broadcast(CONFIG.messages.pageIsBusyRequest);
		}

		function stopBusy(){
			isBusy = false;
			$rootScope.$broadcast(CONFIG.messages.pageIsNotBusyRequest);
		}
	}
	Service.$inject = ['$rootScope', 'CONFIG'];
	angular.module('app').factory('busyHandlerService', Service);
}());