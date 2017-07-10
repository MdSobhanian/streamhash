angular.module('streamViewApp')
.controller('searchWordController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$anchorScroll',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location, $anchorScroll) {

		// $location.hash('page_content');

		$anchorScroll();

		$scope.title = $stateParams.word;

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

				$('#'+index+"_"+key+"_img").removeClass('active_img');
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


		$.ajax({

			type : "post",

			url : apiUrl + "userApi/searchVideo",

			data : {id : memoryStorage.user_id, token : memoryStorage.access_token, key : $stateParams.word},

			async : false,

			beforeSend : function() {

					$("#data_loader").show();

			},

			success : function (data) {

				if (data.success) {

					if (data.data.length > 0) {

						$scope.datas = data;
 
					} else {

						$scope.no_results_found = "No Search Result Found";
					}

				} else {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					return false;
				}
			},
			error : function (data) {

				UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

			},

			complete : function(data) {

				$("#data_loader").hide();

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

		    $("#"+idx+"_"+key+"_video_drop").show();

		    $('#'+idx+"_"+key).removeClass('transition-class');

		    $('#'+idx+"_"+key+"_img").addClass('active_img');


		};

		

		$scope.hoverIn = function(event, id, key, length) {

			var video_drop = $(".video-drop").is(":visible");

			if (!video_drop) {

				$('#'+id+"_"+key).addClass('transition-class');

			} else {

				for(var i = 0; i < length ; i++) {

					$("#"+i+"_"+key+"_video_drop").hide();

					$('#'+i+"_"+key+"_img").removeClass('active_img');

				}


				$('#'+id+"_"+key+"_img").addClass('active_img');
				

				$("#"+id+"_"+key+"_video_drop").show();
			}

		};

		$scope.hoverOut = function(event, id, key, length) {
			
			var video_drop = $(".video-drop").is(":visible");

			if (video_drop) {

				for(var i = 0; i < length ; i++) {

					$("#"+i+"_"+key+"_video_drop").hide();

					$('#'+i+"_"+key+"_img").removeClass('active_img');

				}

				$('#'+id+"_"+key+"_img").addClass('active_img');

				$("#"+id+"_"+key+"_video_drop").show();
				
			} 

			$('#'+id+"_"+key).removeClass('transition-class');
			
		};

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


	}

]);