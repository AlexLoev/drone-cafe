CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http, UsersService) {
        // $scope.user.loaded = true;
        const ctrl = this;
        ctrl.user = UsersService.curUsr;

    },
    templateUrl: 'src/userPage/userPage.html'
})