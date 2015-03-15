(function() {
	'use strict';

	function Constructor($location, customerService, CONFIG, toastr, preventLeaveService) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;

		function workingCopyChanged() {
			vm.dirty = !angular.equals(vm.workingCopy, vm.originalCopy);
			if (vm.dirty) {
				preventLeaveService.prevent(CONFIG.preventReasons.dirty);
			} else {
				preventLeaveService.allow();
			}
		}

		function save() {
			function onSuccess(response) {
				preventLeaveService.allow();
				$location.path('customers');
				toastr.success(CONFIG.toasts.successfullySavedData);
			}

			function onFail(response) {
				if(response.status === 400){
					vm.validationErrors = response.data.modelState;
				}
				else{
					toastr.error(CONFIG.toasts.failedToSaveData);
				}

			}
			customerService.add(vm.workingCopy).then(onSuccess, onFail);
		}

		function cancel() {
			$location.path('customers');
			preventLeaveService.allow();
		}

		function initVm() {
			vm.validationErrors = null;
			vm.dirty = false;
			vm.workingCopy = customerService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
	}
	Constructor.$inject = ['$location', 'customerService', 'CONFIG', 'toastr', 'preventLeaveService'];
	angular.module('app.customer').controller('customer_addController', Constructor);
}());