(function() {
	'use strict';

	function Constructor($location, $routeParams, customerService, CONFIG, toastr, preventLeaveService) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;
		vm.remove = remove;

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
			customerService.update($routeParams.id, vm.workingCopy).then(onSuccess, onFail);
		}

		function cancel() {
			preventLeaveService.allow();
			$location.path('customers');
		}

		function remove() {
			function onSuccess(response) {
				toastr.success(CONFIG.toasts.successfullyRemovedData);
				cancel();
			}

			function onFail(response) {
				preventLeaveService.allow();
				toastr.error(CONFIG.toasts.failedToRemoveData);
			}
			customerService.remove($routeParams.id).then(onSuccess, onFail);
		}

		function loadData() {
			function onSuccess(response) {
				vm.originalCopy = response.data;
				vm.workingCopy = angular.copy(vm.originalCopy);
			}

			function onFail(response) {
				toastr.error(CONFIG.toasts.failedToLoadData);

			}
			customerService.getById($routeParams.id).then(onSuccess, onFail);
		}

		function initVm() {
			vm.validationErrors = null;
			vm.dirty = false;
			vm.workingCopy = customerService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
		loadData();
	}
	Constructor.$inject = ['$location', '$routeParams', 'customerService', 'CONFIG', 'toastr', 'preventLeaveService'];
	angular.module('app.customer').controller('customer_updateController', Constructor);
}());