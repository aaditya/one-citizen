const express = require('express');
const router = express.Router();

router.get('/get-offers', require('./offers.js').getOffers);
router.post('/add-offer', require('./offers.js').addOffer);

router.get('/my-offers', require('./managesub.js').my);
router.get('/opt-in/:sub_id', require('./managesub.js').add);
router.get('/opt-out/:sub_id', require('./managesub.js').remove);


module.exports = router;