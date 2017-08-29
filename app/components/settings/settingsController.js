angular.module('streamViewApp')
.controller('settingsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		// $(document.body).css('background-color', '#141414');


		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		// $rootScope.$emit('footerBar', 'true');

		$scope.id = memoryStorage.user_id;

		$scope.sub_id = $stateParams.sub_id;

		$scope.login_by = memoryStorage.login_by;

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

			url : apiUrl + "userApi/active_plan",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

			async : false,
		

			success : function (data) {

				if (data.success) {

					$scope.active_plan = data.data;

				} else {

					console.log(data.message);

					// UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'danger'});

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

			data : {sub_id : $stateParams.sub_id, id : memoryStorage.user_id, token : memoryStorage.access_token},

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

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';


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

						$state.go('profile.account-settings', {sub_id : memoryStorage.sub_profile_id}, {reload:true});

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

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

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

						$state.go('profile.account-settings', {sub_id : memoryStorage.sub_profile_id}, {reload:true});

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

		$scope.login_by = memoryStorage.login_by;

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';		

		$scope.deleteAccount = function() {

			var password = memoryStorage.login_by == 'manual' ? $scope.password : '';

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


.controller('subscriptionsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$scope.one_time_subscription = memoryStorage.one_time_subscription;

		$scope.subscription_index = function(data) {

			$scope.subscriptions = [];

			var data = new FormData;
			data.append('id', memoryStorage.user_id);
			data.append('token', memoryStorage.access_token);

			$.ajax({
				url : apiUrl+"userApi/subscription_index",
				type : 'post',
				contentType : false,
				processData: false,
				beforeSend: function(xhr){
					$("#before_loader").fadeIn();
				},
				async : false,
				data : data,
				success : function(data) {

					// console.log(data);
					$scope.subscriptions = data;

					if(data.success == true) {

						$scope.subscriptions = data;

					} else {

						if (data.error_code == 101) {

							$state.go('static.index', {}, {reload:true});

						} else {

							console.log(data.error_messages);
							// UIkit.notify({message: data.error_messages, status : 'danger', pos : 'top-center', timeout : 5000});
						}
					}
				},
				complete : function() {
		    		$("#before_loader").fadeOut();
		    	},
		    	error : function(result) {

		    	}
			});
		}

		$scope.subscription_index();


		$scope.user_id = (memoryStorage.user_id != undefined && memoryStorage.user_id != '') ? memoryStorage.user_id : '';

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';


		$scope.sendToPaypal = function(id, amt) {

			if (amt == 0) {

				var data = new FormData;
				data.append('id', memoryStorage.user_id);
				data.append('token', memoryStorage.access_token);
				data.append('plan_id', id);

				$.ajax({
						url : apiUrl+"userApi/zero_plan",
						type : 'post',	
						contentType : false,
						processData: false,
						beforeSend: function(xhr){
							$(".fond").show();
						},
						async : false,
						data : data,
						success : function(data) {
							// console.log("Result "+data);
							if (data.success == true) {

								memoryStorage.one_time_subscription = 1;

								memoryStorage.user_type = 1;

								memoryStorage.no_of_account = data.plan.no_of_account;

								$scope.one_time_subscription = memoryStorage.one_time_subscription;

								localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

								UIkit.notify({message : "Successfully, subscribed to view videos", timeout : 3000, pos : 'top-center', status : 'success'});

								$state.go('profile.account-settings', {sub_id : memoryStorage.sub_profile_id}, {reload:true});

							} else {
								
								UIkit.notify({message : "Oops! something went wrong", timeout : 3000, pos : 'top-center', status : 'danger'});
							}
						},
						complete : function() {
				    		$(".fond").hide();
				    	},
				    	error : function(result) {

				    	}
				}); 

			} else {

				window.location.href=apiUrl+"paypal/"+id+'/'+$scope.user_id;

			}

		}
	}
])
