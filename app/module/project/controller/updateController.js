(function() {
	'use strict';

	function Constructor($location, $routeParams, projectService, CONFIG, toastr, customerService, preventLeaveService) {
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
				$location.path('projects');
				toastr.success(CONFIG.toasts.successfullySavedData);
			}

			function onFail(response) {
				if (response.status === 400) {
					vm.validationErrors = response.data.modelState;
				} else {
					toastr.error(CONFIG.toasts.failedToSaveData);
				}
			}
			projectService.update($routeParams.id, vm.workingCopy).then(onSuccess, onFail);
		}

		function cancel() {
			preventLeaveService.allow();
			$location.path('projects');
		}

		function remove() {
			function onSuccess(response) {
				toastr.success(CONFIG.toasts.successfullyRemovedData);
				cancel();
			}

			function onFail(response) {
				toastr.error(CONFIG.toasts.failedToRemoveData);
			}
			projectService.remove($routeParams.id).then(onSuccess, onFail);
		}

		function loadCustomers() {
			function onSuccess(response) {
				vm.customers = response.data;
			}

			function onFail(response) {
				toastr.error(CONFIG.toasts.failedToLoadData);

			}
			customerService.getAll().then(onSuccess, onFail);
		}

		function loadData() {
			function onSuccess(response) {
				vm.originalCopy = response.data;
				vm.workingCopy = angular.copy(vm.originalCopy);
			}

			function onFail(response) {
				toastr.error(CONFIG.toasts.failedToLoadData);

			}
			projectService.getById($routeParams.id).then(onSuccess, onFail);

		}

		function initVm() {
			vm.validationErrors = null;
			vm.dirty = false;
			vm.customers = [];
			vm.workingCopy = projectService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
		loadData();
		loadCustomers();

	}
	Constructor.$inject = ['$location', '$routeParams', 'projectService', 'CONFIG', 'toastr', 'customerService', 'preventLeaveService'];
	angular.module('app.project').controller('project_updateController', Constructor);
}());