const express = require('express');
const User = require('../model/users');
const log = console.log;

const routerusers = express.Router();
routerusers.get('/', getuserslist);
routerusers.post('/', newuser);
routerusers.get('/:id', findbyjson);
routerusers.delete('/:id', removebyid);
routerusers.put('/:id', edituser);

/** создает нового пользователя по запросу */
function newuser(req, res) {
    if (req.body.name && req.body.email) {
        User.insertnew(req.body)
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user JSON in body {name,email}`);
    }
};

function getuserslist(req, res) {
    log('userlist', req);
};

function findbyjson(req, res) {
    if (req.body) {
        User.findbyjson(req.body)
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct user JSON in body {name,email}`);
    }
};

function removebyid(req, res) {
    log('removebyid', req);
};

function edituser(req, res) {
    log('edituser', req);
}

/**системная функция для формирования единого ответа на ошибки в БД */
function _dberr(err, res) {
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('MongoDB Error in users collection');
};

// User.insertnew({ name: "Kidd", email: "kidd@mail.com" })
//     .then(resolve => { log(resolve) })
//     .catch(err => log(err));

module.exports = routerusers;