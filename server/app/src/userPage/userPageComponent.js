CafeApp.component('userPage', {
    controller: function userCtrl($scope, $http) {
        // $scope.user.loaded = true;
        console.log('userCtrl', this);
        const ctrl = this;
        $http.get('public/menu.json')
            .then(function (res) {
                ctrl.menu = res.data;
            });
    },
    templateUrl: 'src/userPage/userPage.html'
})