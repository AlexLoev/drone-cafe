const mongoose = require('./mongoose');
const log = console.log;
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectID;

const OrderSchema = new Schema({
    userid: String,
    itemid: String,
    title: String,
    ingredients: Array,
    price: Number,
    status: String,
    dateadd: Date,
    deleted: Date
});

OrderSchema.statics.insertnew = function (userid, item) {
    log('insert new order', userid, item);
    return new Promise((resolve, reject) => {
        try {
            if (userid && item) {
                var order = this();
                order.userid = userid;
                order.itemid = item.id;
                order.title = item.title;
                order.ingredients = item.ingredients;
                order.price = item.price;
                order.status = 'Заказано';
                order.dateadd = new Date();
                order.save()
                    .then(saved => {
                        log('new item saved', saved);
                        resolve(saved);
                    })
                    .catch(err => { reject(err) });
            } else {
                reject('undifined userid or item?');

            }

        } catch (err) {
            log('catched in try insert new order')
            reject(err)
        };
    });
};

OrderSchema.statics.changestatus = function (orderid, status) {
    return new Promise((resolve, reject) => {
        this.findByIdAndUpdate(
            orderid,
            { $set: { status: status } },
            { new: true }
        )
            .then(updated => {
                log('item updated', updated);
                resolve(updated);
            })
            .catch(err => { reject(err) });
    });

};

OrderSchema.statics.deletebyid = function (orderid) {
    return new Promise((resolve, reject) => {
        this.findByIdAndUpdate(
            orderid,
            { $set: { deleted: Date() } },
            { new: true }
        )
            .then(deleted => {
                log('item deleted', deleted);
                resolve(deleted);
            })
            .catch(err => { reject(err) });
    });
};

OrderSchema.statics.itemsbystatus = function (status) {
    return new Promise((resolve, reject) => {
        Order.find({ status: { $in: [status] }, deleted: { $exists: false } })
            .then(res => resolve(res.length ? res : -1))
            .catch(err => { reject(err) });
    });
};

var Order = mongoose.model('orders', OrderSchema);

// var userid = "5acb9ca0bab0c610e0bb98e5"; //"alexloev@gmail.com"
// var orderid = "5ad24fb10e36e90b5c62988a";

// var item = {
//     "title": "Pat's Spicy Peach Hot Wings",
//     "image": "https://spoonacular.com/recipeImages/pats-spicy-peach-hot-wings-300706.jpeg",
//     "id": 300706,
//     "rating": 54,
//     "ingredients": [
//         "butter",
//         "chicken wings",
//         "garlic",
//         "garlic powder",
//         "hot sauce",
//         "kosher salt",
//         "peach preserves",
//         "peanut oil",
//         "smoked paprika",
//         "soy sauce"
//     ],
//     "price": 43
// };

// Order.insertnew(userid, item)
//     .then(res => log('works good:', res))
//     .catch(err => log('works bad:', err))

// Order.deletebyid(orderid);

// Order.findOne({ userid: userid })
//     .then(res => log('works good:', res ? res : 'no items'))
//     .catch(err => log('works bad:', err))

// Order.findOneAndUpdate(
//     { userid: { $in: [userid] } },
//     { $set: { status: 'Удалено' } }
// )
//     .then(res => log('works good:', res ? res : 'no items'))
//     .catch(err => log('works bad:', err))

// Order.findByIdAndUpdate(orderid,
//     { $set: { status: 'Удалено2' } }
// )
//     .then(res => log('works good:', res ? res : 'no items'))
//     .catch(err => log('works bad:', err))

// let status = 'Заказано';
// Order.itemsbystatus(status)
//     .then(res => log('works good:', res))
//     .catch(err => log('works bad:', err))
module.exports = Order;