const express = require('express');
const User = require('../db/users');
const log = console.log;

const routerusers = express.Router();
routerusers.get('/', getuserslist);
routerusers.post('/', newuser);
routerusers.get('/:email', findbyemail);
routerusers.delete('/:email', removebyemail);
routerusers.put('/:id', edituser);
routerusers.put('/balance/:email', addbalance);

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

function findbyemail(req, res) {
    log('findbyemail', req.params.email);
    if (req.params.email) {
        User.findOne({ email: req.params.email })
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user JSON in body {name,email}`);
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