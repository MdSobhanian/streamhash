angular.module('streamViewApp')
.controller('homePageController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		$scope.sub_profile_id = memoryStorage.sub_profile_id = $stateParams.sub_profile_id;


		$scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;


		/*if ($scope.user_type) {

			$state.go('profile.subscriptions', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

		}*/



		$scope.window_width = $(window).width();

        if ($scope.window_width > 991) {

            $scope.slide_to_show = 5;

            $scope.slide_to_scroll = 5;

        }

         if ($scope.window_width > 767 && $scope.window_width < 992) {

        $scope.slide_to_show = 4;

        $scope.slide_to_scroll = 4;

        }  

        if ($scope.window_width > 479 && $scope.window_width < 768) {

        $scope.slide_to_show = 3;

        $scope.slide_to_scroll = 3;

        }  

        if ($scope.window_width < 480) {

        $scope.slide_to_show = 2;

        $scope.slide_to_scroll = 2;

        }    


		$rootScope.$emit('footerBar', false);

		$rootScope.$emit('activeProfiles',$stateParams.sub_profile_id);

		if ($scope.user_id) {


				$.ajax({

					type : "post",

					url : apiUrl + "userApi/home",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, sub_profile_id : memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#before_loader").show();

					},

					success : function (data) {

						if (data.success) {

							$scope.datas = data.data;

							$scope.recent_video = data.recent_video;

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

				$scope.load = function() {

					/*jQuery('.post').addClass("hidden").viewportChecker({

					    classToAdd: 'visible animated fadeInDown',
					    
					    offset: 100    
					}); */

				};

				$scope.showArrow = function(id) {

					$("#"+id).css('line-height', 0);

					$("#"+id).fadeIn()

				};

				$scope.hideArrow = function(id) {

					$("#"+id).fadeOut();

				};

				$scope.showVideoDrop = function(event, idx, key) {

				   /* $parent_box = $(event).closest('.slide-area');

				    $silde_box = $(event).closest('.slide-box');

				    $silde_box.addClass('active_img');

				    //$silde_box.css('height', '145px !important');

				    $parent_box.siblings().find('.video-drop').hide();*/

				    // $("#"+idx+"_"+id+"_video").fadeIn();

				    // $parent_box.find('.video-drop').toggle();

				    $(".video-drop").hide();

				    $("#"+idx+"_"+key+"_video_drop").show();

				    // $('#'+idx+"_"+key).addClass('active_img');

				    //console.log($('#'+idx+"_"+key).closest('.slide-box').siblings().find('tile-img').addClass('active_img'));

				    $('#'+idx+"_"+key+"_img").addClass('active_img');

				    $('#'+idx+"_"+key+"_desc").hide();	

					$('#'+idx+"_"+key+"_div").addClass('play_icon_div');	


				};

				

				$scope.hoverIn = function(event, id, key, length) {
					

					/*console.log($(".video-drop").attr('id'));

					console.log($("#"+id+"_"+key+"_video_drop"));

					if ($("#"+id+"_"+key+"_video_drop") != $(".video-drop").attr('id')) {

						$(".video-drop").hide();
					}
*/
					var video_drop = $(".video-drop").is(":visible");

					if (!video_drop) {

						$('#'+id+"_"+key).addClass('transition-class');

						$('#'+id+"_"+key+"_desc").show();

						$('#'+id+"_"+key+"_div").removeClass('play_icon_div');


					} else {

						for(var i = 0; i < length ; i++) {

							$("#"+i+"_"+key+"_video_drop").hide();

							// $('#'+i+"_"+key).removeClass('active_img');

							$('#'+i+"_"+key+"_img").removeClass('active_img');

							$('#'+i+"_"+key+"_div").removeClass('play_icon_div');

							$('#'+i+"_"+key+"_desc").show();	

						}

						$('#'+id+"_"+key+"_img").addClass('active_img');

						$('#'+id+"_"+key+"_desc").hide();	

						$('#'+id+"_"+key+"_div").addClass('play_icon_div');	

						$("#"+id+"_"+key+"_video_drop").show();
					}

				};

				$scope.hoverOut = function(event, id, key, length) {
					
					var video_drop = $(".video-drop").is(":visible");



					if (video_drop) {

						for(var i = 0; i < length ; i++) {

							$("#"+i+"_"+key+"_video_drop").hide();

							$('#'+i+"_"+key+"_img").removeClass('active_img');

							$('#'+i+"_"+key+"_div").removeClass('play_icon_div');

							$('#'+i+"_"+key+"_desc").show();

						}

						// $('#'+id+"_"+key).addClass('active_img');

						$('#'+id+"_"+key+"_img").addClass('active_img');

						$('#'+id+"_"+key+"_desc").hide();

						$('#'+id+"_"+key+"_div").addClass('play_icon_div');

						$("#"+id+"_"+key+"_video_drop").show();
						
					} 

					$('#'+id+"_"+key).removeClass('transition-class');
					
				};

							
				/*$('.video-box').hover(function() {

					console.log("ff");

				 	for(var i = 0; i < 6; i++) {

				 		$("#"+i).removeClass('active_img');

				 	}

				 	console.log("ddd");

					var id_val = $(this).attr('id');

					var video_drop = $(".video-drop").is(":visible");

					if (!video_drop) {

						$(this).addClass('transition-class');

					} else {

						$(this).addClass('active_img');
					}

					// $scope.callRoute(id_val);

				}, function() {

				    $(this).removeClass('transition-class');

				    var video_drop = $(".video-drop").is(":visible");


				});
			*/
			/*		$scope.callRoute = function(id) {

						$rootScope.$apply(function() {

							$location.path('/home/'+id);

						});

					};

					$scope.showArrow = function(this) {

						$(this).children('.fa-angle-right').show();
					};
			*/

			$scope.dynamicContent = function(index, key, id) {

				$("#"+index+"_"+key+"_overview").hide();
				$("#"+index+"_"+key+"_episodes").hide();
				$("#"+index+"_"+key+"_trailers").hide();
				$("#"+index+"_"+key+"_more-like").hide();
				$("#"+index+"_"+key+"_details").hide();

				if (id == "overview") {

					$("#"+index+"_"+key+"_overview").show();

				} else if (id == "episodes") {

					$("#"+index+"_"+key+"_episodes").show();

				} else if (id == "trailers") {

					$("#"+index+"_"+key+"_trailers").show();
					
				} else if (id == "more-like") {

					$("#"+index+"_"+key+"_more-like").show();
					
				} else {

					$("#"+index+"_"+key+"_details").show();
				}
			}

			$scope.displayContent = function(id) {

				$("#overview").hide();
				$("#episodes").hide();
				$("#trailers").hide();
				$("#more-like").hide();
				$("#details").hide();

				if (id == 'overview') {

					$("#overview").show();

				} else if (id == 'episodes') {

					$("#episodes").show();

				} else if (id == 'trailers') {

					$("#trailers").show();
					
				} else if (id == 'more-like') {

					$("#more-like").show();
					
				} else {

					$("#details").show();
				}
				
				
			}

			$scope.addWishlist = function(id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/addWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Adding</span></a>');

					},

					success : function (data) {

						if (data.success) {

							$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().removeWishlist('+data.wishlist_id+', '+id+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" id="remove-my-list-txt" style="cursor: pointer;">'+
							    							'<i class="fa fa-check my-list-icon"></i>'+
							    							'<span class="my-list-txt">My List</span>'+
							    						'</a>');

						} else {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					/*complete : function(data) {

						$("#before_loader").hide();

					},*/
				});
			}

			$scope.closeDiv = function(index, key) {

				$("#"+index+"_"+key+"_video_drop").fadeOut();

				// $("#"+index+"_"+key+"_video_drop").fadeOut();

				$('#'+index+"_"+key+"_img").removeClass('active_img');

				$('#'+index+"_"+key+"_desc").show();	

				$('#'+index+"_"+key+"_div").removeClass('play_icon_div');	
			}

			$scope.removeWishlist = function(id, admin_video_id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/deleteWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, wishlist_id : id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key)
						.html('<a class="my-list bold"><span class="fa-stack fa-lg my-list-icon"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-plus fa-stack-1x fa-inverse padding2"></i></span><span class="my-list-txt">Removing</span></a>');

					},

					success : function (data) {

						if (data.success) {

							$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().addWishlist('+admin_video_id+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" style="cursor: pointer;">'+
							    							'<span class="fa-stack fa-lg my-list-icon"><i class="fa fa-circle-thin fa-stack-2x"></i><i class="fa fa-check fa-stack-1x fa-inverse padding2"></i></span>'+
							    							'<span class="my-list-txt">My List</span>'+
							    						'</a>');

						} else {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					/*complete : function(data) {

						$("#before_loader").hide();

					},*/
				});
			}

			$scope.getSeasons = function(genre_id, idx, key, divid, loader) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/genre-list",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, genre_id : genre_id},

					async : false,

					beforeSend : function() {

						$("#"+idx+key+divid).html("");

						$("#"+idx+key+loader).show();

					},

					success : function (data) {

						if (data.success) {

							// $("#"+divid).html(data.view);

							console.log($("#"+idx+key+divid));

							$("#"+idx+key+divid).html(data.data);

						} else {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function(data) {

						$("#"+idx+key+loader).hide();

					},
				});

			}

		} else {

			$state.go('static.index', {}, {reload:true});
		}

	}
]);
