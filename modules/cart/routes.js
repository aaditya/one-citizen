const express = require('express');
const router = express.Router();

router.get('/view', require('./handler.js').list)
router.get('/add/:item_id/:qty', require('./handler.js').add);
router.patch('/update/:item_id/:qty', require('./handler.js').update);
router.delete('/delete/:item_id', require('./handler.js').delete);

module.exports = router;