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