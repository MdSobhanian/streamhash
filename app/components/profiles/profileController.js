angular.module('streamViewApp')

.controller('profilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

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

		    var site_icon = $.grep($rootScope.site_settings, function(e){ return e.key == 'site_icon'; });

		    var icon = "";

		    if (site_icon.length == 0) {

		        console.log("not found");
		        
		    } else if (site_icon.length == 1) {

		      // access the foo property using result[0].foo

		      icon = site_icon[0].value;

		      if (icon != '' || icon != null || icon != undefined) {
		        
		      } else {

		        icon = '';

		      }

		    } else {

		      // multiple items found
		      icon = "";

		    }

		    $scope.site_icon = icon;


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

			$scope.sub_profile_id = (memoryStorage.sub_profile_id != undefined && memoryStorage.sub_profile_id != '') ? memoryStorage.sub_profile_id : '';

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}

	}
])

.controller('viewProfilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.no_of_account = 0;

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$.ajax({
					type : 'get',

					url : apiUrl+'userApi/userDetails',

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

					success : function(data) {
						memoryStorage.access_token = data.token;

						memoryStorage.user_id = data.id;

						memoryStorage.user_type = data.user_type;

						memoryStorage.login_by = data.login_by;
						
						memoryStorage.user_picture = data.picture;

						memoryStorage.user_name = data.name;

						memoryStorage.sub_profile_id = data.sub_profile_id;

						memoryStorage.one_time_subscription = data.one_time_subscription;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));


						// $state.go('manage-profile.view-profile', {}, {reload : true});


					},
					error : function(data) {
						
					}
			});

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/get-subscription",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				success : function (data) {

					if (data.success) {

						memoryStorage.no_of_account = data.data;

						$scope.no_of_account = memoryStorage.no_of_account;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

					} else {

						if(data.error != undefined && data.error != '') {


							UIkit.notify({message : data.error, timeout : 3000, pos : 'top-center', status : 'danger'});

							window.localStorage.setItem('logged_in', false);

							memoryStorage = {};

							localStorage.removeItem("sessionStorage");

							localStorage.clear();

							// UIkit.notify({message : "Logged Out Successfully", status : 'success', timeout : 3000, pos : 'top-center'});

							$state.go('static.index', {}, {reload:true});

							return false;


						} else {

							UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;

						}	
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},

			});

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/active-profiles",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").show();

				},

				success : function (data) {

					if (data.success) {

						$scope.profiles = data.data;

						memoryStorage.active_profiles_length = $scope.profiles.length;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

					} else {

						if(data.error != undefined && data.error != '') {


							UIkit.notify({message : data.error, timeout : 3000, pos : 'top-center', status : 'danger'});

							window.localStorage.setItem('logged_in', false);

							memoryStorage = {};
							localStorage.removeItem("sessionStorage");
							localStorage.clear();

							// UIkit.notify({message : "Logged Out Successfully", status : 'success', timeout : 3000, pos : 'top-center'});

							$state.go('static.index', {}, {reload:true});

							return false;


						} else {

							UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;

						}	
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},

				complete : function() {

					$("#before_loader").hide();

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


.controller('addProfileController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			if (memoryStorage.no_of_account == memoryStorage.active_profiles_length) {

				UIkit.notify({message : "Already you added "+memoryStorage.active_profiles_length+" profiles in your account. If you want more subscribe and get to Add More Profile.", timeout : 3000, pos : 'top-center', status : 'warning'});

				$state.go('manage-profile.view-profile', {}, {reload : true});

			}

			$scope.imgsrc = apiUrl+'placeholder.png';

			$scope.id = memoryStorage.user_id;

			$scope.token = memoryStorage.access_token;

			$scope.openBrowse = function() {
				$('#picture').click();
				return false;
			};

			$scope.loadFile = function(event, id) {
				    //alert(event.files[0]);
				    var reader = new FileReader();
				    reader.onload = function(){
				      var output = document.getElementById(id);
				      output.src = reader.result;
				       //$("#imagePreview").css("background-image", "url("+this.result+")");
				    };
				    reader.readAsDataURL(event.files[0]);
			}

			$scope.addProfile = function() {

				if ($scope.name == '' || $scope.name == undefined) {

					alert("Name should not be an empty");

					return false;
				}

				var formData = new FormData($("#sub_profile")[0]);


				$.ajax({

					type : "post",

					url : apiUrl + "userApi/add-profile",

					data : formData,

					async : false,

					contentType : false,

					processData: false,

					beforeSend : function() {

						$("#before_loader").fadeIn();

					},

					success : function (data) {

						if (data.success) {

							UIkit.notify({message : "Successfully added profile into your account", timeout : 3000, pos : 'top-center', status : 'success'});

							$state.go('manage-profile.view-profile', {}, {reload:true});

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

.controller('manageProfilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$scope.no_of_account = memoryStorage.no_of_account > 0 ? memoryStorage.no_of_account : 0;

			if (memoryStorage.no_of_account == undefined || memoryStorage.no_of_account == 0 || memoryStorage.no_of_account == '') {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/get-subscription",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

					async : false,

					success : function (data) {

						if (data.success) {

							memoryStorage.no_of_account = data.data;

							$scope.no_of_account = memoryStorage.no_of_account;

							localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

						} else {

							if(data.error != undefined && data.error != '') {


								UIkit.notify({message : data.error, timeout : 3000, pos : 'top-center', status : 'danger'});

								window.localStorage.setItem('logged_in', false);

								memoryStorage = {};
								localStorage.removeItem("sessionStorage");
								localStorage.clear();

								// UIkit.notify({message : "Logged Out Successfully", status : 'success', timeout : 3000, pos : 'top-center'});

								$state.go('static.index', {}, {reload:true});

								return false;


							} else {

								UIkit.notify({message : data.message, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}	
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

				});
			}

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/active-profiles",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						$scope.profiles = data.data;

						memoryStorage.active_profiles_length = $scope.profiles.length;

						localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

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


.controller('editProfileController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state,$stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$scope.imgsrc = apiUrl+'placeholder.png';

			$scope.id = memoryStorage.user_id;

			$scope.token = memoryStorage.access_token;

			$scope.openBrowse = function() {
				$('#picture').click();
				return false;
			};

			$scope.loadFile = function(event, id) {
				    //alert(event.files[0]);
				    var reader = new FileReader();
				    reader.onload = function(){
				      var output = document.getElementById(id);
				      output.src = reader.result;
				       //$("#imagePreview").css("background-image", "url("+this.result+")");
				    };
				    reader.readAsDataURL(event.files[0]);
			}

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/view-sub-profile",

				data : {sub_profile_id : $stateParams.id, id : memoryStorage.user_id, token :memoryStorage.access_token},

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

			$scope.editProfile = function() {

				if ($scope.profile.name == '' || $scope.profile.name == undefined) {

					alert("Name should not be an empty");

					return false;
				}

				var formData = new FormData($("#sub_profile")[0]);


				$.ajax({

					type : "post",

					url : apiUrl + "userApi/edit-sub-profile",

					data : formData,

					async : false,

					contentType : false,

					processData: false,

					beforeSend : function() {

						$("#before_loader").fadeIn();

					},

					success : function (data) {

						if (data.success) {

							UIkit.notify({message : "Successfully added profile into your account", timeout : 3000, pos : 'top-center', status : 'success'});

							$state.go('manage-profile.view-profile', {}, {reload:true});

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

			$scope.deleteProfile = function(id) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/delete-sub-profile",

					data : {sub_profile_id : id, id : memoryStorage.user_id, token : memoryStorage.access_token},

					async : false,

					beforeSend : function() {

						$("#before_loader").fadeIn();

					},

					success : function (data) {

						if (data.success) {

							UIkit.notify({message : "Successfully deleted profile from your account", timeout : 3000, pos : 'top-center', status : 'success'});

							$state.go('manage-profile.view-profile', {}, {reload:true});

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