CafeApp.component('orderPage', {
    controller: function orderPage($http, OrdersService) {
        const ctrl = this;
        ctrl.order = OrdersService.getItems();
        ctrl.sendOrder = () => {
            if (ctrl.order && ctrl.order.length) {
                OrdersService.sendOrder(ctrl.order);
            } else {
                console.log('no items to send');
            }

        };
        ctrl.removeItem = OrdersService.removeItem;
    },
    templateUrl: 'src/orderPage/orderPage.html'
})