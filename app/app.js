(function(){
  if(localStorage.getItem('sessionStorage')===null) {
    window.memoryStorage={};
  } else{ 
    window.memoryStorage=JSON.parse(localStorage.getItem('sessionStorage'));
  } 
  function isEmpty(o){
    for(var i in o){
      return false;
    }
    return true;
  };
  if(isEmpty(memoryStorage)) { 
    localStorage.setItem('getSessionStorage',Date.now());
  };
  function storageChange (event) {
    if(event.key === 'logged_in') {
        memoryStorage = {};
        localStorage.removeItem("sessionStorage");
        localStorage.clear();
        window.location.reload();
    }
  }
  window.addEventListener('storage', storageChange, false)

  window.addEventListener('storage',function(event){
    if(event.key=='getSessionStorage'){
      localStorage.setItem('sessionStorage',JSON.stringify(memoryStorage));
      localStorage.removeItem('sessionStorage');
    } else if(event.key=='sessionStorage'&&isEmpty(memoryStorage)){
      var data=JSON.parse(event.newValue),value;
      for(key in data){
        memoryStorage[key]=data[key];
      }
      var el=!isEmpty(memoryStorage)?JSON.stringify(memoryStorage):'memoryStorage is empty';
    }
  });
  window.onbeforeunload=function(){};
})();

'use strict';


var streamViewApp = angular.module('streamViewApp', [
  'ngCookies',  
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'oc.lazyLoad',
  'slick',
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

            $rootScope.id = memoryStorage.user_id;

            $rootScope.token = memoryStorage.access_token;

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

              if(toState.name != 'profile.home' && $stateParams.slider_id == '') {

                  if(!toParams.hasOwnProperty('hidePreloader')) {
                          $rootScope.pageLoading = true;
                          $rootScope.pageLoaded = false;
                  }

              }

           });


            // console.log($state);

            // console.log($state.params);

            if ($location.path() == '/home/') {

              $state.go('profile.home', {id: ''});

            }
          

            $rootScope.pageLoading = true;



        }

])

.run(['$templateCache', function ( $templateCache ) {
    $templateCache.removeAll(); 
}]);
