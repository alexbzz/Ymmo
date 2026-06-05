const express    = require('express');
const router     = express.Router();
const controller = require('./analytics.controller');

router.get('/predict-price', controller.predictPrice);
router.get('/trends',        controller.getTrends);
router.get('/popular',       controller.getPopular);
router.get('/health',        controller.getHealth);

module.exports = router;