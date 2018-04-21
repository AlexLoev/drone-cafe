CafeApp.component('menuPage', {
    controller: function menuCtrl($http, OrdersService, UsersService) {
        const ctrl = this;
        // console.log('menuCtrl', this);
        $http.get('assets/menu.json')
            .then(function (res) {
                ctrl.menu = res.data;
            });
        
        ctrl.add = (itemid) => {
            var newitem = ctrl.menu.find(i => i.id == itemid);
            var curSum = OrdersService.OrderSum;
            var user = UsersService.user;
            console.log('menuCtrl add', newitem, user , curSum)
            if (newitem && user && curSum) {
                var credit = curSum.sum + newitem.price - user[0].balance;
                if (credit < 0 ) {
                    OrdersService.addItem(newitem);
                } else {
                    UsersService.toast(`Необходимо пополнить баланс на ${credit}Ƀ`);
                }
            } else {
                UsersService.toast('Ошибка в параметрах запроса, попробуйте перезагрузить страницу');
            }
        } 
    },
    templateUrl: 'src/menuPage/menuPage.html'
})