const moment = require('moment');

const userModel = require(__base + 'models/user.js');

const logout = (req, res) => {

  userModel.findOneAndUpdate(
    { "_id": req.info.id },
    { $push: { "logs.logout": moment() } }, (err, doc) => {
      if (err) {
        res.json({
          success: false,
          msg: err.message
        });
      }
      else {
        res.json({
          success: true,
          msg: 'Logged Out.'
        });
      }
    });
}

module.exports = logout;