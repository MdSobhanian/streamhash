/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

'use strict';

streamViewApp
    // page title
    .directive('pageTitle', [
        '$rootScope',
        '$timeout',
        function($rootScope, $timeout) {
            return {
                restrict: 'A',
                link: function() {
                    var listener = function(event, toState) {

                        var name = ($rootScope.site_settings) ? (($rootScope.site_settings[0] != undefined) ? $rootScope.site_settings[0]  : 'StreamView' ): 'StreamView';

                        var default_title = name.value;

                        $timeout(function() {
                            $rootScope.page_title = (toState.data && toState.data.pageTitle)
                                ? default_title + ' - ' + toState.data.pageTitle : default_title;
                        });
                    };
                    $rootScope.$on('$stateChangeSuccess', listener);
                }
            }
        }
]);

streamViewApp.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

streamViewApp.directive('autocomplete', function() {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
              element.autocomplete({

                source: apiUrl+"userApi/searchall",

                select:function (event,ui) {
                    
                    console.log(ui);

                    ngModelCtrl.$setViewValue(ui.item);

                    scope.$apply();

                     if (event.type == "autocompleteselect"){
                        
                        // console.log( "logged correctly: " + ui.item.value );

                        var title = ui.item.value;

                        var searchKey = $("#auto_complete_search").val();

                        if(ui.item.value == 'View All') {

                            // console.log('View AALLLLLLLLL');

                            window.location.href = angularUrl+"search/"+searchKey;

                        } else {
                            // console.log("User Submit");

                            // jQuery('#auto_complete_search').val(ui.item.value);

                            window.location.href = angularUrl+"search/"+ui.item.value;

                           
                        }

                    }       
                }
              });
                
            
        }
    }
});