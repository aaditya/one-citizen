const mongoose = require('mongoose');
const cartModel = require(__base + 'models/cart.js');
const itemsModel = require(__base + 'models/items.js');

exports.add = (req, res) => {
    cartModel.findById(req.info.id).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (!doc) {
                let cartItem = new cartModel({
                    _id: req.info.id,
                    items: [{
                        itemId: req.params.item_id,
                        qty: req.params.qty || 1
                    }]
                });
                cartItem.save((err, doc) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err.message
                        });
                    }
                    else {
                        res.json({
                            success: true,
                            msg: `Item ${req.params.item_id} added successfully.`
                        });
                    }
                });
            }
            else {
                cartModel.findOne({ _id: req.info.id, items: { $elemMatch: { itemId: req.params.item_id } } })
                    .exec((err, doc) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: err.message
                            });
                        }
                        else {
                            if (!doc) {
                                cartModel.findOneAndUpdate(
                                    { "_id": req.info.id },
                                    {
                                        $push: {
                                            "items": {
                                                id: req.params.item_id,
                                                qty: req.params.qty || 1
                                            }
                                        }
                                    }, (err, doc) => {
                                        if (err) {
                                            res.json({
                                                success: false,
                                                msg: err.message
                                            });
                                        }
                                        else {
                                            res.json({
                                                success: true,
                                                msg: `Item ${req.params.item_id} added successfully.`
                                            });
                                        }
                                    });
                            }
                            else {
                                res.json({
                                    success: false,
                                    msg: `Item already in cart.`
                                });
                            }
                        }
                    });
            }
        }
    });
}

exports.delete = (req, res) => {
    cartModel.findOne({ _id: req.info.id, items: { $elemMatch: { itemId: req.params.item_id } } })
        .exec((err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                if (doc) {
                    cartModel.findOneAndUpdate(
                        { "_id": req.info.id },
                        {
                            $pull: {
                                "items": {
                                    id: req.params.item_id
                                }
                            }
                        }, (err, doc) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err.message
                                });
                            }
                            else {
                                res.json({
                                    success: true,
                                    msg: `Item ${req.params.item_id} removed successfully.`
                                });
                            }
                        });
                }
                else {
                    res.json({
                        success: false,
                        msg: `Item not in cart.`
                    });
                }
            }
        });
}

exports.update = (req, res) => {
    cartModel.findOne({ _id: req.info.id, items: { $elemMatch: { itemId: req.params.item_id } } })
        .exec((err, doc) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err.message
                });
            }
            else {
                if (doc) {
                    cartModel.findOneAndUpdate(
                        { _id: req.info.id, items: { $elemMatch: { itemId: req.params.item_id } } },
                        { '$set': { 'items.$.qty': req.params.qty } }).exec((err, doc) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err.message
                                });
                            }
                            else {
                                res.json({
                                    success: true,
                                    msg: 'Quantity Updated.'
                                });
                            }
                        });
                }
                else {
                    res.json({
                        success: false,
                        msg: `Item not in cart.`
                    });
                }
            }
        });
}

exports.list = (req, res) => {
    cartModel.findById(req.info.id).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            let itemIds = doc.items.map((i) => {
                return i.itemId;
            });
            itemsModel.find({ _id: { $in: itemIds  } }).exec((err, cart) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: err.message
                    });
                }
                else {
                    let items = cart.map((o) => ({ id: o._id, name: o.name, description: o.description, price: o.price }));
                    res.json({
                        success: true,
                        cart: items
                    });
                }
            });
        }
    });
}