(function() {
	'use strict';

	function Constructor(authenticationService) {
		var vm = this;
		vm.register = register;

		function register() {
			function onSuccess(response) {
			}

			function onFail(response) {

			}
			authenticationService.register(vm.workingCopy).then(onSuccess, onFail);
		}

		function initVm() {
			vm.workingCopy = {
				emailAddress: '',
				password: '',
				confirmPassword: ''
			};
		}
		initVm();
	}
	Constructor.$inject = ['authenticationService'];
	angular.module('app.login').controller('login_registerController', Constructor);
}());