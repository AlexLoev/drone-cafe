angular
    .module('droneCafeApp', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .config(['$routeProvider', '$mdThemingProvider',
        function config($routeProvider, $mdThemingProvider) {
            $routeProvider.
                when('/users', {
                    template: '<user-list></user-list>'
                }).
                when('/users/:userId', {
                    template: '<user-detail></user-detail>'
                }).
                when('/edit/:userId', {
                    templateUrl: 'src/EditUser/EditUser.html',
                    controller: 'EditUserCtrl'
                }).
                when('/create', {
                    templateUrl: 'src/CreateUser/CreateUser.html',
                    controller: 'CreateUserCtrl'
                })/* .
            otherwise({
                redirectTo: '/'
            }); */
            
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                // .accentPalette('blue')
                // .backgroundPalette('blue')
                .dark();
        }
    ])
    .controller('DemoCtrl', function ($scope) {

    });