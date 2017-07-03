angular.module('streamViewApp')
.controller('browseController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/browse",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, key : $stateParams.browse},

			async : false,

			success : function (data) {

				if (data.success) {

					$scope.datas = data;

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},
		});


		$scope.hoverIn = function(id, key) {

			$('#'+id+"_"+key).addClass('transition-class');

			$('#'+id+"_"+key).css('overflow', 'hidden');

			/*var video_drop = $(".video-drop").is(":visible");

			if (!video_drop) {

				$(this).addClass('transition-class');

			} else {

				$(this).addClass('active_img');
			}*/

		};

		$scope.hoverOut = function(id, key) {

			$('#'+id+"_"+key).removeClass('transition-class');

		};


	}

]);