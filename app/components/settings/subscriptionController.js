angular.module('streamViewApp')
.controller('subscriptionSuccessController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

			$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

			$scope.video_id = $stateParams.id;

			$.ajax({

				type : "get",

				url : apiUrl + "userApi/userDetails",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").show();

				},

				success : function (data) {

					if (data.success) {

						$scope.profile = data;

						memoryStorage.access_token = data.token;

						memoryStorage.user_id = data.id;

						memoryStorage.user_type = data.user_type;

						memoryStorage.login_by = data.login_by;
						
						memoryStorage.user_picture = data.picture;

						memoryStorage.user_name = data.name;

						memoryStorage.sub_profile_id = data.sub_profile_id;

						memoryStorage.one_time_subscription = data.one_time_subscription;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

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



		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}

	}

]);