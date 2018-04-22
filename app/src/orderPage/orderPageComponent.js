CafeApp.component('orderPage', {
    controller: function orderPage($scope, $interval, OrdersService) {
        const ctrl = this;
        ctrl.order = OrdersService.OrderItems;
        ctrl.sendOrder = () => {
            if (ctrl.order && ctrl.order.length) {
                OrdersService.sendOrder(ctrl.order)
                .then(resolve => {
                    $scope.$apply(); //страница иногда отказывается рендериться без вызова этого метода http://jimhoskins.com/2012/12/17/angularjs-and-apply.html
                })
            } else {
                console.log('no items to send');
            }

        };
        ctrl.removeItem = OrdersService.removeItem;
        ctrl.orderSum = OrdersService.OrderSum;

        checkStatus = $interval(function() {
            console.log('interval');
            OrdersService.getUserOrdersList();
        }, 20000);

        OrdersService.getUserOrdersList();

    },
    templateUrl: 'src/orderPage/orderPage.html'
})