const bcrypt = require('bcrypt');
const validator = require('validator');
const moment = require('moment');

const config = require(__base + 'system/config.json');
const userModel = require(__base + 'models/user.js');
const financialModel = require(__base + 'models/financial.js');

// Email Sender Module
const sendEmail = require(__base + 'modules/link/email.js');

// One-Time Password Generation
const rand = require(__base + 'modules/misc/rand.js');

// Actual Function
const register = (req, res) => {
  if ((!req.body.fullname) || (!req.body.email) || (!req.body.phone) || (!req.body.password)) {
    res.json({
      success: false,
      msg: 'Please check the details.'
    });
  }
  else {
    if (!validator.isEmail(req.body.email)) {
      res.json({
        success: false,
        msg: 'Email is not valid.'
      });
    }
    else {
      // Check if the user exists in the database.
      userModel.findOne({
        $or: [{
          "email": req.body.email
        }, {
          "phone": parseInt(req.body.phone)
        }]
      }, (err, user) => {
        if (err) {
          res.json({
            success: false,
            msg: err.message
          });
        } else {
          if (user) {
            res.json({
              success: false,
              msg: 'Account already exists.'
            });
          }
          else {
            // If no user found then generate the hash.
            bcrypt.hash(req.body.password, xe.salt, (err, passHash) => {
              if (err) {
                res.json({
                  success: false,
                  msg: err.message
                })
              } else {
                // Let's generate the loyalty card number.
                let lcn = rand({ limit: 16, type: 'numeric' });
                let code = rand({ limit: 14 });
                /* Store user in database */
                let User = new userModel({
                  fullname: req.body.fullname,
                  email: req.body.email,
                  phone: req.body.phone,
                  password: passHash,
                  code: {
                    email: code
                  }
                });
                User.save((err, data) => {
                  if (err) {
                    res.json({
                      success: false,
                      msg: err.message
                    });
                  } else {
                    /* Person verification */
                    if (config.settings.verification.email) {
                      // If emails are enabled in the configuration then send confirmation email.
                      let subject = "One Citizen Verification";
                      let link = `${xe.cblink}/auth/verify/${data._id}/${code}`;
                      let message = "Thank you for registering. \n Please click on the following link to activate your account. \n " + link;
                      sendEmail(req.body.email, subject, message);
                    }
                    let finance = new financialModel({
                      _id: data._id,
                      card: lcn,
                      points: req.body.points
                    });
                    finance.save((err, fin) => {
                      if (err) {
                        res.json({
                          success: false,
                          msg: err.message
                        });
                      }
                      else {
                        res.json({
                          success: true,
                          msg: `Registration Successful.`
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        }
      });
    }
  }
}

module.exports = register;