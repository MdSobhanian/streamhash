angular.module('streamViewApp')
.controller('singleVideoController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.video = '';

        $scope.ios_video = '';

		console.log($scope.video);

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		$scope.height = $(window).height();

        $scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;

        if ($scope.user_type) {

            $state.go('profile.subscriptions', {sub_id : memoryStorage.sub_profile_id}, {reload:true});

        }


		$.ajax({

			type : "post",

			url : apiUrl + "userApi/genre-video",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, genre_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data.model;

                    $scope.ios_video = data.ios_video;

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
                file: $scope.video.video,
              },{
                file: $scope.ios_video
                }],
            // file: "{{$trailerstreamUrl}}",
            image: $scope.video.image,
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

	}
]);