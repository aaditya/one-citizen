const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rewards = new schema({
    name: String,
    description: String,
    price: {
        type:Number,
        default:0
    }
});

module.exports = mongoose.model('rewards', rewards);