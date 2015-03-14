(function() {
	'use strict';

	function service($q, $timeout) {
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
				id: null,
				name: '',
				description: ''
			};
		}

		function getAll() {
			var returnVal = [
				{
					id: 1,
					name: 'dummy project 1',
					description: 'dummy project description'
				},
				{
					id: 2,
					name: 'dummy project 2',
					description: 'dummy project description'
				},
				{
					id: 3,
					name: 'dummy project 3',
					description: 'dummy project description'
				}
			];

			// this is to mock an $http request
			return returnFakeCall(returnVal);
		}

		function returnFakeCall(obj) {
			var deferred = $q.defer();
			$timeout(function() {
				deferred.resolve({
					data: obj
				});
			}, 1000);
			return deferred.promise;
		}

		function getById() {
			return returnFakeCall({
				id: 2,
				name: 'dummy project 2',
				description: 'dummy project description'
			});
		}

		function update(id, model) {
			return returnFakeCall();
		}

		function add(model) {
			return returnFakeCall();
		}

		function remove(id) {
			return returnFakeCall();
		}
	}
	service.$inject = ['$q', '$timeout'];
	angular.module('app.project').factory('projectService', service);
}());