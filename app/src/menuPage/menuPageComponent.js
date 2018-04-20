CafeApp.component('menuPage', {
    controller: function menuCtrl($http, OrdersService) {
        const ctrl = this;
        // console.log('menuCtrl', this);
        $http.get('assets/menu.json')
            .then(function (res) {
                ctrl.menu = res.data;
            });
        
        ctrl.add = (itemid) => {
            console.log('ctrl.add', itemid);
            // ctrl.menu.map((item, indx) => {console.log('map',item, indx)});
            let newitem = ctrl.menu.filter(item => item.id == itemid);
            // console.log(ctrl.menu);
            // console.log(newitem[0]);
            newitem ? OrdersService.addItem(newitem[0]) : console.log('not found');
            console.log(OrdersService.getItems());
        } 
    },
    templateUrl: 'src/menuPage/menuPage.html'
})