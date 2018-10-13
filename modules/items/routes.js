const express = require('express');
const router = express.Router();

router.post('/add', require('./handler.js').addItem);
router.get('/list', require('./handler.js').getItems);

router.post('/add-review/:item_id', require('./review.js'));

module.exports = router;