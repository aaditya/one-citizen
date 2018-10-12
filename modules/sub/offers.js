const subscriptionModel = require(__base + 'models/subscription.js');

exports.getOffers = (req, res) => {
    subscriptionModel.find().exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }
        else {
            let offers = doc.map((o) => ({id: o._id, name: o.name, description: o.description, discount: o.discount}));
            res.json({
                success: true,
                offers: offers
            })
        }
    });
}

exports.addOffer = (req, res) => {
    const newSubscribe = new subscriptionModel({
        name: req.body.name,
        description: req.body.description,
        discount: req.body.discount,
    });
    newSubscribe.save((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }
        else {
            res.json({
                success: true,
                msg: 'Data saved successfully.'
            })
        }
    });
}