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

				//drop-content
				$('.arrow').on('click', function(){
				    $parent_box = $(this).closest('.slide-area');

				    $silde_box = $(this).closest('.slide-box');

				    $silde_box.addClass('active_img');

				    $parent_box.siblings().find('.video-drop').hide();

				    $parent_box.find('.video-drop').toggle();
				});

				$scope.hoverIn = function(id, key) {

					$('#'+id+"_"+key).addClass('transition-class');

					var video_drop = $(".video-drop").is(":visible");

					if (!video_drop) {

						$(this).addClass('transition-class');

					} else {

						$(this).addClass('active_img');
					}

				};

				$scope.hoverOut = function(id, key) {

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

		} else {

			$state.go('static.index', {}, {reload:true});
		}

	}
]);
