const User = require('../model/users');
const log = console.log;

/** создает нового пользователя по запросу */
function newuser(req, res) {
    log('newuser ctrl', req.body);
    if (req.body.name) {
        User.insertnew(req.body)
            .then(resolve => { res.json(resolve) })
            .catch(err => _dberr(err, res));
    } else {
        res.statusCode = 400;
        res.end(`Please, add a user JSON in body`);
    }
};

function getuserslist(req, res) {
    log('userlist', req);
};

function findbyid(req, res) {
    log('find by id', req);
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
    res.end('Mongoose Error in users collection');
};

// User.insertnew({ name: "Kidd", email: "kidd@mail.com" })
//     .then(resolve => { log(resolve) })
//     .catch(err => log(err));

module.exports = {
    newuser,
    getuserslist,
    findbyid,
    removebyid,
    edituser
}