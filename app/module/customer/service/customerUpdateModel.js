(function() {
	'use strict';

	function Implementation(preventLeaveService, CONFIG, toastr, customerService) {
		var model = initModel();
		return {
			resetModel: resetModel,
			model: model,
			workingCopyChanged: workingCopyChanged,
			save: save,
			cancel: cancel,
			remove: remove,
			loadData: loadData
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
		}

		function loadData(id){
			function onSuccess(response){
				model.originalCopy = response.data;
				model.workingCopy = angular.copy(model.originalCopy);
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToLoadData);
			}
			customerService.getById(id).then(onSuccess, onFail);
		}

		function workingCopyChanged() {
			model.dirty = !angular.equals(model.workingCopy, model.originalCopy);
			if (model.dirty) {
				preventLeaveService.prevent(CONFIG.preventReasons.dirty);
			} else {
				preventLeaveService.allow();
			}
		}

		function save(id) {
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
			return customerService.update(id, model.workingCopy).then(onSuccess, onFail);
		}

		function remove(id) {
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
			return customerService.remove(id).then(onSuccess, onFail);
		}

		function cancel() {
			resetModel();
		}
		resetModel();
	}
	Implementation.$inject = ['preventLeaveService', 'CONFIG', 'toastr', 'customerService'];
	angular.module('app.customer').service('customerUpdateModel', Implementation);
}());