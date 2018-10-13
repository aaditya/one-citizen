const itemModel = require(__base + 'models/items.js');
const transactionHandler = require(__base + 'modules/trans/handle.js');

const writeReview = (req, res) => {
    itemModel.findOne({ _id: req.params.item_id, 'reviews': { $elemMatch: { userid: req.info.id } } }).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            if (!doc) {
                let details = {
                    userid: req.info.id,
                    type: 'credit',
                    item: {
                        description: `Bonus points for adding a review on ${req.params.item_id}.`,
                        amount: 100
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
                            let review = {
                                userid: req.info.id,
                                rating: req.body.rating,
                                content: req.body.content
                            }
                            itemModel.findOneAndUpdate(
                                { "_id": req.params.item_id },
                                { $push: { "reviews": review } }, (err, doc) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err.message
                                        });
                                    }
                                    else {
                                        res.json({
                                            success: true,
                                            msg: 'Review added successfully.'
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
            else {
                res.json({
                    success: false,
                    msg: 'Already Reviewed.'
                });
            }
        }
    });
}

module.exports = writeReview;