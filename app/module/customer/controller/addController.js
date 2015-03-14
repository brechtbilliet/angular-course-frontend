(function(){
	'use strict';
	function Constructor($location, customerService, CONFIG, toastr){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;

		function workingCopyChanged(){
			vm.dirty = !angular.equals(vm.workingCopy, vm.originalCopy);
		}

		function save(){
			function onSuccess(response){
				$location.path('customers');
				toastr.success(CONFIG.toasts.successfullySavedData);
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToSaveData);

			}
			customerService.add(vm.workingCopy).then(onSuccess, onFail);
		}
		function cancel(){
			$location.path('customers');
		}
	
		function initVm(){
			vm.dirty = false;
			vm.workingCopy = customerService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
	}
	Constructor.$inject = ['$location', 'customerService', 'CONFIG', 'toastr'];
	angular.module('app.customer').controller('customer_addController', Constructor);
}());