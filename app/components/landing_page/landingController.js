angular.module('streamViewApp')
.controller('landingController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location,$http) {

		$scope.site_logo = ($rootScope.site_settings) ? (($rootScope.site_settings[1] != undefined) ? $rootScope.site_settings[1]  : '' ): '';

		$scope.home_bg_image = ($rootScope.site_settings) ? (($rootScope.site_settings[46] != undefined) ? $rootScope.site_settings[46].value  : '' ): '';
		$scope.site_name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0].value  : '' ): '';

		//console.log($scope.home_bg_image);

		$scope.allPages = $rootScope.allPages;

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if ($scope.user_id) {

			$state.go('profile.home',{sub_id : memoryStorage.sub_profile_id},{reload:true});

		} else {

			// $state.go('static.index',{},{reload:true});

		}


		$rootScope.$emit('notfication_cleartimeout', true);
		
	}

]);