const express = require('express');
const multer = require('multer');

const router = express.Router();

const uploads = multer({dest: 'uploads/reviews/'});

router.post('/add', require('./handler.js').addItem);
router.get('/list', require('./handler.js').getItems);

router.post('/add-review/:item_id', uploads.single('image'), require('./review.js'));

module.exports = router;