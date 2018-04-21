CafeApp.component('authPage', {
    controller: function authCtrl($scope, $location, UsersService) {
        // console.log('authPage', $location);
        const ctrl = this;
        $scope.user = {
            name: "Valya",
            email: "valya@gmail.com",
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
                console.log('authPage profile',user.profile)
                if (user.profile == 'Клиент') {
                    $location.path('/users/'+user._id);
                } else {
                    $location.path('/kitchen/'+user._id);
                }
            });
        } 
    },
    templateUrl: 'src/authPage/authPage.html'
})