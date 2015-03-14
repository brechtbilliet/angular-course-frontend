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
				city: ''
			};
		}

		function getAll() {
			var returnVal = [];
			for (var i = 0; i < 100; i++) {
				returnVal.push({
					id: i,
					name: 'dummy company 1' + i,
					projects: [],
					city: 'Ghent',
					zipCode: 9000,
					street: 'fakestreet',
					number: '4'
				});
			}


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
				name: 'dummy company 2',
				projects: [],
				city: 'Ghent',
				zipCode: 9000,
				street: 'fakestreet',
				number: '4'
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
	angular.module('app.customer').factory('customerService', service);
}());