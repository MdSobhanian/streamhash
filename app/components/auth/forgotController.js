angular.module('streamViewApp')
.controller('forgotController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

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


		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if(!$scope.user_id) {

			$scope.forgot = function() {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/forgotpassword",

					data : {email : $scope.email},

					async : false,

					beforeSend : function() {

						$("#forgot_password_button").html("Request Sending ..");

						$("#forgot_password_button").attr("disabled", true);

					},


					success : function (data) {

						setTimeout(function(){

							$("#forgot_password_button").attr("disabled", false);

							$("#forgot_password_button").html("Submit");

						}, 2000);

						if (data.success) {

							$scope.email = "";

							UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'success'});				

							$state.go('static.signin', {}, {reload:true});

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function() {

						//$("#before_loader").hide();

					},

				});
			}

		} else {

			$state.go('profile.home',{sub_profile_id : memoryStorage.sub_profile_id},{reload:true});
		}
	}
])