const rewardModel = require(__base + 'models/rewards.js');
const transactionHandler = require(__base + 'modules/trans/handle.js');

exports.reward = (req, res) => {
    const newReward = new rewardModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    newReward.save((err, doc) => {
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

exports.points = (req, res) => {
    let details = {
        userid: req.info.id,
        type: 'credit',
        item: {
            description: 'Bonus points earning.',
            amount: req.body.points
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
                res.json({
                    success: true,
                    msg: 'Points added successfully.'
                });
            }
            else {
                res.json({
                    success: false,
                    msg: doc.msg
                })
            }
        }
    });
}