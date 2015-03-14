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
				description: ''
			};
		}

		function getAll() {
			return $http({
				method: 'GET',
				url: CONFIG.restUrl + 'projects'
			});
		}

		function getById(id) {
			return $http({
				method: 'GET',
				url: CONFIG.restUrl + 'projects/' + id
			});
		}

		function update(id, model) {
			return $http({
				method: 'PUT',
				url: CONFIG.restUrl + 'projects/' + id,
				data: model
			});
		}

		function add(model) {
			return $http({
				method: 'POST',
				url: CONFIG.restUrl + 'projects/',
				data:model
			});
		}

		function remove(id) {
			return $http({
				method: 'DELETE',
				url: CONFIG.restUrl + 'projects/' + id
			});
		}
	}
	service.$inject = ['$http', 'CONFIG'];
	angular.module('app.project').factory('projectService', service);
}());