angular.module('streamViewApp')
.controller('authController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {
		
		setTimeout(function(){
			$scope.height = $(".footer").outerHeight();
			console.log($scope.height);
			$(".height").height($scope.height);
		}, 100);

	}

	
	
	// $scope.allPages = $rootScope.allPages;
]);