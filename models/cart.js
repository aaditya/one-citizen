const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cart = new schema({
    _id: mongoose.Schema.Types.ObjectId,
    items: [{
        itemId: mongoose.Schema.Types.ObjectId,
        qty: Number
    }]
});

module.exports = mongoose.model('cart', cart);