(function(){
	'use strict';
	function Constructor($location, customerService){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;

		function workingCopyChanged(){
			vm.dirty = !angular.equals(vm.workingCopy, vm.originalCopy);
		}

		function save(){
			$location.path('customers');
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
	Constructor.$inject = ['$location', 'customerService'];
	angular.module('app.customer').controller('customer_addController', Constructor);
}());