(function(){
	'use strict';
	function Constructor($location, customerService){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;

		function save(){
			$location.path('customers');
		}
		function cancel(){
			$location.path('customers');
		}
	
		function initVm(){
		}
		initVm();
	}
	Constructor.$inject = ['$location', 'customerService'];
	angular.module('app.customer').controller('customer_addController', Constructor);
}());