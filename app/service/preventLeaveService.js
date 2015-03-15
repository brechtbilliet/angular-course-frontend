(function() {
	'use strict';

	function Service($rootScope, toastr) {
		var preventLeave = false;
		var reason = null;
		return {
			init: init,
			allow: allow,
			prevent: prevent,
			canLeave: canLeave
		};
		function init(){
			function onLocationChangeStart(e){
				if(preventLeave){
					e.preventDefault();
					toastr.warning(reason);
				}
			}
			$rootScope.$on('$locationChangeStart', onLocationChangeStart);
		}

		function allow(){
			reason = null;
			preventLeave = false;
		}
		function prevent(passedReason){
			preventLeave = true;
			reason = passedReason;
		}
		function canLeave(){
			return !preventLeave;
		}
	}
	Service.$inject = ['$rootScope', 'toastr'];
	angular.module('app').factory('preventLeaveService', Service);
}());