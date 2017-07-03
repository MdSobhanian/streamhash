/* ocLazyLoad config */

streamViewApp
    .config([
        '$ocLazyLoadProvider',
        function($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    // ----------- UIKIT ------------------
                    {
                        name: 'lazy_notify',
                        files: [
                            // uikit core
                            "assets/js/uikit.js",
                            "assets/js/notify.js",
                            "assets/css/notify.css",
                        ],
                        insertBefore: '#main-css',
                        serie: true
                    },

                    {
                        name: 'lazy_animation',
                        files: [
                            "assets/js/animation.js",
                            "assets/css/animate.css",
                        ],
                        serie: true
                    },

                     /*{
                        name: 'lazy_animation',
                        files: [
                            "assets/js/css3-animate-it.js",
                            "assets/css/animations.css",
                        ],
                        serie: true
                    },*/

                ]
            })
        }
    ]);