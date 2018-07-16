angular.module('streamViewApp')
.controller('invoiceController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('body_bg_img', true);

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

			$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';


			$.ajax({

				type : "post",

				url : apiUrl + "userApi/plan_detail",

				data : {id : $scope.user_id, token : $scope.access_token, plan_id : $stateParams.subscription_id},

				async : false,
			

				success : function (data) {

					if (data.success) {

						$scope.plan = data.data;

					} else {

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},

			});

			$scope.coupon_amount = 0;

			$scope.coupon_code = "";

			$scope.apply_coupon_subscription = function(coupon_code) {

				if (coupon_code == undefined || coupon_code == '') {

					UIkit.notify({message : "Promo Code is required", timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;

				}

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/apply/coupon/subscription",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, subscription_id : $stateParams.subscription_id, coupon_code : coupon_code},

					async : false,

					success : function (data) {

						if (data.success) {

							$scope.remaining_amount = data.data.remaining_amount;

							$scope.coupon_amount = data.data.coupon_amount;

							$scope.coupon_code = coupon_code;

							$(".showPay").show();

							$scope.original_coupon_amount = data.data.original_coupon_amount;

						} else {

							$scope.coupon_amount = 0;

							$scope.coupon_code = "";

							$scope.remaining_amount = 0;

							$(".showPay").hide();

							$scope.original_coupon_amount = 0;						

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},
				});

			}

			$scope.sendToPaypal = function(id, amt) {
				

				$scope.type_of_payment = $("input[name='type_of_payment']:checked").val();

				if ($scope.coupon_code != '' && typeof($scope.coupon_code) != undefined) {

					amt = $scope.remaining_amount;

				}


				if (confirm('Are you sure want to subscribe the plan ?')) {

					

					if (amt == 0) {

						var data = new FormData;
						data.append('id', memoryStorage.user_id);
						data.append('token', memoryStorage.access_token);
						data.append('coupon_code', $scope.coupon_code);
						data.append('plan_id', id);

						$.ajax({
								url : apiUrl+"userApi/zero_plan",
								type : 'post',	
								contentType : false,
								processData: false,
								beforeSend: function(xhr){
									$("#pay_now_subscription").html("Request Sending...");

									$("#pay_now_subscription").attr('disabled', true);
								},
								async : false,
								data : data,
								success : function(data) {
									// console.log("Result "+data);
									if (data.success == true) {

										memoryStorage.one_time_subscription = 1;

										memoryStorage.user_type = 1;

										memoryStorage.no_of_account = data.plan.no_of_account;

										memoryStorage.access_token = data.user.token; 

										$scope.one_time_subscription = memoryStorage.one_time_subscription;

										localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

										UIkit.notify({message : "Successfully, subscribed to view videos", timeout : 3000, pos : 'top-center', status : 'success'});

										$state.go('profile.subscription-success', {}, {reload:true});

										// $state.go('profile.account-settings', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

									} else {
										
										UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});
									}
								},
								complete : function() {
						    		$("#pay_now_subscription").html("Pay Now");

									$("#pay_now_subscription").attr('disabled', false);
						    	},
						    	error : function(result) {

						    	}
						}); 

					} else {

						if ($scope.type_of_payment == 1) {

							if ($scope.coupon_code != '') {

								window.location.href=apiUrl+"paypal/"+id+'/'+$scope.user_id+'/'+$scope.coupon_code;

							} else {

								window.location.href=apiUrl+"paypal/"+id+'/'+$scope.user_id;
							}

						} else {

							$.ajax({

								type : "post",

								url : apiUrl + "userApi/stripe_payment",

								data : {id : $scope.user_id, token : $scope.access_token, sub_profile_id : memoryStorage.sub_profile_id, subscription_id : id, coupon_code : $scope.coupon_code},

								async : false,
							

								success : function (data) {

									if (data.success) {

										$state.go('profile.subscription-success', {}, {reload:true});

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

					}

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

]);