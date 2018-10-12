const moment = require('moment');
const subscriptionModel = require(__base + 'models/subscription.js');
const financialModel = require(__base + 'models/financial.js');

const transactionHandler = require(__base + 'modules/trans/handle.js');

exports.add = (req, res) => {
    subscriptionModel.find({ _id: req.params.sub_id, subscribers: req.info.id }).exec((err, subs) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (subs.length == 0) {
                subscriptionModel.findOne({ "_id": req.params.sub_id }, (err, doc) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err.message
                        });
                    }
                    else {
                        let details = {
                            userid: req.info.id,
                            type: 'debit',
                            item: {
                                description: doc.description,
                                amount: doc.price
                            }
                        }
                        transactionHandler(details, (err, doc) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err.message
                                })
                            }
                            else {
                                if (doc.success) {
                                    subscriptionModel.findOneAndUpdate(
                                        { "_id": req.params.sub_id },
                                        { $push: { "subscribers": req.info.id } }, (err, doc) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    msg: err.message
                                                });
                                            }
                                            else {
                                                res.json({
                                                    success: true,
                                                    msg: 'Subscription added successfully.'
                                                });
                                            }
                                        });
                                }
                                else {
                                    res.json({
                                        success: false,
                                        msg: doc.msg
                                    })
                                }
                            }
                        })
                    }
                });
            }
            else {
                res.json({
                    success: false,
                    msg: 'Already subscribed.'
                });
            }
        }
    });
}

exports.remove = (req, res) => {
    subscriptionModel.find({ _id: req.params.sub_id, subscribers: req.info.id }).exec((err, subs) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (subs.length != 0) {
                subscriptionModel.findOne({ "_id": req.params.sub_id }, (err, doc) => {
                    if (err) {
                        res.json({
                            success: false,
                            msg: err.message
                        });
                    }
                    else {
                        let details = {
                            userid: req.info.id,
                            type: 'credit',
                            item: {
                                description: doc.description,
                                amount: doc.price
                            }
                        }
                        transactionHandler(details, (err, doc) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: err.message
                                })
                            }
                            else {
                                if (doc.success) {
                                    subscriptionModel.findOneAndUpdate(
                                        { "_id": req.params.sub_id },
                                        { $pull: { "subscribers": req.info.id } }, (err, doc) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    msg: err.message
                                                });
                                            }
                                            else {
                                                res.json({
                                                    success: true,
                                                    msg: 'Subscription removed successfully.'
                                                });
                                            }
                                        });
                                }
                                else {
                                    res.json({
                                        success: false,
                                        msg: doc.msg
                                    })
                                }
                            }
                        })
                    }
                });
            }
            else {
                res.json({
                    success: false,
                    msg: 'Not subscribed.'
                });
            }
        }
    });
}

exports.my = (req, res) => {
    subscriptionModel.find({ "subscribers": req.info.id }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            let offers = doc.map((o) => ({ id: o._id, name: o.name, discount: o.discount }));
            res.json({
                success: true,
                offers: offers
            });
        }
    });
}