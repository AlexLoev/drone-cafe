const express = require('express');
const Order = require('../db/orders');
const Drone = require('netology-fake-drone-api');
const log = console.log;

const routerkitchen = express.Router();

routerkitchen.get('/orders/:status', getorderslist);
routerkitchen.put('/orders/:id', changeorderstatus);

function getorderslist(req, res) {
    log('getorderslist')
    if (req.params.status) {
        Order.itemsbystatus(req.params.status)
            .then(resolve => {
                res.json(resolve)
            })
            .catch(err => _dberr(err, res));

    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct orders status`);
    }
};

function changeorderstatus(req, res) {
    if (req.params.id) {
        var status = req.body.status;
        if (status) {
            if (status == 'доставляется') {
                Drone.deliver()
                    .then(() => Order.changestatus(req.params.id, 'подано'))
                    .catch(() => Order.changestatus(req.params.id, 'возникли сложности'));
            }
            Order.changestatus(req.params.id, req.body.status)
                .then(resolve => res.json(resolve))
                .catch(err => _dberr(err, res));
        } else {
            res.statusCode = 400;
            res.end(`Please, add a correct status in body-JSON`);
        }
    } else {
        res.statusCode = 400;
        res.end(`Please, add a correct order id`);
    }
};


/**системная функция для формирования единого ответа на ошибки в БД */
function _dberr(err, res) {
    res.statusCode = 500;
    res.statusMessage = err;
    res.end('MongoDB Error in orders collection');
};

module.exports = routerkitchen;