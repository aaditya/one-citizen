const express = require('express');
const router = express.Router();

const rand = require(__base + 'modules/misc/rand.js');

/* Authority Protect */
const protect = require(__base + 'modules/auth/protect.js');

router.get('/', (req, res) => {res.json({"success": true, "msg": "API active."})});
router.use('/auth', require(__base + 'modules/auth/routes.js'));

router.use('/subscribe', protect, require(__base + 'modules/sub/routes.js'));
router.use('/transactions', protect, require(__base + 'modules/trans/routes.js'));
router.use('/bonus', protect, require(__base + 'modules/bonus/routes.js'));

module.exports = router;