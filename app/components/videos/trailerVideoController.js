angular.module('streamViewApp')
.controller('trailerVideoController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.trailer_video = '';

		console.log($scope.trailer_video);

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		$scope.height = $(window).height();

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/singleVideo",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data;

					console.log($scope.video.trailer_video);

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});


		jwplayer.key="M2NCefPoiiKsaVB8nTttvMBxfb1J3Xl7PDXSaw==";

		var playerInstance = jwplayer("video-player");


		playerInstance.setup({
            sources: [{
                file: $scope.video.trailer_video,
              }],
            // file: "{{$trailerstreamUrl}}",
            image: $scope.video.video.default_image,
            width: "100%",
            aspectratio: "16:9",
            primary: "flash",
            autostart : true,
        });


        playerInstance.on('setupError', function() {

                   // jQuery("#video-player").css("display", "none");
                   // jQuery('#trailer_video_setup_error').hide();
                   

                    var hasFlash = false;
                    try {
                        var fo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
                        if (fo) {
                            hasFlash = true;
                        }
                    } catch (e) {
                        if (navigator.mimeTypes
                                && navigator.mimeTypes['application/x-shockwave-flash'] != undefined
                                && navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin) {
                            hasFlash = true;
                        }
                    }

                    if (hasFlash == false) {
                        jQuery('#flash_error_display').show();
                        return false;
                    }

                    // jQuery('#main_video_setup_error').css("display", "block");

                    confirm('The video format is not supported in this browser. Please option some other browser.');
                
                });

		console.log($scope.trailer_video);


		/*$.ajax({

			type : "post",

			url : apiUrl + "userApi/addHistory",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id, sub_profile_id:memoryStorage.sub_profile_id},

			async : false,

			success : function (data) {

				if (data.success) {
					

				} else {

					console.log('Something Went Wrong, Please Try again later');

					return false;
				}
			},
			error : function (data) {

				console.log('Something Went Wrong, Please Try again later');

			},
		});*/


	}
]);