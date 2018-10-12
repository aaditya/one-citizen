const express = require('express');
const router = express.Router();

router.get('/rewards', require('./rewards.js').getRewards);
router.post('/add-reward', require('./addReward.js'));
module.exports = router;