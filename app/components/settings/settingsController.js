angular.module('streamViewApp')
.controller('settingsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {


		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

			// $(document.body).css('background-color', '#141414');

			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;


			$scope.id = memoryStorage.user_id;

			$scope.sub_profile_id = $stateParams.sub_profile_id;

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



			$scope.emailNotification = function(id) {

				var notification = $("#"+id).is(':checked');

				notification = notification ? 1 : 0;


				$.ajax({

					type : "post",

					url : apiUrl + "userApi/email/notification",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token,
						notification : notification},
			
					success : function (data) {

						if (data.success) {

							//$scope.profile.email_notification = data.subscription;

							console.log(data.message);

						} else {

							console.log(data.error_messages);

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

				});
			}

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/active_plan",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,
			

				success : function (data) {

					if (data.success) {

						$scope.active_plan = data.subscription;

					} else {

						console.log(data.message);

						//UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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

				data : {sub_profile_id : $stateParams.sub_profile_id, id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						$scope.subprofile = data.data;

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


			

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}

	}
])

.controller('changePasswordController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {


			$rootScope.$emit('navBar', 'black-background');

			
			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;



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

							UIkit.notify({message : data.message + "Please login and continue your account details.", timeout : 3000, pos : 'top-center', status : 'success'});

							$.ajax({

								type : "post",

								url : apiUrl + "userApi/logout",

								data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

								async : false,

								success : function (data) {

									if (data.success) {

										window.localStorage.setItem('logged_in', false);

										memoryStorage = {};
										
										localStorage.removeItem("sessionStorage");

										localStorage.clear();

										$state.go('static.index', {}, {reload:true});

									} else {

										UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

										return false;
									}
								},
								error : function (data) {

									UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

								},
							});

							// $state.go('profile.account-settings', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

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

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}
	}
])


.controller('editAccountController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {


			$rootScope.$emit('navBar', 'black-background');

			
			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;


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

							$state.go('profile.account-settings', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

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

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}
	}
])


.controller('deleteAccountController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

			$scope.login_by = memoryStorage.login_by;

			
			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;


			$scope.deleteAccount = function() {

				$scope.password = memoryStorage.login_by == 'manual' ? $scope.password : '';

				console.log($scope.password);

				if( memoryStorage.login_by == 'manual') {

					if ($scope.password == '' || $scope.password == undefined) {


						UIkit.notify({message :"Please fill the password field", timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;

					}

				}

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/deleteAccount",

					data : { id : memoryStorage.user_id, token : memoryStorage.access_token, password : $scope.password},

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

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}

	}
])


.controller('subscriptionsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

		
			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;


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
						//$scope.subscriptions = data.data;

						if(data.success == true) {

							$scope.subscriptions = data.data;

						} else {

							if (data.error_code == 101) {

								$state.go('static.index', {}, {reload:true});

							} else {

								console.log(data.error_messages);

								UIkit.notify({message: 'Something Went wrong, Please try again later', status : 'danger', pos : 'top-center', timeout : 5000});
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

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}
	}
])
.controller('billingDetailsController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.sub_profile_id = $stateParams.sub_profile_id;

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

		
			var login_bg = $.grep($rootScope.site_settings, function(e){ return e.key == 'common_bg_image'; });

		    var bg_image = "";

		    if (login_bg.length == 0) {

		        console.log("not found");
		        
		    } else if (login_bg.length == 1) {

		      // access the foo property using result[0].foo

		      bg_image = login_bg[0].value;

		      if (bg_image != '' || bg_image != null || bg_image != undefined) {
		        
		      } else {

		        bg_image = '';

		      }

		    } else {

		      // multiple items found
		      bg_image = "";

		    }

		    $scope.login_bg = bg_image;



			$.ajax({

				type : "post",

				url : apiUrl + "userApi/active_plan",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,
			

				success : function (data) {

					if (data.success) {

						$scope.active_plan = data;

					} else {

						console.log(data.message);

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

				url : apiUrl + "userApi/subscribed_plans",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,
			

				success : function (data) {

					if (data.success) {

						$scope.subscribed_plans = data;

					} else {

						console.log(data.error_messages);

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

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

])