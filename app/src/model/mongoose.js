const log = console.log;
const mongoose = require('mongoose');
const uri = 'mongodb://alexloev:Netology1@ds157487.mlab.com:57487/heroku_z4r6qq3d';

mongoose.connect(uri,(err, db) => {
    if (err) {
        log(err)
    } else {
        log(`mongoose connected at port ${db.port}`);
    }
});

module.exports = mongoose;