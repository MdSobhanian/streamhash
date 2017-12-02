streamViewApp.factory('authInterceptor', function ($q, $window, $location) {
        return {
            request: function (config) {
                //if (memoryStorage.access_token && config.url.substring(0, 4) == 'http') { // Use this when the application run in production
               // if (memoryStorage.access_token) {
                    // config.params = {'token': memoryStorage.access_token, 'id' : memoryStorage.user_id};
                // }
                var user_id = (memoryStorage.user_id != '' && memoryStorage.user_id != undefined ) ? memoryStorage.user_id : false;

                var access_token = (memoryStorage.access_token != undefined && memoryStorage.access_token != '') ? memoryStorage.access_token : '';

                if (user_id && access_token) {

                    $.ajax({

                        type : "post",

                        url : apiUrl + "userApi/check_token_valid",

                        data : {id : user_id, token : access_token},

                        success : function(data) {

                            if (!data.success) {

                                if(data.error_code  == 101 || data.error_code == 103 || data.error_code == 104) {

                                    window.localStorage.setItem('logged_in', false);

                                    memoryStorage = {};
                                    
                                    localStorage.removeItem("sessionStorage");

                                    localStorage.clear();

                                    $location.path('/index');

                                }

                            }

                        }


                    });

                }


                return config;
            },
            responseError: function (rejection) {

                console.log("rejection");
                
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