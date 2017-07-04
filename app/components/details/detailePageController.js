angular.module('streamViewApp')
.controller('titlePageController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$.ajax({

			type : "post",

			url : apiUrl + "userApi/details",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, key : $stateParams.title},

			async : false,

			beforeSend : function() {

					$("#before_loader").show();

			},

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

			complete : function(data) {

				$("#before_loader").hide();

			},
		});

		$scope.showVideoDrop = function(event, idx, key) {

		   /* $parent_box = $(event).closest('.slide-area');

		    $silde_box = $(event).closest('.slide-box');

		    $silde_box.addClass('active_img');

		    //$silde_box.css('height', '145px !important');

		    $parent_box.siblings().find('.video-drop').hide();*/

		    // $("#"+idx+"_"+id+"_video").fadeIn();

		    // $parent_box.find('.video-drop').toggle();

		    $("#"+idx+"_"+key+"_video_drop").fadeIn();
		};

		

		$scope.hoverIn = function(event, id, key, length) {

			var video_drop = $(".video-drop").is(":visible");

			if (!video_drop) {

				$('#'+id+"_"+key).addClass('transition-class');

			} else {

				$('#'+id+"_"+key).addClass('active_img');

				for(var i = 0; i < length ; i++) {

					$("#"+i+"_"+key+"_video_drop").hide();

				}

				$("#"+id+"_"+key+"_video_drop").fadeIn();
			}

		};

		$scope.hoverOut = function(event, id, key, length) {
			
			var video_drop = $(".video-drop").is(":visible");

			if (video_drop) {

				for(var i = 0; i < length ; i++) {

					if (id != i) {

						$("#"+i+"_"+key+"_video_drop").fadeOut();

						$('#'+i+"_"+key).removeClass('active_img');

					}

				}

				
			} 

			$('#'+id+"_"+key).removeClass('transition-class');
			
		};

		$scope.dynamicContent = function(index, key, id) {

				$("#"+index+"_"+key+"_overview").fadeOut();
				$("#"+index+"_"+key+"_episodes").fadeOut();
				$("#"+index+"_"+key+"_trailers").fadeOut();
				$("#"+index+"_"+key+"_more-like").fadeOut();
				$("#"+index+"_"+key+"_details").fadeOut();

				if (id == "overview") {

					$("#"+index+"_"+key+"_overview").fadeIn();

				} else if (id == "episodes") {

					$("#"+index+"_"+key+"_episodes").fadeIn();

				} else if (id == "trailers") {

					$("#"+index+"_"+key+"_trailers").fadeIn();
					
				} else if (id == "more-like") {

					$("#"+index+"_"+key+"_more-like").fadeIn();
					
				} else {

					$("#"+index+"_"+key+"_details").fadeIn();
				}
		}


	}

]);