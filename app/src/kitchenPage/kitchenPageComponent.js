CafeApp.component('kitchenPage', {
    controller: function kitchenCtrl($scope, $http, $routeParams, OrdersService, UsersService) {
        // если нажали F5 то надо подгрузить юзера из БД
        let userId = $routeParams['userId'];
        if (!UsersService.curUsr && userId) {
            console.log('kitchenCtrl try load user', userId);
            UsersService.loaduser(userId)
                .then(user => $scope.user = user)
        }
        console.log('kitchenPage loaded', $scope.user)
        const ctrl = this;
        $scope.user = UsersService.curUsr;
        $scope.statuses = OrdersService.statuses;

        $scope.changeListStatus = function (statusIdx) {
            $scope.status = statusIdx;
            OrdersService.getOrdersList(statusIdx)
                .then(order => {
                    console.log('scope.changeListStatus', order);
                    // ctrl.order = [];
                    ctrl.order = order;
                })
        }

        ctrl.changeorderstatus = function (orderId, status) {
            OrdersService.changeorderstatus(orderId, status)
                .then(resolve => {
                    var orderIdx = ctrl.order.findIndex(item => item._id == orderId);
                    ctrl.order[orderIdx].hide = true;
                    console.log('changeorderstatus on resolve', resolve);
                    $scope.changeListStatus($scope.status)
                })

        };

        $scope.status = 0;
        $scope.changeListStatus($scope.status);        

    },
    templateUrl: 'src/kitchenPage/kitchenPage.html'
})