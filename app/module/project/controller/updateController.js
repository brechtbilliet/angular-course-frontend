(function() {
	'use strict';

	function Constructor($location, $routeParams, projectService, CONFIG, toastr) {
		var vm = this;
		vm.save = save;
		vm.cancel = cancel;
		vm.workingCopyChanged = workingCopyChanged;
		vm.remove = remove;

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
			projectService.update(Number($routeParams.id),vm.workingCopy).then(onSuccess, onFail);
		}
		function cancel() {
			$location.path('projects');
		}

		function remove(){
			function onSuccess(response){
				toastr.success(CONFIG.toasts.successfullyRemovedData);
				cancel();
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToRemoveData);
			}
			projectService.remove(Number($routeParams.id)).then(onSuccess, onFail);
		}
		function loadData(){
			function onSuccess(response){
				vm.originalCopy = response.data;
				vm.workingCopy = angular.copy(vm.originalCopy); 
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToLoadData);

			}
			projectService.getById(Number($routeParams.id)).then(onSuccess, onFail);
		}
		function initVm() {
			vm.dirty = false;
			vm.workingCopy = projectService.createEmpty();
			vm.originalCopy = angular.copy(vm.workingCopy);
		}
		initVm();
		loadData();
	}
	Constructor.$inject = ['$location', '$routeParams', 'projectService','CONFIG', 'toastr'];
	angular.module('app.project').controller('project_updateController', Constructor);
}());