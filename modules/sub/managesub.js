const subscriptionModel = require(__base + 'models/subscription.js');

exports.add = (req, res) => {
    subscriptionModel.findById(req.params.sub_id).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
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
    });
}

exports.remove = (req, res) => {
    subscriptionModel.findById(req.params.sub_id).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
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