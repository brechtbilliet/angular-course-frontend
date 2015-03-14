(function() {
	'use strict';

	function service($q, $timeout) {
		return {
			getAll: getAll,
			getById: getById,
			update: update,
			add: add,
			remove: remove
		};

		function getAll() {
			var returnVal = [
				{
					id: 1,
					name: 'dummy company 1',
					projects: [],
					city: 'Ghent'
				},
				{
					id: 2,
					name: 'dummy company 2',
					projects: [],
					city: 'Ghent'
				},
				{
					id: 3,
					name: 'dummy company 3',
					projects: [],
					city: 'Ghent'
				}
			];

			// this is to mock an $http request
			var deferred = $q.defer();
			$timeout(function() {
				deferred.resolve({data: returnVal});
			}, 1000);
			return deferred.promise;
		}

		function getById() {
			// not implemented yet
		}

		function update() {
			// not implemented yet
		}

		function add() {
			// not implemented yet
		}

		function remove() {
			// not implemented yet
		}
	}
	service.$inject = ['$q', '$timeout'];
	angular.module('app.customer').factory('customerService', service);
}());