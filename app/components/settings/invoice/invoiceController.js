angular.module('streamViewApp')
.controller('invoiceController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$rootScope.$emit('navBar', 'black-background');

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		$scope.site_name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0].value  : '' ): '';

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

								memoryStorage.access_token = data.user.token; 

								$scope.one_time_subscription = memoryStorage.one_time_subscription;

								localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

								UIkit.notify({message : "Successfully, subscribed to view videos", timeout : 3000, pos : 'top-center', status : 'success'});

								$state.go('profile.account-settings', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

							} else {
								
								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});
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

]);