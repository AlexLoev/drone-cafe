const express = require('express');
const User = require('../db/users');
const Order = require('../db/orders');
const log = console.log;

const routerusers = express.Router();
routerusers.get('/', getuserslist);
routerusers.get('/:id', findbyid);
routerusers.post('/', newuser);
routerusers.post('/:id/orders/', addorder);
routerusers.put('/:id', edituser);
routerusers.put('/balance/:email', addbalance);
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

function addbalance(req, res) {
    log('addbalance', req.params)
    if (req.params.email) {
        User.findOneAndUpdate(
            { email: req.params.email },
            { $inc: { balance: 100 } },
            { new: true })
            .then(resolve => {
                log('balance updated', resolve);
                res.json(resolve)
            })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user JSON in body {email, balance}`);
    }
}

function addorder(req, res) {
    log('addorder', req.params)
    if (req.params.id && req.body && req.body.length) {
        log(req.body);
        req.body.forEach(item => {
            Order.insertnew(req.params.id, item)
                .then(resolve => {
                    log('addorder success', resolve);
                })
                .catch(err => _dberr(err, res));
        })
        res.json('addorder success')
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user ID`);
    }
}


/**системная функция для формирования единого ответа на ошибки в БД */
function _dberr(err, res) {
    // log('dberror');
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('MongoDB Error in users collection');
};

// User.insertnew({ name: "Kidd", email: "kidd@mail.com" })
//     .then(resolve => { log(resolve) })
//     .catch(err => log(err));

module.exports = routerusers;