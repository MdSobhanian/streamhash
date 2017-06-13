streamViewApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {
            $urlRouterProvider
                .when('/', '/home')
                .otherwise('/home');
            $stateProvider
                .state("static",{
                    abstract:true,
                    url:"",
                    templateUrl:'app/shared/main_layout.html',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                'app/shared/layoutController.js',
                                // 'lazy_notify'
                            ]);
                        }]
                    }, 
                })

                .state("static.home", {
                    url: "/home",
                    templateUrl: 'app/components/home/home_page.html',
                    controller: 'homePageController',
                    resolve: {
                        deps: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                 'app/components/home/homePageController.js'
                            ]);
                        }]
                    },
                    data: {
                        pageTitle: 'Home'
                    }
                })


            $httpProvider.interceptors.push('authInterceptor');

        }
    ]);