CafeApp.component('authPage', {
    controller: function authCtrl($scope, $location, UsersService) {
        // console.log('authPage', $location);
        const ctrl = this;
        $scope.user = {
            name: "Alex",
            email: "alexloev@gmail.com",
            profile: "Клиент",
            loaded: false
        };
        ctrl.profiles = UsersService.profiles;
        // console.log('authCtrl', this);
        ctrl.signin = () => {
            UsersService.signin($scope.user)
            .then(user => {
                console.log('authPage signin', user)
                $scope.user = user;
                UsersService.curUsr = user;
                $location.path('/users/'+user._id);
            });
        } 
    },
    templateUrl: 'src/authPage/authPage.html'
})