angular.module('streamViewApp')
.controller('landingController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location,$http) {

		$rootScope.$emit('body_bg_img', false);

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

	    /******************* Banner Heading ***********************************/

	    var banner_heading = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_banner_heading'; });

	    var home_banner_heading = "";

	    if (banner_heading.length == 0) {

	        console.log("not found");
	        
	    } else if (banner_heading.length == 1) {

	      // access the foo property using result[0].foo

	      home_banner_heading = banner_heading[0].value;

	      if (home_banner_heading != '' || home_banner_heading != null || home_banner_heading != undefined) {
	        
	      } else {

	        home_banner_heading = '';

	      }

	    } else {

	      // multiple items found
	      home_banner_heading = "";

	    }

	    $scope.banner_heading = home_banner_heading;
		    
		/************************************ Banner Description ***********************/

		var banner_description = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_banner_description'; });

	    var home_banner_description = "";

	    if (banner_description.length == 0) {

	        console.log("not found");
	        
	    } else if (banner_description.length == 1) {

	      // access the foo property using result[0].foo

	      home_banner_description = banner_description[0].value;

	      if (home_banner_description != '' || home_banner_description != null || home_banner_description != undefined) {
	        
	      } else {

	        home_banner_description = '';

	      }

	    } else {

	      // multiple items found
	      home_banner_description = "";

	    }

	    $scope.banner_description = home_banner_description;
		    

		/*************************** Home - About site ***************************/

		


		var about_site = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_about_site'; });

	    var home_about_site = "";

	    if (about_site.length == 0) {

	        console.log("not found");
	        
	    } else if (about_site.length == 1) {

	      // access the foo property using result[0].foo

	      home_about_site = about_site[0].value;

	      if (home_about_site != '' || home_about_site != null || home_about_site != undefined) {
	        
	      } else {

	        home_about_site = '';

	      }

	    } else {

	      // multiple items found
	      home_about_site = "";

	    }

	    $scope.about_site = home_about_site;


	    /************************* Home - Cancel content *************************/


	    var cancel_content = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_cancel_content'; });

	    var home_cancel_content = "";

	    if (cancel_content.length == 0) {

	        console.log("not found");
	        
	    } else if (cancel_content.length == 1) {

	      // access the foo property using result[0].foo

	      home_cancel_content = cancel_content[0].value;

	      if (home_cancel_content != '' || home_cancel_content != null || home_cancel_content != undefined) {
	        
	      } else {

	        home_cancel_content = '';

	      }

	    } else {

	      // multiple items found
	      home_cancel_content = "";

	    }

	    $scope.cancel_content = home_cancel_content;
		    

	    
	  	/************************* Home - Desktop image *************************/


	    var desktop_image = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_browse_desktop_image'; });

	    var home_browse_desktop_image = "";

	    if (desktop_image.length == 0) {

	        console.log("not found");
	        
	    } else if (desktop_image.length == 1) {

	      // access the foo property using result[0].foo

	      home_browse_desktop_image = desktop_image[0].value;

	      if (home_browse_desktop_image != '' || home_browse_desktop_image != null || home_browse_desktop_image != undefined) {
	        
	      } else {

	        home_browse_desktop_image = '';

	      }

	    } else {

	      // multiple items found
	      home_browse_desktop_image = "";

	    }

	    $scope.desktop_image = home_browse_desktop_image;

	    
	  	/************************* Home - Tv image *************************/


	    var tv_image = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_browse_tv_image'; });

	    var home_browse_tv_image = "";

	    if (tv_image.length == 0) {

	        console.log("not found");
	        
	    } else if (tv_image.length == 1) {

	      // access the foo property using result[0].foo

	      home_browse_tv_image = tv_image[0].value;

	      if (home_browse_tv_image != '' || home_browse_tv_image != null || home_browse_tv_image != undefined) {
	        
	      } else {

	        home_browse_tv_image = '';

	      }

	    } else {

	      // multiple items found
	      home_browse_tv_image = "";

	    }

	    $scope.tv_image = home_browse_tv_image;

	    /************************* Home - Mobile image *************************/


	    var mobile_image = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_browse_mobile_image'; });

	    var home_browse_mobile_image = "";

	    if (mobile_image.length == 0) {

	        console.log("not found");
	        
	    } else if (mobile_image.length == 1) {

	      // access the foo property using result[0].foo

	      home_browse_mobile_image = mobile_image[0].value;

	      if (home_browse_mobile_image != '' || home_browse_mobile_image != null || home_browse_mobile_image != undefined) {
	        
	      } else {

	        home_browse_mobile_image = '';

	      }

	    } else {

	      // multiple items found
	      home_browse_mobile_image = "";

	    }

	    $scope.mobile_image = home_browse_mobile_image;

	    /************************* Home - Cancel image *************************/


	    var cancel_image = $.grep($rootScope.site_settings, function(e){ return e.key == 'home_cancel_image'; });

	    var home_cancel_image = "";

	    if (cancel_image.length == 0) {

	        console.log("not found");
	        
	    } else if (cancel_image.length == 1) {

	      // access the foo property using result[0].foo

	      home_cancel_image = cancel_image[0].value;

	      if (home_cancel_image != '' || home_cancel_image != null || home_cancel_image != undefined) {
	        
	      } else {

	        home_cancel_image = '';

	      }

	    } else {

	      // multiple items found
	      home_cancel_image = "";

	    }

	    $scope.cancel_image = home_cancel_image;
	    
	}

]);