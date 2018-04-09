const mongoose = require('./mongoose');
const log = console.log;
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectID;

const UserSchema = new Schema({
    name: String,
    email: String
});

UserSchema.statics.insertnew = function (newuser) {
    log('insert new user', newuser);
    return new Promise((resolve, reject) => {
        var user = this(newuser);
        /**нужно добавить поиск по email */
        // user.find({email: "kidd@mail.com"})
        // .then(resolve => log(resolve))
        // .catch(err => log(err));

        user.save((err, res) => {
            if (err) {
                log('insert err', err)
                reject(err);
            } else {
                log('inserted', res);
                resolve(res);
            }
        });
    });
};

UserSchema.statics.findbyjson = function (userjson) {
    log('findbyjson', userjson)
    this.find(userjson, (err, user) => {
        if (err) {
            log(err);
        } else {
            log('found', user);
            return user
        };
    });
};

var User = mongoose.model('users', UserSchema);

module.exports = User;