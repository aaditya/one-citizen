const express = require('express');
const router = express.Router();

router.get('/history', require('./history.js'));


module.exports = router;