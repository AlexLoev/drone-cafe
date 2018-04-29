const mongoose = require('./mongoose');
const log = console.log;
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectID;

const UserSchema = new Schema({
    name: String,
    email: String,
    balance: Number,
    profile: String
});

UserSchema.statics.insertnew = function (newuser) {
    // log('insert new user', newuser);
    return new Promise((resolve, reject) => {
        var user = this(newuser);
        this.findOne({ email: newuser.email })
            .then(found => {
                // log('found', found.length);
                // Array.length
                if (found) {
                    // log('found', found);
                    resolve([1, found])
                } else {
                    user.balance = 100;
                    user.save((err, res) => {
                        if (err) {
                            throw reject;
                        } else {
                            // log('save', res);
                            resolve([0, res]);
                        }
                    });
                };
            })
            .catch(err => {
                // log('findcatch',err);
                // throw reject;
                reject(err)
            });
    });
};

UserSchema.statics.removebyemail = function (email) {
    return new Promise((resolve, reject) => {
        this.findOne({ email: email }, (err, user) => {
            if (err) {
                // log('findByemail',err);
                reject(err)
            } else {
                if (user) {
                    // log('rememfind', user);
                    user.remove((err, delres) => {
                        if (err) {
                            reject(err);
                        } else {
                            // log('deleted', delres);
                            resolve(delres);
                        }
                    });
                } else {
                    resolve('Not matched user to remove');
                };
            };
        });
    });
};

UserSchema.statics.changeUserBalance = function (userId, moneyCount) {
    return new Promise((resolve, reject) => {
        var options = { new: true };
        var updObj = { $inc: { balance: moneyCount } };
        User.findByIdAndUpdate(userId, updObj, options)
            .then(user => {
                log('changeUserBalance user found', user);
                resolve(user);
             })
            .catch(err => { reject(err) });
    });
}

var User = mongoose.model('users', UserSchema);

// User.remove({}, (res, err) => console.log(res, err));

module.exports = User;