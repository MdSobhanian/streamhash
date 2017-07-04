angular.module('streamViewApp')
.controller('main_headerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		// $scope.settings = $rootScope.site_settings;

		/*$scope.site_settings = ($rootScope.site_settings) ? (($rootScope.site_settings[2] != undefined) ? $rootScope.site_settings[2]  : '' ): '';
    	$scope.site_name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0]  : '' ): '';
    	$scope.site_url = ($rootScope.site_settings) ? (($rootScope.site_settings[14] != undefined) ? $rootScope.site_settings[14]  : '' ): '';*/
    	$scope.site_logo = ($rootScope.site_settings) ? (($rootScope.site_settings[1] != undefined) ? $rootScope.site_settings[1]  : '' ): '';

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if (!$scope.user_id) {

			 $state.go('static.index',{},{reload:true});

		}

		$rootScope.$on('navBar', function(event, data) {
             $scope.black_bg = data;
        });

		if ($stateParams.sub_id == undefined || $stateParams.sub_id == '') {

			$scope.sub_profile_id = memoryStorage.sub_profile_id;


		} else {	

			memoryStorage.sub_profile_id = $stateParams.sub_id;

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

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

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

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_id:$scope.sub_profile_id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.sub_profile = data.data;

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					$state.go('manage-profile.view-profile', {}, {reload:true});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});


		$.ajax({

			type : "post",

			url : apiUrl + "userApi/active-profiles",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_id : $scope.sub_profile_id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.profiles = data.data;

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});




		$scope.logout = function() {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			localStorage.removeItem("sessionStorage");
			localStorage.clear();

			UIkit.notify({message : "Logged Out Successfully", status : 'success', timeout : 3000, pos : 'top-center'});

			$state.go('static.index', {}, {reload:true});

		};

	}
])

.controller('footerCtrl', ['$scope', '$http', '$rootScope', '$window', '$state', 

	function ($scope, $http, $rootScope, $window, $state) {

		/*console.log("ss");

		$rootScope.$on('footerBar', function(event, data) {

             $scope.showFooter = data;

             console.log($scope.showFooter);
        });*/


	}
])