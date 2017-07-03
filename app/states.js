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
                })

                .state("static.signin",{
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
                })

                .state("static.signup",{
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
                })

                .state("static.forgot",{
                    url:"/forgot",
                    templateUrl:'app/components/auth/forgot_password.html',
                    controller: 'forgotController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/auth/forgotController.js',
                            ]);
                        }]
                    }, 
                })


                .state("manage-profile",{
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
                })

                .state("manage-profile.add-profile",{
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
                })

                .state("manage-profile.manage-profiles",{
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
                })

                .state("manage-profile.edit-profile",{
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
                })

                .state("profile",{
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
                    url: "/home/{id}",
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
                    url: "/title/{title}",
                    templateUrl: 'app/components/details/details_page.html',
                    controller: 'titlePageController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/details/detailePageController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Details'
                    }
                })

                 .state("profile.browse", {
                    url: "/browse/{browse}",
                    templateUrl: 'app/components/videos/videos.html',
                    controller: 'browseController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/components/videos/videosController.js',

                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Videos'
                    }
                })

                .state("profile.account-settings", {
                    url: "/account-settings/{id}",
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


            $httpProvider.interceptors.push('authInterceptor');

        }
    ]);