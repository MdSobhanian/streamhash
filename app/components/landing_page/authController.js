angular.module('streamViewApp')
.controller('authController', [ '$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {
		

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

	    $scope.allPages = $rootScope.allPages;

	}	
	
	
]);