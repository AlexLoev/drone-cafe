angular
    .module('CafeApp')
    .factory('OrdersService', function ($http, $routeParams, UsersService) {
        var OrderItems = [];
        var OrderSum = { sum: 0 };
        var statuses = [
            'заказано',
            'готовится',
            'доставляется',
            'возникли сложности',
            'подано'
        ];
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
                        OrderItems.unshift(newitem);
                        OrderSum.sum += newitem.price;
                    }
                    console.log('OrdersService addItem orderSum', OrderSum)
                }
            },
            removeItem(itemId) {
                let idx = OrderItems.findIndex(i => i.id == itemId);
                if (idx != -1 && !OrderItems[idx]._id) {
                    OrderSum.sum -= OrderItems[idx].price;
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
                    const userId = $routeParams['userId'];
                    if (userId && order) {
                        $http.post('users/' + userId + '/orders', order)
                            .then(res => {
                                if (res.data) {
                                    OrderItems.splice(0, OrderItems.length);
                                    const p1 = this.getUserOrdersList();
                                    const p2 = UsersService.loaduser(userId);
                                    Promise.all([p1, p2])
                                        .then(() => { resolve(res) })
                                        .catch(err => { reject(err) });
                                } else {
                                    reject('can not send order')
                                }
                            })
                            .catch(err => { reject(err) });
                    } else {
                        reject('no order')
                    }
                });
            },
            getUserOrdersList() {
                var userId = $routeParams['userId'];
                console.log('getUserOrdersList', userId);

                return new Promise((resolve, reject) => {
                    if (userId) {
                        $http.get('users/' + userId + '/orders')
                            .then(res => {
                                console.log('getUserOrdersList', res);
                                const NewItems = OrderItems.filter(item => { return !item._id });
                                if (res.data != -1) {
                                    OrderItems.splice(0, OrderItems.length, ...res.data);
                                } else {
                                    OrderItems.splice(0, OrderItems.length);
                                    UsersService.loaduser(userId)
                                }
                                OrderItems.unshift(...NewItems);
                                OrderSum.sum = 0;
                                OrderItems.map(item => {
                                    if (!item._id) { OrderSum.sum += item.price * item.quant }
                                });
                                resolve(res.data)
                            })
                            .catch(err => { reject(err) });
                    } else {
                        resolve('userId undifined')
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
            changeOrderStatus(orderId, status) {
                console.log('changeOrderStatus', orderId, status);

                return new Promise((resolve, reject) => {
                    if (orderId && status) {
                        //получаем индекс следующего статуса по порядку
                        // nextStatus = statuses.findIndex(item => item == status) + 1;
                        // console.log('nextStatus', nextStatus);
                        // if (nextStatus == 0 || nextStatus == statuses.length) {
                        //     reject('can not go to next status, cause it is last or undifined')
                        // } else {
                        $http.put('kitchen/orders/' + orderId, { status: status })
                        //             .then(res => {
                        //                 if (res.data) {
                        //                     resolve(res.data);
                        //                 } else {
                        //                     reject('can not changeOrderStatus');
                        //                 }
                        //             })
                        //             .catch(err => { reject(err) });
                        //     }
                        // } else {
                        //     reject('changeOrderStatus params undifined');
                    }
                });
            },
            cook(orderId) {
                this.changeOrderStatus(orderId, statuses[1]);
            },
            deliver(orderId) {
                this.changeOrderStatus(orderId, statuses[2]);
            }
        };

    })