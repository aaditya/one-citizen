const rewardModel = require(__base + 'models/rewards.js');

exports.getRewards = (req, res) => {
    rewardModel.find({}, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }
        else {
            let rewards = doc.map((r) => ({ id: r._id, name: r.name, description: r.description, price: r.price}));
            res.json({
                success: true,
                rewards: rewards
            });
        }
    });
}
