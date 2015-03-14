(function(){
	'use strict';
	function Constructor($location, customerService){
		var vm = this;
		vm.update = update;
		vm.add = add;

		function update(customer){
			$location.path('customers/' + customer.id);
		}

		function add(){
			$location.path('customers/add');
		}

		function loadData(){
			function onSuccess(response){
				vm.gridData = response.data;
			}
			function onFail(response){
			}
			customerService.getAll().then(onSuccess, onFail);
		}
		function initVm(){
			vm.gridData = null;
		}
		initVm();
		loadData();
	}
	Constructor.$inject = ['$location', 'customerService'];
	angular.module('app.customer').controller('customer_indexController', Constructor);
}());