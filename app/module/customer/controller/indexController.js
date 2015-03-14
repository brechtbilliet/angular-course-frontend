(function(){
	'use strict';
	function Constructor(customerService){
		var vm = this;

		function loadData(){
			function onSuccess(response){
				vm.gridData = response.data;
			}
			function onFail(response){
			}
			customerService.getAll().then(onSuccess, onFail);
		}
		function initVm(){
			vm.gridData = [];
		}
		initVm();
		loadData();
	}
	Constructor.$inject = ['customerService'];
	angular.module('app.customer').controller('customer_indexController', Constructor);
}());