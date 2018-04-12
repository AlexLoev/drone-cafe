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
                // log('found', found.length);
                // Array.length
                if (found && found.length) {
                    // log('found', found);
                    resolve([1, found])
                } else {
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

UserSchema.statics.removebyemail = function(email) {
    return new Promise((resolve, reject) => {
        this.findOne({email: email}, (err, user) => {
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

var User = mongoose.model('users', UserSchema);

module.exports = User;