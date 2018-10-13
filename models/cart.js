const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cart = new schema({
    user: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number
});

module.exports = mongoose.model('cart', cart);