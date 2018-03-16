angular.module('streamViewApp')
.controller('payPerViewController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

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

			$scope.user_id = (memoryStorage.user_id != undefined && memoryStorage.user_id != '') ? memoryStorage.user_id : '';


			$.ajax({

				type : "post",

				url : apiUrl + "userApi/singleVideo",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id},

				async : false,

				success : function (data) {

					if (data.success) {

						$scope.video = data.video;

						if (data.pay_per_view_status) {

							UIkit.notify({message : 'Already you paid the amount for the particular video', timeout : 3000, pos : 'top-center', status : 'success'});

							$state.go('single_video', {id : $scope.video.admin_video_id}, {reload:true});

						}

					} else {

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},
			});



			$scope.sendToPaypal = function(id) {

				$scope.type_of_payment = $("input[name='type_of_payment']:checked").val();

				if (confirm('Are you sure want to proceed to see the video ?')) {

					$("#payment_ppv_button").html("Request Sending...");

					$("#payment_ppv_button").attr('disabled', true);

					if ($scope.type_of_payment == 1) {

						window.location.href=apiUrl+"videoPaypal/"+id+'/'+$scope.user_id;

					} else {

						$.ajax({

								type : "post",

								url : apiUrl + "userApi/stripe_ppv",

								data : {id : $scope.user_id, token : $scope.access_token, admin_video_id : id},

								async : false,
							

								success : function (data) {

									$("#payment_ppv_button").html("Pay Now");

									$("#payment_ppv_button").attr('disabled', false);

									if (data.success) {

										$state.go('profile.pay_per_view_success', {id : id}, {reload:true});

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

				} else {

					// $state.go('profile.home', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

				}

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

.controller('payPerViewSuccessController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$rootScope.$emit('navBar', 'black-background');

			$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

			$scope.video_id = $stateParams.id;

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}

	}
]);
