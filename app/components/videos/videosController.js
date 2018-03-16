angular.module('streamViewApp')
.controller('browseController', [

	'$scope', '$http', '$rootScope', '$window', '$state', '$stateParams', '$location', '$anchorScroll',

	function ($scope, $http, $rootScope, $window, $state, $stateParams, $location, $anchorScroll) {

        $scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

        $scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

        if ($scope.user_id && $scope.access_token) {

			$anchorScroll();

			$scope.user_type = (memoryStorage.user_type == undefined || memoryStorage.user_type == 0 ) ? true : false;


			$scope.addWishlist = function(id, subkey, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/addWishlist",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#my-list-txt_"+subkey+"_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-check my-list-icon"></i><span class="my-list-txt">Adding</span></a>');

					},

					success : function (data) {

						if (data.success) {

							setTimeout(function(){

								$("#my-list-txt_"+subkey+"_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().removeWishlist('+data.wishlist_id+', '+id+', '+ subkey +', '+$index+', '+"'"+key+"'"+')" class="my-list bold" id="remove-my-list-txt" style="cursor: pointer;">'+
								    							'<i class="fa fa-check my-list-icon"></i>'+
								    							'<span class="my-list-txt">My List</span>'+
								    						'</a>');
							}, 2000);
						} else {

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});


							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}
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

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, wishlist_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,
					
					beforeSend : function() {

						console.log("#my-list-txt_"+sub+"_"+$index+"_"+key);

						$("#my-list-txt_"+sub+"_"+$index+"_"+key)
						.html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Removing</span></a>');

					},
					success : function (data) {

						if (data.success) {

							setTimeout(function(){

							$("#my-list-txt_"+sub+"_"+$index+"_"+key).html('<a onclick="angular.element(this).scope().addWishlist('+admin_video_id+', '+sub+', '+$index+', '+"'"+key+"'"+')" class="my-list bold" style="cursor: pointer;">'+
							    							'<i class="fa fa-plus my-list-icon"></i>'+
							    							'<span class="my-list-txt">My List</span>'+
							    						'</a>');

							}, 2000);


						} else {

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});


							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}
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



			$scope.likeVideo = function(admin_video_id, subkey, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/like_video",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						$("#like_"+subkey+"_"+$index+"_"+key).addClass('disabled_class');

					},

					success : function (data) {

						$("#like_"+subkey+"_"+$index+"_"+key).removeClass('disabled_class');


						if (data.success) {

							$("#like_count_"+subkey+"_"+$index+"_"+key).html(data.like_count);

							$("#dis_like_count_"+subkey+"_"+$index+"_"+key).html(data.dislike_count);

							// setTimeout(function(){

								if (data.delete) {

									// UIkit.notify({message : "We are very sorry you removed the video from like", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#dis_like_"+subkey+"_"+$index+"_"+key).show();

									$("#dis_like_"+subkey+"_"+$index+"_"+key).removeClass('ng-hide');

									$("#dis_like_"+subkey+"_"+$index+"_"+key).css('display', 'inline !important');

								} else {

									// UIkit.notify({message : "I'm glad you liked the video", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#dis_like_"+subkey+"_"+$index+"_"+key).fadeOut(500);

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

			$scope.dislikeVideo = function(admin_video_id, subkey, $index, key) {

				$.ajax({

					type : "post",

					url : apiUrl + "userApi/dis_like_video",

					data : {id : memoryStorage.user_id, token : memoryStorage.access_token, admin_video_id : admin_video_id,sub_profile_id:memoryStorage.sub_profile_id},

					async : false,

					beforeSend : function() {

						//$("#my-list-txt_"+$index+"_"+key).html('<a class="my-list bold"><i class="fa fa-plus my-list-icon"></i><span class="my-list-txt">Removing</span></a>');
						$("#dis_like_"+subkey+"_"+$index+"_"+key).addClass('disabled_class');

					},

					success : function (data) {

						$("#dis_like_"+subkey+"_"+$index+"_"+key).removeClass('disabled_class');

						if (data.success) {

							$("#like_count_"+subkey+"_"+$index+"_"+key).html(data.like_count);

							$("#dis_like_count_"+subkey+"_"+$index+"_"+key).html(data.dislike_count);


							// setTimeout(function(){
								if (data.delete) {

									// UIkit.notify({message : "I'm glad you removed the video from dislike", timeout : 3000, pos : 'top-center', status : 'success'});

									$("#like_"+subkey+"_"+$index+"_"+key).show(500);

									$("#like_"+subkey+"_"+$index+"_"+key).removeClass('ng-hide');
									
									$("#like_"+subkey+"_"+$index+"_"+key).css('display', 'inline !important');

								} else {

									// UIkit.notify({message : "You disliked the video", timeout : 3000, pos : 'top-center', status : 'warning'});

									$("#like_"+subkey+"_"+$index+"_"+key).fadeOut(500);

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

			$scope.getSeasons = function(genre_id, sub, idx, key, divid, loader,main_id) {

			 	
				if (genre_id == '' || genre_id  == undefined) {

					genre_id = main_id;
				}

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

							if(data.error_code 	== 101 || data.error_code == 103 || data.error_code == 104) {

					            window.localStorage.setItem('logged_in', false);

					            memoryStorage = {};
					            
					            localStorage.removeItem("sessionStorage");

					            localStorage.clear();

					            $state.go('static.index', {}, {reload:true});


							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;

							}
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

			$.ajax({

				type : "post",

				url : apiUrl + "userApi/browse",

				data : {id : memoryStorage.user_id, token : memoryStorage.access_token, key : $stateParams.browse, sub_profile_id : memoryStorage.sub_profile_id},

				async : false,

				success : function (data) {

					if (data.success) {

						$scope.datas = data;

					} else {

						UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

						return false;
					}
				},
				error : function (data) {

					UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

				},
			});


			$scope.showVideoDrop = function(event, sub, idx, key) {

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

		} else {

            window.localStorage.setItem('logged_in', false);

            memoryStorage = {};
            
            localStorage.removeItem("sessionStorage");

            localStorage.clear();

            $state.go('static.index', {}, {reload:true});

        }
	}

]);