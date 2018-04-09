angular
    .module('CafeApp', ['ngRoute', 'restangular', 'ngMaterial', 'ngMessages'])
    .config(['$routeProvider', 'RestangularProvider', '$mdThemingProvider',
        function config($routeProvider, RestangularProvider, $mdThemingProvider) {
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
            RestangularProvider.setBaseUrl('/users/');
            // RestangularProvider.setBaseUrl('https://api.backendless.com/v1/data/');
            // Configure a dark theme with primary foreground yellow
            $mdThemingProvider.theme('docs-dark', 'default')
                .primaryPalette('yellow')
                // .accentPalette('blue')
                // .backgroundPalette('blue')
                .dark();
        }
    ])
    .controller('CafeCtrl', function ($scope, Restangular, $routeParams) {
        // $scope.user = {
        //     name: 'Kidd',
        //     email: 'kidd@mail.com'
        // };
        $scope.signin = () => {
            console.log('sign it', User);

            User.newuser($scope.user);
        };
        console.log('RestangularOne');
        Restangular.one('user', $routeParams['userId']).get().then(function(response) {
            $scope.user = response
        });
    });