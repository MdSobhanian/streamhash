angular.module('streamViewApp')
.controller('singleVideoController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

	$scope.video = '';

        $scope.displayPopup = false;

        $scope.showPopup = function() {

            $scope.displayPopup = true;

        }

        $scope.closePopup = function() {

            $scope.displayPopup = false;

        }

        function copyTextToClipboard(text) {

           var textArea = document.createElement( "textarea" );
           textArea.value = text;
           document.body.appendChild( textArea );

           textArea.select();

           $("#embed_link").select();

           try {
              var successful = document.execCommand( 'copy' );
              var msg = successful ? 'successful' : 'unsuccessful';
              console.log('Copying text command was ' + msg);
           } catch (err) {
              console.log('Oops, unable to copy');
           }

           document.body.removeChild( textArea );
        }

        $scope.copyFromTextBox = function() {

            var embed_link = $("#embed_link").val();

            copyTextToClipboard(embed_link);

        };

        $scope.ios_video = '';

		console.log($scope.video);

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		$scope.height = $(window).height();

        $scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;

        /*if ($scope.user_type) {

            $state.go('profile.subscriptions', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

        }*/


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

                var is_mobile = false;

        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        if(isMobile.any()) {

            var is_mobile = true;

        }

        if (is_mobile) {

            var video = $scope.ios_video;
        } else {

            var video = $scope.video.video;
        }


		playerInstance.setup({
              sources: [{
                file: video
              }],
            // file: "{{$trailerstreamUrl}}",
            image: $scope.video.image,
            width: "100%",
            height : $scope.height,
            primary: "flash",
            autostart : true,
            tracks : [{
              file : $scope.video->subtitle,
              kind : "captions",
              default : true,
            }]
        });


         playerInstance.on('error', function() {

            jQuery("#video-player").css("display", "none");
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

            console.log(hasFlash);

            if (hasFlash == false) {
                jQuery('#flash_error_display').show();
                return false;
            }

            // jQuery('#main_video_setup_error').css("display", "block");

            confirm('The video format is not supported in this browser. Please option some other browser.');
        
        });

        playerInstance.on('setupError', function() {

           jQuery("#video-player").css("display", "none");
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