const financialModel = require(__base + 'models/financial.js');

const transHistory = (req, res) => {
    financialModel.findById(req.info.id).exec((err, doc) => {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            });
        }
        else {
            res.json({
                success: true,
                id: doc._id,
                points: doc.points,
                card: doc.card,
                transactions: doc.transactions
            });
        }
    });
}

module.exports = transHistory;