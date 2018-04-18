var CafeApp = angular.module('CafeApp', ['ngRoute', 'restangular', 'ngMaterial', 'ngMessages'])
angular.module('CafeApp')
    .config(['$routeProvider', 'RestangularProvider', '$mdThemingProvider',
        function config($routeProvider, RestangularProvider, $mdThemingProvider) {
            $routeProvider.
                when('/', {
                    template: '<auth-page></auth-page>'
                }).
                when('/users/:userId', {
                    template: '<user-page></user-page>'
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
            RestangularProvider.setBaseUrl('/users/');
            // RestangularProvider.setBaseUrl('https://api.backendless.com/v1/data/');
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                // .accentPalette('blue')
                // .backgroundPalette('blue')
                .dark();
        }
    ]);
    // .controller('CafeCtrl', function ($scope, Restangular, $routeParams) {
    //     $scope.user = {
    //         loaded: false
    //     };

    //     console.log($scope.user);
    //     Restangular.one('user', $routeParams['userId']).get().then(function(response) {
    //         $scope.user = response
    //     });
    // });