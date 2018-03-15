streamViewApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider
                .when('/', '/index')
                .otherwise('/index');
            $stateProvider

                .state("static",{
                    cache: false,
                    abstract:true,
                    url:"",
                    templateUrl:'app/components/landing_page/footer.html',
                    controller:'authController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_notify',
                                'app/components/landing_page/authController.js',
                            ]);
                        }]
                    }, 
                })

                .state("static.index",{
                    cache: false,
                    url:"/index",
                    templateUrl:'app/components/landing_page/landing_page.html',
                    controller: 'landingController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/landing_page/landingController.js',
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Home'
                    }
                })

                .state("static.signin",{
                    cache: false,
                    url:"/signin",
                    templateUrl:'app/components/auth/signin.html',
                    controller: 'signinController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/auth/signinController.js',
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Login'
                    }
                })

                .state("static.signup",{
                    cache: false,
                    url:"/signup",
                    templateUrl:'app/components/auth/signup.html',
                    controller: 'signupController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/auth/signupController.js',
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Signup'
                    }
                })

                .state("static.forgot",{
                    url:"/forgot",
                    cache: false,
                    templateUrl:'app/components/auth/forgot_password.html',
                    controller: 'forgotController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/auth/forgotController.js',
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Forgot Password'
                    }
                })


                .state("manage-profile",{
                    cache: false,
                    abstract:true,
                    url:"",
                    templateUrl:'app/components/profiles/header.html',
                    controller:'profilesController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/profiles/profileController.js',
                                'lazy_notify'
                            ]);
                        }]
                    }, 
                })

                .state("manage-profile.view-profile",{
                    cache: false,
                    url:"/view-profiles",
                    templateUrl:'app/components/profiles/view-profile.html',
                    controller: 'viewProfilesController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               // 'lazy_notify'
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'View Profiles'
                    }
                })

                .state("manage-profile.add-profile",{
                    cache: false,
                    url:"/add-profile",
                    templateUrl:'app/components/profiles/add_profile.html',
                    controller: 'addProfileController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               // 'lazy_notify'
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Add Profile'
                    }
                })

                .state("manage-profile.manage-profiles",{
                    cache: false,
                    url:"/manage-profiles",
                    templateUrl:'app/components/profiles/manage-profiles.html',
                    controller: 'manageProfilesController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               // 'lazy_notify'
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Manage Profiles'
                    }
                })

                .state("manage-profile.edit-profile",{
                    cache: false,
                    url:"/edit-profile/{id}",
                    templateUrl:'app/components/profiles/edit-profile.html',
                    controller: 'editProfileController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                               // 'lazy_notify'
                            ]);
                        }]
                    }, 
                    data: {
                        pageTitle: 'Edit Profile'
                    }
                })

                .state("profile",{
                    cache: false,
                    abstract:true,
                    url:"",
                    templateUrl:'app/shared/main_layout.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/shared/layoutController.js',
                                'lazy_notify'
                            ]);
                        }]
                    }, 
                })

                .state("profile.home", {
                    cache: false,
                    url: "/home/{sub_profile_id}",
                    templateUrl: 'app/components/home/home_page.html',
                    controller: 'homePageController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_animation',
                                'assets/css/home.css',
                                'app/components/home/homePageController.js',
                               // 'assets/js/homeController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Home'
                    }
                })

                .state("profile.title", {
                    cache: false,
                    url: "/title/{title}",
                    templateUrl: 'app/components/details/details_page.html',
                    controller: 'titlePageController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/css/home.css',
                                'app/components/details/detailePageController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Details'
                    }
                })

                .state("profile.spam_videos", {
                    cache: false,
                    url: "/spam/videos",
                    templateUrl: 'app/components/spam_videos/spam_videos.html',
                    controller: 'spamVideosController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/css/home.css',
                                'app/components/spam_videos/spamVideosController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Spam Videos'
                    }
                })

                 .state("profile.browse", {
                    cache: false,
                    url: "/browse/{browse}",
                    templateUrl: 'app/components/videos/videos.html',
                    controller: 'browseController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/css/home.css',
                                'app/components/videos/videosController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Videos'
                    }
                })

                .state("profile.search", {
                    cache: false,
                    url: "/search/{word}",
                    templateUrl: 'app/components/search/search_videos.html',
                    controller: 'searchWordController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/search/searchVideoController.js',
                                'assets/css/home.css',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Search Videos'
                    }
                })


                .state("profile.account-settings", {
                    cache: false,
                    url: "/account-settings/{sub_profile_id}",
                    templateUrl: 'app/components/settings/account_settings.html',
                    controller: 'settingsController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Settings',
                    }
                })

                .state("profile.change-password", {
                    cache: false,
                    url: "/change-password/{id}",
                    templateUrl: 'app/components/settings/change_password.html',
                    controller: 'changePasswordController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Change Password',
                    }
                })

                .state("profile.delete-account", {
                    cache: false,
                    url: "/delete-account/{id}",
                    templateUrl: 'app/components/settings/delete_account.html',
                    controller: 'deleteAccountController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Delete Account',
                    }
                })

                .state("profile.edit-account", {
                    cache: false,
                    url: "/edit-account/{id}",
                    templateUrl: 'app/components/settings/edit_account.html',
                    controller: 'editAccountController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Edit Account',
                    }
                })



                .state("profile.subscriptions", {
                    cache: false,
                    url: "/subscriptions/{sub_profile_id}",
                    templateUrl: 'app/components/settings/subscriptions.html',
                    controller: 'subscriptionsController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',
                                'assets/css/subscriptions.css'

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Subscriptions',
                    }
                })


                .state("profile.billing-details", {
                    cache: false,
                    url: "/billing-details/{sub_profile_id}",
                    templateUrl: 'app/components/settings/billing_details.html',
                    controller: 'billingDetailsController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/settingsController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Billing Details',
                    }
                })

                .state('profile.pay_per_view', {
                    cache: false,
                    url: "/pay-per-view/{id}",
                    templateUrl: 'app/components/settings/pay_per_view.html',
                    controller: 'payPerViewController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/payPerViewController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Pay Per View Details',
                    }

                })

                .state('profile.pay_per_view_success', {
                    cache: false,
                    url: "/pay-per-view-success/{id}",
                    templateUrl: 'app/components/settings/pay_per_view_success.html',
                    controller: 'payPerViewSuccessController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/payPerViewController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Pay Per View Success',
                    }

                })

                .state('profile.subscription-success', {
                    cache: false,
                    url: "/subscription-success",
                    templateUrl: 'app/components/settings/subscription-success.html',
                    controller: 'subscriptionSuccessController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/subscriptionController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Subscription Success',
                    }

                })

                .state('profile.payment-option', {
                    cache: false,
                    url: "/payment-potion/{id}",
                    templateUrl: 'app/components/settings/payment_option.html',
                    controller: 'paymentOptionController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/paymentOptionController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Payment Option',
                    }

                })


                .state("single_video", {
                    cache: false,
                    url: "/video/{id}",
                    templateUrl: 'app/components/videos/single_video.html',
                    controller: 'singleVideoController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_notify',
                                'app/components/videos/singleVideoController.js',
                                'assets/jwplayer/jwplayer.js',
                                'js!https://cdn.socket.io/socket.io-1.4.5.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Video Details',
                    }
                })

                .state('profile.payment-failure', {
                    // cache: false,
                    url: "/payment-failure",
                    templateUrl: 'app/components/settings/payment-failure.html'
                   
                })

                .state('profile.add-card', {
                    // cache: false,
                    url: "/add-card/{sub_profile_id}",
                    templateUrl: 'app/components/settings/add-card.html',
                    controller: 'addCardController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'assets/js/card.js',
                                'js!https://js.stripe.com/v2/',
                                'app/components/settings/cardController.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Add Card',
                    }
                })

                .state('profile.card-list', {
                    // cache: false,
                    url: "/card-list/{sub_profile_id}",
                    templateUrl: 'app/components/settings/card-list.html',
                    controller: 'cardDetailsController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/cardController.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Card Details',
                    }
                })

                .state('profile.payment-details', {
                    // cache: false,
                    url: "/payment-details",
                    templateUrl: 'app/components/settings/payment-details.html',
                    controller: 'paidVideoController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/paidVideoController.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Paid Video Details',
                    }
                })

                .state("trailer_video", {
                    cache: false,
                    url: "/trailer_video/{id}",
                    templateUrl: 'app/components/videos/trailer_video.html',
                    controller: 'trailerVideoController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_notify',
                                'app/components/videos/trailerVideoController.js',
                                'assets/jwplayer/jwplayer.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Video Details',
                    }
                })

                 .state("genre_video", {
                    cache: false,
                    url: "/genre_video/{id}",
                    templateUrl: 'app/components/videos/genre_video.html',
                    controller: 'singleVideoController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'lazy_notify',
                                'app/components/videos/genreVideoController.js',
                                'assets/jwplayer/jwplayer.js',
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Video Details',
                    }
                })

                .state("static.page",{
                    cache: false,
                    url:"/page/{id}",
                    templateUrl:'app/components/static/static.html',
                    controller: 'staticController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/static/staticController.js',
                            ]);
                        }]
                    }, 
                })


                .state("static.social_login_failure",{
                    cache: false,
                    url:"/social_login_failure",
                    controller: 'staticFailureController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/auth/signinController.js',
                            ]);
                        }]
                    }, 
                })


                .state("static.social_login", {
                    cache: false,
                    url: "/social_login/{id}/{token}",
                    controller: 'socialLoginCtrl',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                 'app/components/auth/signinController.js',  
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Login'
                    }
                })


                 .state('profile.invoice', {
                    cache: false,
                    url: "/invoice/{subscription_id}",
                    templateUrl: 'app/components/settings/invoice/invoice.html',
                    controller: 'invoiceController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/settings/invoice/invoiceController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Invoice Details',
                    }

                })



            $httpProvider.interceptors.push('authInterceptor');

        }
    ]);