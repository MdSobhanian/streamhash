(function() {
  if (localStorage.getItem("sessionStorage") === null) {
    window.memoryStorage = {};
  } else {
    window.memoryStorage = JSON.parse(localStorage.getItem("sessionStorage"));
  }
  function isEmpty(o) {
    for (var i in o) {
      return false;
    }
    return true;
  }
  if (isEmpty(memoryStorage)) {
    localStorage.setItem("getSessionStorage", Date.now());
  }
  function storageChange(event) {
    if (event.key === "logged_in") {
      memoryStorage = {};
      localStorage.removeItem("sessionStorage");
      localStorage.clear();
      window.location.reload();
    }
  }
  window.addEventListener("storage", storageChange, false);

  window.addEventListener("storage", function(event) {
    if (event.key == "getSessionStorage") {
      localStorage.setItem("sessionStorage", JSON.stringify(memoryStorage));
      localStorage.removeItem("sessionStorage");
    } else if (event.key == "sessionStorage" && isEmpty(memoryStorage)) {
      var data = JSON.parse(event.newValue),
        value;
      for (key in data) {
        memoryStorage[key] = data[key];
      }
      var el = !isEmpty(memoryStorage)
        ? JSON.stringify(memoryStorage)
        : "memoryStorage is empty";
    }
  });
  window.onbeforeunload = function() {};
})();

("use strict");

var streamViewApp = angular.module("streamViewApp", [
  "ngCookies",
  "ngRoute",
  "ngSanitize",
  "ui.router",
  "oc.lazyLoad",
  "slick",
  "pascalprecht.translate"
]);

var route_url = "http://demo.streamhash.com/#";

var apiUrl = "http://adminview.streamhash.com/";

var angularUrl = "http://demo.streamhash.com/#/";

var common_url = "http://demo.streamhash.com/assets/";

streamViewApp.run([
  "$rootScope",
  "$state",
  "$stateParams",
  "$http",
  "$window",
  "$timeout",
  "$location",
  "$interval",
  "$anchorScroll",
  function(
    $rootScope,
    $state,
    $stateParams,
    $http,
    $window,
    $timeout,
    $location,
    $interval,
    $anchorScroll
  ) {
    $rootScope.id = memoryStorage.user_id;

    $rootScope.token = memoryStorage.access_token;

    var hideClass = "ng-hide",
      delay = 1000,
      firstChangeStartt = false,
      firstContentLoaded = false,
      timer;

    $rootScope.$on("$stateChangeStart", function(
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
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

      $(".page").addClass(hideClass);

      $rootScope.$emit("disconnect", true);

      $anchorScroll(0);
    });

    // Use '$viewContentLoaded' instead of '$stateChangeSuccess'.
    // When '$stateChangeSuccess' fires the DOM has not been rendered and you cannot directly query the elements from the new HTML
    // When '$viewContentLoaded' fires the new DOM has been rendered
    $rootScope.$on("$viewContentLoaded", function(
      event,
      toState,
      toParams,
      fromState,
      fromParams
    ) {
      // Remove this if you want the loader + delayed view behavior when first entering the page
      if (!firstContentLoaded) {
        firstContentLoaded = true;
        return;
      }

      $timeout.cancel(timer);

      // Hide the new view as soon as it has rendered
      var page = $(".page");
      page.addClass(hideClass);

      // Hide the loader and show the new view after a delay
      // Pass false as the third argument to prevent the digest loop from starting (since you are just modifying CSS there is no reason for Angular to perform dirty checking in this example)
      timer = $timeout(
        function() {
          page.removeClass(hideClass);
          $(".page-loading").addClass(hideClass);
        },
        delay,
        false
      );
    });

    $.ajax({
      url: apiUrl + "userApi/site_settings",
      type: "get",
      contentType: false,
      processData: false,
      async: false,
      success: function(result) {
        // console.log(result);
        $rootScope.site_settings = result;

        var common_bg_image = $.grep($rootScope.site_settings, function(e) {
          return e.key == "common_bg_image";
        });

        var common_bg = "";

        if (common_bg_image.length == 0) {
          console.log("not found");
        } else if (common_bg_image.length == 1) {
          // access the foo property using result[0].foo

          common_bg = common_bg_image[0].value;

          if (common_bg != "" || common_bg != null || common_bg != undefined) {
          } else {
            common_bg = "";
          }
        } else {
          // multiple items found
          common_bg = "";
        }

        $rootScope.common_bg = common_bg;
      }
    });

    $rootScope.$on("body_bg_img", function(event, data) {
      if (data) {
        $("body").css("background-image", "url(" + $rootScope.common_bg + ")");

        $("body").addClass("bg-img1");
      } else {
        $("body").css("background-image", "none");

        $("body").removeClass("bg-img1");
      }
    });

    $.ajax({
      url: apiUrl + "userApi/allPages",
      type: "post",
      success: function(data) {
        $rootScope.allPages = data;
      }
    });
  }
]);

streamViewApp.run(function($rootScope, $templateCache) {
  $rootScope.$on("$viewContentLoaded", function() {
    $templateCache.removeAll();
  });
});
streamViewApp.controller("siteCtrl", [
  "$scope",
  "$http",
  "$rootScope",
  function($scope, $http, $rootScope, $stateParams) {
    var site_icon = $.grep($rootScope.site_settings, function(e) {
      return e.key == "site_icon";
    });

    var icon = "";

    if (site_icon.length == 0) {
      console.log("not found");
    } else if (site_icon.length == 1) {
      // access the foo property using result[0].foo

      icon = site_icon[0].value;

      if (icon != "" || icon != null || icon != undefined) {
      } else {
        icon = "";
      }
    } else {
      // multiple items found
      icon = "";
    }

    $scope.site_icon = icon;

    var header_scripts = $.grep($rootScope.site_settings, function(e) {
      return e.key == "header_scripts";
    });

    var header_script = "";

    if (header_scripts.length == 0) {
      console.log("not found");
    } else if (header_scripts.length == 1) {
      // access the foo property using result[0].foo

      header_script = header_scripts[0].value;

      if (
        header_script != "" ||
        header_script != null ||
        header_script != undefined
      ) {
      } else {
        header_script = "";
      }
    } else {
      // multiple items found
      header_script = "";
    }

    $("#header_scripts").html(header_script);

    var body_end_scripts = $.grep($rootScope.site_settings, function(e) {
      return e.key == "body_scripts";
    });

    var body_end_script = "";

    if (body_end_scripts.length == 0) {
      console.log("not found");
    } else if (body_end_scripts.length == 1) {
      // access the foo property using result[0].foo

      body_end_script = body_end_scripts[0].value;

      if (
        body_end_script != "" ||
        body_end_script != null ||
        body_end_script != undefined
      ) {
      } else {
        body_end_script = "";
      }
    } else {
      // multiple items found
      body_end_script = "";
    }

    $("#body_scripts").html(body_end_script);

    var google_analytics = $.grep($rootScope.site_settings, function(e) {
      return e.key == "google_analytics";
    });

    var google_analytics_val = "";

    if (google_analytics.length == 0) {
      console.log("not found");
    } else if (google_analytics.length == 1) {
      // access the foo property using result[0].foo

      google_analytics_val = google_analytics[0].value;

      if (
        google_analytics_val != "" ||
        google_analytics_val != null ||
        google_analytics_val != undefined
      ) {
      } else {
        google_analytics_val = "";
      }
    } else {
      // multiple items found
      google_analytics_val = "";
    }

    $("#google_analytics").html(google_analytics_val);
  }
]);
