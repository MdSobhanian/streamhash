angular.module('streamViewApp')
.controller('paidVideoController', ['$scope', '$http', '$rootScope', 
	'$window', '$state', '$stateParams',
	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/ppv_list",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.paid_videos = data.data;

				} else {

					UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/view-sub-profile",

			data : {sub_profile_id : memoryStorage.sub_profile_id, id : memoryStorage.user_id, token :memoryStorage.access_token},

			async : false,

			beforeSend : function() {

				$("#before_loader").fadeIn();

			},

			success : function (data) {

				if (data.success) {

					$scope.profile = data.data;

				} else {

					UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},

			complete : function() {

				$("#before_loader").fadeOut();

			},
		});
	}
]);