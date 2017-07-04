angular.module('streamViewApp')
.controller('staticController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$scope.site_logo = ($rootScope.site_settings) ? (($rootScope.site_settings[1] != undefined) ? $rootScope.site_settings[1]  : '' ): '';

	 $.ajax({
        url : apiUrl+'userApi/getPage/'+$stateParams.id,
        type : 'get',
        
        async : false,
        beforeSend : function() {

			$("#before_loader").show();

		},
        success : function(data) {
          $scope.page = data;
        },

        complete : function(data) {

			$("#before_loader").hide();

		},
      })


	}

]);