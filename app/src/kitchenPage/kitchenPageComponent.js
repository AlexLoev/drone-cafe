CafeApp.component('kitchenPage', {
    controller: function kitchenCtrl($scope, $interval, $routeParams, OrdersService, UsersService) {
        var userId = $routeParams['userId'];

        // если нажали F5 то надо подгрузить юзера из БД
        if (!UsersService.user.length && userId) {
            console.log('kitchenCtrl try load user', userId);
            UsersService.loaduser(userId)
                .then(user => $scope.user = UsersService.user[0])
        }
        const ctrl = this;
        $scope.statuses = OrdersService.statuses;

        $scope.changeListStatus = function (statusIdx) {
            $scope.status = statusIdx;
            ctrl.loaded = false;
            OrdersService.getOrdersList(statusIdx)
                .then(order => {
                    ctrl.loaded = true;
                    console.log('scope.changeListStatus', order);
                    ctrl.order = order;
                    $scope.$apply();
                })
                .catch(reject => {
                    ctrl.loaded = true
                    console.error(reject);
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
                .catch(reject => {
                    ctrl.loaded = true
                    console.error(reject);
                })

        };
        $scope.status = 0;
        $scope.changeListStatus($scope.status);
        
        checkOrders = $interval(function() {
            console.log('interval orders');
            $scope.changeListStatus($scope.status);
        }, 10000);
    },
    templateUrl: 'src/kitchenPage/kitchenPage.html'
})