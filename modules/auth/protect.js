const jwt = require('jsonwebtoken');
const userModel = require(__base + 'models/user.js');
const financialModel = require(__base + 'models/financial.js');

const cryptor = require(__base + 'modules/misc/crypt.js');

const protect = (req, res, next) => {
	// check header or url parameters or post parameters for token
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		cryptor.decrypt(token, (err, tokenDec) => {
			if (err) {
				res.json({
					success: false,
					msg: 'Failed to authenticate token.'
				});
			} else {
				// verifies secret and checks exp
				jwt.verify(tokenDec, xe.sign, (err, info) => {
					if (err) {
						res.json({
							success: false,
							msg: err.message
						});
					} else {
						if (info) {
							userModel.findById(info.id).exec((err, user) => {
								if (err) {
									res.json({
										success: false,
										msg: err.message
									});
								}
								else {
									if (!user) {
										// Check if the username mentioned in the token actually exists.
										res.json({
											success: false,
											msg: 'Failed to authenticate token.'
										});
									} else {
										financialModel.findById(info.id).exec((err, fin) => {
											if (err) {
												res.json({
													success: false,
													msg: err.message
												});
											}
											else {
												req.info = {
													id: user.id,
													name: user.fullname,
													email: user.email,
													phone: user.phone,
													verified: true,
													loyalty: {
														card: fin.card,
														points: fin.points
													}
												};
												next();
											}
										});
									}
								}
							});
						}
						else {
							res.json({
								success: false,
								msg: 'User not found.'
							});
						}
					}
				});
			}
		});
	}
	else {
		// if there is no token then return an error
		res.json({
			success: false,
			msg: 'No token provided.'
		});
	}
}

module.exports = protect;