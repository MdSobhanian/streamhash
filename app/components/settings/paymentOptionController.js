angular.module('streamViewApp')
.controller('paymentOptionController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		if(memoryStorage.user_type == 1) {

			$state.go('profile.pay_per_view', {id : $stateParams.id}, {reload:true});
			
		}

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/singleVideo",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data.video;

				} else {

					UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});

	}
]);