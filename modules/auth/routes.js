const express = require('express');
const router = express.Router()

router.post('/register', require('./register.js'));
router.post('/login', require('./login.js'));

/* Verification Routes */
router.get('/verify/:id/:code', require(__base + 'modules/auth/verify.js'));

/* Authority Protect */
const protect = require(__base + 'modules/auth/protect.js');

/* Protected Routes */

router.get('/get-profile', protect, (req, res) => {
	res.json({
		"success": true, 
		"msg": 'Session Active.', 
		"info": req.info
	});
})

router.get('/logout', protect, require(__base + 'modules/auth/logout.js'))

module.exports = router