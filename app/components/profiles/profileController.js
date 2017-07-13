angular.module('streamViewApp')

.controller('profilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.site_logo = ($rootScope.site_settings) ? (($rootScope.site_settings[1] != undefined) ? $rootScope.site_settings[1]  : '' ): '';

		$scope.login_bg = ($rootScope.site_settings) ? (($rootScope.site_settings[47] != undefined) ? $rootScope.site_settings[47].value  : '' ): '';

		var name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0]  : 'StreamView' ): 'StreamView';

        $scope.site_name = name.value;

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		$scope.sub_profile_id = (memoryStorage.sub_profile_id != undefined && memoryStorage.sub_profile_id != '') ? memoryStorage.sub_profile_id : '';

		if (!$scope.user_id) {

			$state.go('static.index',{},{reload:true});

		} 

	}
])

.controller('viewProfilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		$scope.no_of_account = 0;

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



	}
])


.controller('addProfileController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

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

.controller('manageProfilesController', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {



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


.controller('editProfileController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state,$stateParams) {

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

			data : {sub_id : $stateParams.id, id : memoryStorage.user_id, token :memoryStorage.access_token},

			async : false,

			beforeSend : function() {

				$("#before_loader").fadeIn();

			},

			success : function (data) {

				if (data.success) {

					$scope.profile = data.data;

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

		$scope.deleteProfile = function(id) {

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/delete-sub-profile",

				data : {sub_id : id, id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				beforeSend : function() {

					$("#before_loader").fadeIn();

				},

				success : function (data) {

					if (data.success) {

						UIkit.notify({message : "Successfully deleted profile from your account", timeout : 3000, pos : 'top-center', status : 'success'});

						$state.go('manage-profile.view-profile', {}, {reload:true});

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