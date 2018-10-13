const express = require('express');
const router = express.Router();

router.post('/add', require('./handler.js').add);
router.patch('/update', require('./handler.js').update);
router.delete('/delete', require('./handler.js').delete);

module.exports = router;