angular.module('streamViewApp')
.controller('landingController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location,$http) {


		$scope.allPages = $rootScope.allPages;

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		if ($scope.user_id) {

			$state.go('profile.home',{sub_profile_id : memoryStorage.sub_profile_id},{reload:true});
			
		}


		$rootScope.$emit('notfication_cleartimeout', true);



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


	    var home_bg_image = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_page_bg_image'; });

	    var bg_image = "";

	    if (home_bg_image.length == 0) {

	        console.log("not found");
	        
	    } else if (home_bg_image.length == 1) {

	      // access the foo property using result[0].foo

	      bg_image = home_bg_image[0].value;

	      if (bg_image != '' || bg_image != null || bg_image != undefined) {
	        
	      } else {

	        bg_image = '';

	      }

	    } else {

	      // multiple items found
	      bg_image = "";

	    }

	    $scope.home_bg_image = bg_image;

	    
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


	    

		
	}

]);