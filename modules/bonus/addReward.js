const rewardModel = require(__base + 'models/rewards.js');

const addReward = (req, res) => {
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

module.exports = addReward;