(function() {
	'use strict';

	function service($http, CONFIG) {
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
				city: ''
			};
		}

		function getAll() {
			return $http({
				method: 'GET',
				url: CONFIG.restUrl + 'customers'
			});
		}

		function getById(id) {
			return $http({
				method: 'GET',
				url: CONFIG.restUrl + 'customers/' + id
			});
		}

		function update(id, model) {
			return $http({
				method: 'PUT',
				url: CONFIG.restUrl + 'customers/' + id,
				data: model
			});
		}

		function add(model) {
			return $http({
				method: 'POST',
				url: CONFIG.restUrl + 'customers/',
				data:model
			});
		}

		function remove(id) {
			return $http({
				method: 'DELETE',
				url: CONFIG.restUrl + 'customers/' + id,
				data:model
			});
		}
	}
	service.$inject = ['$http', 'CONFIG'];
	angular.module('app.customer').factory('customerService', service);
}());