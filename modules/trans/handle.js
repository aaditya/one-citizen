const moment = require('moment');
const financialModel = require(__base + 'models/financial.js');

/* 
Details Format 
const details = {
    userid: req.info.id,
    type: 'debit/credit',
    item: {
        amount: x,
        description: bla bla bla
    }
}
*/

const transact = (details, next) => {
    if (details) {
        financialModel.findById(details.userid).exec((err, fin) => {
            if (err) { next(err); }
            else {
                if (details.type == 'debit') {
                    if (fin.points >= details.item.amount) {
                        let difference = parseInt(fin.points) - parseInt(details.item.amount);
                        console.log(1, difference)
                        let trans = {
                            description: details.item.description,
                            amount: details.item.amount,
                            date: moment(),
                            type: details.type
                        }
                        financialModel.findOneAndUpdate(
                            { "_id": details.userid },
                            { points: difference, $push: { "transactions": trans } }, (err, doc) => {
                                if (err) { next(err); }
                                else {
                                    next(null, { success: true });
                                }
                            });
                    }
                    else {
                        next(null, {
                            success: false,
                            msg: 'Insufficient Balance.'
                        });
                    }
                }
                else if (details.type == 'credit') {
                    let difference = parseInt(fin.points) + parseInt(details.item.amount);
                    let trans = {
                        description: details.item.description,
                        amount: details.item.amount,
                        date: moment(),
                        type: details.type
                    }
                    financialModel.findOneAndUpdate(
                        { "_id": details.userid },
                        { points: difference, $push: { "transactions": trans } }, (err, doc) => {
                            if (err) { next(err); }
                            else {
                                next(null, { success: true });
                            }
                        });
                }
            }
        });
    }
    else {
        next(null, {
            success: false,
            msg: 'Please check details.'
        });
    }
}

module.exports = transact;