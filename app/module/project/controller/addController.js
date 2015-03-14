(function(){
	'use strict';
	function Constructor($location, projectService, CONFIG, toastr){
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;

		function workingCopyChanged(){
			vm.dirty = !angular.equals(vm.workingCopy, vm.originalCopy);
		}

		function save(){
			function onSuccess(response){
				$location.path('projects');
				toastr.success(CONFIG.toasts.successfullySavedData);
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToSaveData);

			}
			projectService.add(vm.workingCopy).then(onSuccess, onFail);
		}
		function cancel(){
			$location.path('projects');
		}
	
		function initVm(){
			vm.dirty = false;
			vm.workingCopy = projectService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
	}
	Constructor.$inject = ['$location', 'projectService', 'CONFIG', 'toastr'];
	angular.module('app.project').controller('project_addController', Constructor);
}());