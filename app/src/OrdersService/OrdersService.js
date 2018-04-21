angular
    .module('CafeApp')
    .factory('OrdersService', function ($http, $routeParams) {
        var OrderItems = [];
        var OrderSum = {sum: 0};
        var statuses = [
            'заказано',
            'готовится',
            'доставляется',
            'возникли сложности',
            'подано'
        ];
        // console.log($routeParams['userId'])
        return {
            statuses,
            OrderSum,
            OrderItems,
            addItem(item) {
                console.log('OrdersService additem', item)
                if (item) {
                    let newitem = JSON.parse(JSON.stringify(item)); //создаем отдельный объект, чтобы изменения в объекте параметра не изменяли объект массива
                    let idx = OrderItems.findIndex(i => i.id === item.id);
                    
                    if (idx != -1) {
                        OrderItems[idx].quant++;
                        OrderSum.sum += OrderItems[idx].price;
                    } else {
                        console.log(newitem);
                        newitem.quant = 1;
                        OrderItems.push(newitem);
                        OrderSum.sum += newitem.price;
                    }
                    console.log('OrdersService addItem orderSum',OrderSum)
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
                    OrderSum.sum -= OrderItems[idx].price;
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
                        reject('no order')
                    }
                });
            },
            getOrdersList(statusIdx) {
                console.log('getOrdersList', statusIdx);
                return new Promise((resolve, reject) => {
                    var status = statuses[statusIdx];
                    if (status) {
                        $http.get('kitchen/orders/' + status)
                            .then(res => {
                                if (res.data) {
                                    resolve(res.data)
                                } else {
                                    resolve('can not get orders')
                                }
                            })
                            .catch(err => { reject(err) });
                    } else {
                        reject('status undifined')
                    }
                });
            },
            changeorderstatus(orderId, status) {
                console.log('changeorderstatus', orderId, status);

                return new Promise((resolve, reject) => {
                    if (orderId && status) {
                        //получаем индекс следующего статуса по порядку
                        nextStatus = statuses.findIndex(item => item == status) + 1;
                        console.log('nextStatus', nextStatus);
                        if (nextStatus == 0 || nextStatus == statuses.length) {
                            reject('can not go to next status, cause it is last or undifined')
                        } else {
                            $http.put('kitchen/orders/' + orderId, { status: statuses[nextStatus] })
                                .then(res => {
                                    if (res.data) {
                                        resolve(res.data);
                                    } else {
                                        reject('can not changeorderstatus');
                                    }
                                })
                                .catch(err => { reject(err) });
                        }
                    } else {
                        reject('changeorderstatus params undifined');
                    }
                });
            }
        };

    })