(function(){
	'use strict';
	function Constructor($location, projectService, toastr, CONFIG){
		var vm = this;
		vm.update = update;
		vm.add = add;

		function update(project){
			$location.path('projects/' + project.id);
		}

		function add(){
			$location.path('projects/add');
		}

		function loadData(){
			function onSuccess(response){
				vm.gridData = response.data;
			}
			function onFail(response){
				toastr.error(CONFIG.toasts.failedToLoadData);
			}
			projectService.getAll().then(onSuccess, onFail);
		}
		function initVm(){
			vm.gridData = null;
		}
		initVm();
		loadData();
	}
	Constructor.$inject = ['$location', 'projectService', 'toastr', 'CONFIG'];
	angular.module('app.project').controller('project_indexController', Constructor);
}());