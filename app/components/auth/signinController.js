angular.module('streamViewApp')
.controller('signinController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$sce',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location, $sce) {

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

	    
		var site_logo = $.grep($rootScope.site_settings, function(e){ return e.key == 'site_logo'; });

	    var logo = "";

	    if (site_logo.length == 0) {

	        console.log("not found");
	        
	    } else if (site_logo.length == 1) {

	      // access the foo property using result[0].foo

	      logo = site_logo[0].value;

	      if (logo != '' || logo != null || logo != undefined) {
	        
	      } else {

	        logo = '';

	      }

	    } else {

	      // multiple items found
	      logo = "";

	    }

	    $scope.site_logo = logo;

	    var site_name = $.grep($rootScope.site_settings, function(e){ return e.key == 'site_name'; });

	    var name = "";

	    if (site_name.length == 0) {

	        console.log("not found");
	        
	    } else if (site_name.length == 1) {

	      // access the foo property using result[0].foo

	      name = site_name[0].value;

	      if (name != '' || name != null || name != undefined) {
	        
	      } else {

	        name = '';

	      }

	    } else {

	      // multiple items found
	      name = "";

	    }

	    $scope.site_name = name;
	    
		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if(!$scope.user_id) {

			$scope.fb_status  = false;

			$scope.google_status  = false;

			$.ajax({
					type : 'get',
					url : apiUrl+'userApi/check_social',
					async : false,
					success : function(data) {
						if(data.fb_status == true) {
							$scope.fb_status = data.fb_status;

							console.log("Fb Status"+$scope.fb_status);
						}
						if(data.google_status == true) {
							$scope.google_status = data.google_status;
						}
					},
			});

			$scope.socialUrl = $sce.trustAsResourceUrl(apiUrl+'social');

			$scope.signin = function() {

				$scope.login_by = 'manual';

				$scope.device_type = 'web';

				$scope.device_token = '123456';

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/login",

					data : {email:$scope.email, password : $scope.password,
						login_by : $scope.login_by, device_type : $scope.device_type, device_token : $scope.device_token},

					async : false,

					beforeSend : function() {

						$("#sign_in_button").html("Loging In...");

						$("#sign_in_button").attr("disabled", true);

					},

					success : function (data) {

						setTimeout(function(){

							$("#sign_in_button").attr("disabled", false);

							$("#sign_in_button").html("Sign In");

						}, 2000);

						if (data.success) {

							memoryStorage.access_token = data.token;

							memoryStorage.user_id = data.id;

							memoryStorage.login_by = data.login_by;

							memoryStorage.user_picture = data.picture;

							memoryStorage.user_name = data.name;
							
							memoryStorage.user_type = data.user_type;

							memoryStorage.one_time_subscription = data.one_time_subscription;

							memoryStorage.sub_profile_id = data.sub_profile_id;

							localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

							UIkit.notify({message : 'Your account has been successfully LoggedIn', timeout : 3000, pos : 'top-center', status : 'success'});

							// $state.go('manage-profile.view-profile',{},{reload:true});

							// if(memoryStorage.user_type == 1) {

								$state.go('manage-profile.view-profile',{},{reload:true});

							/*} else {

								$state.go('profile.subscriptions',{sub_profile_id : memoryStorage.sub_profile_id},{reload:true});

							}*/

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function(data) {

						// $("#before_loader").hide();

					},
				});

			};

		} else {

			$state.go('profile.home',{sub_profile_id : memoryStorage.sub_profile_id},{reload:true});
		}

	}

])

.controller('socialLoginCtrl', ['$scope', '$http', '$rootScope', '$window', '$location', '$state', '$stateParams',
	function ($scope, $http, $rootScope, $window, $location, $state, $stateParams) {

		$.ajax({
				type : 'get',

				url : apiUrl+'userApi/userDetails',

				data : {id : $stateParams.id, token : $stateParams.token},
				
				success : function(data) {

					memoryStorage.access_token = data.token;

					memoryStorage.user_id = $stateParams.id;

					memoryStorage.user_type = data.user_type;

					memoryStorage.login_by = data.login_by;
					
					memoryStorage.user_picture = data.picture;

					memoryStorage.user_name = data.name;

					memoryStorage.sub_profile_id = data.sub_profile_id;

					memoryStorage.one_time_subscription = data.one_time_subscription;

					localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));


					$state.go('manage-profile.view-profile', {}, {reload : true});

					/*if(memoryStorage.user_type == 1) {

						$state.go('manage-profile.view-profile',{},{reload:true});

					} else {

						$state.go('profile.subscriptions',{sub_profile_id : memoryStorage.sub_profile_id},{reload:true});

					}*/

				},
				error : function(data) {
					
				}
		});
	}
])

.controller('staticFailureController', ['$scope', '$http', '$rootScope', '$window', '$location', '$state', '$stateParams',
	function ($scope, $http, $rootScope, $window, $location, $state, $stateParams) {

		UIkit.notify({message : 'Sorry, Your Account is disabled. Please contact admin.', timeout : 5000, pos : 'top-center', status : 'danger'});

		$state.go('static.signin', {}, {reload:true});

	}
]);