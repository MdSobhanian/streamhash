angular.module('streamViewApp')
.controller('main_headerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams','$location', '$interval',

	function ($scope, $http, $rootScope, $window, $state, $stateParams,$location,$interval) {

	
        $scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

        $scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

        if ($scope.user_id && $scope.access_token) {

	        			
			$scope.searchShow = function() {

				// alert("showing");

				$("#header-section").slideUp();
				$("#top-search-section").slideDown();
			}

			$scope.hideSearch = function() {
				// alert("Hiding");
				$("#top-search-section").slideUp();
				$("#header-section").slideDown();
				

			}
		  		

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
		    
			$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

			if (!$scope.user_id) {

				 $state.go('static.index',{},{reload:true});

			}

			$rootScope.$on('navBar', function(event, data) {
	             $scope.black_bg = data;
	        });

			if ($stateParams.sub_profile_id == undefined || $stateParams.sub_profile_id == '') {

				$scope.sub_profile_id = memoryStorage.sub_profile_id;


			} else {	

				memoryStorage.sub_profile_id = $stateParams.sub_profile_id;

				$scope.sub_profile_id = memoryStorage.sub_profile_id;

				localStorage.setItem('sessionStorage', JSON.stringify(memoryStorage));

			}

			$scope.user_picture = (memoryStorage.user_picture != '' && memoryStorage.user_picture != undefined ) ? memoryStorage.user_picture : 'img/model3.jpg'; 

			$scope.user_name = (memoryStorage.user_name != '' && memoryStorage.user_name != undefined ) ? memoryStorage.user_name : ''; 

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/active-categories",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

				async : false,

				success : function (data) {

					if (data.success) {

						$scope.datas = data.data;

					} else {

						if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

				            window.localStorage.setItem('logged_in', false);

				            memoryStorage = {};
				            
				            localStorage.removeItem("sessionStorage");

				            localStorage.clear();

				            $state.go('static.index', {}, {reload:true});


						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;

						}
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},
			});


	        $scope.sub_profile_data = function(sub_profile_id) {

	        	sub_profile_id = sub_profile_id ? sub_profile_id : $scope.sub_profile_id;

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/view-sub-profile",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_profile_id:sub_profile_id},

					async : false,

					success : function (data) {

						if (data.success) {

							$scope.sub_profile = data.data;

						} else {

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});

				        	} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								$state.go('manage-profile.view-profile', {}, {reload:true});

								return false;

							}
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},
				});
			}


			$scope.activeProfiles = function(sub_profile_id) {

				sub_profile_id = sub_profile_id ? sub_profile_id : $scope.sub_profile_id;

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/active-profiles",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_profile_id : sub_profile_id},

					async : false,

					success : function (data) {

						if (data.success) {

							$scope.profiles = data.data;

						} else {

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});


							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},
				});
			}

			$scope.sub_profile_data($scope.sub_profile_id);


			$scope.activeProfiles($scope.sub_profile_id);



			$rootScope.$on('activeProfiles', function(event, sub_profile_id) {

				// console.log("sub_profile_id"+sub_profile_id);

				 $scope.sub_profile_data(sub_profile_id);

	             $scope.activeProfiles(sub_profile_id);
	        });

			$scope.logout = function() {


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

							UIkit.notify({message : "Logged Out Successfully", status : 'success', timeout : 3000, pos : 'top-center'});


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

			};

			$rootScope.$on('search_clear', function(event) {

				console.log("clear");
				
				$scope.search_key = '';

				$("#search_key").val('');

				$("#search-box").val('');

	        });

			$scope.getSearchModel = function(word) {

				$scope.search_key = '';

				if (word != '' && word != undefined) {

					$location.path('/search/'+word).replace();

				} else {

					$location.path('/home/'+memoryStorage.sub_profile_id).replace();

				}

			}

			

			function notifications() {
				$.ajax({

					type : "post",

					url : apiUrl + "userApi/notifications",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_profile_id : $scope.sub_profile_id},

					async : false,

					success : function (data) {

						if (data.success) {

							$scope.notifications = data.data;

							$scope.notifications_count = data.count;

						} else {

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});


							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 1000, pos : 'top-center', status : 'danger'});

					},
				});
			}

			notifications();

			var interval = $interval(notifications, 50000);


			$rootScope.$on('notfication_cleartimeout', function(event) {

				console.log("notifications");

				$interval.cancel(interval);

			});

			$scope.redNotification = function() {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/red-notifications",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_profile_id : $scope.sub_profile_id},

					async : false,

					success : function (data) {

						$scope.notifications_count = 0;

						if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

				            window.localStorage.setItem('logged_in', false);

				            memoryStorage = {};
				            
				            localStorage.removeItem("sessionStorage");

				            localStorage.clear();

				            $state.go('static.index', {}, {reload:true});


						}
						
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 1000, pos : 'top-center', status : 'danger'});

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
.controller('footerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {
		
var appstore = $.grep($rootScope.site_settings, function(e){ return e.key == 'appstore'; });

	    var app_store = "";

	    if (appstore.length == 0) {

	        console.log("not found");
	        
	    } else if (appstore.length == 1) {

	      // access the foo property using result[0].foo

	      app_store = appstore[0].value;

	      if (app_store != '' || app_store != null || app_store != undefined) {
	        
	      } else {

	        app_store = '';

	      }

	    } else {

	      // multiple items found
	      app_store = "";

	    }

	    $scope.appstore = app_store;

	    var playstore = $.grep($rootScope.site_settings, function(e){ return e.key == 'playstore'; });

	    var play_store = "";

	    if (playstore.length == 0) {

	        console.log("not found");
	        
	    } else if (playstore.length == 1) {

	      // access the foo property using result[0].foo

	      play_store = playstore[0].value;

	      if (play_store != '' || play_store != null || play_store != undefined) {
	        
	      } else {

	        play_store = '';

	      }

	    } else {

	      // multiple items found
	      play_store = "";

	    }

	    $scope.playstore = play_store;


	    var facebook_link = $.grep($rootScope.site_settings, function(e){ return e.key == 'facebook_link'; });

	    var facebook_link_url = "";

	    if (facebook_link.length == 0) {

	        console.log("not found");
	        
	    } else if (facebook_link.length == 1) {

	      // access the foo property using result[0].foo

	      facebook_link_url = facebook_link[0].value;

	      if (facebook_link_url != '' || facebook_link_url != null || facebook_link_url != undefined) {
	        
	      } else {

	        facebook_link_url = '';

	      }

	    } else {

	      // multiple items found
	      facebook_link_url = "";

	    }

	    $scope.facebook_link = facebook_link_url;


	    var linkedin_link = $.grep($rootScope.site_settings, function(e){ return e.key == 'linkedin_link'; });

	    var linkedin_link_url = "";

	    if (linkedin_link.length == 0) {

	        console.log("not found");
	        
	    } else if (linkedin_link.length == 1) {

	      // access the foo property using result[0].foo

	      linkedin_link_url = linkedin_link[0].value;

	      if (linkedin_link_url != '' || linkedin_link_url != null || linkedin_link_url != undefined) {
	        
	      } else {

	        linkedin_link_url = '';

	      }

	    } else {

	      // multiple items found
	      linkedin_link_url = "";

	    }

	    $scope.linkedin_link = linkedin_link_url;


	    var twitter_link = $.grep($rootScope.site_settings, function(e){ return e.key == 'twitter_link'; });

	    var twitter_link_url = "";

	    if (twitter_link.length == 0) {

	        console.log("not found");
	        
	    } else if (twitter_link.length == 1) {

	      // access the foo property using result[0].foo

	      twitter_link_url = twitter_link[0].value;

	      if (twitter_link_url != '' || twitter_link_url != null || twitter_link_url != undefined) {
	        
	      } else {

	        twitter_link_url = '';

	      }

	    } else {

	      // multiple items found
	      twitter_link_url = "";

	    }

	    $scope.twitter_link = twitter_link_url;


	    var google_plus_link = $.grep($rootScope.site_settings, function(e){ return e.key == 'google_plus_link'; });

	    var google_plus_link_url = "";

	    if (google_plus_link.length == 0) {

	        console.log("not found");
	        
	    } else if (google_plus_link.length == 1) {

	      // access the foo property using result[0].foo

	      google_plus_link_url = google_plus_link[0].value;

	      if (google_plus_link_url != '' || google_plus_link_url != null || google_plus_link_url != undefined) {
	        
	      } else {

	        google_plus_link_url = '';

	      }

	    } else {

	      // multiple items found
	      google_plus_link_url = "";

	    }

	    $scope.google_plus_link = google_plus_link_url;


	    var pinterest_link = $.grep($rootScope.site_settings, function(e){ return e.key == 'pinterest_link'; });

	    var pinterest_link_url = "";

	    if (pinterest_link.length == 0) {

	        console.log("not found");
	        
	    } else if (pinterest_link.length == 1) {

	      // access the foo property using result[0].foo

	      pinterest_link_url = pinterest_link[0].value;

	      if (pinterest_link_url != '' || pinterest_link_url != null || pinterest_link_url != undefined) {
	        
	      } else {

	        pinterest_link_url = '';

	      }

	    } else {

	      // multiple items found
	      pinterest_link_url = "";

	    }

	    $scope.pinterest_link = pinterest_link_url;

		// setTimeout(function(){
		// 	$scope.height = $(".footer").outerHeight();
		// 	console.log($scope.height);
		// 	$(".height").height($scope.height);
		// }, 100);
		
	   

	}
])