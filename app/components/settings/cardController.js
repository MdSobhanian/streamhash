angular.module('streamViewApp')

.controller('cardDetailsController', ['$scope', '$http', '$rootScope', '$window', '$state',  '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		if ($scope.user_id && $scope.access_token) {

			$scope.sub_profile_id = ($stateParams.sub_profile_id != '' && $stateParams.sub_profile_id != undefined) ? $stateParams.sub_profile_id : memoryStorage.sub_profile_id;

			$scope.cardDetails = function() {
				$.ajax({

					type : "post",

					url : apiUrl + "userApi/card_details",

					data : {sub_profile_id : $stateParams.sub_profile_id, id : memoryStorage.user_id, token : memoryStorage.access_token},

					async : false,

					beforeSend : function() {

						$("#before_loader").fadeIn();

					},

					success : function (data) {

						if (data.success) {

							$scope.cards = data.data;

						} else {

							UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

							return false;
						}
					},
					error : function (data) {

						UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

					},

					complete : function() {

						$("#before_loader").fadeOut();

					},
				});
			}

			$scope.cardDetails();

			$scope.deleteCard = function(card_id) {

				if (confirm('Are you sure want to delete the card ?')) {

					$.ajax({

						type : "post",

						url : apiUrl + "userApi/delete_card",

						data : {sub_profile_id : $stateParams.sub_profile_id, id : memoryStorage.user_id, token : memoryStorage.access_token, card_id : card_id},

						async : false,

						beforeSend : function() {

							$("#before_loader").fadeIn();

						},

						success : function (data) {

							if (data.success) {

								UIkit.notify({message : 'Successfully, the card has been deleted', timeout : 3000, pos : 'top-center', status : 'success'});

								$scope.cardDetails();

							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;
							}
						},
						error : function (data) {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

						},

						complete : function() {

							$("#before_loader").fadeOut();

						},
					});

				}
			}

			$scope.setAsDefault = function(card_id) {

				if (confirm('Are you sure want to delete the card ?')) {

					$.ajax({

						type : "post",

						url : apiUrl + "userApi/default_card",

						data : {sub_profile_id : $stateParams.sub_profile_id, id : memoryStorage.user_id, token : memoryStorage.access_token, card_id : card_id},

						async : false,

						beforeSend : function() {

							$("#before_loader").fadeIn();

						},

						success : function (data) {

							if (data.success) {

								UIkit.notify({message : 'Successfully, changed the card as default', timeout : 3000, pos : 'top-center', status : 'success'});

								$scope.cardDetails();

							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;
							}
						},
						error : function (data) {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

						},

						complete : function() {

							$("#before_loader").fadeOut();

						},
					});

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

])

.controller('addCardController', ['$scope', '$http', '$rootScope', '$window', '$state',  '$stateParams',

	function ($scope, $http, $rootScope, $window, $state, $stateParams) {

		$scope.user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

		$scope.access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

		$scope.sub_profile_id = ($stateParams.sub_profile_id != '' && $stateParams.sub_profile_id != undefined) ? $stateParams.sub_profile_id : memoryStorage.sub_profile_id;

		if ($scope.user_id && $scope.access_token) {

			var stripe_publishable_key = $.grep($rootScope.site_settings, function(e){ return e.key == 'stripe_publishable_key'; });

		    var stripe_publish_key = "";

		    if (stripe_publishable_key.length == 0) {

		        console.log("not found");
		        
		    } else if (stripe_publishable_key.length == 1) {

		      // access the foo property using result[0].foo

		      stripe_publish_key = stripe_publishable_key[0].value;

		      if (stripe_publish_key != '' || stripe_publish_key != null || stripe_publish_key != undefined) {
		        
		      } else {

		        stripe_publish_key = '';

		      }

		    } else {

		      // multiple items found
		      stripe_publish_key = "";

		    }

		    $scope.stripe_publishable_key = stripe_publish_key;

		    if ($scope.stripe_publishable_key) {


				Stripe.setPublishableKey($scope.stripe_publishable_key);


			    $scope.saveCard = function() {

			    	var card_token = $('#stripeToken').val();

			    	var number = $('#number').val();

			    	$.ajax({

						type : "post",

						url : apiUrl + "userApi/payment_card_add",

						data : {sub_profile_id : $stateParams.sub_profile_id, 
							id : memoryStorage.user_id, 
							token : memoryStorage.access_token, 
							card_token : card_token,
							number : number},

						async : false,

						beforeSend : function() {

							$("#before_loader").fadeIn();

						},

						success : function (data) {

							if (data.success) {

								UIkit.notify({message : 'Successfully, added the card into your account', timeout : 3000, pos : 'top-center', status : 'success'});

								$state.go('profile.card-list', {sub_profile_id:$stateParams.sub_profile_id}, {reload:true})

							} else {

								UIkit.notify({message : data.error_messages, timeout : 3000, pos : 'top-center', status : 'danger'});

								return false;
							}
						},
						error : function (data) {

							UIkit.notify({message : 'Something Went Wrong, Please Try again later', timeout : 3000, pos : 'top-center', status : 'danger'});

						},

						complete : function() {

							$("#before_loader").fadeOut();

						},
					});
			    	
			    }
			    
			    var stripeResponseHandler = function (status, response) {

			        var $form = $('#payment-form');

			        console.log(response);

			        if (response.error) {

			            // Show the errors on the form
			            /*$form.find('.payment-errors').text(response.error.message);
			            $form.find('button').prop('disabled', false);*/

			           // alert(response.error.message);

			           UIkit.notify({message : response.error.message, timeout : 3000, pos : 'top-center', status : 'danger'});

			           $form.find('button').prop('disabled', false);

			        } else {
			            // token contains id, last4, and card type
			            var token = response.id;
			            
			            // Insert the token into the form so it gets submitted to the server
			            $form.append($('<input type="hidden" id="stripeToken" name="stripeToken" />').val(token));
			             // alert(token);
			            // and re-submit

			            // jQuery($form.get(0)).submit();

			            $scope.saveCard();

			        }
			    
			    };


			    $('#payment-form').submit(function (e) {

			        
			        if ($('#stripeToken').length == 0)
			        {
			            var $form = $(this);

			            // Disable the submit button to prevent repeated clicks
			            $form.find('button').prop('disabled', true);

			            console.log($form);

			            Stripe.card.createToken($form, stripeResponseHandler);

			            // Prevent the form from submitting with the default action
			            return false;
			        }
			    
			    });

			} else {

				UIkit.notify({message : 'Contact admin to enable stripe card.', timeout : 3000, pos : 'top-center', status : 'warning'});


				$('#save_card_btn').prop('disabled', true);

				return false;

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