angular.module('streamViewApp')
.controller('titlePageController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$anchorScroll',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location,  $anchorScroll) {

		$scope.user_id = (memoryStorage.user_id != undefined && memoryStorage.user_id != '') ? memoryStorage.user_id : '';

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$anchorScroll();

			$scope.title = $stateParams.title;

			$scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;

			$scope.addWishlist = function(id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/addWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : id,
						sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-check fa-stack-1x my-list-icon"></i><span class="my-list-txt">Adding</span></a>');

					},

					success : function (data) {

						if (data.success) {

							setTimeout(function(){

								$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().removeWishlist('+data.wishlist_id+', '+id+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" id="remove-my-list-txt" style="cursor: pointer;">'+
							    							'<i class="fa fa-check my-list-icon"></i>'+
							    							'<span class="my-list-txt">My List</span>'+
							    						'</a>');

							}, 2000);

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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

				$('#'+index+"_"+key+"_desc").show();	

				$('#'+index+"_"+key+"_div").removeClass('play_icon_div');	
			}

			$scope.removeWishlist = function(id, admin_video_id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/deleteWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, wishlist_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+$index+"_"+key)
						.html('<a class="my-list bold"><i class="fa fa-plus fa-stack-1x fa-inverse padding2"></i><span class="my-list-txt">Removing</span></a>');

					},

					success : function (data) {

						if (data.success) {

							setTimeout(function(){

								$("#my-list-txt_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().addWishlist('+admin_video_id+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" style="cursor: pointer;">'+
							    							'<i class="fa fa-plus my-list-icon"></i>'+
							    							'<span class="my-list-txt">My List</span>'+
							    						'</a>');

							}, 2000);

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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

			

			$scope.likeVideo = function(admin_video_id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/like_video",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#like_"+$index+"_"+key).addClass('disabled_class');

					},

					success : function (data) {

						$("#like_"+$index+"_"+key).removeClass('disabled_class');


						if (data.success) {

							$("#like_count_"+$index+"_"+key).html(data.like_count);

							$("#dis_like_count_"+$index+"_"+key).html(data.dislike_count);

							// setTimeout(function(){

								if (data.delete) {

									// UIkit.notify({message : "We are very sorry you removed the video from like", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#dis_like_"+$index+"_"+key).show();

									$("#dis_like_"+$index+"_"+key).removeClass('ng-hide');

									$("#dis_like_"+$index+"_"+key).css('display', 'inline !important');

								} else {

									// UIkit.notify({message : "I'm glad you liked the video", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#dis_like_"+$index+"_"+key).fadeOut(500);

								}

							// }, 2000);

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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

			$scope.dislikeVideo = function(admin_video_id, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/dis_like_video",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						//$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Removing</span></a>');
						$("#dis_like_"+$index+"_"+key).addClass('disabled_class');

					},

					success : function (data) {

						$("#dis_like_"+$index+"_"+key).removeClass('disabled_class');

						if (data.success) {

							$("#like_count_"+$index+"_"+key).html(data.like_count);

							$("#dis_like_count_"+$index+"_"+key).html(data.dislike_count);


							// setTimeout(function(){
								if (data.delete) {

									// UIkit.notify({message : "I'm glad you removed the video from dislike", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#like_"+$index+"_"+key).show(500);

									$("#like_"+$index+"_"+key).removeClass('ng-hide');
									
									$("#like_"+$index+"_"+key).css('display', 'inline !important');

								} else {

									// UIkit.notify({message : "You disliked the video", timeout : 3000, pos : 'top-center', status : 'warning'});

									$("#like_"+$index+"_"+key).fadeOut(500);

								}

							// }, 2000);

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

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

				type : "get",

				url : apiUrl + "userApi/spam-reasons",

				beforeSend : function() {

					//$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Removing</span></a>');

				},

				success : function (data) {


					if (data.success) {
						
						$scope.spam_reasons = data.data;

					} else {

						//UIkit.notify({message : data.error_messages, timeout : 5000, pos : 'top-center', status : 'danger'});

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

			$scope.spamVideo = function(admin_video_id, index, key) {

				if (confirm('Are you sure want to spam the video ?')) {

					var reason = $('input[name=reason]:checked').val();

					$.ajax({

						type : "post",

						url : apiUrl + "userApi/add_spam",

						data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id , reason : reason},

						async : false,

						beforeSend : function() {

							//$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Removing</span></a>');

						},

						success : function (data) {


							if (data.success) {
								
								UIkit.notify({message : "You have marked the video as spam, the video won't appear anywhere except spam videos section", timeout : 3000, pos : 'top-center', status : 'success'});

								// window.setTimeout(function() {

								window.location.reload();

								// }, 1000);

							} else {

								UIkit.notify({message : data.error_messages, timeout : 5000, pos : 'top-center', status : 'danger'});

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
			
			}

			$scope.showVideoDrop = function(event, idx, key) {

			    $("#"+idx+"_"+key+"_video_drop").show();

			    $('#'+idx+"_"+key).removeClass('transition-class');

			    $('#'+idx+"_"+key+"_img").addClass('active_img');

			    $('#'+idx+"_"+key+"_desc").hide();	

				$('#'+idx+"_"+key+"_div").addClass('play_icon_div');	

			};

			$scope.hoverIn = function(event, id, key, length) {

				//$(".video-drop").hide();

				var video_drop = $(".video-drop").is(":visible");

				if (!video_drop) {

					$('#'+id+"_"+key).addClass('transition-class');

				} else {

					for(var i = 0; i < length ; i++) {

						$("#"+i+"_"+key+"_video_drop").hide();

						$('#'+i+"_"+key+"_img").removeClass('active_img');

						$('#'+i+"_"+key+"_desc").show();	

						$('#'+i+"_"+key+"_div").removeClass('play_icon_div');	

					}


					$('#'+id+"_"+key+"_img").addClass('active_img');

					$("#"+id+"_"+key+"_video_drop").show();

					$('#'+id+"_"+key+"_desc").hide();	

					$('#'+id+"_"+key+"_div").addClass('play_icon_div');	
				}

			};

			$scope.hoverOut = function(event, id, key, length) {
				
				var video_drop = $(".video-drop").is(":visible");

				if (video_drop) {

					for(var i = 0; i < length ; i++) {

						$("#"+i+"_"+key+"_video_drop").hide();

						$('#'+i+"_"+key+"_img").removeClass('active_img');

						$('#'+i+"_"+key+"_desc").show();	

						$('#'+i+"_"+key+"_div").removeClass('play_icon_div');	

					}

					$('#'+id+"_"+key+"_img").addClass('active_img');

					$("#"+id+"_"+key+"_video_drop").show();

					$('#'+id+"_"+key+"_desc").hide();	

					$('#'+id+"_"+key+"_div").addClass('play_icon_div');	
					
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

			$(window).scroll(function() {

		    	if($(window).scrollTop() == $(document).height() - $(window).height()) {
			           // ajax call get data from server and append to the div
			        $("#load_more_details").click();
			    }

			});

			$scope.getSeasons = function(genre_id, idx, key, divid, loader, main_id) {


				if (genre_id == '' || genre_id  == undefined) {

					genre_id = main_id;
				}

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/genre-list",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, genre_id : genre_id, sub_profile_id:memoryStorage.sub_profile_id},

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

			$scope.datas =  [];

			$scope.detailsFn = function(skip, take) {

				var data = new FormData;
				data.append('id', memoryStorage.user_id);
				data.append('token', memoryStorage.access_token);
				data.append('sub_profile_id', memoryStorage.sub_profile_id);
				data.append('key', $stateParams.title);
				data.append('skip',skip);
				data.append('take',take);


				$.ajax({

					type : "post",

					url : apiUrl + "userApi/details",

					data : data,

					contentType : false,

					processData: false,

					async : false,

					beforeSend : function() {

						$("#data_loader").show();

					},

					success : function (data) {

						if (data.success) {

							// $scope.datas = data;

							if (data.data.length > 0) {

								$scope.title = data.title;

								if($scope.datas.length > 0) {
									
									$scope.datas = $.merge($scope.datas, data.data);

								} else {

									$scope.datas = data.data;

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

					complete : function(data) {

						$("#data_loader").hide();

					},
				});
			}

			$scope.detailsFn(0, 12);

			$scope.loadMoreDetails = function () {

				var dataLength = $scope.datas.length;

				length = 0;

				for (var i = 0; i < dataLength; i++) {

					length += $scope.datas[i].length;

				}

		        $total = length;

				$scope.detailsFn($total, 12);
					
			}

		} else {

			window.localStorage.setItem('logged_in', false);

			memoryStorage = {};
			
			localStorage.removeItem("sessionStorage");

			localStorage.clear();

			$state.go('static.index', {}, {reload:true});

		}
	}

]);