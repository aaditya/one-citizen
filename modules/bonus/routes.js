const express = require('express');
const router = express.Router();

router.get('/rewards', require('./rewards.js').getRewards);
router.get('/buy-reward/:rew_id', require('./rewards.js').buyReward);
router.get('/my-rewards', require('./rewards.js').my);
router.post('/earn-points', require('./addReward.js').points);
router.post('/add-reward', require('./addReward.js').reward);
module.exports = router;