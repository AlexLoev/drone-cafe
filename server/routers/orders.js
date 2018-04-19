const express = require('express');
const Order = require('../db/orders');
const log = console.log;

const routerorders = express.Router();
// routerorders.post('/', newuser);
/**системная функция для формирования единого ответа на ошибки в БД */
function _dberr(err, res) {
    // log('dberror');
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('MongoDB Error in users collection');
};

module.exports = routerorders;