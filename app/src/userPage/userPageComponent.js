CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http, $routeParams, UsersService) {
        let userId = $routeParams['userId'];
        if (!UsersService.curUsr && userId) {
            console.log('userCtrl try load user', userId);
            UsersService.loaduser(userId)
                .then(user => $scope.user = user)
        }
        // $scope.user.loaded = true;
        console.log('upCtrl loaded',$scope.user)
        const ctrl = this;
        $scope.user = UsersService.curUsr;
        console.log('upCtrl user loaded',$scope.user)
        ctrl.getmoney = () => {
            return new Promise((resolve, reject) => {
                if ($scope.user.email) {
                    $http.put('/users/balance/'+$scope.user.email)
                        .then(res => { 
                            console.log('userPage getmoney complete', res.data);
                            res.data.loaded = true;
                            $scope.user = res.data;
                            UsersService.toast('Ваш баланс успешно пополнен', 3000) 
                        })
                        .catch(err => { UsersService.toast(err, 2000) });
                } else {
                    UsersService.toast('Required fields are empty', 2000);
                }
            });
        }
    },
    templateUrl: 'src/userPage/userPage.html'
})