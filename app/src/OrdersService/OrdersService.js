angular
    .module('CafeApp')
    .factory('OrdersService', function ($http) {
        var OrderItems = [];

        return {
            getItems() {
                return OrderItems;
            },
            addItem(item) {
                console.log('OrdersService additem', item)
                if (item) {
                    let newitem = JSON.parse(JSON.stringify(item)); //создаем отдельный объект, чтобы изменения в объекте параметра не изменяли объект массива
                    OrderItems.push(newitem);
                }
            },
            removeItem(itemId) {
                let idx = OrderItems.findIndex(i => i.id === itemId);
                if (idx) {
                    OrderItems.splice(idx, 1);
                }

            }
        };

    })