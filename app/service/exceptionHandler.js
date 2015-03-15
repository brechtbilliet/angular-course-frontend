(function() {
	'use strict';

	function Implementation($log, $window, CONFIG, $) {
		return function(exception) {
			function logToServer() {
				// we cannot use $http 
				$.ajax({
					type: 'POST',
					url: CONFIG.restUrl + 'exceptionLog',
					contentType: 'application/json',
					data: angular.toJson({
						url: $window.location.href,
						message: exception.toString(),
						stackTrace: 'not supplied'// you can use an extension for that or create one of your own based on logging
					})
				});
			}

			// preserve the default behaviour which will log the error to the console
			$log.error.apply($log, arguments);

			try {
				logToServer();
			} catch (error) {
				$log.error('Error server-side logging failed, Error: ' + error);
			}
		};
	}

	Implementation.$inject = [
		'$log',
		'$window',
		'CONFIG',
		'$'
	];
	angular.module('app').factory('$exceptionHandler', Implementation);
}());