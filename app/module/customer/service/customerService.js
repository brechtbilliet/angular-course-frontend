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
		function createEmpty(){
			return{
				id: null,
				name: '',
				city: ''
			};
		}
		function getAll() {
			var returnVal = [
				{
					id: 1,
					name: 'dummy company 1',
					projects: [],
					city: 'Ghent',
					zipCode: 9000,
					street: 'fakestreet',
					number: '4'
				},
				{
					id: 2,
					name: 'dummy company 2',
					projects: [],
					city: 'Ghent',
					zipCode: 9000,
					street: 'fakestreet',
					number: '4'

				},
				{
					id: 3,
					name: 'dummy company 3',
					projects: [],
					city: 'Ghent',
					zipCode: 9000,
					street: 'fakestreet',
					number: '4'
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