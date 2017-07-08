angular.module('streamViewApp')
.controller('singleVideoController', ['$scope', '$http', '$rootScope', '$window', '$state', '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.video = '';

		console.log($scope.video);

		$scope.sub_profile_id = memoryStorage.sub_profile_id;

		$scope.height = $(window).height();

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/genre-video",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, genre_id : $stateParams.id},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.video = data.model;

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
              }],
            // file: "{{$trailerstreamUrl}}",
            image: $scope.video.image,
            width: "100%",
            aspectratio: "16:9",
            primary: "flash",
            autostart : true,
        });

	}
]);