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

		console.log($scope.video);

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		$scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;

		/*if ($scope.user_type) {

			$state.go('profile.subscriptions', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

		}*/

		$scope.height = $(window).height();

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/singleVideo",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data;

                    $scope.embed_link = apiUrl+"embed?v_t=2&u_id="+data.video.unique_id;

                    if ($scope.video.pay_per_view_status) {


                    } else {

                        console.log($scope.video.pay_per_view_status);

                        $state.go('profile.pay_per_view', {id : $scope.video.video.admin_video_id}, {reload:true});

                    }


                    if ($scope.video.pay_per_view_status && $scope.video.video.amount <= 0) {

                        if (!$scope.user_type) {

                            $state.go('profile.subscriptions', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

                        }

                    }

				} else {

					UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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


        function getBrowser() {

            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            // Blink engine detection
            var isBlink = (isChrome || isOpera) && !!window.CSS;

            var b_n = '';

            switch(true) {

                case isFirefox :

                        b_n = "Firefox";

                        break;
                case isChrome :

                        b_n = "Chrome";

                        break;

                case isSafari :

                        b_n = "Safari";

                        break;
                case isOpera :

                        b_n = "Opera";

                        break;

                case isIE :

                        b_n = "IE";

                        break;

                case isEdge : 

                        b_n = "Edge";

                        break;

                case isBlink : 

                        b_n = "Blink";

                        break;

                default :

                        b_n = "Unknown";

                        break;

            }

            return b_n;

        }


        if(isMobile.any()) {

            var is_mobile = true;

        }


        var browser = getBrowser();


        if ((browser == 'Safari') || (browser == 'Opera') || is_mobile) {

        	var video = $scope.video.ios_video;

        } else {

        	var video = $scope.video.main_video;

        }


        function history() {
            
            $.ajax({

                type : "post",

                url : apiUrl + "userApi/addHistory",

                data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : $stateParams.id, sub_profile_id:memoryStorage.sub_profile_id},

                async : false,

                success : function (data) {

                    if (data.success) {
                        

                    } else {

                        console.log(data.error_messages);

                        return false;
                    }
                },
                error : function (data) {

                    console.log('Something Went Wrong, Please Try again later');

                },
            });

        }

		playerInstance.setup({
            sources: [{
                file: video
              }],
            // file: "{{$trailerstreamUrl}}",
            image: $scope.video.video.default_image,
            width: "100%",
            height : $scope.height,
            primary: "flash",
            autostart : true,
            /* "sharing": {
                "sites": ["reddit","facebook","twitter"]
            },*/
            events : {

                onComplete : function(event) { 

                    history();

                }
            },
            tracks : [{
              file : $scope.video.video_subtitle,
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

           // confirm('The video format is not supported in this browser. Please option some other browser.');
        
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

            // confirm('The video format is not supported in this browser. Please option some other browser.');
        
        });

		console.log($scope.video);



	}
]);