streamViewApp.factory('authInterceptor', function ($q, $window, $location) {
        return {
            request: function (config) {
                //if (memoryStorage.access_token && config.url.substring(0, 4) == 'http') { // Use this when the application run in production
               // if (memoryStorage.access_token) {
                    // config.params = {'token': memoryStorage.access_token, 'id' : memoryStorage.user_id};
                // }
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $window.setTimeout(function () {
                        // $window.location = '#/login';
                        $location.path('/home').replace();
                    }, 1000);
                }
                return $q.reject(rejection);
            }
        };
})