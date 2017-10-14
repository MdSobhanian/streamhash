angular.module('streamViewApp')
.controller('browseController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$anchorScroll',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location, $anchorScroll) {

		// $location.hash('page_content');

		$anchorScroll();

		$scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;

		/*if ($scope.user_type) {

			$state.go('profile.subscriptions', {sub_profile_id : memoryStorage.sub_profile_id}, {reload:true});

		}*/


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

			$scope.closeDiv = function(sub,index, key) {

				$("#"+sub+'_'+index+"_"+key+"_video_drop").fadeOut();

				$('#'+sub+'_'+index+"_"+key+"_img").removeClass('active_img');

				$('#'+sub+'_'+index+"_"+key+"_desc").show();	

				$('#'+sub+'_'+index+"_"+key+"_div").removeClass('play_icon_div');	
			}

			$scope.removeWishlist = function(id, admin_video_id, sub, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/deleteWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, wishlist_id : id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-check my-list-icon"></i><span class="my-list-txt">Removing</span></a>');

					},

					success : function (data) {

						if (data.success) {

							$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().addWishlist('+admin_video_id+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" style="cursor: pointer;">'+
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

			 $scope.getSeasons = function(genre_id, sub, idx, key, divid, loader) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/genre-list",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, genre_id : genre_id, sub_profile_id :memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#"+sub+idx+key+divid).html("");

						$("#"+sub+idx+key+loader).show();

					},

					success : function (data) {

						if (data.success) {

							// $("#"+divid).html(data.view);

							console.log($("#"+sub+idx+key+divid));

							$("#"+sub+idx+key+divid).html(data.data);

						} else {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function(data) {

						$("#"+sub+idx+key+loader).hide();

					},
				});

			}


		$.ajax({

			type : "post",

			url : apiUrl + "userApi/browse",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, key : $stateParams.browse, sub_profile_id : memoryStorage.sub_profile_id},

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


		/*$scope.hoverIn = function(id, key) {

			$('#'+id+"_"+key).addClass('transition-class');

			$('#'+id+"_"+key).css('overflow', 'hidden');

			

		};

		$scope.hoverOut = function(id, key) {

			$('#'+id+"_"+key).removeClass('transition-class');

		};*/

		$scope.showVideoDrop = function(event, sub, idx, key) {

		   /* $parent_box = $(event).closest('.slide-area');

		    $silde_box = $(event).closest('.slide-box');

		    $silde_box.addClass('active_img');

		    //$silde_box.css('height', '145px !important');

		    $parent_box.siblings().find('.video-drop').hide();*/

		    // $("#"+idx+"_"+id+"_video").show();

		    // $parent_box.find('.video-drop').toggle();

		    $("#"+sub+'_'+idx+"_"+key+"_video_drop").show();

		    $('#'+sub+'_'+idx+"_"+key).removeClass('transition-class');

		    $('#'+sub+'_'+idx+"_"+key+"_img").addClass('active_img');

		    $('#'+sub+'_'+idx+"_"+key+"_desc").hide();	

			$('#'+sub+'_'+idx+"_"+key+"_div").addClass('play_icon_div');	


		};

		

		$scope.hoverIn = function(event, sub, id, key, length) {

			var video_drop = $(".video-drop").is(":visible");

			console.log(video_drop);

			if (!video_drop) {

				$('#'+sub+'_'+id+"_"+key).addClass('transition-class');

			} else {

				for(var i = 0; i < length ; i++) {

					$("#"+sub+'_'+i+"_"+key+"_video_drop").hide();

					$('#'+sub+'_'+i+"_"+key+"_img").removeClass('active_img');


					$('#'+sub+'_'+i+"_"+key+"_desc").show();	

						$('#'+sub+'_'+i+"_"+key+"_div").removeClass('play_icon_div');	

				}

				console.log('#'+sub+'_'+id+"_"+key+"_img");

				$('#'+sub+'_'+id+"_"+key+"_img").addClass('active_img');

				$("#"+sub+'_'+id+"_"+key+"_video_drop").show();

				$('#'+sub+'_'+id+"_"+key+"_desc").hide();	

				$('#'+sub+'_'+id+"_"+key+"_div").addClass('play_icon_div');	
			}

		};

		$scope.hoverOut = function(event, sub, id, key, length) {
			
			var video_drop = $(".video-drop").is(":visible");

			if (video_drop) {

				for(var i = 0; i < length ; i++) {

					$("#"+sub+'_'+i+"_"+key+"_video_drop").hide();

					$('#'+sub+'_'+i+"_"+key+"_img").removeClass('active_img');

					$('#'+sub+'_'+i+"_"+key+"_desc").show();	

					$('#'+sub+'_'+i+"_"+key+"_div").removeClass('play_icon_div');	

				}

				$('#'+sub+'_'+id+"_"+key+"_img").addClass('active_img');

				$("#"+sub+'_'+id+"_"+key+"_video_drop").show();

				$('#'+sub+'_'+id+"_"+key+"_desc").hide();	

				$('#'+sub+'_'+id+"_"+key+"_div").addClass('play_icon_div');	
				
			} 

			$('#'+sub+'_'+id+"_"+key).removeClass('transition-class');
			
		};

		$scope.dynamicContent = function(sub, index, key, id) {

				$("#"+sub+"_"+index+"_"+key+"_overview").hide();
				$("#"+sub+"_"+index+"_"+key+"_episodes").hide();
				$("#"+sub+"_"+index+"_"+key+"_trailers").hide();
				$("#"+sub+"_"+index+"_"+key+"_more-like").hide();
				$("#"+sub+"_"+index+"_"+key+"_details").hide();

				if (id == "overview") {

					$("#"+sub+"_"+index+"_"+key+"_overview").show();

				} else if (id == "episodes") {

					$("#"+sub+"_"+index+"_"+key+"_episodes").show();

				} else if (id == "trailers") {

					$("#"+sub+"_"+index+"_"+key+"_trailers").show();
					
				} else if (id == "more-like") {

					$("#"+sub+"_"+index+"_"+key+"_more-like").show();
					
				} else {

					$("#"+sub+"_"+index+"_"+key+"_details").show();
				}
		}


	}

]);