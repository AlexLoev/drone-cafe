CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http, UsersService) {
        // $scope.user.loaded = true;
        const ctrl = this;
        ctrl.user = UsersService.curUsr;
        ctrl.getmoney = () => {
            return new Promise((resolve, reject) => {
                if (ctrl.user.email) {
                    $http.put('/balance' + ctrl.user.email)
                        .then(res => { UsersService.toast('Ваш баланс успешно поплнен') })
                        .catch(err => { UsersService.toast(err, 2000) });
                } else {
                    UsersService.toast('Required fields are empty', 2000);
                }
            });
        }
    },
    templateUrl: 'src/userPage/userPage.html'
})