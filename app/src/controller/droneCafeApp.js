angular
    .module('droneCafeApp', ['ngRoute', 'ngMaterial', 'ngMessages'])
    .config(['$routeProvider',
        function config($routeProvider) {
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
            
        }
    ])
    .controller('DemoCtrl', function ($scope) {

    })
    .config(function ($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('yellow')
            .dark();

    });