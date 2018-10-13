const itemModel = require(__base + 'models/items.js');

exports.addItem = (req, res) => {
    let item = new itemModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    item.save((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            res.json({
                success: true,
                msg: 'Item added successfully.'
            });
        }
    })
}

exports.getItems = (req, res) => {
    itemModel.find().exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            let items = doc.map((o) => ({id: o._id, name: o.name, description: o.description, price: o.price, reviews: o.reviews}));
            res.json({
                success: true,
                items: items
            });
        }
    });
}