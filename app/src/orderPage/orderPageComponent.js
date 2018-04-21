CafeApp.component('orderPage', {
    controller: function orderPage($http, OrdersService) {
        const ctrl = this;
        ctrl.order = OrdersService.OrderItems;
        ctrl.sendOrder = () => {
            if (ctrl.order && ctrl.order.length) {
                OrdersService.sendOrder(ctrl.order);
            } else {
                console.log('no items to send');
            }

        };
        ctrl.removeItem = OrdersService.removeItem;
        ctrl.orderSum = OrdersService.OrderSum;

    },
    templateUrl: 'src/orderPage/orderPage.html'
})