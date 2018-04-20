CafeApp.component('orderPage', {
    controller: function orderPage($http, OrdersService) {
        const ctrl = this;
        ctrl.order = OrdersService.getItems();
    },
    templateUrl: 'src/orderPage/orderPage.html'
})