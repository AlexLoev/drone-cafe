CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http, $routeParams, UsersService) {
        var userId = $routeParams['userId'];
        $scope.getmoney = UsersService.getmoney;

        // если нажали F5 то надо подгрузить юзера из БД
        if (!UsersService.user.length && userId) {
            console.log('userCtrl loaduser', userId);
            UsersService.loaduser(userId)
                .then(user => $scope.user = UsersService.user[0])
        }
    },
    templateUrl: 'src/userPage/userPage.html'
})