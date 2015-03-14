(function() {
	'use strict';

	function Constructor(authenticationService) {
		var vm = this;
		vm.login = login;

		function login() {
			function onSuccess(response) {
				
			}

			function onFail(response) {

			}
			authenticationService.authenticate(vm.workingCopy).then(onSuccess, onFail);
		}

		function initVm() {
			vm.workingCopy = {
				emailAddress: '',
				password: ''
			};
		}
		initVm();
	}
	Constructor.$inject = ['authenticationService'];
	angular.module('app.login').controller('login_indexController', Constructor);
}());