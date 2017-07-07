angular.module('streamViewApp')
.controller('forgotController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.site_logo = ($rootScope.site_settings) ? (($rootScope.site_settings[1] != undefined) ? $rootScope.site_settings[1]  : '' ): '';
		
		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if(!$scope.user_id) {

			$scope.forgot = function() {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/forgotpassword",

					data : {email : $scope.email},

					async : false,

					beforeSend : function() {

						$("#before_loader").show();

					},


					success : function (data) {

						if (data.success) {

							$scope.email = "";

							UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'success'});				

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function() {

						$("#before_loader").hide();

					},

				});
			}

		} else {

			$state.go('profile.home',{sub_id : memoryStorage.sub_profile_id},{reload:true});
		}
	}
])