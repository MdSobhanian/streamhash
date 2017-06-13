var streamViewApp = angular.module('streamViewApp', [
  'ngCookies',  
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'oc.lazyLoad'
]);


var route_url = "http://localhost/streamview-base/streamview-angular/#";

var apiUrl = "http://localhost:8000/";

var angularUrl = "http://localhost/streamview-base/streamview-angular/#/";

streamViewApp
    .run([
        '$rootScope',
        '$state',
        '$stateParams',
        '$http',
        '$window',
        '$timeout',
        '$location',
        function ($rootScope, $state, $stateParams,$http,$window, $timeout, $location) {

            $rootScope.$on('$stateChangeSuccess', function () {

              window.onbeforeunload = null;

              $timeout(function() {
                      $rootScope.pageLoading = false;
                  },100);

              $timeout(function() {
                      $rootScope.pageLoaded = true;
                    },2000);

           });


           $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

              if(!toParams.hasOwnProperty('hidePreloader')) {
                      $rootScope.pageLoading = true;
                      $rootScope.pageLoaded = false;
              }


           });

           $rootScope.pageLoading = true;

        }

])

.run(['$templateCache', function ( $templateCache ) {
    $templateCache.removeAll(); 
}]);
