const express = require('express');
const User = require('../db/users');
const Order = require('../db/orders');
const log = console.log;

const routerusers = express.Router();
routerusers.get('/', getuserslist);
routerusers.get('/:id', findbyid);
routerusers.get('/:id/orders/', getorderslist);
routerusers.post('/', newuser);
routerusers.post('/:id/orders/', addorder);
routerusers.put('/:id', edituser);
routerusers.put('/:id/balance', updateBalance);
routerusers.get('/:email/del', removebyemail);

/** создает нового пользователя по запросу */
function newuser(req, res) {
    log('newuser db', req.body);
    if (req.body.name && req.body.email) {
        User.insertnew(req.body)
            .then(resolve => {
                /**resolve представлен в виде массива [found, user]
                 * found = 1 если в БД уже есть такой Email
                 * user = json объект с данными пользователя
                 */
                log('insertnew resolve', resolve[1]);
                res.json(resolve[1]);
                // if (resolve[0] != 1) {
                //     res.json(resolve)
                // } else {
                //     res.statusCode = 403;
                //     res.end(`Email already exist`);
                // }
            })
            .catch(err => {
                // log('newuser catch', err);
                _dberr(err, res)
            });
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user JSON in body {name,email}`);
    }
};

function getuserslist(req, res) {
    log('getuserlist')
    User.find()
        .then(resolve => {
            // log('userlist: \n', resolve)
            res.json(resolve)
        })
        .catch(err => _dberr(err, res));
};

function findbyid(req, res) {
    log('findbyid', req.params.id);
    if (req.params.id) {
        User.findById(req.params.id)
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct userId`);
    }
};

function removebyemail(req, res) {
    // log('removebyemail');
    if (req.params.email) {
        User.removebyemail(req.params.email)
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end('Please, enter a valid user id');
    }
};

function edituser(req, res) {
    log('edituser', req);
}

function updateBalance(req, res) {
    var userId = req.params.id;
    var moneyCount = req.body.moneyCount;
    log('updateBalance', userId, moneyCount);
    if (userId && moneyCount) {
        User.changeUserBalance(userId, moneyCount)
            .then(resolve => {
                log('balance updated', resolve);
                res.json(resolve)
            })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct userId param or moneyCount in JSON`);
    }
};

function addorder(req, res) {
    // log('addorder req.body', req.body);
    var userId = req.params.id;
    var moneyCount = 0;
    if (userId && req.body && req.body.length) {
        const sum = req.body.map(async item => {
            //если в теле сообщения новый заказ, то считаем деньги, в противном случае не считаем
            if (!item._id) { moneyCount += item.price * item.quant }
        });
        Promise.all(sum)
            .then((completed) => {
                log('addorder moneyCount', moneyCount);
                if (moneyCount > 0) {
                    User.findById(userId)
                        .then(user => {
                            if (user.balance >= moneyCount) {
                                const add = req.body.forEach(item => {
                                    //обработка только по новым items
                                    if (!item._id) {
                                        var itemSum = item.price*item.quant;
                                        User.changeUserBalance(userId, -itemSum);
                                        Order.insertnew(userId, item);
                                    };
                                });
                                res.json('addorder success');
                            } else {
                                res.statusCode = 400;
                                res.end(`Not enough money: ${moneyCount - user.balance}`);
                            }
                        })
                        .catch(err => _dberr(err, res));
                } else {
                    res.json('addorder success, no new items')
                }

            })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct userId`);
    }
}

function getorderslist(req, res) {
    log('user getorderslist')
    if (req.params.id) {
        Order.itemsbystatus(undefined, req.params.id)
            .then(resolve => {
                res.json(resolve)
            })
            .catch(err => _dberr(err, res));

    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct userid`);
    }
};

/**системная функция для формирования единого ответа на ошибки в БД */
function _dberr(err, res) {
    // log('dberror');
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('MongoDB Error in users collection');
};



module.exports = routerusers;