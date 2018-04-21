angular
    .module('CafeApp')
    .factory('OrdersService', function ($http, $routeParams) {
        var OrderItems = [];
        // console.log($routeParams['userId'])
        return {
            getItems() {
                return OrderItems;
            },
            addItem(item) {
                console.log('OrdersService additem', item)
                if (item) {
                    let newitem = JSON.parse(JSON.stringify(item)); //создаем отдельный объект, чтобы изменения в объекте параметра не изменяли объект массива
                    let idx = OrderItems.findIndex(i => i.id === item.id);
                    console.log(idx)
                    if (idx != -1) {
                        OrderItems[idx].quant++;
                    } else {
                        console.log(newitem);
                        newitem.quant = 1;
                        OrderItems.push(newitem);
                    }
                }
            },
            removeItem(itemId) {
                let idx = OrderItems.findIndex(i => i.id == itemId);
                if (idx != -1) {
                    if (OrderItems[idx].quant == 1) {
                        OrderItems.splice(idx, 1);
                    } else {
                        OrderItems[idx].quant--
                    }
                } else {
                    console.log('Order: nothing to delete');
                }

                

            },
            sendOrder(order) {
                console.log('sendOrder', order);
                return new Promise((resolve, reject) => {

                    if ($routeParams['userId'] && order) {
                        $http.post('users/' + $routeParams['userId'] + '/orders', order)
                            .then(res => {
                                if (res.data) {
                                    resolve(res.data)
                                } else {
                                    resolve('can not send order')
                                }
                            })
                            .catch(err => { reject(err) });
                    } else {
                        resolve('no order')
                    }
                });
            }
        };

    })