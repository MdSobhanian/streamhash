angular.module('streamViewApp')
.controller('homePageController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$http',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? true : false;

		$scope.sub_profile_id = memoryStorage.sub_profile_id = $stateParams.sub_id;

		$rootScope.$emit('footerBar', false);

		if ($scope.user_id) {



				$.ajax({

					type : "post",

					url : apiUrl + "userApi/home",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token},

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

			$scope.displayContent = function(id) {

				$("#overview").fadeOut();
				$("#episodes").fadeOut();
				$("#trailers").fadeOut();
				$("#more-like").fadeOut();
				$("#details").fadeOut();

				if (id == 'overview') {

					$("#overview").fadeIn();

				} else if (id == 'episodes') {

					$("#episodes").fadeIn();

				} else if (id == 'trailers') {

					$("#trailers").fadeIn();
					
				} else if (id == 'more-like') {

					$("#more-like").fadeIn();
					
				} else {

					$("#details").fadeIn();
				}
				
				
			}

			$scope.addWishlist = function(id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/addWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Adding</span></a>');

					},

					success : function (data) {

						if (data.success) {

							$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().removeWishlist('+data.wishlist_id+', '+id+', '+$index+', '+key+')" class="my-list bold" id="remove-my-list-txt" style="cursor: pointer;">'+
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
			}

			$scope.removeWishlist = function(id, admin_video_id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/deleteWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, wishlist_id : id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-check my-list-icon"></i><span class="my-list-txt">Removing</span></a>');

					},

					success : function (data) {

						if (data.success) {

							$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().addWishlist('+admin_video_id+', '+$index+', '+key+')" class="my-list bold" style="cursor: pointer;">'+
							    							'<i class="fa fa-plus my-list-icon"></i>'+
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

		} else {

			$state.go('static.index', {}, {reload:true});
		}

	}
]);
