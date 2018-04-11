const mongoose = require('./mongoose');
const log = console.log;
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectID;

const UserSchema = new Schema({
    name: String,
    email: String
});

UserSchema.statics.insertnew = function (newuser) {
    // log('insert new user', newuser);
    return new Promise((resolve, reject) => {
        var user = this(newuser);
        this.find({ email: newuser.email })
            .then(found => {
                if (found) {
                    reject(found);
                } else {
                    user.save((err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    });
                };
            })
            .catch(err => {
                log(err);
                reject(err)
            });
    });
};

UserSchema.statics.findbyjson = function (userjson) {
    log('findbyjson', userjson)
    return new Promise((resolve, reject) => {
        this.find(userjson, (err, user) => {
            if (err) {
                log(err);
                reject(err);
            } else {
                log('found', user);
                resolve(user)
            };
        });
    });
};

var User = mongoose.model('users', UserSchema);

module.exports = User;