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

/*var route_url = "http://localhost/streamview-base/streamview-angular/#";

var apiUrl = "http://localhost:8000/";

var angularUrl = "http://localhost/streamview-base/streamview-angular/#/";*/


var route_url = "http://streamview.streamhash.com/#";

var apiUrl = "http://adminview.streamhash.com/";

var angularUrl = "http://streamview.streamhash.com/#/";

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

           var hideClass = 'ng-hide',
                delay = 1000,
                firstChangeStartt = false,
                firstContentLoaded = false,
                timer;

              $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams) {

                  // Remove this if you want the loader + delayed view behavior when first entering the page
                  if (!firstChangeStartt) {
                    firstChangeStartt = true;
                    return;
                  }

                  // Cancel the ongoing timer (if any)
                  // This is used not to get weird behaviors if you change state before the previous has finished loading
                  $timeout.cancel(timer);

                  // Show the loader and hide the old view as soon as a state change has started
                  $(".page-loading").removeClass(hideClass);

                  $('.page').addClass(hideClass);
                });

              // Use '$viewContentLoaded' instead of '$stateChangeSuccess'.
              // When '$stateChangeSuccess' fires the DOM has not been rendered and you cannot directly query the elements from the new HTML
              // When '$viewContentLoaded' fires the new DOM has been rendered
              $rootScope.$on('$viewContentLoaded',
                function(event, toState, toParams, fromState, fromParams) {

                  // Remove this if you want the loader + delayed view behavior when first entering the page
                  if (!firstContentLoaded) {
                    firstContentLoaded = true;
                    return;
                  }

                  $timeout.cancel(timer);

                  // Hide the new view as soon as it has rendered
                  var page = $('.page');
                  page.addClass(hideClass);

                  // Hide the loader and show the new view after a delay
                  // Pass false as the third argument to prevent the digest loop from starting (since you are just modifying CSS there is no reason for Angular to perform dirty checking in this example)
                  timer = $timeout(function() {

                    page.removeClass(hideClass);
                    $(".page-loading").addClass(hideClass);

                  }, delay, false);
                });
                
               /* $rootScope.$on('$stateChangeSuccess', function () {

                    window.onbeforeunload = null;

                    $timeout(function() {
                            $rootScope.pageLoading = false;
                        },5000);

                    $timeout(function() {
                            $rootScope.pageLoaded = true;
                          },50000);

                 });


                 $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                    if(toState.name != 'profile.home' && $stateParams.slider_id == '') {

                        if(!toParams.hasOwnProperty('hidePreloader')) {
                                $rootScope.pageLoading = true;
                                $rootScope.pageLoaded = false;
                        }

                    }

                 });*/


          
                $.ajax({
                    url : apiUrl+"userApi/site_settings",
                    type : 'get',
                    contentType : false,
                    processData: false,
                    async : false,
                    success : function(result) {
                      // console.log(result);
                      $rootScope.site_settings = result;
                    }
                });

                $.ajax({
                  url : apiUrl+'userApi/allPages',
                  type : 'post',
                  success : function(data) {
                    $rootScope.allPages = data;
                  }
               })

        }

]);

streamViewApp.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});