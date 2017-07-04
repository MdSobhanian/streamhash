angular.module('streamViewApp')
.controller('settingsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		// $rootScope.$emit('footerBar', 'true');

		$scope.id = memoryStorage.user_id;

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

.controller('changePasswordController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');


		$scope.changePassword = function() {

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/changePassword",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token, old_password : $scope.old_password,
					password : $scope.password, password_confirmation : $scope.password_confirmation},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'success'});

						$state.go('profile.account-settings', {id : memoryStorage.sub_profile_id}, {reload:true});

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

	}
])


.controller('editAccountController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

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

		$scope.editProfile = function() {

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/updateProfile",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token, email:$scope.profile.email, 
						name : $scope.profile.name, mobile : $scope.profile.mobile, device_token : '123456'},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						UIkit.notify({message : "Your account has been successfully updated", timeout : 3000, pos : 'top-center', status : 'success'});						

						$state.go('profile.account-settings', {id : memoryStorage.sub_profile_id}, {reload:true});

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

	}
])


.controller('deleteAccountController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		

		$scope.deleteAccount = function() {

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/deleteAccount",

				data : {password : $scope.password, id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'success'});

						window.localStorage.setItem('logged_in', false);

						memoryStorage = {};
						localStorage.removeItem("sessionStorage");
						localStorage.clear();

						$state.go('static.index', {}, {reload:true});

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

	}
])

