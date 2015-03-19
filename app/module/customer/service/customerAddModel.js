(function() {
	'use strict';

	function Implementation(preventLeaveService, CONFIG, toastr, customerService) {
		var model = initModel();
		return {
			resetModel: resetModel,
			model: model,
			workingCopyChanged: workingCopyChanged,
			save: save,
			cancel: cancel
		};

		function initModel() {
			return {
				validationErrors: null,
				dirty: false,
				workingCopy: null,
				originalCopy: null
			};
		}

		function resetModel() {
			model.validationErrors = null;
			model.dirty = false;
			model.workingCopy = null;
			model.originalCopy = null;
			preventLeaveService.allow();
			loadData();
		}

		function loadData(){
			model.originalCopy = customerService.createEmpty();
			model.workingCopy = angular.copy(model.originalCopy);
		}

		function workingCopyChanged() {
			model.dirty = !angular.equals(model.workingCopy, model.originalCopy);
			if (model.dirty) {
				preventLeaveService.prevent(CONFIG.preventReasons.dirty);
			} else {
				preventLeaveService.allow();
			}
		}

		function save() {
			function onSuccess(response) {
				resetModel();
				toastr.success(CONFIG.toasts.successfullySavedData);
			}

			function onFail(response) {
				if (response.status === 400) {
					model.validationErrors = response.data.modelState;
				} else {
					toastr.error(CONFIG.toasts.failedToSaveData);
				}

			}
			return customerService.add(model.workingCopy).then(onSuccess, onFail);
		}

		function cancel() {
			resetModel();
		}
		resetModel();
	}
	Implementation.$inject = ['preventLeaveService', 'CONFIG', 'toastr', 'customerService'];
	angular.module('app.customer').service('customerAddModel', Implementation);
}());