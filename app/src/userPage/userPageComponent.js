CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http, $routeParams, UsersService) {
        var userId = $routeParams['userId'];
        $scope.getmoney = UsersService.getmoney;

        // если нажали F5 то надо подгрузить юзера из БД
        if (!UsersService.user.length && userId) {
            console.log('userCtrl try load user', userId);
            UsersService.loaduser(userId)
                .then(user => $scope.user = UsersService.user[0])
        }
        // $scope.user.loaded = true;
        // console.log('userCtrl', $scope.user, UsersService.user[0])
        // const ctrl = this;
        // $scope.user = UsersService.user[0];
        // setTimeout(() => {
        //     console.log('userCtrl', $scope.user, UsersService.user[0])

        // }, 5000);
    },
    templateUrl: 'src/userPage/userPage.html'
})