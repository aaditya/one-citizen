const mongoose = require('mongoose');
const schema = mongoose.Schema;

const items = new schema({
    name: String,
    description: String,
    price: Number,
    reviews: [{
        userid: mongoose.Schema.Types.ObjectId,
        image: String,
        rating: Number,
        content: String
    }]
});

module.exports = mongoose.model('items', items);