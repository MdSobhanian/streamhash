angular.module('streamViewApp')
.controller('main_headerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams','$location', '$interval',

	function ($scope, $http, $rootScope, $window, $state, $stateParams,$location,$interval) {
			
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

		console.log($scope.sub_profile_id);

	
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

					UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
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

						if (data.error_code == 104) {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							window.localStorage.setItem('logged_in', false);

							memoryStorage = {};

							localStorage.removeItem("sessionStorage");
							
							localStorage.clear();

							$state.go('static.index', {}, {reload:true});

							return false;

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

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
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

				url : apiUrl + "userApi/delete_logged_device",

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

		$scope.getSearchModel = function(word) {

			console.log(word);

			if (word != '' && word != undefined) {

				$location.path('/search/'+word).replace();

			} else {

				$location.path('/home/'+memoryStorage.sub_profile_id).replace();

			}
			$scope.search_key ={};
			
			console.log("reset");
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

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 1000, pos : 'top-center', status : 'danger'});

						return false;
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
					
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 1000, pos : 'top-center', status : 'danger'});

				},
			});			

		}

	}
])/*.run(['$rootScope', '$interval', function($rootScope, $interval) {
    $rootScope.$on('$routeChangeStart', function() {
        $interval.cancel(interval);
    });
}]);*/


// angular.module('streamViewApp')
.controller('footerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		/*console.log("ss");

		$rootScope.$on('footerBar', function(event, data) {

             $scope.showFooter = data;

             console.log($scope.showFooter);
        });*/


	}
])