const checkDetails = require(__base + 'models/user.js');

const verify = (req, res) => {
  let id = req.params.id;
  let code = req.params.code;

  checkDetails.findOne({ "_id": id }, (err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: err.message
      });
    }
    else {
      if (!user) {
        res.json({
          success: false,
          msg: 'Verification failed. User not found.'
        });
      }
      else {
        if (user.code.email == code) {
          checkDetails.findOneAndUpdate({ "_id": id }, { $set: { "verified.email": true }, $unset: { "code.email": 1 } }, { new: true }, (err, doc) => {
            if (err) {
              res.json({
                success: false,
                msg: err.message
              });
            }
            else {
              res.json({
                success: true,
                msg: 'Email Address Verified.'
              });
            }
          })
        }
        else {
          res.json({
            success: false,
            msg: 'Verification failed. Wrong verification code.'
          });
        }
      }
    }
  });
}

module.exports = verify;