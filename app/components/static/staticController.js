angular.module('streamViewApp')
.controller('staticController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

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


		$.ajax({
	        url : apiUrl+'userApi/getPage/'+$stateParams.id,
	        type : 'get',
	        
	        async : false,
	        beforeSend : function() {

				$("#before_loader").show();

			},
	        success : function(data) {
	          $scope.page = data;
	        },

	        complete : function(data) {

				$("#before_loader").hide();

			},
	    })


	}

]);