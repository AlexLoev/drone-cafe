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
            console.log('changeListStatus begin', ctrl.loaded);
            ctrl.loaded = false;
            ctrl.actBtn = statusIdx ? "доставить" : "приготовить";
            OrdersService.getOrdersList(statusIdx)
                .then(order => {
                    console.log('scope.getOrdersList resolve', order);
                    ctrl.order = order;
                    ctrl.loaded = true;
                    // console.log('changeListStatus end', ctrl.loaded); //todo если убираю логирование, то флаг остается false
                    $scope.$apply(); //todo работает без этого, но почему-то не всегда. хорошо бы разобраться
                })
                .catch(reject => {
                    ctrl.loaded = true
                    console.error(reject);
                })
        }

        ctrl.changeOrderStatus = function (orderId) {
            // .then(resolve => {
            const orderIdx = ctrl.order.findIndex(item => item._id == orderId);
            ctrl.order[orderIdx].hide = true;
            $scope.status ? OrdersService.deliver(orderId) : OrdersService.cook(orderId);
            //     console.log('changeOrderStatus on resolve', resolve);
            //     $scope.changeListStatus($scope.status)
            // })
            // .catch(reject => {
            //     ctrl.loaded = true
            //     console.error(reject);
            // })

        };
        $scope.status = 0;
        ctrl.loaded = false;
        $scope.changeListStatus($scope.status);

        checkOrders = $interval(function () {
            console.log('interval orders');
            $scope.changeListStatus($scope.status);
        }, 10000);
    },
    templateUrl: 'src/kitchenPage/kitchenPage.html'
})