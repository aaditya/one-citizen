const rewardModel = require(__base + 'models/rewards.js');
const transactionHandler = require(__base + 'modules/trans/handle.js');

exports.getRewards = (req, res) => {
    rewardModel.find({}, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }
        else {
            let rewards = doc.map((r) => ({ id: r._id, name: r.name, description: r.description, price: r.price }));
            res.json({
                success: true,
                rewards: rewards
            });
        }
    });
}

exports.buyReward = (req, res) => {
    rewardModel.find({ _id: req.params.rew_id, redeemers: req.info.id }).exec((err, rews) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (rews.length == 0) {
                rewardModel.findById(req.params.rew_id).exec((err, doc) => {
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
                                    rewardModel.findOneAndUpdate(
                                        { "_id": req.params.rew_id },
                                        { $push: { "redeemers": req.info.id } }, (err, doc) => {
                                            if (err) {
                                                res.json({
                                                    success: false,
                                                    msg: err.message
                                                });
                                            }
                                            else {
                                                res.json({
                                                    success: true,
                                                    msg: 'Reward redeemed successfully.'
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
                    msg: 'Already Redeemed.'
                });
            }
        }
    });
}

exports.my = (req, res) => {
    rewardModel.find({ "redeemers": req.info.id }, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            let rewards = doc.map((o) => ({ id: o._id, name: o.name, description: o.description }));
            res.json({
                success: true,
                rewards: rewards
            });
        }
    });
}