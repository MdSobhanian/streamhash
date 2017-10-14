angular.module('streamViewApp')
.controller('payPerViewController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$scope.site_name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0].value  : '' ): '';

		$scope.user_id = (memoryStorage.user_id != undefined && memoryStorage.user_id != '') ? memoryStorage.user_id : '';


		$.ajax({

			type : "post",

			url : apiUrl + "userApi/singleVideo",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data.video;

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});



		$scope.sendToPaypal = function(id) {

			if (confirm('Are you sure want to proceed to see the video ?')) {

				window.location.href=apiUrl+"videoPaypal/"+id+'/'+$scope.user_id;

			} else {

				$state.go('profile.home', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

			}

		}

	}
])

.controller('payPerViewSuccessController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$scope.video_id = $stateParams.id;

	}
]);
