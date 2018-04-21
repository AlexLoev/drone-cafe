const express = require('express');
const Order = require('../db/orders');
const log = console.log;

const routerkitchen = express.Router();

routerkitchen.get('/order', getorderlist);

function getorderlist(req, res) {
    log('getorderlist')
    Order.find()
    .then(resolve => {
        log(resolve);
        res.json(resolve)
    })
    .catch(err => _dberr(err, res));
}


module.exports = routerkitchen;