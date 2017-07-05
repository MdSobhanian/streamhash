angular.module('streamViewApp')
.controller('authController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if ($scope.user_id) {

			// $state.go('profile.home',{},{reload:true});

		} else {

			// $state.go('static.index',{},{reload:true});

		}

	}

]);