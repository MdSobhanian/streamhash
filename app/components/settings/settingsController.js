angular.module('streamViewApp')
.controller('settingsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		// $rootScope.$emit('footerBar', 'true');

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

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

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

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/view-sub-profile",

			data : {sub_id : $stateParams.id, id : memoryStorage.user_id, token : memoryStorage.access_token},

			async : false,

			beforeSend : function() {

				$("#before_loader").fadeIn();

			},

			success : function (data) {

				if (data.success) {

					$scope.subprofile = data.data;

				} else {

					UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'danger'});

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
])