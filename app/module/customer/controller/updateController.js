(function() {
	'use strict';

	function Constructor($location, $routeParams, customerUpdateModel) {
		var vm = this;

		vm.save = save;
		vm.workingCopyChanged = workingCopyChanged;
		vm.cancel = cancel;
		vm.remove = remove;

		function remove(){
			function onSuccess(){
				$location.path('customers');
			}
			customerUpdateModel.remove($routeParams.id).then(onSuccess);
		}

		function save(){
			function onSuccess(){
				$location.path('customers');
			}
			customerUpdateModel.save().then(onSuccess);
		}

		function workingCopyChanged(){
			customerUpdateModel.workingCopyChanged();
		}

		function cancel() {
			customerUpdateModel.cancel();
			$location.path('customers');
		}

		function initVm() {
			vm.model = customerUpdateModel.model;
			customerUpdateModel.loadData($routeParams.id);
		}
		initVm();
	}
	Constructor.$inject = ['$location', '$routeParams', 'customerUpdateModel'];
	angular.module('app.customer').controller('customer_updateController', Constructor);
}());