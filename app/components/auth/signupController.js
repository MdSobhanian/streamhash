angular.module('streamViewApp')
.controller('signupController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$scope.signup = function() {

				$scope.login_by = 'manual';

				$scope.device_type = 'web';

				$scope.device_token = '123456';

				$.ajax({

				type : "post",

				url : apiUrl + "userApi/register",

				data : {email:$scope.email, name : $scope.name, password : $scope.password,
					login_by : $scope.login_by, device_type : $scope.device_type, device_token : $scope.device_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").show();

				},

				success : function (data) {

					if (data.success) {

						memoryStorage.access_token = data.token;

						memoryStorage.user_id = data.id;

						memoryStorage.login_by = data.login_by;

						memoryStorage.user_picture = data.picture;

						memoryStorage.user_name = data.name;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

						UIkit.notify({message : 'Your account has been successfully Registered', timeout : 3000, pos : 'top-center', status : 'success'});

						$state.go('manage-profile.view-profile',{},{reload:true});

					} else {

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},

				complete : function(data) {

					$("#before_loader").hide();

				},
			});

		};

	}

]);