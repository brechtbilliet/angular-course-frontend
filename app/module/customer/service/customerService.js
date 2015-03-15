(function() {
	'use strict';

	function service($http, CONFIG, busyHandlerService) {
		return {
			getAll: getAll,
			getById: getById,
			update: update,
			add: add,
			remove: remove,
			createEmpty: createEmpty
		};

		function createEmpty() {
			return {
				name: '',
				zipCode: '',
				number: '',
				street: '',
				city: '',
				customerId: null
			};
		}

		function getAll() {
			var promise = $http({
				method: 'GET',
				url: CONFIG.restUrl + 'customers'
			});
			busyHandlerService.handle(promise);
			return promise;
		}

		function getById(id) {
			var promise = $http({
				method: 'GET',
				url: CONFIG.restUrl + 'customers/' + id
			});
			busyHandlerService.handle(promise);
			return promise;
		}

		function update(id, model) {
			var promise = $http({
				method: 'PUT',
				url: CONFIG.restUrl + 'customers/' + id,
				data: model
			});
			busyHandlerService.handle(promise);
			return promise;
		}

		function add(model) {
			var promise = $http({
				method: 'POST',
				url: CONFIG.restUrl + 'customers/',
				data:model
			});
			busyHandlerService.handle(promise);
			return promise;
		}

		function remove(id) {
			var promise = $http({
				method: 'DELETE',
				url: CONFIG.restUrl + 'customers/' + id
			});
			busyHandlerService.handle(promise);
			return promise;
		}
	}
	service.$inject = ['$http', 'CONFIG', 'busyHandlerService'];
	angular.module('app.customer').factory('customerService', service);
}());