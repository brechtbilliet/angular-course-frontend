(function() {
	'use strict';

	function Constructor($location, customerAddModel) {
		var vm = this;

		vm.save = save;
		vm.workingCopyChanged = workingCopyChanged;
		vm.cancel = cancel;

		function save(){
			function onSuccess(){
				$location.path('customers');
			}
			customerAddModel.save().then(onSuccess);
		}

		function workingCopyChanged(){
			customerAddModel.workingCopyChanged();
		}

		function cancel() {
			customerAddModel.cancel();
			$location.path('customers');
		}

		function initVm() {
			vm.model = customerAddModel.model;
		}
		initVm();
	}
	Constructor.$inject = ['$location',  'customerAddModel'];
	angular.module('app.customer').controller('customer_addController', Constructor);
}());