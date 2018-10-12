const mongoose = require('mongoose');
const schema = mongoose.Schema;

const subscription = new schema({
    name: String,
    description: String,
    discount: Number,
    price: {
        type:Number,
        default:0
    },
    subscribers: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('subscription', subscription);